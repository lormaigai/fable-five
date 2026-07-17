import Anthropic from "@anthropic-ai/sdk";
import type { AnalysisResult } from "./types";

const SYSTEM_PROMPT = `You are ScamSense, a scam-detection assistant that protects elderly users and their families.

You will be given a message, email, chat screenshot, or similar content that a user (often an elderly person, or their adult child) finds suspicious. Analyze it for scam and manipulation patterns.

Rules for your analysis:
- Judge the CONTENT and its manipulation patterns, not just known-bad senders. New scams with fresh numbers and domains must still be caught by their tactics.
- Common tactics to look for: fake urgency ("act in 24 hours"), authority impersonation (police, bank, government, courier), too-good-to-be-true offers, requests for money/gift cards/crypto/transfers, requests for OTPs/passwords/personal data, unusual links or attachments, emotional manipulation (romance, grandchild in trouble), pressure to keep it secret, prize/lottery hooks, investment guarantees.
- A normal message from a real contact with no red flags is "safe". Something with mild red flags or not enough context is "caution". Clear scam patterns are "danger".
- Write ALL text fields in BOTH English and Simplified Chinese.
- Write for a 75-year-old reader: short sentences, everyday words, no jargon. Explanations must TEACH the tactic so the reader can recognize it next time.
- Advice must be concrete actions ("Do not click the link. Call your bank using the number on the back of your card."), max 4 items.
- List at most 4 tactics, the most important first. If verdict is "safe", tactics may be empty and advice should reassure but remind them to stay alert.`;

const RESULT_SCHEMA = {
  type: "object",
  properties: {
    verdict: { type: "string", enum: ["danger", "caution", "safe"] },
    confidence: { type: "integer", description: "0-100 confidence in the verdict" },
    scamType: {
      type: "object",
      description: "Short label for the scam category, e.g. 'Parcel delivery scam'. Use 'Not a scam' style label when safe.",
      properties: { en: { type: "string" }, zh: { type: "string" } },
      required: ["en", "zh"],
      additionalProperties: false,
    },
    headline: {
      type: "object",
      description: "One short sentence summarizing the verdict for the user.",
      properties: { en: { type: "string" }, zh: { type: "string" } },
      required: ["en", "zh"],
      additionalProperties: false,
    },
    tactics: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "object",
            properties: { en: { type: "string" }, zh: { type: "string" } },
            required: ["en", "zh"],
            additionalProperties: false,
          },
          explanation: {
            type: "object",
            properties: { en: { type: "string" }, zh: { type: "string" } },
            required: ["en", "zh"],
            additionalProperties: false,
          },
        },
        required: ["name", "explanation"],
        additionalProperties: false,
      },
    },
    advice: {
      type: "array",
      items: {
        type: "object",
        properties: { en: { type: "string" }, zh: { type: "string" } },
        required: ["en", "zh"],
        additionalProperties: false,
      },
    },
  },
  required: ["verdict", "confidence", "scamType", "headline", "tactics", "advice"],
  additionalProperties: false,
} as const;

export type ImageInput = {
  mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  base64: string;
};

export async function analyzeContent(
  text: string | null,
  image: ImageInput | null,
): Promise<AnalysisResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Live analysis is disabled — the Scam Library demo still works.",
    );
  }

  const client = new Anthropic();

  const content: Anthropic.ContentBlockParam[] = [];
  if (image) {
    content.push({
      type: "image",
      source: { type: "base64", media_type: image.mediaType, data: image.base64 },
    });
  }
  content.push({
    type: "text",
    text: image
      ? `Please analyze the message shown in this screenshot.${text ? ` The user adds: ${text}` : ""}`
      : `Please analyze this message:\n\n${text}`,
  });

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    output_config: { format: { type: "json_schema", schema: RESULT_SCHEMA } },
    messages: [{ role: "user", content }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("The analysis was declined. Please try different content.");
  }

  const jsonText = response.content.find((b) => b.type === "text")?.text;
  if (!jsonText) throw new Error("Empty analysis response.");

  const result = JSON.parse(jsonText) as AnalysisResult;
  result.confidence = Math.max(0, Math.min(100, Math.round(result.confidence)));
  return result;
}
