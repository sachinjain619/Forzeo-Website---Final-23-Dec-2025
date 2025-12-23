<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1OLAw5LdqHtXdYD8Q-CWu61WQABJN9UEd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Cloudflare Turnstile (Bot protection)

This project includes a client-side Turnstile integration and an example server verification endpoint.

1. Create a `.env.local` (or add to your deployment environment):

```
VITE_TURNSTILE_SITEKEY=your_turnstile_site_key_here
TURNSTILE_SECRET=your_turnstile_secret_here
```

2. Client: the site will render an invisible Turnstile widget on page load and send the token to a server endpoint at `/api/verify-turnstile`.

3. Server: example Express handler is included at `server/verify-turnstile.js` (or deploy as a serverless function). The secret (`TURNSTILE_SECRET`) must remain server-side and is used to call Cloudflare's `siteverify` API.

4. Deploy: ensure environment variables are set in your hosting provider and that the verification endpoint is available to the frontend.

If you need a tailored serverless example (Vercel/Netlify/Cloudflare Workers), tell me which platform and I'll add it.  
