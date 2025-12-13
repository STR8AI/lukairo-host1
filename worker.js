// Cloudflare Worker (Module) - Zoho CRM Integration
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    try {
      // Health check
      if (url.pathname === "/health") {
        return new Response(JSON.stringify({ status: "ok" }), {
          headers: { "content-type": "application/json" },
        });
      }

      // Zoho token refresh endpoint
      if (url.pathname === '/refresh') {
        const result = await refreshZohoToken(env);
        return jsonResponse(result, 200);
      }

      // Zoho to HighLevel sync endpoint
      if (url.pathname === '/run-sync') {
        await runZohoToHighLevelSync(env);
        return new Response(
          'sync triggered; check worker logs for details',
          { status: 200 }
        );
      }

      // Serve static assets from repo root
      try {
        // @ts-ignore - cloudflare runtime provides this
        return await env.ASSETS.fetch(request);
      } catch (err) {
        return new Response("Not found", { status: 404 });
      }

    } catch (err) {
      console.error('UNHANDLED ERROR:', err?.message, err?.stack);
      return new Response('internal error', { status: 500 });
    }
  }
};

/* ----------------------------
   Utilities
---------------------------- */
function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function accountsDomainForRegion(region) {
  const r = (region || '').toLowerCase().trim();
  if (r === 'eu') return 'accounts.zoho.eu';
  if (r === 'in') return 'accounts.zoho.in';
  return 'accounts.zoho.com';
}

function apiDomainForRegion(region) {
  const r = (region || '').toLowerCase().trim();
  if (r === 'eu') return 'www.zohoapis.eu';
  if (r === 'in') return 'www.zohoapis.in';
  return 'www.zohoapis.com';
}

/* ----------------------------
   Refresh: refresh_token → access_token
---------------------------- */
async function refreshZohoToken(env) {
  if (!env.ZOHO_REFRESH_TOKEN) {
    return { error: 'no_refresh_token_in_env' };
  }
  if (!env.ZOHO_CLIENT_ID || !env.ZOHO_CLIENT_SECRET) {
    return { error: 'missing_client_config' };
  }

  const accountsDomain = accountsDomainForRegion(env.ZOHO_REGION);

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    refresh_token: env.ZOHO_REFRESH_TOKEN
  });

  try {
    const res = await fetch(`https://${accountsDomain}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { status: res.status, raw: text };
    }

  } catch (err) {
    console.error('refreshZohoToken network error:', err?.message);
    return { error: 'network_error', message: err?.message };
  }
}

/* ----------------------------
   Main sync: Zoho → HighLevel
---------------------------- */
async function runZohoToHighLevelSync(env) {
  console.log('runZohoToHighLevelSync(): started');

  // 1) Always refresh access token
  const tokenResp = await refreshZohoToken(env);
  if (!tokenResp?.access_token) {
    console.log('Failed to obtain Zoho access token:', tokenResp);
    return;
  }

  const accessToken = tokenResp.access_token;
  console.log(
    'Obtained Zoho access token (masked):',
    `${accessToken.slice(0, 6)}...${accessToken.slice(-4)}`
  );

  // 2) Fetch Zoho Contacts
  const apiDomain = apiDomainForRegion(env.ZOHO_REGION);
  const zohoUrl = `https://${apiDomain}/crm/v2/Contacts?per_page=200`;

  let zres;
  try {
    zres = await fetch(zohoUrl, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` }
    });
  } catch (err) {
    console.log('Zoho fetch network error:', err?.message);
    return;
  }

  let zbody;
  try {
    zbody = await zres.json();
  } catch {
    console.log('Zoho JSON parse error');
    return;
  }

  console.log(
    'Zoho response:',
    zres.status,
    JSON.stringify(zbody).slice(0, 400)
  );

  const contacts = zbody?.data || [];
  console.log('Zoho contacts count:', contacts.length);

  if (contacts.length === 0) {
    console.log('No Zoho contacts to import; exiting.');
    return;
  }

  const first = contacts[0];
  console.log(
    'First Zoho contact:',
    JSON.stringify(first).slice(0, 300)
  );

  // 3) Map → HighLevel
  const payload = {
    contact: {
      firstName: first.First_Name || first.Full_Name || '',
      lastName: first.Last_Name || '',
      email: first.Email || '',
      phone: first.Phone || ''
    }
  };

  const hlBase = env.HL_API_BASE || 'https://api.gohighlevel.com';
  const hlUrl = `${hlBase}/v1/contacts`;

  let hlRes;
  try {
    hlRes = await fetch(hlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.HL_API_KEY || ''}`
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.log('HighLevel POST network error:', err?.message);
    return;
  }

  const hlText = await hlRes.text();
  console.log(
    'HighLevel POST:',
    hlRes.status,
    hlText
  );

  console.log('runZohoToHighLevelSync(): finished');
}