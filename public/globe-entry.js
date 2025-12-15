import { initGlobe } from './globe.js';

function start() {
  const container = document.getElementById('lukairo-scene');
  if (!container) {
    console.error('lukairo-scene not found');
    return;
  }
  initGlobe(container);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
