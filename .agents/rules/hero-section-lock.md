# Hero Section Preservation Rule

## CRITICAL USER INSTRUCTION
The Hero Section in `src/components/HeroSection.tsx` is **STRICTLY LOCKED**.
Never modify the hero section when making styling, typography, layout, or component changes across the website.

### Locked Specifications for `HeroSection.tsx`:
1. **Fonts & Typography**:
   - Destination title (`INDIA`, `KERALA`, `KASHMIR`): Playfair Display Regular (`font-serif font-playfair font-normal 400`) in `text-[#f7f5f0]` with custom wide tracking.
   - Subtitle: `Discover [Destination], Your Way` in Playfair Display Regular (`font-serif font-playfair font-normal 400`) in `text-[#f7f5f0]/95`.
   - CTA button: Thin white/gold rectangular bordered box (`rounded-none border border-white/70 hover:border-[#dcb037] bg-black/30 hover:bg-[#dcb037] font-serif font-playfair font-normal tracking-widest`).
2. **Carousel & Archway Framing**:
   - Background images framed by archways with smooth horizontal gliding transitions.
   - Bottom center carousel controls (`<`, active gold pill indicator, dots, `>`).
3. **Isolation**:
   - Even if global fonts (`--font-serif` or `--font-sans` or body font) are altered for other sections, the Hero Section must ALWAYS remain untouched and explicitly styled with Playfair Display 400.
