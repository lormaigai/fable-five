"use client";

import { useEffect, useState } from "react";
import Shell, { useLang } from "@/components/Shell";
import { t } from "@/lib/i18n";
import type { CheckRecord } from "@/lib/types";

const BADGE: Record<CheckRecord["verdict"], string> = {
  danger: "🔴",
  caution: "🟡",
  safe: "🟢",
};

function FamilyPage() {
  const lang = useLang();
  const [code, setCode] = useState("");
  const [checks, setChecks] = useState<CheckRecord[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("scamsense-family");
    if (saved) setCode(saved);
  }, []);

  async function load(codeArg?: string) {
    const useCode = (codeArg ?? code).trim();
    if (useCode.length < 4) {
      setError("Family code must be at least 4 characters. 家庭代码至少4个字符。");
      return;
    }
    setBusy(true);
    setError(null);
    localStorage.setItem("scamsense-family", useCode);
    try {
      const res = await fetch(`/api/family?code=${encodeURIComponent(useCode)}`);
      const data = (await res.json()) as { checks?: CheckRecord[]; error?: string };
      if (!res.ok || !data.checks) {
        setError(data.error ?? t("errorGeneric", lang));
        return;
      }
      setChecks(data.checks);
    } catch {
      setError(t("errorGeneric", lang));
    } finally {
      setBusy(false);
    }
  }

  const dangerCount = checks?.filter((c) => c.verdict === "danger").length ?? 0;

  return (
    <div>
      <h1 className="tagline">{t("familyTitle", lang)}</h1>
      <p style={{ textAlign: "center", marginBottom: "1.25rem" }}>{t("familyIntro", lang)}</p>

      {error && <div className="error-box">{error}</div>}

      <div className="card">
        <label className="big-label" htmlFor="code">
          {t("familyCodeLabel", lang)}
        </label>
        <input
          id="code"
          className="big-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t("familyCodePlaceholder", lang)}
        />
        <div style={{ marginTop: "0.75rem" }}>
          <button className="btn btn-primary" onClick={() => load()} disabled={busy}>
            {busy ? t("checking", lang) : t("familyLoad", lang)}
          </button>
        </div>
      </div>

      {checks !== null && (
        <div className="card">
          {dangerCount > 0 && (
            <div className="alert-banner">
              🚨 {dangerCount} {t("familyRedAlert", lang)}
            </div>
          )}
          {checks.length === 0 && <p>{t("familyEmpty", lang)}</p>}
          {checks.map((c) => (
            <div className="check-row" key={c.id}>
              <span className="check-badge">{BADGE[c.verdict]}</span>
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {lang === "zh" && c.headlineZh ? c.headlineZh : c.headlineEn}
                </div>
                {c.snippet && <div className="check-meta">“{c.snippet}”</div>}
                <div className="check-meta">
                  {c.scamTypeEn} · {c.source} · {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Shell>
      <FamilyPage />
    </Shell>
  );
}
