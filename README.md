# LUKAIRO Globe - 3D Earth Visualization

A stunning 3D Earth visualization project using Three.js with interactive features and modern web design.

## Project Overview

This repository contains the LUKAIRO Globe website, featuring:
- Interactive 3D globe visualization powered by Three.js
- Multiple page layouts (simple globe, full website, demo)
- Responsive design that works on all devices
- Optimized UI enhancements
- Image processing capabilities

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Library**: Three.js (loaded via CDN)
- **Build Tool**: Gulp
- **Package Manager**: npm
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/STR8AI/lukairo-host1.git
cd lukairo-host1
```

2. Install dependencies:
```bash
npm install
```

### Building the Project

Build the project to generate the `dist/` directory:

```bash
npm run build
```

This will:
- Copy all HTML files to `dist/`
- Copy all CSS files to `dist/`
- Copy all JavaScript files to `dist/`
- Optimize images and copy them to `dist/images/`

### Development

Run the development server with live reload:

```bash
npm run serve
```

This will start a local web server at `http://localhost:8000` with live reload enabled.

For development with auto-rebuild on file changes:

```bash
npm run dev
```

## Project Structure

```
lukairo-host1/
├── index.html              # Simple globe visualization page
├── lukairo-main.html       # Full website with all sections
├── lukairo-demo.html       # UI enhancement demo page
├── style.css               # Styles for index.html
├── lukairo-main.css        # Styles for lukairo-main.html
├── lukairo-demo.css        # Styles for demo page
├── globe.js                # Core globe rendering logic
├── lukairo-ui-enhanced.js  # Optimized UI enhancement library
├── lukairo-ui-original.js  # Original UI code (for reference)
├── worker.js               # Service worker
├── test-logic.js           # Unit tests
├── gulpfile.js             # Gulp build configuration
├── package.json            # Project dependencies and scripts
├── images/                 # Image assets
└── dist/                   # Build output (generated)
```

## Available Pages

### 1. Index Page (`index.html`)
A clean, simple page featuring just the 3D globe visualization.

### 2. Main Website (`lukairo-main.html`)
Full-featured website with:
- Navigation header
- Hero section
- Features showcase
- Interactive globe section
- About section
- Contact form
- Footer

### 3. Demo Page (`lukairo-demo.html`)
Demonstrates the UI enhancement features with performance testing controls.

## Features

- **3D Visualization**: Stunning 3D globe rendering with realistic textures and lighting
- **High Performance**: Optimized for smooth 60 FPS animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessible**: Built following WCAG accessibility guidelines
- **Customizable**: Easy to customize with CSS variables
- **Interactive Controls**: Pause/resume globe rotation with spacebar

## Build Scripts

- `npm run build` - Build the project (runs gulp)
- `npm run serve` - Start development server
- `npm run dev` - Build and start development server with watch mode

## Testing

Run the unit tests:

```bash
node test-logic.js
```

## CSS Variables

The project uses CSS custom properties for easy theming:

```css
--lk-primary: Primary color
--lk-accent: Accent color
--lk-ink: Text color
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2024 LUKAIRO. All rights reserved.

## Contributing

This is a private project. For questions or issues, please contact the project maintainers.
