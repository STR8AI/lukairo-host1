import { initGlobe } from './globe.js';

function start() {
  const container = document.getElementById('lukairo-scene');
  if (!container) return;
  initGlobe(container);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
