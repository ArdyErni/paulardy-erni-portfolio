# Wireframes

This document provides low-fidelity wireframes for the Ardy Portfolio.

These wireframes define layout, hierarchy, and component placement—not final visual styling.

The design system should determine the final appearance.

---

# Global Layout

Desktop

```
┌────────────────────────────────────────────────────────────────────┐
│ Logo                                               Contact Button │
│ Profile | Expertise | Projects | Services                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                    Active View Container                           │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ Footer                                                             │
└────────────────────────────────────────────────────────────────────┘
```

Navigation remains visible.

Only the content area changes.

---

Mobile

```
┌────────────────────────────┐
│ Logo          Menu ☰       │
├────────────────────────────┤
│                            │
│ Active View                │
│                            │
├────────────────────────────┤
│ Footer                     │
└────────────────────────────┘
```

Navigation becomes a drawer.

---

# View 1 — Profile

Purpose

Introduce who I am within the first 15 seconds.

---

Desktop Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ Hero                                      Profile Image           │
│                                                             │
│ Name                                                        │
│ Title                                                       │
│ Short Introduction                                          │
│                                                             │
│ Resume  GitHub  LinkedIn                                   │
├────────────────────────────────────────────────────────────────────┤
│ Current Focus Cards                                          │
├────────────────────────────────────────────────────────────────────┤
│ Quick Facts                                                  │
├────────────────────────────────────────────────────────────────────┤
│ Education & Certifications                                  │
└────────────────────────────────────────────────────────────────────┘
```

---

Mobile

```
Profile Image

Name

Title

Introduction

Buttons

Current Focus

Quick Facts

Education

Certifications
```

---

Interaction Notes

- CTA buttons animate on hover.
- Current Focus cards highlight on hover.
- Resume opens in a new tab.
- Social icons remain visible.

---

# View 2 — Expertise

Purpose

Show how I solve technical problems.

---

Desktop Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ Featured Project Screenshot                                      │
├────────────────────────────────────────────────────────────────────┤
│ Project Summary                                                  │
│ Problem                                                          │
│ Solution                                                         │
│ Results                                                          │
├────────────────────────────────────────────────────────────────────┤
│ Technical Expertise                                              │
│                                                                  │
│ Frontend      Backend                                            │
│ Database       AI                                                │
│ Automation    Cloud                                              │
├────────────────────────────────────────────────────────────────────┤
│ Development Philosophy                                           │
└────────────────────────────────────────────────────────────────────┘
```

---

Mobile

```
Featured Project

Summary

Problem

Solution

Results

Technology Categories

Development Philosophy
```

---

Interaction Notes

- Featured project image enlarges slightly on hover.
- Technology badges remain static.
- Sections animate upward when loaded.

---

# View 3 — Projects

Purpose

Allow visitors to explore previous work.

---

Desktop Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ Search                                                    Filter │
├────────────────────────────────────────────────────────────────────┤
│ Category Chips                                                 │
├────────────────────────────────────────────────────────────────────┤
│ □ Card     □ Card     □ Card                                  │
│                                                              │
│ □ Card     □ Card     □ Card                                  │
│                                                              │
│ □ Card     □ Card     □ Card                                  │
└────────────────────────────────────────────────────────────────────┘
```

---

Project Card

```
Thumbnail

Status Badge

Project Name

Short Description

Technology Badges

View Details →
```

---

Project Modal

```
Large Screenshot

Title

Description

Problem

Solution

Architecture

Features

Technology Stack

GitHub

Live Demo
```

---

Mobile

Cards become one-column.

Search remains at top.

Filters become horizontally scrollable.

---

Interaction Notes

- Instant filtering.
- Search updates live.
- Clicking a card opens a modal.
- Closing returns user to previous scroll position.

---

# View 4 — Services

Purpose

Translate technical expertise into business solutions.

---

Desktop Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ Service Cards                                                   │
│ □ AI Automation                                                 │
│ □ Backend Systems                                               │
│ □ Internal Tools                                                │
│ □ Full-Stack Development                                        │
├────────────────────────────────────────────────────────────────────┤
│ Development Process                                             │
│ Discover → Design → Build → Deploy                             │
├────────────────────────────────────────────────────────────────────┤
│ Ready to Build Something?                                      │
│ Contact Button                                                 │
└────────────────────────────────────────────────────────────────────┘
```

---

Mobile

```
Service Card

Service Card

Service Card

Process

CTA
```

---

Interaction Notes

Cards elevate slightly on hover.

CTA button receives primary emphasis.

---

# Footer

```
Copyright

Built with

Next.js • TypeScript • Tailwind CSS

GitHub

LinkedIn
```

Keep minimal.

---

# Shared Components

Every view may reuse:

- Navbar
- Buttons
- Cards
- Badges
- Modal
- Tags
- Section Headers
- Social Icons
- CTA Buttons

Avoid duplicate implementations.

---

# Navigation Flow

```
Profile

↓

Expertise

↓

Projects

↓

Services
```

Views replace the main content area using animated transitions.

Navigation should feel immediate and smooth.

---

# Animation Map

Navigation

Fade + Slide

Cards

Lift

Buttons

Scale

Modal

Fade + Scale

Search

Instant

Filters

Fade

View Transition

AnimatePresence

Duration

250–300ms

All animations should remain subtle and support usability.
