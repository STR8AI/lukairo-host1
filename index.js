const app = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const DB = env.DB;
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }
    if (url.pathname === "/api/test") {
      const { results } = await DB.prepare(
        "SELECT 'Connected to LUKAIRO DB' AS status;"
      ).all();
      return new Response(JSON.stringify(results), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    return new Response("LUKAIRO Engine API Active", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
export {
  app as default
};
