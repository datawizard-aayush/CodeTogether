# COLABZ — FRONTEND DESIGN SYSTEM & 3D CREATIVE DIRECTION

> **Brand Concept**: "BUILD IN MOTION"  
> **Visual Identity**: Bold, Cinematic, Technical, Interactive, Premium, Gen-Z  
> **Typography**: Geist (Primary UI) & Geist Mono (Technical Data & Code)

---

## 1. CREATIVE DIRECTION: "BUILD IN MOTION"

Colabz is not just another SaaS dashboard. It represents the living journey of developer teamwork:

```text
People  ──>  Ideas  ──>  Projects  ──>  Code  ──>  Collaboration  ──>  Ship
```

The entire visual system communicates **movement, connectivity, and continuous building**. Objects connect via data pipelines, particle streams move toward project nodes, and real-time activity glows across a dark technical canvas.

---

## 2. COLOR SYSTEM (DARK-FIRST THEME)

The palette uses a deep dark neutral foundation with a signature electric violet `#8B7CFF` accent. Colors serve as high-contrast highlights inside a dark workspace.

### Base Surfaces
- `bg-base` (`#07080A`): Ultra-dark deep void canvas.
- `bg-surface` (`#0B0D10`): Main spatial panels & sidebar.
- `bg-elevated` (`#111318`): Floating cards, modals, dropdowns.
- `bg-input` (`#171A20`): Input fields & interactive code slots.

### Typography & Text Tokens
- `text-primary` (`#F5F5F3`): High-clarity off-white for headlines and primary text.
- `text-secondary` (`#A5A9B1`): Muted slate gray for secondary labels and descriptions.
- `text-muted` (`#686D76`): Dimmed technical captions and placeholders.

### Signature Accents
- **Primary Accent** (`#8B7CFF`): Electric Violet (CTA buttons, active nodes, focus rings).
- **Secondary Accent** (`#5EA1FF`): Cyber Blue (Repository branches & connection lines).
- **Success** (`#3DDB82`): Emerald Green (Online presence, completed tasks).
- **Danger** (`#FF5C70`): Crimson Red (Urgent issues, error notifications).

---

## 3. TYPOGRAPHY SYSTEM

We strictly use **Geist** for interface headings and body text, and **Geist Mono** for code, IDs, branches, and technical metadata.

```css
/* Font Families */
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'Geist Mono', 'Fira Code', monospace;
```

### Type Levels
- **Editorial Hero**: `3rem` to `4.5rem` (Geist 800 ExtraBold, letter-spacing `-0.04em`).
- **Page Headline (H1)**: `2.25rem` (Geist 700 Bold).
- **Section Title (H2)**: `1.5rem` (Geist 600 SemiBold).
- **Subheading (H3)**: `1.15rem` (Geist 600 SemiBold).
- **Body Text**: `0.9375rem` (Geist 400 Regular).
- **Monospace Code/Tag**: `0.8125rem` (Geist Mono 500 Medium).

---

## 4. 3D VISUAL LANGUAGE: PROJECT UNIVERSE

3D elements in Colabz are intentional representations of real-time software engineering:

### "Project Universe" Scene
- **Central Project Node**: A floating, rotating 3D polyhedron (Icosahedron/Octahedron) representing the core repository.
- **Developer Nodes**: Spherical node points surrounding the project node representing active team members.
- **Data Lines & Flow Particles**: Animated geometric connections carrying glowing energy particles toward the project center.
- **Mouse Parallax & Raycasting**: Camera responds smoothly to cursor position, and nodes illuminate on hover with interactive telemetry tooltips.

---

## 5. MOTION SYSTEM & ANIMATION PRESETS

Motion communicates state changes and data flow without cluttering the screen.

```javascript
// Motion Presets (Framer Motion)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }
};
```

---

## 6. SPATIAL DESIGN & LAYOUT GUIDELINES

- **Open Space Over Card Clutter**: Avoid filling the dashboard with 20 identical cards. Use thin technical borders (`1px solid #171A20`), subtle grid backgrounds, and open typography.
- **Focus Rings & Accessibility**: Interactive elements feature a prominent `#8B7CFF` focus glow for keyboard navigation (`Tab`).
- **Reduced Motion**: All 3D rotations and Framer Motion transitions respect `prefers-reduced-motion: reduce`.
