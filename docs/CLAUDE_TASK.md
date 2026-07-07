# Portfolio Redesign Implementation Task

## Overview

You are responsible for implementing the redesign of the existing Ardy Portfolio.

This is **not** a new project. The goal is to refactor and improve the existing portfolio while preserving its current visual identity. The redesign focuses on improving the application's information architecture, navigation, component organization, and maintainability.

The visual redesign will happen in a future iteration.

---

# Documentation

Before making any code changes, read the following documents in order:

1. `docs/CLAUDE_TASK.md` (this document)
2. `docs/blueprint.md`
3. `docs/01_PROJECT BRIEF.md`
4. `docs/02_DESIGN_SYSTEM.md`
5. `docs/03_SITE STRUCTURE.md`
6. `docs/04_CONTENT.md`
7. `docs/05_WIREFRAMES.md`
8. `docs/06_IMPLEMENTATION.md`

These documents are the project's source of truth.

If implementation decisions conflict with the codebase, follow the documentation unless there is a technical limitation.

---

# Project Objective

Transform the current scrolling portfolio into a modern application-style portfolio.

The new experience should behave like a single-page application where the content changes through navigation rather than continuous scrolling.

Primary navigation consists of:

- Profile
- Expertise
- Projects
- Services

The redesign should communicate my work more effectively while remaining familiar to existing visitors.

---

# Existing Codebase

This project is already functional.

Do **not** rebuild the application from scratch.

Instead:

- Refactor existing components whenever possible.
- Reuse existing styling.
- Reuse existing animations.
- Reuse existing utilities.
- Preserve existing design language.

Create new components only when doing so improves maintainability or reusability.

Avoid unnecessary rewrites.

---

# Visual Design

The current visual identity should remain intact.

Do not redesign:

- Color palette
- Typography
- Overall aesthetic
- Component styling

Minor improvements are acceptable when required for the new layout.

The focus of this implementation is architecture—not visual redesign.

---

# Portfolio Data

Use

`src/data/portfolio.json`

as the single source of truth.

Do not hardcode portfolio content inside React components.

If additional fields are required:

- Extend the existing schema.
- Preserve backwards compatibility where practical.
- Keep related content grouped logically.

---

# Development Guidelines

Follow these principles throughout the implementation.

## Build incrementally

Complete one implementation phase at a time.

Stop after each phase.

Do not continue automatically.

---

## Reusable components

Prefer reusable components over duplicated layouts.

If multiple screens share UI patterns, extract shared components.

---

## Composition over duplication

Favor composition.

Avoid copying component logic.

---

## Keep components focused

Each component should have a single responsibility.

Avoid large components that handle unrelated concerns.

---

## Strict typing

Use TypeScript throughout.

Avoid `any`.

Create interfaces or types when appropriate.

---

## Accessibility

Maintain semantic HTML.

Ensure keyboard accessibility.

Use proper ARIA labels where necessary.

---

## Responsive

Desktop is the primary experience.

Tablet and mobile should remain fully functional.

Do not remove features on smaller screens.

---

# Navigation

Replace the existing scrolling experience with application-style navigation.

Navigation should switch between views instead of scrolling.

Required views:

- Profile
- Expertise
- Projects
- Services

The navigation bar should remain persistent.

Page transitions should use Framer Motion where appropriate.

---

# Implementation Workflow

Follow the implementation roadmap defined in:

`docs/06_IMPLEMENTATION.md`

Complete one phase before moving to the next.

After each completed phase:

Stop.

Provide an implementation summary.

Wait for approval before continuing.

---

# Required Summary

At the end of every implementation phase, include:

## Summary

### Files Modified

List every modified file.

### Files Created

List every new file.

### Components Added

List every new reusable component.

### Components Removed

List any removed components and explain why.

### Architecture Decisions

Explain any important implementation decisions.

### Notes

Mention any limitations or recommended improvements.

### Next Phase

State which phase should be implemented next.

---

# Code Quality

Maintain production-quality code.

Prioritize:

- Readability
- Maintainability
- Simplicity
- Performance

Avoid unnecessary abstractions.

Avoid premature optimization.

Follow existing project conventions whenever reasonable.

---

# Decision Making

If implementation details are not explicitly documented:

- Choose the simplest maintainable solution.
- Stay consistent with the existing codebase.
- Avoid introducing unnecessary dependencies.
- Explain significant decisions in the implementation summary.

---

# Things to Avoid

Do not redesign the portfolio.

Do not replace the current design system.

Do not hardcode content.

Do not overengineer the architecture.

Do not introduce features outside the documented scope.

Do not continue to the next implementation phase without approval.

---

# Definition of Success

The redesign is successful when:

- The portfolio follows the documented architecture.
- Navigation uses application-style views.
- Components are reusable.
- Portfolio data is fully driven by `portfolio.json`.
- Existing design language is preserved.
- The application remains responsive and accessible.
- The codebase is easier to maintain than before.

---

# Begin

Start with **Phase 1** from `docs/06_IMPLEMENTATION.md`.

Do not implement future phases until the current phase has been reviewed and approved.

# Git Workflow

At the end of each completed phase:

- Ensure the project compiles successfully.
- Remove unused imports.
- Remove dead code created during refactoring.
- Verify there are no TypeScript errors.
- Ensure ESLint warnings are minimized before proceeding.

Do not leave the project in a partially broken state between phases.

## Portfolio Data Ownership

The schema and content of `src/data/portfolio.json` are maintained by the project owner.

Do not restructure or extend the schema unless explicitly instructed.

Assume the schema is the source of truth and adapt the implementation to it.

If additional fields would improve the implementation, recommend them in the implementation summary instead of modifying the schema.
