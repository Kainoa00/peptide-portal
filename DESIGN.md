# Design System: PeptidePortal

## 1. Visual Theme & Atmosphere

PeptidePortal presents a **clinical-luxury** aesthetic — the visual confidence of a premium wellness brand underpinned by medical credibility. The atmosphere is warm, calm, and deliber
 dark-gold text and semibold weight.
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
