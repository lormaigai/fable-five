import { NextRequest, NextResponse } from "next/server";
import { listChecks, logCheck } from "@/lib/store";
import type { CheckRecord } from "@/lib/types";

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code || code.trim().length < 4) {
    return NextResponse.json({ error: "Provide a family code (min 4 characters)." }, { status: 400 });
  }
  try {
    const checks = await listChecks(normalizeCode(code));
    return NextResponse.json({ checks });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not load checks.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Used by the Scam Library demo to log cached-result checks without an API call.
export async function POST(req: NextRequest) {
  let record: Partial<CheckRecord>;
  try {
    record = (await req.json()) as Partial<CheckRecord>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (!record.familyCode || !record.verdict || !record.headlineEn) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }
  try {
    await logCheck({
      id: crypto.randomUUID(),
      familyCode: normalizeCode(record.familyCode),
      verdict: record.verdict,
      scamTypeEn: record.scamTypeEn ?? "",
      headlineEn: record.headlineEn,
      headlineZh: record.headlineZh ?? "",
      snippet: (record.snippet ?? "").slice(0, 140),
      source: record.source ?? "web",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not log check.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
