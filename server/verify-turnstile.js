// Express example: POST /verify-turnstile
// Expects JSON body: { token: '...' }
// Set TURNSTILE_SECRET in your server environment (do NOT commit it).

const express = require('express');
const fetch = require('node-fetch'); // if using Node 18+, can use global fetch
const app = express();
app.use(express.json());

app.post('/verify-turnstile', async (req, res) => {
  try {
    const token = req.body?.token;
    if (!token) return res.status(400).json({ success: false, message: 'Token missing' });

    const secret = process.env.TURNSTILE_SECRET;
    if (!secret) return res.status(500).json({ success: false, message: 'Server verification secret not configured' });

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const verifyResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await verifyResp.json();

    if (data.success) {
      return res.json({ success: true, challenge_ts: data.challenge_ts, hostname: data.hostname });
    }

    return res.status(400).json({ success: false, error: data });
  } catch (err) {
    console.error('Verification error', err);
    return res.status(500).json({ success: false, message: 'Unexpected error' });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 8787;
  app.listen(PORT, () => console.log(`Turnstile verification server listening on ${PORT}`));
}

module.exports = app;