# Lidang Jiang Website Design System

## Visual Theme and Atmosphere

Quiet technical editorial design for a personal ML systems portfolio. The site should feel precise, spacious, and deliberately understated: generous whitespace, strong type hierarchy, hairline dividers, and restrained motion. It may borrow the discipline of premium hardware and software product pages, but it must remain an original personal identity rather than reproduce another company's brand.

The audience is split between recruiters and open-source peers. The interface should make the resume, projects, publications, and contact paths immediately legible without turning the homepage into a metrics dashboard.

## Color Palette and Roles

Light theme:

- `canvas`: `#F5F5F3` — page background.
- `surface`: `#FFFFFF` — navigation, repeated content surfaces, and elevated controls.
- `ink`: `#1D1F23` — headings and primary text.
- `muted`: `#656A73` — descriptions, metadata, and secondary labels.
- `line`: `#D9DDE3` — hairline dividers and component boundaries.
- `accent`: `#315F8C` — links, focus, active navigation, and primary actions only.
- `accent-soft`: `#E8EEF4` — selected filters and quiet action backgrounds.

Dark theme:

- `canvas`: `#0D0F12`.
- `surface`: `#15181C`.
- `ink`: `#F4F5F7`.
- `muted`: `#A8ADB5`.
- `line`: `#2B3037`.
- `accent`: `#8EB8DC`.
- `accent-soft`: `#1B2A38`.

Normal text must meet WCAG AA contrast. Color never carries state alone; selection and focus also use weight, shape, position, or an outline.

## Typography Rules

- Use the local system stack: `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `PingFang SC`, `Microsoft YaHei`, and `sans-serif`.
- Use one family for display and body text. Create hierarchy through size, weight, line height, and whitespace rather than mixing decorative families.
- Display text uses `-0.025em` to `-0.035em` tracking. Body text uses normal tracking.
- Body copy is 16px minimum with approximately 1.7 line height. Metadata may use 13–14px when contrast remains sufficient.
- Keep long-form paragraphs near 65–72 characters per line. Never scale type with viewport width.

## Component Styling

- Navigation is a thin translucent surface with a hairline boundary. Active routes use accent text plus a small positional marker, not a filled navigation pill.
- Primary buttons use the accent color with high-contrast text. Secondary buttons use a quiet surface and a hairline border.
- Buttons and icon controls have at least 44×44px hit areas, visible focus rings, and explicit accessible names.
- Cards are reserved for repeated content. Prefer flat lists, dividers, and grouped rows; never nest decorative cards.
- Use Lucide icons only. Icons are single-color and normally 16–20px; do not place every icon on a colored tile.
- Tags and filters may be pills. Ordinary links, section headings, and navigation items are not pills.
- Portraits use a stable vertical aspect ratio, a restrained radius, a hairline boundary, and declared dimensions.

## Layout Principles

- Use a 4/8px spacing foundation with key steps at 12, 16, 24, 32, 48, 72, and 96px.
- The content shell is approximately 1120px wide. Reading surfaces use narrower 720–800px measures.
- The homepage retains three regions only: hero, about, and collaboration. Do not add metrics or featured-work sections.
- Desktop hero layout is a two-column editorial composition; mobile stacks without changing content order or hiding essential actions.
- Projects, publications, and CV pages use stable list and timeline patterns. Dates and metadata align predictably and wrap before truncating.

## Depth and Elevation

- Use one subtle shadow scale only, approximately `0 16px 40px rgba(15, 23, 42, 0.08)` in light mode and a lower-opacity equivalent in dark mode.
- Elevation is reserved for the fixed navigation, open mobile navigation, and genuinely raised controls.
- Most content surfaces use borders or background contrast rather than shadows.
- Avoid glass panels inside glass panels, colored glows, blurred gradient orbs, and dramatic hover elevation.

## Do and Don't

Do:

- Lead with the person's real portrait and role.
- Keep resume and project actions visible in the first viewport.
- Use whitespace and typography as the primary visual devices.
- Preserve bilingual text wrapping and long technical names.
- Provide hover, active, focus, expanded, and reduced-motion states.

Don't:

- Reproduce Apple assets, exact page compositions, or trademarked visual identity.
- Use generic blue/purple AI gradients, neon glows, or fake terminal decoration.
- Turn each sentence or metadata field into a card.
- Hide navigation or project details behind hover-only behavior.
- Use emoji as interface icons.

## Responsive Behavior

- Verify at 375, 768, 1024, and 1440px.
- At 375px there must be no horizontal scroll. Long emails, URLs, project titles, and dates wrap safely.
- Navigation collapses below the desktop breakpoint. The mobile panel exposes all links, language switching, and theme control with keyboard support.
- Two-column hero, information, and capability grids collapse to one column where their content would become cramped.
- Touch targets remain at least 44px and spacing prevents accidental activation.
- Animations use transform and opacity, last 180–300ms, move no more than 4px, and are disabled or reduced under `prefers-reduced-motion`.

## Agent Prompt Guide

When editing this site, preserve the quiet technical editorial direction. Reuse semantic theme tokens, the system font stack, Lucide icons, hairline dividers, and the existing Vue/Tailwind architecture. Prefer fewer surfaces and clearer hierarchy over new decoration. Test both languages, both themes, keyboard focus, reduced motion, and widths of 375, 768, 1024, and 1440px. Do not add a homepage metrics or featured-work section unless the product decision changes explicitly.
