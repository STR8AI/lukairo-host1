# Copilot Instructions for LUKAIRO Globe

## Project Overview

This is the LUKAIRO Globe project - a 3D Earth visualization using Three.js with image processing and UI enhancement capabilities. The project uses Gulp for build automation and deploys to GitHub Pages.

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **3D Rendering**: Three.js (r152 via CDN)
- **Build System**: Gulp 4
- **Package Manager**: npm
- **Node.js**: 18.x, 20.x, or 22.x
- **Deployment**: GitHub Pages (do not use Cloudflare)

## Project Structure

- `index.html` - Main entry point
- `globe.js` - Three.js globe logic
- `style.css` - Main styles
- `lukairo-ui-enhanced.js` - Optimized UI enhancement library
- `gulpfile.js` - Build tasks
- `images/` - Image assets
- `dist/` - Build output (generated)

## Build Commands

```bash
# Install dependencies
npm install

# Build project (default)
npm run build
# or
gulp

# Run development server
gulp dev

# Individual tasks
gulp html    # Copy HTML files
gulp css     # Copy CSS files
gulp js      # Copy JavaScript files
gulp images  # Optimize images
```

## Coding Standards

### JavaScript

- Use ES6+ syntax
- Use `const` for constants, `let` for variables
- Avoid `var`
- Use meaningful variable and function names
- Add comments for complex logic
- Use strict equality (`===`, `!==`)

### CSS

- Use CSS custom properties (variables) for theming
- Follow BEM-like naming for classes when appropriate
- Prefer flexbox for layouts

### HTML

- Use semantic HTML5 elements
- Include proper meta tags
- Ensure accessibility attributes where needed

## Three.js Guidelines

- Use `THREE.MeshStandardMaterial` for realistic rendering
- Implement proper lighting (ambient + directional)
- Handle window resize events
- Use `requestAnimationFrame` for animations
- Clean up resources when components are destroyed

## UI Enhancement Library

When working with `lukairo-ui-enhanced.js`:

- Use debouncing for MutationObserver callbacks
- Mark processed elements with `data-*` attributes
- Use passive event listeners for scroll/touch events
- Avoid duplicate initialization
- Cache DOM queries where possible

### Supported Selectors

- **Buttons**: `button`, `.btn`, `.ghl-button`
- **Navigation**: `.sidebar a`, `.ghl-sidebar a`
- **Panels**: `.card`, `.panel`, `.ghl-card`, `.ghl-panel`

### CSS Variables

- `--lk-primary`: #00b48d (teal)
- `--lk-accent`: #6f4cff (purple)
- `--lk-ink`: #12212b (dark blue)

## Testing

```bash
# Run unit tests for logic
node test-logic.js

# Manual testing
# Open test-ui-enhanced.html in browser
```

Note: The `npm test` script is not yet configured. Use `node test-logic.js` for running existing unit tests.

- Test in multiple Node.js versions (18.x, 20.x, 22.x)
- Verify no memory leaks using browser DevTools
- Check performance impact using Performance tab

## Deployment

**Important**: This project deploys to GitHub Pages only. Do not use Cloudflare Pages or other Cloudflare hosting services for deployment. (Note: Using Cloudflare CDN for library delivery, like cdnjs.cloudflare.com for Three.js, is acceptable.)

The deployment workflow:
1. Push to `main` branch triggers deploy
2. Gulp builds to `dist/` directory
3. GitHub Pages serves from `dist/`

## Pull Request Guidelines

- Keep changes focused and minimal
- Update documentation if changing public APIs
- Ensure all tests pass before submitting
- Follow existing code style
- Do not commit `node_modules/` or `dist/`

## Security Considerations

- Do not commit secrets or API keys
- Use HTTPS for all CDN resources
- Validate user input
- Follow browser security best practices
