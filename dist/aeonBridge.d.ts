import { ChromatextOptions } from "./chromaRenderer";
import { BrailleOptions } from "./svgBraille";
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
    braille?: BrailleOptions & {
        enabled?: boolean;
    };
}
/**
 * High-level integration surface: give it a message,
 * get back chromatext HTML + optional SVG braille.
 */
export declare function aeonChromaTransform(payload: AeonChromaPayload, config?: AeonChromaConfig): AeonChromaResult;
