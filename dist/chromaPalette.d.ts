export type ChromaHueId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;
export interface ChromaHue {
    id: ChromaHueId;
    name: string;
    foreground: string;
    background: string;
}
export declare const DEFAULT_21_HUE_PALETTE: ChromaHue[];
export declare function getHueById(id: ChromaHueId): ChromaHue;
export declare function getHueByName(name: string): ChromaHue | undefined;
