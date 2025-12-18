// This file is intentionally left as a loader for the qualification engine.
// It loads the actual qualification logic from engine.qual.js

const script = document.createElement('script');
script.src = '/engine.qual.js';
document.head.appendChild(script);
