"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aeonChromaTransform = aeonChromaTransform;
const chromaRenderer_1 = require("./chromaRenderer");
const svgBraille_1 = require("./svgBraille");
/**
 * High-level integration surface: give it a message,
 * get back chromatext HTML + optional SVG braille.
 */
function aeonChromaTransform(payload, config = {}) {
    var _a;
    const html = (0, chromaRenderer_1.renderChromatext)(payload.text, {
        mode: "scroll",
        baseHueId: 1,
        cycleByWord: true,
        includeBackground: true,
        ...config.chroma
    });
    const svgBraille = ((_a = config.braille) === null || _a === void 0 ? void 0 : _a.enabled)
        ? (0, svgBraille_1.renderBrailleRow)(payload.text, config.braille)
        : undefined;
    return { html, svgBraille };
}
