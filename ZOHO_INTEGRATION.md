# Zoho CRM Integration Worker

This Cloudflare Worker provides integration between Zoho CRM and HighLevel, with OAuth token management and contact synchronization.

## Features

- **OAuth Token Refresh**: Automatically refreshes Zoho OAuth access tokens using refresh tokens
- **Contact Sync**: Syncs contacts from Zoho CRM to HighLevel
- **Multi-Region Support**: Supports Zoho US, EU, and India regions
- **Static Asset Serving**: Continues to serve static assets via the ASSETS binding

## API Endpoints

### `GET /health`
Health check endpoint
- Returns: `{"status": "ok"}`

### `GET /refresh`
Refreshes the Zoho OAuth access token
- Returns: Token response with `access_token` or error object

### `GET /run-sync`
Triggers a sync of contacts from Zoho CRM to HighLevel
- Returns: Success message or error
- Logs: Detailed sync progress in worker logs

## Environment Variables

Configure these variables in your Cloudflare Worker settings:

### Required Variables

- **`ZOHO_CLIENT_ID`**: Your Zoho OAuth client ID
- **`ZOHO_CLIENT_SECRET`**: Your Zoho OAuth client secret  
- **`ZOHO_REFRESH_TOKEN`**: Your Zoho OAuth refresh token
- **`HL_API_KEY`**: Your HighLevel API key

### Optional Variables

- **`ZOHO_REGION`**: Zoho region (`us`, `eu`, or `in`). Default: `us`
- **`HL_API_BASE`**: HighLevel API base URL. Default: `https://api.gohighlevel.com`

## Setup Instructions

### 1. Get Zoho OAuth Credentials

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Create a new Server-based Application
3. Note your Client ID and Client Secret
4. Generate a refresh token using the OAuth flow

### 2. Get HighLevel API Key

1. Log in to your HighLevel account
2. Go to Settings → API
3. Generate a new API key

### 3. Configure Worker Environment Variables

Using Wrangler CLI:

```bash
wrangler secret put ZOHO_CLIENT_ID
wrangler secret put ZOHO_CLIENT_SECRET
wrangler secret put ZOHO_REFRESH_TOKEN
wrangler secret put HL_API_KEY
```

Or via Cloudflare Dashboard:
1. Go to Workers & Pages
2. Select your worker
3. Go to Settings → Variables
4. Add the environment variables as secrets

### 4. Deploy Worker

```bash
wrangler deploy
```

## Usage Examples

### Test Token Refresh

```bash
curl https://your-worker.workers.dev/refresh
```

Expected response:
```json
{
  "access_token": "1000.xxxxx...",
  "expires_in": 3600,
  "api_domain": "https://www.zohoapis.com",
  "token_type": "Bearer"
}
```

### Trigger Contact Sync

```bash
curl https://your-worker.workers.dev/run-sync
```

Expected response:
```
sync triggered; check worker logs for details
```

## Contact Mapping

Zoho CRM fields are mapped to HighLevel as follows:

| Zoho Field | HighLevel Field |
|------------|----------------|
| `First_Name` or `Full_Name` | `firstName` |
| `Last_Name` | `lastName` |
| `Email` | `email` |
| `Phone` | `phone` |

## Monitoring

Check worker logs for detailed sync information:

```bash
wrangler tail
```

Log entries include:
- Token refresh status
- Contact fetch results
- Sync progress
- Error details

## Troubleshooting

### "no_refresh_token_in_env" error
- Ensure `ZOHO_REFRESH_TOKEN` is set in environment variables

### "missing_client_config" error
- Ensure both `ZOHO_CLIENT_ID` and `ZOHO_CLIENT_SECRET` are set

### "Failed to obtain Zoho access token"
- Verify your refresh token is still valid
- Check that client credentials are correct
- Ensure the correct region is configured

### HighLevel sync errors
- Verify `HL_API_KEY` is valid
- Check that the API key has contact creation permissions
- Review worker logs for specific error messages

## Security Notes

- All credentials should be stored as Cloudflare Worker secrets
- Never commit credentials to version control
- Refresh tokens should be rotated periodically
- Use HTTPS for all API communications

## Rate Limits

Be aware of API rate limits:
- **Zoho CRM**: Varies by plan (typically 5,000-10,000 requests/day)
- **HighLevel**: Check your specific plan limits

Consider implementing rate limiting or batching for production use.
