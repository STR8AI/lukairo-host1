(function () {
  if (typeof document === "undefined") return;

  // Color system
  const palette = {
    "--lk-primary": "#00b48d",
    "--lk-accent": "#6f4cff",
    "--lk-ink": "#12212b"
  };

  // Apply palette only once
  let paletteApplied = false;
  const applyPalette = () => {
    if (paletteApplied) return;
    paletteApplied = true;
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

  // Cache for sorted navigation links (invalidated when links change)
  let cachedNavRoot = null;
  let cachedSortedLinks = null;
  let cachedLinksHash = "";
  
  // Highlight active nav based on URL path (improved logic)
  const activateNav = (root = document) => {
    const path = window.location.pathname.toLowerCase();
    const links = root.querySelectorAll(".sidebar a, .ghl-sidebar a");
    const linksArr = Array.from(links); // Convert once for reuse
    
    // Create a hash of link hrefs to detect changes
    const linksHash = linksArr.map(l => l.getAttribute("href") || "").join("|");
    
    // Use cached sorted links if available and links haven't changed
    let linksArray;
    if (cachedNavRoot === root && cachedLinksHash === linksHash && cachedSortedLinks) {
      linksArray = cachedSortedLinks;
    } else {
      // Sort links by href length (longest first) to match most specific paths first
      linksArray = linksArr.filter(link => {
        const href = link.getAttribute("href");
        return href && href !== "/" && href !== "#";
      });
      
      linksArray.sort((a, b) => {
        const hrefA = a.getAttribute("href") || "";
        const hrefB = b.getAttribute("href") || "";
        return hrefB.length - hrefA.length;
      });
      
      cachedNavRoot = root;
      cachedLinksHash = linksHash;
      cachedSortedLinks = linksArray;
    }
    
    // Remove all active classes first
    linksArr.forEach(link => link.classList.remove("active"));
    
    // Handle root path
    if (path === "/" || path === "") {
      const homeLink = linksArr.find(link => {
        const href = link.getAttribute("href");
        return href === "/" || href === "";
      });
      if (homeLink) {
        homeLink.classList.add("active");
        return; // Exit early to avoid duplicate active classes
      }
    }
    
    // Find the best matching link
    for (const link of linksArray) {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (path === href || (href.length > 1 && path.startsWith(href + "/"))) {
        link.classList.add("active");
        break; // Only activate the most specific match
      }
    }
  };

  // Panel visual lift
  const enhancePanels = (root = document) => {
    const panels = root.querySelectorAll(".card, .panel, .ghl-card, .ghl-panel");
    panels.forEach((p) => {
      if (!p.classList.contains("lk-panel")) {
        p.classList.add("lk-panel");
      }
    });
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

  // MutationObserver to pick up injected content (with debouncing)
  let mutationTimeout = null;
  let pendingNodes = new Set();
  
  // Selectors for relevant content (extracted for maintainability)
  const RELEVANT_SELECTORS = "button, .btn, .card, .panel, .ghl-button, .ghl-card, .ghl-panel, .ghl-sidebar, .sidebar";
  
  const processMutations = () => {
    mutationTimeout = null;
    if (pendingNodes.size === 0) return;
    
    for (const node of pendingNodes) {
      if (!document.contains(node)) continue; // Skip removed nodes
      init(node);
    }
    pendingNodes.clear();
  };
  
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        
        // Check if node or its descendants contain relevant elements
        // Use short-circuit evaluation to avoid unnecessary querySelector
        const hasRelevantContent = 
          (node.matches && node.matches(RELEVANT_SELECTORS)) ||
          (node.querySelector && node.querySelector(RELEVANT_SELECTORS));
        
        if (hasRelevantContent) {
          pendingNodes.add(node);
          
          // Debounce: wait 100ms before processing
          if (mutationTimeout) clearTimeout(mutationTimeout);
          mutationTimeout = setTimeout(processMutations, 100);
        }
      }
    }
  });

  mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
})();
