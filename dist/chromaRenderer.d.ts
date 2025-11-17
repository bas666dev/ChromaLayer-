export type ChromatextMode = "inline" | "block" | "scroll";
export interface ChromatextOptions {
    mode?: ChromatextMode;
    baseHueId?: number;
    cycleByWord?: boolean;
    includeBackground?: boolean;
    fontFamily?: string;
}
export declare function renderChromatext(text: string, options?: ChromatextOptions): string;
