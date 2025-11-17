import { ChromatextOptions, renderChromatext } from "./chromaRenderer";
import { renderBrailleRow, BrailleOptions } from "./svgBraille";

export interface AeonChromaPayload {
  text: string;
  meta?: Record<string, unknown>;
}

export interface AeonChromaResult {
  html: string;
  svgBraille?: string;
}

export interface AeonChromaConfig {
  chroma?: ChromatextOptions;
  braille?: BrailleOptions & { enabled?: boolean };
}

/**
 * High-level integration surface: give it a message,
 * get back chromatext HTML + optional SVG braille.
 */
export function aeonChromaTransform(
  payload: AeonChromaPayload,
  config: AeonChromaConfig = {}
): AeonChromaResult {
  const html = renderChromatext(payload.text, {
    mode: "scroll",
    baseHueId: 1,
    cycleByWord: true,
    includeBackground: true,
    ...config.chroma
  });

  const svgBraille = config.braille?.enabled
    ? renderBrailleRow(payload.text, config.braille)
    : undefined;

  return { html, svgBraille };
}
