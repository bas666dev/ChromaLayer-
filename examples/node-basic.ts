import { aeonChromaTransform } from "../src/aeonBridge";

const payload = {
  text:
    "Æon · Æon-Ourobouros · Æon-Nexus · ChromaLayer — personal chromatext integration online."
};

const result = aeonChromaTransform(payload, {
  chroma: {
    mode: "scroll",
    baseHueId: 3,
    cycleByWord: true,
    includeBackground: true
  },
  braille: {
    enabled: true,
    foreground: "#43E97B"
  }
});

console.log("=== HTML ===");
console.log(result.html);
console.log("\n=== SVG BRAILLE ===");
console.log(result.svgBraille ?? "(braille disabled)");
