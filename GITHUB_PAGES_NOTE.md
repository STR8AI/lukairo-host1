# GitHub Pages Deployment Note

## Important: `_headers` File Not Supported on GitHub Pages

**The `_headers` file in this repository is NOT used by GitHub Pages.**

GitHub Pages does not support custom headers files. The `_headers` file is only used by:
- Cloudflare Pages
- Netlify
- Some other hosting providers

### Current Situation

If you're experiencing issues with the Santeh service pages appearing "black" or unstyled:

1. **Tailwind CSS is loaded from CDN**: The pages use `<script src="https://cdn.tailwindcss.com"></script>`
2. **No CSP blocking on GitHub Pages**: Since GitHub Pages doesn't use `_headers`, there's no Content Security Policy blocking the CDN
3. **Likely causes of black/unstyled pages**:
   - Browser cache (hard refresh with Ctrl+Shift+R or Cmd+Shift+R)
   - Ad blocker or browser extension blocking CDN
   - Network/firewall blocking the Tailwind CDN domain
   - Old cached version before the build fix

### Solutions

#### For Users Seeing Black/Unstyled Pages:

1. **Hard Refresh**: Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Clear Browser Cache**: Clear your browser's cache and reload
3. **Check Browser Console**: Open DevTools (F12) and check the Console tab for errors
4. **Try Different Browser**: Test in an incognito/private window or different browser
5. **Check Ad Blockers**: Temporarily disable ad blockers that might block CDN resources

#### For Developers:

If you need to enforce CSP or custom headers, consider:

1. **Move to Netlify or Cloudflare Pages** (but note: repo policy is GitHub Pages only)
2. **Use a different Tailwind approach**:
   - Build Tailwind locally and include the CSS file
   - Use Tailwind CLI to generate a static CSS file
   - Self-host Tailwind CSS instead of using CDN

### Build Process

The build command (`npm run build`) copies all files including `_headers` to the `dist/` folder, but GitHub Pages ignores the `_headers` file during deployment.

### Verifying the Deployment

After deployment, check:
1. View source of the deployed page
2. Confirm `<script src="https://cdn.tailwindcss.com"></script>` is present
3. Open browser console and check for any errors loading Tailwind
4. Network tab should show successful load of `cdn.tailwindcss.com`

If Tailwind CDN loads successfully but styles don't apply, check for:
- JavaScript errors in console
- Conflicting CSS
- Browser extensions interfering with Tailwind

---

**Last Updated**: December 10, 2025
