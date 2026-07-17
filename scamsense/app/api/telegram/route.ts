import { NextRequest, NextResponse } from "next/server";
import { analyzeContent, type ImageInput } from "@/lib/analyze";
import { logCheck } from "@/lib/store";
import type { AnalysisResult } from "@/lib/types";

// Telegram bot entry point: forward any suspicious message (or screenshot)
// to the bot and get the verdict back in chat.
//
// Setup (one-time):
//   1. Create a bot with @BotFather, set TELEGRAM_BOT_TOKEN in env.
//   2. Register this webhook:
//      curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-domain>/api/telegram"
//   3. Optional: a user can link family alerts by sending  /family CODE

export const maxDuration = 60;

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = TOKEN ? `https://api.telegram.org/bot${TOKEN}` : null;

const VERDICT_BADGE: Record<AnalysisResult["verdict"], string> = {
  danger: "🔴 DANGER — very likely a scam / 危险，极可能是骗局",
  caution: "🟡 BE CAREFUL — suspicious signs / 请小心，有可疑迹象",
  safe: "🟢 LOOKS SAFE — no scam signs found / 看起来安全",
};

// In-memory chat → family code map (demo scope; move to DB for production).
const familyLinks = new Map<number, string>();

function formatReply(r: AnalysisResult): string {
  const lines: string[] = [VERDICT_BADGE[r.verdict], "", `${r.headline.en}`, `${r.headline.zh}`];
  if (r.tactics.length > 0) {
    lines.push("", "⚠️ Tricks used / 骗术手法:");
    for (const t of r.tactics) {
      lines.push(`• ${t.name.en} / ${t.name.zh}`, `  ${t.explanation.en}`, `  ${t.explanation.zh}`);
    }
  }
  if (r.advice.length > 0) {
    lines.push("", "✅ What to do / 应该怎么做:");
    r.advice.forEach((a, i) => lines.push(`${i + 1}. ${a.en}`, `   ${a.zh}`));
  }
  return lines.join("\n").slice(0, 4000);
}

async function sendMessage(chatId: number, text: string) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

async function fetchPhoto(fileId: string): Promise<ImageInput | null> {
  const fileRes = await fetch(`${API}/getFile?file_id=${fileId}`);
  const fileData = (await fileRes.json()) as { ok: boolean; result?: { file_path: string } };
  if (!fileData.ok || !fileData.result) return null;
  const dl = await fetch(`https://api.telegram.org/file/bot${TOKEN}/${fileData.result.file_path}`);
  const buf = Buffer.from(await dl.arrayBuffer());
  const ext = fileData.result.file_path.split(".").pop()?.toLowerCase();
  const mediaType = ext === "png" ? "image/png" : "image/jpeg";
  return { mediaType, base64: buf.toString("base64") };
}

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    text?: string;
    caption?: string;
    photo?: { file_id: string }[];
  };
}

export async function POST(req: NextRequest) {
  if (!API) {
    return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN not configured." }, { status: 503 });
  }

  const update = (await req.json()) as TelegramUpdate;
  const msg = update.message;
  // Always ACK Telegram quickly with 200 so it doesn't retry storms.
  if (!msg) return NextResponse.json({ ok: true });

  const chatId = msg.chat.id;
  const text = msg.text ?? msg.caption ?? "";

  try {
    if (text.startsWith("/start")) {
      await sendMessage(
        chatId,
        "👋 I'm ScamSense. Forward me any suspicious message or screenshot and I'll tell you if it's a scam — and teach you the trick behind it.\n\n把可疑的信息或截图转发给我，我会告诉您是不是骗局，并教您识破骗术。\n\nLink family alerts: /family YOURCODE",
      );
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith("/family")) {
      const code = text.split(/\s+/)[1]?.trim().toUpperCase();
      if (code && code.length >= 4) {
        familyLinks.set(chatId, code);
        await sendMessage(chatId, `✅ Linked to family code ${code}. Every check will now appear on your family's dashboard.\n已连接家庭代码 ${code}。`);
      } else {
        await sendMessage(chatId, "Usage: /family YOURCODE (min 4 characters)");
      }
      return NextResponse.json({ ok: true });
    }

    let image: ImageInput | null = null;
    if (msg.photo && msg.photo.length > 0) {
      // Last entry is the highest resolution.
      image = await fetchPhoto(msg.photo[msg.photo.length - 1].file_id);
    }

    if (!text && !image) {
      await sendMessage(chatId, "Send me a message or screenshot to check. 请发送信息或截图。");
      return NextResponse.json({ ok: true });
    }

    await sendMessage(chatId, "🔎 Checking... 正在分析...");
    const result = await analyzeContent(text || null, image);
    await sendMessage(chatId, formatReply(result));

    const familyCode = familyLinks.get(chatId);
    if (familyCode) {
      try {
        await logCheck({
          id: crypto.randomUUID(),
          familyCode,
          verdict: result.verdict,
          scamTypeEn: result.scamType.en,
          headlineEn: result.headline.en,
          headlineZh: result.headline.zh,
          snippet: (text || "[screenshot]").slice(0, 140),
          source: "telegram",
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Family log failed:", e);
      }
    }
  } catch (e) {
    console.error("Telegram handler error:", e);
    try {
      await sendMessage(chatId, "Sorry, something went wrong. Please try again. 抱歉出错了，请再试一次。");
    } catch {
      // ignore
    }
  }

  return NextResponse.json({ ok: true });
}
