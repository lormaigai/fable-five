import { NextRequest, NextResponse } from "next/server";
import { analyzeContent, type ImageInput } from "@/lib/analyze";
import { logCheck } from "@/lib/store";
import type { CheckRecord } from "@/lib/types";

export const maxDuration = 60;

interface AnalyzeBody {
  text?: string;
  image?: ImageInput;
  familyCode?: string;
  source?: CheckRecord["source"];
}

export async function POST(req: NextRequest) {
  let body: AnalyzeBody;
  try {
    body = (await req.json()) as AnalyzeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const text = body.text?.trim() || null;
  const image = body.image ?? null;
  if (!text && !image) {
    return NextResponse.json(
      { error: "Provide text or a screenshot to analyze." },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeContent(text, image);

    if (body.familyCode) {
      try {
        await logCheck({
          id: crypto.randomUUID(),
          familyCode: body.familyCode.trim().toUpperCase(),
          verdict: result.verdict,
          scamTypeEn: result.scamType.en,
          headlineEn: result.headline.en,
          headlineZh: result.headline.zh,
          snippet: (text ?? "[screenshot]").slice(0, 140),
          source: body.source ?? "web",
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Family log failed (analysis still returned):", e);
      }
    }

    return NextResponse.json({ result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
