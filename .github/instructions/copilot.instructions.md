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
npx gulp     # Build with Gulp (primary and recommended)
```

**Build System Note**: The project has two build configurations:
- **Gulp** (recommended): Use `npx gulp` for the complete build with image optimization and proper asset handling
- **Vite**: Available via `npm run build` but not the primary build system for this project

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

## Plan: Review and Confirm Homepage Globe Files

You referenced the following files for the homepage globe:
- `cf-pages/index.html`
- `cf-pages/main.js`
- `cf-pages/styles.css` (optional for now)

### Steps
1. Ensure `cf-pages/index.html` includes a visible canvas and correct script/style links.
2. Confirm `cf-pages/main.js` contains the logic to render the globe on the canvas.
3. Optionally review or update `cf-pages/styles.css` for globe and layout styling.

### Further Considerations
1. Verify that the homepage renders the globe as intended with or without `styles.css`.
2. Ensure all file paths are correct for deployment and local testing.

## Plan: Update cf-pages/index.html with Inline CSS

You want to update `cf-pages/index.html` to use the provided HTML structure and inline CSS for the homepage globe, bypassing Cloudflare MIME issues.

### Steps
1. Open `cf-pages/index.html` and replace its content with the provided HTML, including the inline `<style>` block.
2. Ensure the `<canvas id="globe"></canvas>` and `.overlay` elements are present and styled as specified.
3. Confirm the `<script src="/main.js"></script>` tag is included at the end of the body.

### Further Considerations
1. This inline CSS is a temporary solution; plan to revert to external CSS when possible.
2. Verify that the homepage renders correctly after the update.

## Plan: Update cf-pages/main.js with Visual-Only Globe Code

You want to update `cf-pages/main.js` to contain the provided visual-only, dependency-free globe animation code.

### Steps
1. Open `cf-pages/main.js`.
2. Replace its contents with the provided JavaScript code for the animated globe.
3. Ensure the code uses only the canvas API and does not rely on any external libraries.

### Further Considerations
1. Confirm the animation works as expected with the updated `index.html`.
2. No imports or dependencies should be present in `main.js`.

## Plan: Commit and Push Homepage Globe Rendering Fix

You want to:
- Stage `cf-pages/index.html` and `cf-pages/main.js`
- Commit with: "Fix homepage globe rendering"
- Push to `main` on origin

### Steps
1. Run `git add cf-pages/index.html cf-pages/main.js` to stage the updated files.
2. Run `git commit -m "Fix homepage globe rendering"` to commit the changes.
3. Run `git push origin main` to push to the remote repository.

### Further Considerations
1. Confirm the homepage globe renders and animates as intended after deployment.
2. Ensure only the intended files are included in the commit.
