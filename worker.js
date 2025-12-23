// Minimal Worker to serve static assets using the assets binding.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "content-type": "application/json" },
      });
    }

    // Serve static assets from repo root
    try {
      // @ts-ignore - cloudflare runtime provides this
      return await env.ASSETS.fetch(request);
    } catch (err) {
      return new Response("Not found", { status: 404 });
    }
  }
};