export type ChromaHueId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21;

export interface ChromaHue {
  id: ChromaHueId;
  name: string;
  foreground: string;
  background: string;
}

export const DEFAULT_21_HUE_PALETTE: ChromaHue[] = [
  { id: 1, name: "solar-gold", foreground: "#FFD166", background: "#140D23" },
  { id: 2, name: "verdant-green", foreground: "#43E97B", background: "#050913" },
  { id: 3, name: "cobalt-bloom", foreground: "#3A86FF", background: "#050B18" },
  { id: 4, name: "amethyst-crown", foreground: "#9B5DE5", background: "#16081F" },
  { id: 5, name: "ember-orange", foreground: "#F77F00", background: "#180C06" },
  { id: 6, name: "rose-pulse", foreground: "#FF5C8A", background: "#190411" },
  { id: 7, name: "seafoam-vein", foreground: "#6FE7DD", background: "#031314" },
  { id: 8, name: "amber-sigil", foreground: "#FFC857", background: "#15100A" },
  { id: 9, name: "void-ink", foreground: "#F5F5FF", background: "#05050C" },
  { id: 10, name: "lotus-violet", foreground: "#C77DFF", background: "#1A0928" },
  { id: 11, name: "jade-echo", foreground: "#53D397", background: "#031911" },
  { id: 12, name: "skyglyph", foreground: "#7AD0FF", background: "#041019" },
  { id: 13, name: "cinder-red", foreground: "#F94144", background: "#1B0508" },
  { id: 14, name: "citrine-veil", foreground: "#FFE066", background: "#191107" },
  { id: 15, name: "river-teal", foreground: "#00B8A9", background: "#031515" },
  { id: 16, name: "orchid-spark", foreground: "#F15BB5", background: "#1B0414" },
  { id: 17, name: "glacier", foreground: "#BDE0FE", background: "#050A12" },
  { id: 18, name: "ember-violet", foreground: "#F72585", background: "#170216" },
  { id: 19, name: "aurora-lime", foreground: "#C0F800", background: "#0A1503" },
  { id: 20, name: "midnight-iris", foreground: "#CDB4DB", background: "#100718" },
  { id: 21, name: "crown-white", foreground: "#FFFFFF", background: "#06040A" }
];

export function getHueById(id: ChromaHueId): ChromaHue {
  const hue = DEFAULT_21_HUE_PALETTE.find(h => h.id === id);
  if (!hue) throw new Error(`Unknown hue id: ${id}`);
  return hue;
}

export function getHueByName(name: string): ChromaHue | undefined {
  return DEFAULT_21_HUE_PALETTE.find(h => h.name === name);
}
