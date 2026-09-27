import { withWebDecoy, honeytokenLink } from '@webdecoy/nextjs';
import { tripwire } from '@webdecoy/node';

const apiKey = process.env.WEBDECOY_API_KEY;
if (!apiKey) {
  console.warn('WEBDECOY_API_KEY is not set: running local rules only, nothing reports to WebDecoy.');
}

// The hidden link rendered in app/layout.tsx. Its path is derived from the API
// key, so every replica arms the same trap without coordinating.
const bait = apiKey ? await honeytokenLink(apiKey) : null;

// Monitor mode (the default) records detections and still serves every request.
// Switch to mode: 'enforce' once you have seen what it would block.
export default withWebDecoy({
  apiKey,
  // Railway rewrites X-Forwarded-For to exactly "<client>, <edge>" (anything
  // the client sent is dropped); the default of 1 would report Railway's edge.
  // Render appends to whatever the client sent and sits behind Cloudflare,
  // which sets CF-Connecting-IP and refuses a request that supplies its own.
  trustProxy: process.env.RENDER ? 'cloudflare' : 'railway',
  rules: bait ? [tripwire({ paths: bait.activePaths, includeDefaults: false })] : [],
});

export const config = {
  // Everything except Railway's healthcheck and Next's own static assets.
  matcher: ['/((?!health|_next/static|_next/image|favicon.ico).*)'],
};
