"use client";

import { t, type Lang } from "@/lib/i18n";
import type { AnalysisResult } from "@/lib/types";

const VERDICT_META = {
  danger: { emoji: "🔴", labelKey: "verdictDanger", cls: "verdict-danger" },
  caution: { emoji: "🟡", labelKey: "verdictCaution", cls: "verdict-caution" },
  safe: { emoji: "🟢", labelKey: "verdictSafe", cls: "verdict-safe" },
} as const;

export default function VerdictCard({
  result,
  lang,
}: {
  result: AnalysisResult;
  lang: Lang;
}) {
  const meta = VERDICT_META[result.verdict];
  return (
    <div>
      <div className={`verdict-banner ${meta.cls}`} role="alert">
        <span className="verdict-emoji">{meta.emoji}</span>
        <span className="verdict-label">{t(meta.labelKey, lang)}</span>
        <span className="verdict-headline">{result.headline[lang]}</span>
        <div className="confidence">
          {t("confidence", lang)}: {result.confidence}% · {result.scamType[lang]}
        </div>
      </div>

      {result.tactics.length > 0 && (
        <div className="card">
          <h2 className="section-title">{t("tacticsTitle", lang)}</h2>
          {result.tactics.map((tac, i) => (
            <div className="tactic" key={i}>
              <div className="tactic-name">{tac.name[lang]}</div>
              <div>{tac.explanation[lang]}</div>
            </div>
          ))}
        </div>
      )}

      {result.advice.length > 0 && (
        <div className="card">
          <h2 className="section-title">{t("adviceTitle", lang)}</h2>
          <ol className="advice-list">
            {result.advice.map((a, i) => (
              <li key={i}>{a[lang]}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
