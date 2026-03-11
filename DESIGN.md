# Design System: PeptidePortal

## 1. Visual Theme & Atmosphere

PeptidePortal presents a **clinical-luxury** aesthetic — the visual confidence of a premium wellness brand underpinned by medical credibility. The atmosphere is warm, calm, and deliberately understated: sage-tinted whites, generous whitespace, and organic curves suggest a space that is both trustworthy and aspirational. The goal is to make telehealth peptide therapy feel approachable, never intimidating.

Surfaces are layered with subtle depth — light shadows, frosted-glass header bars, and soft border separations — rather than hard contrasts or bold color blocks. Photography features warm-toned lifestyle imagery (exercise, nature, focus) to reinforce the "results you can feel" narrative. Every element should breathe; crowded layouts undermine the premium positioning.

## 2. Color Palette & Roles

| Token           | Value       | Role                                                                 |
|-----------------|-------------|----------------------------------------------------------------------|
| Background      | `#F6F8F6`   | Warm barely-there sage. The canvas for all public and dashboard pages. Feels organic without being green. |
| Dark Background | `#152111`   | Deep forest green-black. Used for high-contrast sections (How It Works, footer) to create rhythm and gravitas. |
| Surface         | `#FFFFFF`   | Pure white cards, panels, and input fields. Provides lift against the sage canvas. |
| Surface 2       | `#F1F4F0`   | A half-step darker than background. Used for inset areas, code blocks, and secondary containers. |
| Surface 3       | `#E8EDE8`   | Subtle divider fills and scrollbar tracks. Never a background for text-heavy areas. |
| Text Primary    | `#131811`   | Near-black with a green undertone. All headings and body copy. |
| Text Muted      | `#6B7280`   | Descriptions, helper text, timestamps. Passes 4.5:1 contrast on white. |
| Text Subtle     | `#9CA3AF`   | Placeholders, fine-print disclaimers. Use sparingly — only on white backgrounds where contrast is sufficient. |
| Accent (Gold)   | `#D4A574`   | The signature warm gold. Primary buttons, active states, progress bars, and trust markers. Evokes warmth and premium quality. |
| Accent Dark     | `#B8864A`   | Hover state for gold elements and high-emphasis badge text. |
| Accent Light    | `#F5F0E8`   | Tinted background for gold badges, active nav items, and recommendation highlights. |
| Border          | `#E5E7EB`   | Default card and input borders. Subtle enough to separate without distracting. |
| Border Hover    | `#D1D5DB`   | Border on hover for interactive cards and inputs. |
| Success         | Green 50/700 (`bg-green-50 text-green-700`) | Active badges, approval states. |
| Warning         | Amber 50/700 (`bg-amber-50 text-amber-700`) | Pending review, shipment in transit. |
| Danger          | Red 600/700  | Error messages, cancel/destructive actions. |

**Why gold instead of teal/green?** Gold signals premium, personalized care — differentiating from generic telehealth blues and clinical greens. It pairs naturally with the sage background and forest-dark sections.

## 3. Typography Rules

- **Display font:** Playfair Display (`.font-display` / `font-serif`). Used for hero headlines, section titles, and decorative flourishes. Always `font-normal` (weight 400) to maintain elegance — bold Playfair loses its refinement.
- **Body font:** Manrope (default on `body`). A geometric sans-serif with friendly rounded terminals. Used for all UI text, buttons, labels, and body copy.
- **Minimum body size:** 16px (1rem). Never go below 14px except for fine-print legal disclaimers and timestamps.
- **Line heights:** Body text at 1.5 to 1.75 (`leading-relaxed`). Display headings at 1.1 (`leading-tight`).
- **Letter spacing:** Display headings use `tracking-tight`. Uppercase labels use `tracking-widest`.
- **Text wrapping:** Use `text-balance` on headlines and `text-pretty` on paragraphs to prevent orphans.

## 4. Component Stylings

### Buttons
- **Primary (gold pill):** Rounded-full, gold background, white text, semibold. Hover darkens to accent-dark. Always `cursor-pointer`. Minimum touch target 44px height.
  `px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer`
- **Secondary (ghost pill):** Rounded-full, white/transparent with border. Hover tints border gold.
  `px-6 py-3 rounded-full border border-[#E5E7EB] text-[#131811] font-semibold hover:border-[#D4A574] transition-colors duration-200 cursor-pointer`
- **Danger:** Same pill shape, red background.
  `px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 cursor-pointer`
- **Disabled state:** `opacity-60 cursor-not-allowed`

### Cards
White surface, generous radius (2xl = 16px), subtle shadow. Hover lifts shadow for interactive cards.
`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`

### Forms
- **Input:** Full-width, comfortable padding, rounded-xl, single border. Focus replaces border color with gold and adds a faint gold ring.
  `w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors`
- **Label:** Above input, small and medium-weight. Always use `htmlFor` to associate with the input.
  `block text-sm font-medium text-[#131811] mb-1.5`
- **Error:** Red text below input. `text-sm text-red-600 mt-1`
- **Helper:** Muted text below input. `text-sm text-[#6B7280] mt-1`

### Navigation (Dashboard Sidebar)
- **Active link:** Warm accent-light background with dark-gold text and semibold weight.
  `bg-[#F5F0E8] text-[#B8864A] font-semibold`
- **Inactive link:** Muted text, subtle hover highlight.
  `text-[#6B7280] hover:bg-[#F6F8F6] hover:text-[#131811]`
- **All nav links:** Flex row with icon, consistent padding and radius.
  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200 cursor-pointer`

### Status Badges
- **Active/Success:** `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700`
- **Pending:** `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700`
- **Inactive:** `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F6F8F6] text-[#6B7280]`

### FAQ Accordion
Border-bottom separated items. Button toggles Plus/Minus SVG icons (from lucide-react). Answer animates open/closed with Framer Motion `AnimatePresence`. Gold accent on icon and hover state.

## 5. Layout Principles

- **Container width:** `max-w-6xl` (72rem) for content, `max-w-7xl` (80rem) for full-width sections with imagery.
- **Section padding:** `py-20 md:py-28` on public marketing sections. `py-12 md:py-16` on dashboard content areas.
- **Horizontal padding:** `px-4 sm:px-6 lg:px-8` — never less than 16px on mobile.
- **Mobile-first:** All layouts start as single-column stacks and expand via `md:` and `lg:` breakpoints.
- **Dashboard layout:** Fixed sidebar (64px header + 240px sidebar on desktop), bottom tab bar on mobile (max 5 items). Main content scrolls independently.
- **Auth pages:** Centered card on the sage background. `min-h-screen flex items-center justify-center py-12`.

## 6. Animation & Motion

- **Entrance animations:** Framer Motion `useInView` with `once: true`. Fade-up (20px) over 500ms, easeOut. Stagger children by 50-100ms.
- **Micro-interactions:** CSS `transition-all duration-200` or `duration-300` for hover effects (shadow lifts, color changes, border highlights).
- **Accordion:** Height auto-animate with 250ms easeOut via Framer Motion.
- **Reduced motion:** Respected via `prefers-reduced-motion: reduce` media query — all animations collapse to near-instant.
- **Scroll behavior:** Smooth scrolling on `html` element, but only when user has no reduced-motion preference.
- **Timing principle:** Enter with ease-out (decelerating), exit with ease-in (accelerating). Never exceed 300ms for UI feedback; 500-700ms for scroll-reveal entrances.

## 7. Page-Specific Notes

### Landing Page (`app/page.tsx`)
The most polished page — serves as the reference implementation. Uses Framer Motion, ScrollReveal wrapper, full design token system. All other pages should converge toward this standard.

### Catalog Pages
Cards should maintain equal height via `flex flex-col` with `flex-1` on the description area. Category filter pills follow the active/inactive pattern: gold fill for active, bordered ghost for inactive. Must include an empty-state message when no results match.

### Quiz Flow
Progress bar at the top (1px track with gold fill). Option cards need visible `:focus-visible` rings for keyboard navigation. Step transitions should feel directional (slide or fade). Results page uses the card system with a "Top recommendation" highlight badge.

### Auth Pages (Login/Signup)
Centered card layout. Logo lockup at top. All form fields use the design-system input styles. Submit button is full-width primary pill. Social proof snippet ("Join 4,200+ patients") reinforces trust. Provider login link is secondary/subtle.

### Patient Dashboard
Sidebar navigation with icon + label. Active state uses accent-light background. Sign-out at bottom of sidebar. Mobile gets a fixed bottom tab bar. Each page has a consistent header: uppercase kicker label, large display title, optional subtitle.

### Provider Pages
Mirror the patient auth flow but with "Provider" branding badges. The provider landing page reuses the public navbar and dark-section footer pattern. Dashboard uses data tables with status badges and approve/deny action buttons.

### Legal Pages (HIPAA, Privacy, Terms)
Consistent logo bar header with "Back to home" link. Narrow content column (`max-w-3xl`). Section headings are h2 with bottom border separator. Body text in muted color with generous line-height. No marketing CTAs — purely informational.
