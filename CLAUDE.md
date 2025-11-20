# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 card game frontend application using React 19, TypeScript 5, and Tailwind CSS 4. The project follows the App Router architecture with a minimal setup that's ready for development.

## Development Commands

- **Start development server**: `npm run dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Architecture & Structure

### Next.js App Router
- Uses Next.js 16 with the App Router pattern
- Root layout: `app/layout.tsx` - Sets up HTML structure, fonts (Geist Sans/Mono), and global CSS
- Main page: `app/page.tsx` - Currently contains starter template content
- Global styles: `app/globals.css` - Tailwind imports with CSS custom properties for theming

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components (currently empty)
- `public/` - Static assets (SVG icons for Next.js, Vercel, etc.)

### Styling System
- **Tailwind CSS 4** with PostCSS integration
- **CSS custom properties** for theme colors (background/foreground)
- **Dark mode support** via `prefers-color-scheme`
- **Font variables** using Geist Sans and Geist Mono from Google Fonts

### TypeScript Configuration
- Path aliases: `@/*` maps to project root
- Strict mode enabled
- React JSX transform configured
- Next.js plugin integration

## Development Notes

### Path Aliases
Use the `@/` prefix for absolute imports:
```typescript
import Component from '@/components/Component' // Note: components directory currently empty
```

### Styling Approach
- Uses Tailwind's inline theme configuration in `globals.css`
- CSS custom properties defined for consistent theming
- Dark mode styles automatically applied based on system preferences

### Font Usage
- Geist Sans: `--font-geist-sans` variable, className `font-sans`
- Geist Mono: `--font-geist-mono` variable, className `font-mono`

## Current State

This is a freshly initialized Next.js project with minimal customization. The card game functionality has not yet been implemented - the current codebase consists primarily of the Next.js starter template with Tailwind CSS integration.

The project is set up with modern tooling (Next.js 16, React 19, TypeScript 5, Tailwind 4) and is ready for card game development implementation.