import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScamSense — Check anything suspicious in 5 seconds",
  description:
    "AI scam detection for elderly users and their families. Paste a message or upload a screenshot, get a clear verdict, learn the manipulation tactic, alert your family.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
