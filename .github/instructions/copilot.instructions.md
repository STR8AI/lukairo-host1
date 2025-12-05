# Copilot Coding Agent Instructions for LUKAIRO Host

## Project Overview

This repository contains the LUKAIRO Globe - a 3D Earth visualization project using Three.js with image processing capabilities.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6+)
- **3D Library**: Three.js (loaded via CDN)
- **Build Tool**: Gulp
- **Package Manager**: npm
- **Deployment**: GitHub Pages (NOT Cloudflare)

## Build and Development

### Installing Dependencies
```bash
npm install
```

### Building the Project
```bash
npm run build
# or directly with gulp
gulp
```

### Running Tests
```bash
node test-logic.js
```

### Development Server
```bash
gulp serve
```

## Project Structure

- `index.html` - Main entry point for the globe visualization
- `globe.js` - Core globe rendering logic using Three.js
- `style.css` - Main stylesheet
- `lukairo-ui-enhanced.js` - Optimized UI enhancement library
- `gulpfile.js` - Gulp build configuration
- `test-logic.js` - Unit tests for UI logic
- `dist/` - Build output directory (git-ignored)

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
- Ensure build passes (`npm run build`)
- Follow existing code style and conventions
