from dataclasses import dataclass
from typing import Dict, Any, Optional

import html


@dataclass
class ChromatextConfig:
    mode: str = "scroll"  # "inline" | "block" | "scroll"
    include_background: bool = True
    cycle_by_word: bool = True


def _escape(text: str) -> str:
    return html.escape(text, quote=True)


def chroma_scroll(text: str, config: Optional[ChromatextConfig] = None) -> str:
    """
    Minimal Python-side chromatext renderer.
    This does not replicate the 21-hue cycling exactly — it's a
    simple placeholder you can later align with the TS implementation.
    """
    cfg = config or ChromatextConfig()
    words = text.split(" ")
    spans = " ".join(
        f'<span style="color:#FFD166; text-shadow:0 0 8px #FFD16666;">{_escape(w)}</span>'
        for w in words
    )
    bg = ""
    if cfg.include_background and cfg.mode != "inline":
        bg = "background:radial-gradient(circle at 50% 58%,#05050c 0%,#140d23 40%,#05050c 100%);"
    return (
        f'<div class="aeon-scroll" '
        f'style="{bg}padding:1.8em;border-radius:1.4em;line-height:1.9;'
        f'letter-spacing:.04em;box-shadow:inset 0 0 40px #FFD16633,'
        f'0 0 35px #43E97B22,0 0 26px #9B5DE544;color:#f5f5ff;">'
        f"{spans}</div>"
    )


def aeon_payload_to_chromatext(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generic "bridge" shape:
    input: { 'text': '...', 'meta': {...} }
    output: { 'html': '...' }
    """
    text = str(payload.get("text", ""))
    html_block = chroma_scroll(text)
    return {"html": html_block}
