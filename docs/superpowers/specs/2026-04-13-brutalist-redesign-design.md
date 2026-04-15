# Personal Website Redesign — Swiss/Brutalist Editorial

## Context

The current site at amaingot.me is a digital business card on a blue gradient background. It works but looks generic. The goal is to make it visually striking and memorable while keeping the same single-screen, card-flip interaction model. The redesign adopts a Swiss/Brutalist typographic style — bold, confident, and distinctive.

## Design Decisions

- **Aesthetic**: Swiss/Brutalist — oversized sans-serif type, stark black/white/red, geometric precision
- **Layout**: Single-screen landing page with a centered flippable card
- **Card front**: Split layout — typography on the left, headshot photo on the right
- **Card back**: Dark (#1a1a1a) background with social links as bordered buttons
- **Background**: Warm off-white (#f8f7f5) with a subtle dot grid pattern (engineering graph paper nod)
- **Interaction**: Card flip with smooth, spring-physics animation (0.9s cubic-bezier)
- **Logo**: Simplified "AM." text mark with red period accent, top-left corner

## Visual Specification

### Typography
- **Font family**: Inter (replace Roboto and Source Code Pro)
- **Name**: 52px, weight 900, letter-spacing -2.5px, line-height 0.88
- **Role label**: 12px, weight 600, uppercase, letter-spacing 2.5px, color #666
- **Location**: 11px, color #999, letter-spacing 1px
- **Back title**: 28px, weight 800, white, letter-spacing -1px
- **Back subtitle**: 11px, uppercase, letter-spacing 2px, rgba(255,255,255,0.4)

### Colors
- **Background**: #f8f7f5 (warm off-white)
- **Dot grid**: #d0ccc6, 0.8px dots, 24px spacing
- **Card surface (front)**: #ffffff
- **Card surface (back)**: #1a1a1a
- **Primary text**: #1a1a1a
- **Accent**: #e63946 (red — used for accent bar, logo period, hover states, top line on back)
- **Bottom rule (front)**: 4px solid #1a1a1a
- **Top rule (back)**: 4px solid #e63946

### Card Dimensions & Shadow
- **Width**: 680px, **Height**: 380px (keeping similar proportions to current 40rem x 23rem)
- **Border radius**: 2px (sharp, brutalist)
- **Shadow**: Layered — `0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.04)`

### Card Front Layout
- Left side (~55%): Padded 48px, flex column, space-between
  - Top: Name (two lines), red accent bar (32x3.5px) + role label, location text
  - Bottom: "Connect →" button — black bg, white text, 12px uppercase, hover turns red with subtle lift
- Right side (~45%): Headshot photo, edge-to-edge, object-fit cover
- Bottom: 4px black rule spanning full width

### Card Back Layout
- Full dark background (#1a1a1a), padded 48px
- Top: 4px red accent line
- Header: "Let's connect." title + subtitle, with a bordered "←" flip-back button in top-right
- Bottom: Social link buttons — bordered (1px rgba white 0.15), 2px radius, hover border turns red with subtle red glow background and lift

### Logo
- "AM." in top-left, 14px weight 900, #1a1a1a, period in #e63946
- Replace the current full SVG LogoIcon

### Animations
- **Card entrance**: Fade in + translate up 30px + slight scale, 0.8s spring easing, on page load
- **Logo entrance**: Fade in + translate left, 0.6s ease, 0.3s delay
- **Card hover (front)**: Slight 5deg Y rotation + lift, 0.4s spring
- **Card flip**: 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Connect button hover**: Background to #e63946, lift 1px, arrow shifts right 3px
- **Social link hover**: Border color to #e63946, red glow bg, lift 2px

### Responsive Considerations
- Card should scale down on smaller screens (max-width: 90vw)
- On mobile (<640px), consider stacking the split layout vertically (photo on top, type below)
- Font sizes should scale proportionally

## Files to Modify

| File | Change |
|------|--------|
| `index.html` | Replace Roboto/Source Code Pro fonts with Inter from Google Fonts |
| `src/App.tsx` | New background (off-white + dot grid), replace LogoIcon with "AM." text mark |
| `src/components/BusinessCard.tsx` | Update card dimensions, shadow, border-radius, flip animation timing/easing |
| `src/components/BusinessCardFront.tsx` | Complete redesign: split layout, new typography, Connect button, bottom rule |
| `src/components/BusinessCardBack.tsx` | Dark background, red top accent, new social link buttons, "Let's connect." header |
| `src/utils/theme.ts` | Update Mantine theme: fontFamily to Inter, primary color to new red/black palette |

## What Stays the Same

- React + Vite + TypeScript + Mantine UI stack
- Card flip interaction mechanic (click to reveal social links)
- Same social links (LinkedIn, GitHub, X)
- Same headshot photo asset
- Sentry integration, Google Analytics
- Single-page app architecture

## Verification

1. Run `yarn dev` and open in browser
2. Verify: dot grid background renders correctly on the off-white base
3. Verify: card appears centered with entrance animation on page load
4. Verify: card front shows split layout — name/role/location on left, headshot on right
5. Verify: hovering the card produces subtle 3D tilt
6. Verify: clicking "Connect" or the card flips to dark back with smooth spring animation
7. Verify: back shows "Let's connect.", social links with hover effects, flip-back button
8. Verify: clicking "←" or card flips back to front
9. Verify: social links open correct URLs in new tab
10. Verify: responsive — card scales on narrow viewports, stacks on mobile
11. Run `yarn build` — no TypeScript or build errors
