export interface BrailleOptions {
    dotRadius?: number;
    dotSpacing?: number;
    cellPadding?: number;
    rowSpacing?: number;
    foreground?: string;
    background?: string;
}
/**
 * Render a line of "braille-style" cells for a string.
 * NOTE: This is a *visual* braille-style pattern, not a semantic translation.
 */
export declare function renderBrailleRow(text: string, options?: BrailleOptions): string;
