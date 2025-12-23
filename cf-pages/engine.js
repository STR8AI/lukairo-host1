<nav class="nav">
  <a href="/">Home</a>
  <a href="/pricing.html">Pricing</a>
  <a href="/engine.html">Engine</a>
  <a href="/about.html">About</a>
  <a href="/contact.html">Contact</a>
</nav>

import { startGlobe } from "./visuals/globe.js";
import { startPlatforms } from "./visuals/platforms.js";

const canvas = document.getElementById("scene");

startGlobe(canvas);
startPlatforms(canvas);
