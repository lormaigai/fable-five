import { promises as fs } from "fs";
import path from "path";
import os from "os";
import type { CheckRecord } from "./types";

// Storage adapter for the family dashboard.
// - If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, uses Supabase (table: checks).
// - Otherwise falls back to a JSON file in the OS temp dir: fine for local demos,
//   ephemeral on serverless — set the Supabase vars for persistence in production.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FALLBACK_FILE = path.join(os.tmpdir(), "scamsense-checks.json");

function supabaseHeaders() {
  return {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function readFallback(): Promise<CheckRecord[]> {
  try {
    return JSON.parse(await fs.readFile(FALLBACK_FILE, "utf8")) as CheckRecord[];
  } catch {
    return [];
  }
}

export async function logCheck(record: CheckRecord): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/checks`, {
      method: "POST",
      headers: supabaseHeaders(),
      body: JSON.stringify({
        id: record.id,
        family_code: record.familyCode,
        verdict: record.verdict,
        scam_type_en: record.scamTypeEn,
        headline_en: record.headlineEn,
        headline_zh: record.headlineZh,
        snippet: record.snippet,
        source: record.source,
        created_at: record.createdAt,
      }),
    });
    if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
    return;
  }
  const all = await readFallback();
  all.unshift(record);
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(all.slice(0, 500)));
}

export async function listChecks(familyCode: string): Promise<CheckRecord[]> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/checks?family_code=eq.${encodeURIComponent(familyCode)}&order=created_at.desc&limit=100`,
      { headers: supabaseHeaders() },
    );
    if (!res.ok) throw new Error(`Supabase query failed: ${res.status}`);
    const rows = (await res.json()) as Record<string, string>[];
    return rows.map((r) => ({
      id: r.id,
      familyCode: r.family_code,
      verdict: r.verdict as CheckRecord["verdict"],
      scamTypeEn: r.scam_type_en,
      headlineEn: r.headline_en,
      headlineZh: r.headline_zh,
      snippet: r.snippet,
      source: r.source as CheckRecord["source"],
      createdAt: r.created_at,
    }));
  }
  const all = await readFallback();
  return all.filter((r) => r.familyCode === familyCode).slice(0, 100);
}
