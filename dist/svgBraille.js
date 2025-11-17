"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderBrailleRow = renderBrailleRow;
/**
 * Render a line of "braille-style" cells for a string.
 * NOTE: This is a *visual* braille-style pattern, not a semantic translation.
 */
function renderBrailleRow(text, options = {}) {
    const { dotRadius = 3, dotSpacing = 6, cellPadding = 6, rowSpacing = 12, foreground = "#FFD166", background = "none" } = options;
    const cols = text.length;
    const dotsPerCol = 2; // columns (left/right) in braille cell
    const dotsPerRow = 3; // rows
    const cellWidth = dotsPerCol * dotSpacing + 2 * cellPadding;
    const cellHeight = dotsPerRow * dotSpacing + 2 * cellPadding;
    const width = cols * cellWidth;
    const height = cellHeight + rowSpacing * 2;
    let circles = "";
    text.split("").forEach((ch, i) => {
        var _a;
        if (ch === " ")
            return;
        // Pseudo-random pattern per char code, coherent across runs
        const code = (_a = ch.codePointAt(0)) !== null && _a !== void 0 ? _a : 0;
        for (let row = 0; row < dotsPerRow; row++) {
            for (let col = 0; col < dotsPerCol; col++) {
                const bitIndex = row * dotsPerCol + col;
                const enabled = ((code >> bitIndex) & 1) === 1;
                if (!enabled)
                    continue;
                const cx = i * cellWidth +
                    cellPadding +
                    col * dotSpacing +
                    dotRadius;
                const cy = rowSpacing +
                    cellPadding +
                    row * dotSpacing +
                    dotRadius;
                circles += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${foreground}" />`;
            }
        }
    });
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <rect x="0" y="0" width="${width}" height="${height}" fill="${background}" />
  ${circles}
</svg>
  `.trim();
}
