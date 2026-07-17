"use client";

import { useEffect, useRef, useState } from "react";
import Shell, { useLang } from "@/components/Shell";
import VerdictCard from "@/components/VerdictCard";
import { t } from "@/lib/i18n";
import type { AnalysisResult } from "@/lib/types";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
type ImageType = (typeof IMAGE_TYPES)[number];

function CheckPage() {
  const lang = useLang();
  const [text, setText] = useState("");
  const [image, setImage] = useState<{ mediaType: ImageType; base64: string } | null>(null);
  const [familyCode, setFamilyCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [stats, setStats] = useState({ checked: 0, caught: 0 });
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFamilyCode(localStorage.getItem("scamsense-family") ?? "");
    setStats({
      checked: Number(localStorage.getItem("scamsense-checked") ?? 0),
      caught: Number(localStorage.getItem("scamsense-caught") ?? 0),
    });
  }, []);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type as ImageType)) {
      setError("Please choose a JPG, PNG, GIF or WebP image. 请选择图片文件。");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImage({ mediaType: file.type as ImageType, base64: dataUrl.split(",")[1] });
      setError(null);
    };
    reader.readAsDataURL(file);
  }

  async function check() {
    if (!text.trim() && !image) {
      setError(t("errorEmpty", lang));
      return;
    }
    setBusy(true);
    setError(null);
    setResult(null);

    const code = familyCode.trim();
    if (code) localStorage.setItem("scamsense-family", code);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim() || undefined,
          image: image ?? undefined,
          familyCode: code || undefined,
          source: "web",
        }),
      });
      const data = (await res.json()) as { result?: AnalysisResult; error?: string };
      if (!res.ok || !data.result) {
        setError(data.error ?? t("errorGeneric", lang));
        return;
      }
      setResult(data.result);
      const checked = stats.checked + 1;
      const caught = stats.caught + (data.result.verdict === "danger" ? 1 : 0);
      setStats({ checked, caught });
      localStorage.setItem("scamsense-checked", String(checked));
      localStorage.setItem("scamsense-caught", String(caught));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t("errorGeneric", lang));
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setResult(null);
    setText("");
    setImage(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  if (result) {
    return (
      <div>
        <VerdictCard result={result} lang={lang} />
        <button className="btn btn-secondary" onClick={reset}>
          {t("checkAnother", lang)}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="tagline">{t("tagline", lang)}</h1>

      {error && <div className="error-box">{error}</div>}

      <div className="card">
        <label className="big-label" htmlFor="msg">
          1. {t("step1", lang)}
        </label>
        <textarea
          id="msg"
          className="big-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("placeholder", lang)}
        />
        <div className="upload-row">
          <span style={{ fontWeight: "bold" }}>{t("orUpload", lang)}:</span>
          <button className="lang-toggle" onClick={() => fileRef.current?.click()}>
            {t("uploadButton", lang)}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept={IMAGE_TYPES.join(",")}
            onChange={onPickFile}
            style={{ display: "none" }}
          />
          {image && (
            <button className="lang-toggle" onClick={() => setImage(null)}>
              {t("removeImage", lang)}
            </button>
          )}
        </div>
        {image && (
          <div style={{ marginTop: "0.75rem" }}>
            <img
              className="preview-img"
              src={`data:${image.mediaType};base64,${image.base64}`}
              alt="screenshot preview"
            />
          </div>
        )}
      </div>

      <div className="card">
        <label className="big-label" htmlFor="fam">
          2. {t("familyCodeLabel", lang)}
        </label>
        <input
          id="fam"
          className="big-input"
          value={familyCode}
          onChange={(e) => setFamilyCode(e.target.value)}
          placeholder={t("familyCodePlaceholder", lang)}
        />
      </div>

      <button className="btn btn-primary" onClick={check} disabled={busy}>
        {busy ? t("checking", lang) : `3. ${t("checkButton", lang)}`}
      </button>

      <div className="stats-row">
        <div className="stat">
          <b>{stats.checked}</b>
          <span>{t("statsChecked", lang)}</span>
        </div>
        <div className="stat">
          <b>{stats.caught}</b>
          <span>{t("statsCaught", lang)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Shell>
      <CheckPage />
    </Shell>
  );
}
