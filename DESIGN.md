# Design Brief

## Direction

Yashraj Dance Studio Showcase — Dark luxury brand website with strategic blue-cyan to purple gradient accents reflecting logo identity. Premium, refined, dynamic movement aesthetic.

## Tone

Refined minimalism with intentional gradient threading. Not brutalist—poised, professional luxury with visual energy through accent color placement.

## Differentiation

Gradient text overlays on hero sections, subtle gradient hover overlays on gallery items, and consistent blue-purple accent threading creates visual cohesion with the logo without overuse.

## Color Palette

| Token      | OKLCH         | Role                                    |
|------------|---------------|-----------------------------------------|
| background | 0.12 0 0      | Near-black base, primary surface        |
| foreground | 0.92 0.01 240 | Cool white, text on dark                |
| card       | 0.16 0.015 260 | Raised surface for content              |
| primary    | 0.68 0.18 220 | Cyan-blue accent, CTAs, active states   |
| accent     | 0.62 0.2 290  | Purple complement, gradients            |
| muted      | 0.22 0.01 260 | Secondary surfaces, section dividers     |

## Typography

- Display: Space Grotesk — bold geometric headlines (h1–h3), modern dance studio aesthetic
- Body: Satoshi — clean humanist body text, labels, descriptions
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold uppercase tracking-widest`, body `text-base md:text-lg`

## Elevation & Depth

Layered surfaces: background (0.12) < muted (0.22) < card (0.16 + border). Subtle shadows on cards via `border border-border/50`, no drop shadows—depth through background color stratification.

## Structural Zones

| Zone    | Background        | Border               | Notes                          |
|---------|-------------------|----------------------|--------------------------------|
| Header  | bg-background/95  | border-b border-border/30 | Logo, nav, accent underline    |
| Hero    | bg-black/95       | —                    | Full-bleed, gradient text overlay |
| Content | bg-background     | —                    | Section alternation with muted |
| Gallery | bg-muted/20       | border border-border/50 | Cards with hover gradient      |
| Footer  | bg-muted/40       | border-t border-border/30 | Secondary nav, contact          |

## Spacing & Rhythm

Spacious density: section gaps `gap-12 md:gap-16`, card padding `p-6 md:p-8`, group spacing `space-y-6`. Micro-spacing (buttons, labels) uses `gap-2` and `space-y-1` for visual clarity.

## Component Patterns

- Buttons: `bg-gradient-primary` with rounded corners, hover opacity shift + scale
- Cards: `border border-border/50 rounded-lg p-6`, hover gradient overlay fade-in
- Badges: inline `px-3 py-1 rounded-full`, gradient background or muted background
- Gallery grid: 3-column responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

## Motion

- Entrance: Fade (0s → 1s opacity) + 20px slide-in via `animate-fade-in`, smooth easing 0.6s
- Hover: Button color shift 0.3s, card overlay fade 0.4s, text underline expand 0.3s
- Decorative: Subtle floating on hero image, pulsing accent on CTA

## Constraints

- All colors use OKLCH tokens (no raw hex or rgb)
- No full-page gradients—gradient threading only on text, buttons, and overlays
- Minimum 0.7 lightness difference between foreground and background (AA+ contrast)
- Shadow hierarchy: borders over drop-shadows, depth via layering
- Typography limited to Space Grotesk (display) + Satoshi (body) + JetBrains Mono (fallback)

## Signature Detail

Gradient-text hero headlines fade from cyan-blue to purple, creating a dynamic visual anchor that echoes the brand identity and differentiates the site from generic SaaS aesthetic.
