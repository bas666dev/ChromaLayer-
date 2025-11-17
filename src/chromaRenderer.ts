import { ChromaHue, DEFAULT_21_HUE_PALETTE, getHueById } from "./chromaPalette";

export type ChromatextMode = "inline" | "block" | "scroll";

export interface ChromatextOptions {
  mode?: ChromatextMode;
  baseHueId?: number; // 1–21, starting hue
  cycleByWord?: boolean; // if true: words cycle through palette
  includeBackground?: boolean;
  fontFamily?: string;
}

/**
 * Very simple tokenizer that splits on whitespace but preserves it.
 */
function splitWordsAndSpaces(input: string): string[] {
  const parts: string[] = [];
  let current = "";
  let isSpace = /\s/.test(input[0] || "");

  for (const ch of input) {
    const chIsSpace = /\s/.test(ch);
    if (chIsSpace === isSpace) {
      current += ch;
    } else {
      parts.push(current);
      current = ch;
      isSpace = chIsSpace;
    }
  }
  if (current) parts.push(current);
  return parts;
}

export function renderChromatext(
  text: string,
  options: ChromatextOptions = {}
): string {
  const {
    mode = "block",
    baseHueId = 1,
    cycleByWord = true,
    includeBackground = true,
    fontFamily = "'EB Garamond',serif"
  } = options;

  const palette = DEFAULT_21_HUE_PALETTE;
  const parts = splitWordsAndSpaces(text);
  let colorIndex = (baseHueId - 1 + palette.length) % palette.length;

  const innerHTML = parts
    .map(part => {
      // preserve whitespace as-is
      if (/^\s+$/.test(part)) return part;

      const hue: ChromaHue = cycleByWord
        ? palette[colorIndex++ % palette.length]
        : getHueById(baseHueId as any);

      const fg = hue.foreground;
      const style = `color:${fg}; text-shadow:0 0 8px ${fg}66;`;
      return `<span data-hue="${hue.id}" data-huename="${hue.name}" style="${style}">${escapeHtml(part)}</span>`;
    })
    .join("");

  const baseBg =
    includeBackground && mode !== "inline"
      ? "background:radial-gradient(circle at 50% 58%,#05050c 0%,#140d23 40%,#05050c 100%);"
      : "";

  const blockStyle = [
    `font-family:${fontFamily}`,
    "padding:1.8em",
    "border-radius:1.4em",
    "line-height:1.9",
    "letter-spacing:.04em",
    "box-shadow:inset 0 0 40px #FFD16633,0 0 35px #43E97B22,0 0 26px #9B5DE544",
    "color:#f5f5ff",
    "text-align:left"
  ].join(";");

  if (mode === "inline") {
    return `<span style="font-family:${fontFamily};">${innerHTML}</span>`;
  }

  if (mode === "scroll") {
    return `<div class="aeon-scroll" style="${baseBg}${blockStyle}">${innerHTML}</div>`;
  }

  // default: block
  return `<div class="aeon-block" style="${baseBg}${blockStyle}">${innerHTML}</div>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
