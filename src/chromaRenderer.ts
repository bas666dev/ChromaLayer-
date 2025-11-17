import {
  AeonPhase,
  ChromaHue,
  ChromaHueId,
  DEFAULT_21_HUE_PALETTE,
  getHueById,
  getPhaseEntry
} from "./chromaPalette";

export type ChromatextMode = "inline" | "block" | "scroll";

export interface ChromaAnimationOptions {
  enabled?: boolean;
  pulseSpeedMs?: number;
  hueShiftDeg?: number;
  brightnessAmplitude?: number;
}

export interface ChromatextOptions {
  mode?: ChromatextMode;
  baseHueId?: number; // 1–21, starting hue
  cycleByWord?: boolean; // if true: words cycle through palette
  includeBackground?: boolean;
  fontFamily?: string;
  phase?: AeonPhase;
  animation?: ChromaAnimationOptions;
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
    fontFamily = "'EB Garamond',serif",
    phase,
    animation
  } = options;

  const palette = DEFAULT_21_HUE_PALETTE;
  const phaseEntry = phase ? getPhaseEntry(phase) : undefined;
  const resolvedBaseHueId = (phaseEntry?.hueId ?? baseHueId) as ChromaHueId;
  const animationEnabled = !!animation?.enabled && mode !== "inline";
  const animationVars = animationEnabled
    ? `--chroma-pulse-speed:${animation.pulseSpeedMs ?? 4200}ms;` +
      `--chroma-hue-shift:${animation.hueShiftDeg ?? 24}deg;` +
      `--chroma-brightness-amp:${animation.brightnessAmplitude ?? 0.12};`
    : "";
  const animationStyleTag = animationEnabled
    ? `<style data-chromatext-animation="true">
@keyframes chroma-hue-pulse {0%{filter:hue-rotate(0deg) brightness(1);}50%{filter:hue-rotate(var(--chroma-hue-shift,24deg)) brightness(calc(1 + var(--chroma-brightness-amp,0.12)));}100%{filter:hue-rotate(0deg) brightness(1);}}
@keyframes chroma-soft-glow {0%{text-shadow:0 0 8px currentColor;}50%{text-shadow:0 0 14px currentColor;}100%{text-shadow:0 0 8px currentColor;}}
.aeon-block.chroma-animated span,.aeon-scroll.chroma-animated span{animation:chroma-hue-pulse var(--chroma-pulse-speed,4200ms) ease-in-out infinite,chroma-soft-glow calc(var(--chroma-pulse-speed,4200ms)*0.9) ease-in-out infinite;will-change:filter,text-shadow;}
</style>`
    : "";
  const parts = splitWordsAndSpaces(text);
  let colorIndex = (resolvedBaseHueId - 1 + palette.length) % palette.length;

  const innerHTML = parts
    .map(part => {
      // preserve whitespace as-is
      if (/^\s+$/.test(part)) return part;

      const hue: ChromaHue = cycleByWord
        ? palette[colorIndex++ % palette.length]
        : getHueById(resolvedBaseHueId);

      const fg = hue.foreground;
      const style = `color:${fg}; text-shadow:0 0 8px ${fg}66;`;
      const phaseAttrs = phase
        ? ` data-phase="${phase}" data-phase-label="${phaseEntry?.label || ""}"`
        : "";
      const animClass = animationEnabled ? " class=\"chroma-animated-span\"" : "";
      return `<span${animClass} data-hue="${hue.id}" data-huename="${hue.name}"${phaseAttrs} style="${style}">${escapeHtml(part)}</span>`;
    })
    .join("");

  const baseBg =
    includeBackground && mode !== "inline"
      ? "background:radial-gradient(circle at 50% 58%,#05050c 0%,#140d23 40%,#05050c 100%);"
      : "";

  const blockStyle =
    [
      `font-family:${fontFamily}`,
      "padding:1.8em",
      "border-radius:1.4em",
      "line-height:1.9",
      "letter-spacing:.04em",
      "box-shadow:inset 0 0 40px #FFD16633,0 0 35px #43E97B22,0 0 26px #9B5DE544",
      "color:#f5f5ff",
      "text-align:left"
    ]
      .map(rule => `${rule};`)
      .join("");

  const phaseAttr = phase ? ` data-phase="${phase}" data-phase-label="${phaseEntry?.label || ""}"` : "";
  const phaseTitle = phaseEntry?.description ? ` data-phase-desc="${phaseEntry.description}"` : "";

  if (mode === "inline") {
    return `<span style="font-family:${fontFamily};"${phaseAttr}${phaseTitle}>${innerHTML}</span>`;
  }

  if (mode === "scroll") {
    const classes = animationEnabled ? "aeon-scroll chroma-animated" : "aeon-scroll";
    return `${animationStyleTag}<div class="${classes}" style="${baseBg}${blockStyle}${animationVars}"${phaseAttr}${phaseTitle}>${innerHTML}</div>`;
  }

  // default: block
  const classes = animationEnabled ? "aeon-block chroma-animated" : "aeon-block";
  return `${animationStyleTag}<div class="${classes}" style="${baseBg}${blockStyle}${animationVars}"${phaseAttr}${phaseTitle}>${innerHTML}</div>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
