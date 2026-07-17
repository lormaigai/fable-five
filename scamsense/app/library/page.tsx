"use client";

import { useState } from "react";
import Shell, { useLang } from "@/components/Shell";
import VerdictCard from "@/components/VerdictCard";
import { t } from "@/lib/i18n";
import { SCAM_LIBRARY, type LibraryEntry } from "@/data/scamLibrary";
import type { AnalysisResult } from "@/lib/types";

function LibraryPage() {
  const lang = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const [liveResults, setLiveResults] = useState<Record<string, AnalysisResult>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runLive(entry: LibraryEntry) {
    setBusyId(entry.id);
    setError(null);
    try {
      const familyCode = localStorage.getItem("scamsense-family") ?? undefined;
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: entry.message, familyCode, source: "library" }),
      });
      const data = (await res.json()) as { result?: AnalysisResult; error?: string };
      if (!res.ok || !data.result) {
        setError(data.error ?? t("errorGeneric", lang));
        return;
      }
      setLiveResults((prev) => ({ ...prev, [entry.id]: data.result! }));
    } catch {
      setError(t("errorGeneric", lang));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <h1 className="tagline">{t("libraryTitle", lang)}</h1>
      <p style={{ textAlign: "center", marginBottom: "1.25rem" }}>{t("libraryIntro", lang)}</p>

      {error && <div className="error-box">{error}</div>}

      {SCAM_LIBRARY.map((entry) => {
        const open = openId === entry.id;
        const result = liveResults[entry.id] ?? entry.cached;
        return (
          <div className="card library-item" key={entry.id}>
            <div
              onClick={() => setOpenId(open ? null : entry.id)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <strong style={{ fontSize: "1.15rem" }}>
                {open ? "▼" : "▶"} {entry.title[lang]}
              </strong>
              {!open && <span style={{ color: "var(--accent)" }}>{t("viewAnalysis", lang)}</span>}
            </div>

            {open && (
              <div style={{ marginTop: "0.75rem" }}>
                <strong>{t("theMessage", lang)}:</strong>
                <div className="library-message">{entry.message}</div>
                <VerdictCard result={result} lang={lang} />
                <button
                  className="btn btn-secondary"
                  onClick={() => runLive(entry)}
                  disabled={busyId === entry.id}
                >
                  {busyId === entry.id ? t("checking", lang) : t("runLive", lang)}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  return (
    <Shell>
      <LibraryPage />
    </Shell>
  );
}
