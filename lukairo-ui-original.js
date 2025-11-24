// ORIGINAL UNOPTIMIZED CODE (WITH ISSUES)
// This file is provided for comparison purposes only
// DO NOT USE IN PRODUCTION - Use lukairo-ui-enhanced.js instead

(function () {
  if (typeof document === "undefined") return;

  // Color system
  const palette = {
    "--lk-primary": "#00b48d",
    "--lk-accent": "#6f4cff",
    "--lk-ink": "#12212b"
  };

  const applyPalette = () => {
    const root = document.documentElement;
    Object.entries(palette).forEach(([k, v]) => root.style.setProperty(k, v));
  };

  // Button micro-interaction
  const enhanceButtons = (root = document) => {
    const btns = root.querySelectorAll("button, .btn, .ghl-button");
    btns.forEach((btn) => {
      if (btn.dataset.lkDone) return;
      btn.dataset.lkDone = "1";

      if (!btn.style.transition) {
        btn.style.transition = "transform .12s ease-out, background .12s ease";
      }
      btn.style.willChange = "transform";

      const down = () => btn.classList.add("lk-pressed");
      const up = () => btn.classList.remove("lk-pressed");

      btn.addEventListener("pointerdown", down, { passive: true });
      ["pointerup", "pointerleave", "pointercancel", "blur"].forEach((ev) =>
        btn.addEventListener(ev, up, { passive: true })
      );
    });
  };

  // Highlight active nav based on URL path
  const activateNav = (root = document) => {
    const path = window.location.pathname.toLowerCase();
    const links = root.querySelectorAll(".sidebar a, .ghl-sidebar a");
    links.forEach((link) => {
      link.classList.remove("active");
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href && path.startsWith(href)) link.classList.add("active");
    });
  };

  // Panel visual lift
  const enhancePanels = (root = document) => {
    const panels = root.querySelectorAll(".card, .panel, .ghl-card, .ghl-panel");
    panels.forEach((p) => p.classList.add("lk-panel"));
  };

  // Single entry point (safe to call repeatedly)
  const init = (root = document) => {
    const sidebar = document.querySelector(".ghl-sidebar, .sidebar");
    if (!sidebar) return;

    applyPalette();
    enhanceButtons(root);
    activateNav(root);
    enhancePanels(root);
  };

  // Run on DOM load and if already loaded
  document.addEventListener("DOMContentLoaded", () => init());
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(() => init(), 50);
  }

  // SPA navigation detection
  (function () {
    const _push = history.pushState;
    history.pushState = function () {
      _push.apply(this, arguments);
      window.dispatchEvent(new Event("locationchange"));
    };
    const _replace = history.replaceState;
    history.replaceState = function () {
      _replace.apply(this, arguments);
      window.dispatchEvent(new Event("locationchange"));
    };
    window.addEventListener("popstate", () => window.dispatchEvent(new Event("locationchange")));
    window.addEventListener("locationchange", () => init());
  })();

  // MutationObserver to pick up injected content
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (
          node.matches && (node.matches(".card, .panel, .btn, button, .ghl-card, .ghl-panel, .ghl-button") ||
          node.querySelector(".ghl-sidebar, .sidebar"))
        ) {
          init(node);
        } else if (node.querySelector) {
          if (
            node.querySelector(".card, .panel, .btn, button, .ghl-card, .ghl-panel, .ghl-button, .ghl-sidebar, .sidebar")
          ) {
            init(node);
          }
        }
      }
    }
  });

  mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
})();

// DUPLICATE CODE - THIS WAS THE MAIN ISSUE!
(function () {
  if (typeof document === "undefined") return;

  // Color system
  const palette = {
    "--lk-primary": "#00b48d",
    "--lk-accent": "#6f4cff",
    "--lk-ink": "#12212b"
  };

  const applyPalette = () => {
    const root = document.documentElement;
    Object.entries(palette).forEach(([k, v]) => root.style.setProperty(k, v));
  };

  // Button micro-interaction
  const enhanceButtons = (root = document) => {
    const btns = root.querySelectorAll("button, .btn, .ghl-button");
    btns.forEach((btn) => {
      if (btn.dataset.lkDone) return;
      btn.dataset.lkDone = "1";

      if (!btn.style.transition) {
        btn.style.transition = "transform .12s ease-out, background .12s ease";
      }
      btn.style.willChange = "transform";

      const down = () => btn.classList.add("lk-pressed");
      const up = () => btn.classList.remove("lk-pressed");

      btn.addEventListener("pointerdown", down, { passive: true });
      ["pointerup", "pointerleave", "pointercancel", "blur"].forEach((ev) =>
        btn.addEventListener(ev, up, { passive: true })
      );
    });
  };

  // Highlight active nav based on URL path
  const activateNav = (root = document) => {
    const path = window.location.pathname.toLowerCase();
    const links = root.querySelectorAll(".sidebar a, .ghl-sidebar a");
    links.forEach((link) => {
      link.classList.remove("active");
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href && path.startsWith(href)) link.classList.add("active");
    });
  };

  // Panel visual lift
  const enhancePanels = (root = document) => {
    const panels = root.querySelectorAll(".card, .panel, .ghl-card, .ghl-panel");
    panels.forEach((p) => p.classList.add("lk-panel"));
  };

  // Single entry point (safe to call repeatedly)
  const init = (root = document) => {
    const sidebar = document.querySelector(".ghl-sidebar, .sidebar");
    if (!sidebar) return;

    applyPalette();
    enhanceButtons(root);
    activateNav(root);
    enhancePanels(root);
  };

  // Run on DOM load and if already loaded
  document.addEventListener("DOMContentLoaded", () => init());
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(() => init(), 50);
  }

  // SPA navigation detection
  (function () {
    const _push = history.pushState;
    history.pushState = function () {
      _push.apply(this, arguments);
      window.dispatchEvent(new Event("locationchange"));
    };
    const _replace = history.replaceState;
    history.replaceState = function () {
      _replace.apply(this, arguments);
      window.dispatchEvent(new Event("locationchange"));
    };
    window.addEventListener("popstate", () => window.dispatchEvent(new Event("locationchange")));
    window.addEventListener("locationchange", () => init());
  })();

  // MutationObserver to pick up injected content
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (
          node.matches && (node.matches(".card, .panel, .btn, button, .ghl-card, .ghl-panel, .ghl-button") ||
          node.querySelector(".ghl-sidebar, .sidebar"))
        ) {
          init(node);
        } else if (node.querySelector) {
          if (
            node.querySelector(".card, .panel, .btn, button, .ghl-card, .ghl-panel, .ghl-button, .ghl-sidebar, .sidebar")
          ) {
            init(node);
          }
        }
      }
    }
  });

  mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
})();
