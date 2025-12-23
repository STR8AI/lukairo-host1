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
// Central engine orchestrator; wires renderer, state, physics, UI, and modules.
import { Renderer } from "./core/renderer.js";
import { createState } from "./core/state.js";
import { Physics } from "./core/physics.js";
import { UISystem } from "./core/ui-system.js";
import { DataLayer } from "./core/data-layer.js";

export class Engine {
  constructor() {
    this.renderer = new Renderer();
    this.state = createState();
    this.physics = new Physics();
    this.ui = new UISystem();
    this.data = new DataLayer();
    this.modules = new Map();
  }

  registerModule(name, factory) {
    this.modules.set(name, factory);
    return () => this.modules.delete(name);
  }

  async start() {
    // Initialize renderer loop with physics stepping.
    let last = performance.now();
    this.renderer.init({
      onFrame: (now) => {
        const delta = now - last;
        this.physics.step(delta);
        last = now;
      },
    });

    // Initialize modules.
    for (const [name, factory] of this.modules.entries()) {
      const api = {
        engine: this,
        renderer: this.renderer,
        state: this.state,
        physics: this.physics,
        ui: this.ui,
        data: this.data,
      };
      await factory(api);
      console.info(`Module '${name}' initialized`);
    }
  }

  stop() {
    this.renderer.destroy();
  }
}

export function createEngine() {
  return new Engine();
}
