# Copilot Coding Agent Instructions for LUKAIRO Host

## Project Overview

This repository contains the LUKAIRO Globe - a 3D Earth visualization project using Three.js with image processing capabilities.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6+)
- **3D Library**: Three.js (installed as npm dependency, may also be loaded via CDN in some pages)
- **Build Tool**: Gulp (primary) and Vite (secondary)
- **Package Manager**: npm
- **Deployment**: GitHub Pages (NOT Cloudflare)

## Build and Development

### Installing Dependencies
```bash
npm install
```

### Building the Project
```bash
npm install  # Install dependencies first
npx gulp     # Build with Gulp (primary build tool)
# Note: 'npm run build' uses Vite, but Gulp is the main build system for this project
```

### Running Tests
```bash
node test-logic.js
```

### Development Server
```bash
npx gulp serve  # Starts server on port 8000 with live reload
# or for full development with watch
npx gulp dev
```

## Project Structure

- `index.html` - Main entry point (currently empty file, use lukairo-main.html instead)
- `lukairo-main.html` - Main globe visualization page
- `lukairo-demo.html` - Demo page
- `globe.js` - Core globe rendering logic using Three.js
- `engine.js` - Engine orchestration module
- `style.css` - Main stylesheet
- `lukairo-main.css` - Main page styles
- `lukairo-demo.css` - Demo page styles
- `lukairo-ui-enhanced.js` - Optimized UI enhancement library
- `lukairo-ui-original.js` - Original UI implementation
- `gulpfile.js` - Gulp build configuration
- `test-logic.js` - Unit tests for UI logic
- `test-ui-enhanced.html` - Test page for UI enhancements
- `vite.config.js` - Vite configuration
- `dist/` - Build output directory (git-ignored)
- `images/` - Image assets
- `.github/workflows/` - GitHub Actions workflows
  - `deploy.yml` - GitHub Pages deployment workflow
  - `cloudflare-pages.yml` - Cloudflare Pages workflow (not actively used)
  - `npm-gulp.yml` - NPM and Gulp CI workflow

## Coding Conventions

### JavaScript
- Use ES6+ syntax (const/let, arrow functions, template literals)
- Follow consistent naming conventions (camelCase for variables/functions)
- Add JSDoc comments for public functions
- Use meaningful variable and function names

### CSS
- Use CSS custom properties (CSS variables) for theming
- Prefix custom properties with `--lk-` (e.g., `--lk-primary`)
- Use BEM-like naming for class names when appropriate

### HTML
- Use semantic HTML5 elements
- Include proper viewport meta tags
- Maintain accessibility best practices

## Deployment Guidelines

**IMPORTANT**: This project deploys to GitHub Pages. Do NOT configure Cloudflare deployment.

The deployment workflow (`.github/workflows/deploy.yml`) handles:
1. Building the project with Gulp
2. Uploading build artifacts to GitHub Pages
3. Automatic deployment on push to main branch

## Testing Requirements

- Run `node test-logic.js` before committing changes
- Ensure all existing tests pass
- Add tests for new functionality when applicable

## Pull Request Guidelines

- Keep changes focused and minimal
- Test locally before submitting
- Ensure build passes (`npx gulp`)
- Run tests with `node test-logic.js`
- Follow existing code style and conventions

## Important Notes

- The project has multiple HTML entry points (lukairo-main.html, lukairo-demo.html, test-ui-enhanced.html)
- When modifying build configuration, update `gulpfile.js` (primary) rather than `vite.config.js`
- Image optimization is handled automatically by Gulp during build
- The `dist/` directory is auto-generated and should not be manually edited
- Always use `npx` prefix for Gulp commands to ensure proper execution (e.g., `npx gulp` not just `gulp`)

## File Naming Conventions

- UI files use `lukairo-` prefix (e.g., `lukairo-ui-enhanced.js`)
- CSS files match their corresponding HTML files (e.g., `lukairo-main.css` for `lukairo-main.html`)
- Test files use `test-` prefix (e.g., `test-logic.js`, `test-ui-enhanced.html`)
