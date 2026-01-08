# GitHub Copilot Configuration

## About This Project

LUKAIRO Host is a 3D globe visualization project built with Three.js and modern web technologies. This document provides guidelines for using GitHub Copilot effectively with this codebase.

## Quick Start for Copilot Users

### Build Commands
```bash
npm install      # Install dependencies
gulp            # Build project
gulp dev        # Development mode with live reload
node test-logic.js  # Run tests
```

### Project Context

**Primary Technologies:**
- Three.js for 3D rendering
- Vanilla JavaScript (ES6+)
- Gulp 4 for build automation
- GitHub Pages for deployment

**Key Files:**
- `globe.js` - Main 3D visualization logic
- `lukairo-main.html`, `lukairo-demo.html` - Application entry points
- `gulpfile.js` - Build configuration
- `style.css` - Styling

## Copilot Best Practices for This Project

### 1. Code Style Guidelines

**JavaScript:**
```javascript
// ✅ Good: ES6+ syntax, clear naming
const initializeGlobe = () => {
  const scene = new THREE.Scene();
  return scene;
};

// ❌ Avoid: var, unclear names
var x = function() {
  var s = new THREE.Scene();
  return s;
};
```

**CSS:**
```css
/* ✅ Good: CSS variables with --lk- prefix */
:root {
  --lk-primary-color: #007bff;
  --lk-background: #000000;
}

/* ❌ Avoid: Hardcoded values */
.button {
  background: #007bff;
}
```

### 2. Working with Three.js

When using Copilot for Three.js code:
- Request specific Three.js patterns (e.g., "create a THREE.SphereGeometry")
- Mention performance considerations for 3D rendering
- Ask for proper disposal of Three.js objects to prevent memory leaks

### 3. Gulp Task Development

The project uses Gulp 4 syntax:
```javascript
// ✅ Gulp 4 pattern
gulp.task('build', gulp.parallel('html', 'css', 'js'));

// ❌ Deprecated Gulp 3 pattern
gulp.task('build', ['html', 'css', 'js']);
```

### 4. Deployment Considerations

- This project supports deployment to both GitHub Pages and Cloudflare Pages
  - GitHub Pages: see `.github/workflows/` for deployment workflow
  - Cloudflare Pages: see `.github/workflows/cloudflare-pages.yml`, `wrangler.toml`, and `worker.js` for configuration
- Build output goes to `dist/` directory
- All assets must be in dist for deployment

## Common Copilot Prompts for This Project

### Adding New Features
```
// Create a new Three.js material with custom shader for the globe
// Add image processing feature that works with gulp-imagemin
// Implement a new UI control for globe rotation speed
```

### Refactoring
```
// Refactor this Three.js scene setup for better performance
// Optimize this CSS using custom properties
// Modernize this function to use ES6+ features
```

### Debugging
```
// Why is this Three.js object not rendering?
// Fix memory leak in this scene cleanup code
// Debug this gulp task that's not copying files
```

## Testing with Copilot

When writing tests:
- Follow existing test patterns in `test-logic.js`
- Test both happy paths and edge cases
- Ensure tests are independent and can run in any order

Example:
```javascript
// Test that UI component initializes correctly
console.assert(initializeUI() !== null, "UI should initialize");
```

## Security Guidelines

When using Copilot suggestions:
- ✅ Review all suggested dependencies for vulnerabilities
- ✅ Validate user inputs and sanitize outputs
- ✅ Use HTTPS for all external resources
- ❌ Never commit API keys or secrets
- ❌ Don't use eval() or similar dangerous functions

## Getting Help

If Copilot suggestions don't fit the project:
1. Check existing code patterns in the repository
2. Review this COPILOT.md and copilot-instructions.md
3. Refer to the main README.md for project documentation
4. Look at recent commits for coding style examples

## Advanced Usage

### Custom Copilot Comments

Use structured comments to guide Copilot:

```javascript
/**
 * Initialize the 3D globe visualization
 * @requires THREE.js to be loaded
 * @param {HTMLElement} container - DOM element to render into
 * @returns {THREE.Scene} The initialized scene
 */
function initGlobe(container) {
  // Copilot will provide better suggestions with this context
}
```

### Iteration with Copilot

1. Start with a clear comment describing what you need
2. Review the suggestion carefully
3. Test the code
4. Refine the comment if needed and regenerate
5. Commit only after verification

## Maintenance Notes

**Last Updated:** December 2025

**Gulp Version:** 4.0.2 (use series/parallel, not dependency arrays)

**Node Version:** Compatible with 18.x, 20.x, 22.x (per CI config)

**Three.js:** Loaded via CDN (check index.html for current version)

---

For the complete development guide, see [copilot-instructions.md](./copilot-instructions.md)
