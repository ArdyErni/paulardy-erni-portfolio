# Design System

This document defines the visual language of the Ardy Portfolio.

Every interface should follow these guidelines to maintain consistency across the application.

---

# Design Philosophy

The portfolio should feel like a modern SaaS application rather than a personal website.

The overall experience should communicate:

- Professionalism
- Technical confidence
- Simplicity
- Precision
- Efficiency

Visual design should support the content instead of competing with it.

Every component should feel intentional.

---

# Design Principles

## Clarity First

Information should always be easier to understand than it is to admire.

Avoid unnecessary visual effects that reduce readability.

---

## Consistency

Components should behave consistently throughout the application.

Buttons, cards, badges, spacing, and typography should always follow the same patterns.

---

## Minimal but Not Empty

Whitespace is part of the design.

Allow content room to breathe.

Avoid filling space simply because it exists.

---

## Progressive Disclosure

Only show the information users need first.

Additional details should be accessible through interactions such as modals, tabs, or expandable sections.

---

## Motion with Purpose

Animations should improve navigation and understanding.

Never animate purely for decoration.

---

# Color Palette

## Primary

Green

```
#00BF63
```

Used for:

- Primary buttons
- Active navigation
- Highlights
- Important actions

---

## Secondary

Lime

```
#84ED48
```

Used sparingly for:

- Accents
- Success indicators
- Decorative highlights

---

## Background

```
#F3FCF6
```

Primary application background.

---

## Surface

```
#FFFFFF
```

Cards

Modals

Navigation

Dropdowns

---

## Text

Primary

```
#333333
```

Secondary

```
#666666
```

Muted

```
#999999
```

---

## Borders

```
#E5E7EB
```

Should remain subtle.

---

## Status Colors

Success

```
#22C55E
```

Warning

```
#F59E0B
```

Error

```
#EF4444
```

Info

```
#3B82F6
```

---

# Typography

Primary Font

Inter

Fallback

sans-serif

---

## Heading Scale

H1

48px

Bold

H2

36px

SemiBold

H3

28px

SemiBold

H4

22px

Medium

---

## Body Text

Large

18px

Regular

Default

16px

Regular

Small

14px

Regular

Caption

12px

Medium

---

# Spacing System

Use an 8-point spacing system.

```
4px
8px
16px
24px
32px
48px
64px
96px
```

Avoid arbitrary spacing values.

---

# Border Radius

Small

8px

Medium

16px

Large

24px

Extra Large

32px

Cards should primarily use:

```
rounded-3xl
```

---

# Shadows

Level 1

Subtle card elevation.

Level 2

Hover state.

Level 3

Modals only.

Avoid harsh shadows.

---

# Icons

Use Lucide icons throughout the application.

Icons should remain:

- Simple
- Consistent
- Line-based

Avoid mixing icon libraries.

---

# Buttons

## Primary

Solid green background.

White text.

Rounded.

Hover elevation.

---

## Secondary

White background.

Green border.

Green text.

---

## Ghost

Transparent.

Used inside navigation or toolbars.

---

## Icon Buttons

Square.

Equal padding.

Clear hover feedback.

---

# Cards

Cards are the primary information container.

Cards should include:

- White background
- Rounded corners
- Soft shadow
- Thin border
- Comfortable padding

Cards should never feel cramped.

---

# Badges

Used for:

- Technologies
- Categories
- Status
- Skills

Badges should remain small and readable.

Avoid oversized pills.

---

# Navigation

Sticky.

Slight background blur.

Visible active indicator.

Minimal height.

Should never dominate the page.

---

# Section Width

Maximum content width

```
1280px
```

Centered.

Large screens should prioritize readability over filling available space.

---

# Animations

Animation library

Framer Motion

---

## Duration

Fast

150ms

Normal

250ms

Slow

350ms

---

## Easing

Use smooth easing.

Avoid bounce animations.

---

## Hover

Cards

Slight lift

Small shadow increase

Buttons

Small scale increase

Navigation

Subtle highlight

---

## Page Transition

Fade

-

Slide

Should feel immediate.

---

## Modal

Fade in

Scale from 98%

Fade out

Scale to 98%

---

# Responsive Breakpoints

Mobile

640px

Tablet

768px

Laptop

1024px

Desktop

1280px

Wide

1536px

Layouts should adapt naturally between breakpoints.

---

# Accessibility

Maintain sufficient color contrast.

Interactive elements must include visible focus states.

Animations should respect reduced-motion preferences.

Interactive targets should remain touch-friendly.

---

# Component Philosophy

Every component should answer one question:

"What is its single responsibility?"

Avoid large, multipurpose components.

Favor composition.

Reuse components whenever possible.

A new component should only be created when an existing one cannot reasonably be extended.

---

# Overall Visual Identity

The portfolio should resemble products such as:

- Vercel
- Linear
- Raycast
- Supabase

Characteristics include:

- Clean layouts
- Excellent spacing
- Soft depth
- Purposeful motion
- Strong typography
- Minimal visual noise

The interface should feel polished, modern, and quietly confident rather than flashy.
