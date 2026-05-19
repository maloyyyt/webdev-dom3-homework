import { escapeHtml } from "./escapeHtml.js";

export function formatCommentText(text) {
  const safeText = escapeHtml(text);

  return safeText
    .replaceAll("\n", "<br>")
    .replaceAll("&gt;", ">");
}