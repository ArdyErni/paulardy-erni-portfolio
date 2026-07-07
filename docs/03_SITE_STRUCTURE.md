# Site Structure

This document defines the information architecture, layout hierarchy, and interaction behavior of the portfolio.

The portfolio behaves as a single-page application where navigation switches between application views instead of scrolling through long sections.

Every view has a clear purpose and should focus on answering a specific visitor question.

---

# Overall Application Layout

```
┌─────────────────────────────────────────────┐
│ Navbar                                      │
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│         Active View Container               │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ Footer                                      │
└─────────────────────────────────────────────┘
```

The Navbar remains visible at all times.

Only the main content area changes when switching views.

View transitions should use Framer Motion.

---

# Navigation

The application consists of four primary views.

- Profile
- Expertise
- Projects
- Services

Navigation should feel similar to switching pages inside a desktop application.

The active page should always be visually indicated.

Navigation should support:

- Mouse
- Keyboard
- Touch

---

# View 1 — Profile

## Purpose

Introduce who I am.

This view should establish credibility within the first few seconds.

Visitors should immediately understand:

- Who I am
- What I specialize in
- Where I am currently focused

---

## Layout

```
Hero

↓

Current Focus

↓

Quick Facts

↓

Education & Certifications

↓

Social Links
```

---

## Components

### Hero

Contains:

- Name
- Professional Title
- Short introduction
- Resume button
- GitHub
- LinkedIn
- Profile image

---

### Current Focus

Displays what I currently enjoy building.

Example topics:

- AI Automation
- Backend Systems
- Workflow Automation
- Full-Stack Applications

---

### Quick Facts

Small highlight cards.

Examples:

- BSIT Graduate
- Dean's Lister
- Full Stack Developer
- AI Automation Engineer

---

### Education & Certifications

Compact timeline or card layout.

Should not dominate the page.

---

### Social Links

Simple icon buttons.

Keep minimal.

---

# View 2 — Expertise

## Purpose

Demonstrate how I solve problems.

This section is about engineering capability—not employment history.

---

## Layout

```
Featured Project

↓

Impact

↓

Technical Expertise

↓

Development Philosophy
```

---

## Components

### Featured Project

One flagship project.

Large preview image.

Includes:

- Problem
- Solution
- Architecture
- Technologies
- Results

---

### Impact

Instead of arbitrary skill percentages.

Highlight measurable outcomes.

Examples:

- Digitized manual workflow
- Reduced administrative workload
- Automated reporting
- Integrated AI assistance

---

### Technical Expertise

Grouped technologies.

Suggested categories:

Frontend

Backend

Databases

Automation

Cloud

AI

Dev Tools

Avoid progress bars.

Use technology badges.

---

### Development Philosophy

Brief section describing how I approach software engineering.

Topics may include:

- Scalability
- Maintainability
- Simplicity
- User-centered design

---

# View 3 — Projects

## Purpose

Allow visitors to browse my work.

Projects should demonstrate versatility without overwhelming the user.

---

## Layout

```
Search

↓

Category Filters

↓

Project Grid

↓

Project Modal
```

---

## Components

### Search

Live filtering.

Search by:

- Title
- Technology
- Category

---

### Filters

Examples:

- All
- Web
- AI
- Automation
- Open Source

---

### Project Grid

Responsive cards.

Each card displays:

- Thumbnail
- Title
- Category
- Short description
- Technologies
- Status

---

### Project Modal

Selecting a project opens a modal instead of navigating away.

Contents:

- Gallery
- Description
- Problem
- Solution
- Features
- Architecture
- Tech Stack
- GitHub
- Live Demo

---

# View 4 — Services

## Purpose

Translate technical expertise into business value.

Answer the question:

"What can Paul build for us?"

---

## Layout

```
Services

↓

Development Process

↓

Call to Action
```

---

## Components

### Services

Each service is presented as a card.

Suggested services:

- AI Automation
- Internal Tools
- Full-Stack Development
- API Development
- Backend Systems
- Workflow Automation

Each card includes:

- Description
- Deliverables
- Technologies

---

### Development Process

Simple four-step process.

Example:

Discover

↓

Design

↓

Build

↓

Deploy

---

### Call to Action

Friendly invitation to collaborate.

Should include:

- Email
- LinkedIn
- GitHub
- Resume

Keep concise.

---

# Footer

Minimal.

Contains:

- Copyright
- Built with
- Social Links

Avoid large footers.

---

# Global Components

These components may appear across multiple views.

- Navbar
- Section Header
- Primary Button
- Secondary Button
- Card
- Badge
- Tag
- Modal
- Search Input
- Filter Chips
- Technology Badge
- Social Icon Button

All shared components should remain reusable.

---

# Responsive Behavior

Desktop

Primary experience.

Navigation displayed horizontally.

---

Tablet

Reduce spacing.

Maintain same navigation.

---

Mobile

Collapse navigation into a drawer.

Views remain identical.

Avoid removing content.

---

# Interaction Guidelines

Navigation transitions:

- Fade
- Slide

Cards:

- Lift slightly on hover

Buttons:

- Scale subtly

Modals:

- Fade and scale

Search:

- Filter instantly

Animations should remain fast and unobtrusive.

---

# Future Expansion

The architecture should support future additions without restructuring.

Possible future views include:

- Experience
- Blog
- Case Studies
- Open Source
- Writing
- Testimonials

These should integrate into the navigation without requiring major layout changes.
