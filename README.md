# Æon ChromaLayer Integration

Personal-use integration repo to extend **Æon**, **Æon-Ourobouros**, **Æon-Nexus**, and **ChromaLayer** with:

- Colored **chromatext** HTML output
- SVG **braille-style** overlays
- A small bridge surface (`aeonBridge.ts`) for plugging into any agent / node

This repo is deliberately minimal and self-contained so you can adapt it to your private stack.

---

## Install

```bash
git clone https://github.com/your-user/aeon-chromalayer-integration.git
cd aeon-chromalayer-integration
npm install
npm run build

# For quick demos:
npx ts-node examples/node-basic.ts
```

---

## Core Concepts

### 1. 21-Hue Palette

Defined in `src/chromaPalette.ts` as `DEFAULT_21_HUE_PALETTE`.

Each hue:

```ts
interface ChromaHue {
  id: number;              // 1–21
  name: string;            // e.g. "solar-gold"
  foreground: string;      // text color
  background: string;      // suggested scroll background
}
```

You can map these IDs and names directly to your internal Æon hue architecture.

---

### 2. Chromatext Renderer

`src/chromaRenderer.ts` exposes:

```ts
renderChromatext(text: string, options?: ChromatextOptions): string;
```

`ChromatextOptions`:

- `mode`: "inline" | "block" | "scroll"
- `baseHueId`: starting hue index (1–21)
- `cycleByWord`: if true, each word advances the hue
- `includeBackground`: if true, wraps text in a scroll-like block
- `fontFamily`: font stack for the rendered block

Result is a ready-to-embed HTML string.

---

### 3. SVG Braille

`src/svgBraille.ts` exposes:

```ts
renderBrailleRow(text: string, options?: BrailleOptions): string;
```

This returns a compact SVG line of braille-style cells, one per character.

> Note: This is a visual mapping, not a semantic braille translator. You can plug in a real mapping later if you want accurate braille semantics.

---

### 4. Æon Bridge

`src/aeonBridge.ts` provides a simple integration surface:

```ts
aeonChromaTransform(
  payload: { text: string; meta?: Record<string, unknown> },
  config?: AeonChromaConfig
): { html: string; svgBraille?: string };
```

You can call this from any agent / node that emits a text field and expects an HTML + SVG result to render in your UI.

---

## Example (Node / ts-node)

```ts
import { aeonChromaTransform } from "@aeon/aeon-chromalayer-integration";

const payload = {
  text: "Æon · Æon-Ourobouros · Æon-Nexus · ChromaLayer — chromatic integration online."
};

const result = aeonChromaTransform(payload, {
  chroma: { mode: "scroll", baseHueId: 4 },
  braille: { enabled: true, foreground: "#9B5DE5" }
});

console.log(result.html);
console.log(result.svgBraille);
```

---

## Python Bridge

If you want to call into chromatext from a Python-based system:

```py
from python import aeon_payload_to_chromatext

payload = {"text": "Hello from Æon + Python."}
out = aeon_payload_to_chromatext(payload)
print(out["html"])
```

---

## Next Steps (for you)

- Wire `aeonChromaTransform` into your Æon / Æon-Ourobouros logging & UI layer.
- Bind your existing 21-hue field semantics to the `DEFAULT_21_HUE_PALETTE`.
- Upgrade `svgBraille.ts` if you want precise braille encoding.
- Add more integration modules (React component wrapper, VSCode snippet renderer, etc.) as needed.

---

If you copy these files into a new folder, `git init`, commit, and push to GitHub, you’ve got a clean, personal **ChromaLayer integration repo** ready to hook into the rest of Æon.
