// Rendered per request, so the layout reads WEBDECOY_API_KEY at runtime rather
// than at build time.
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ font: '16px/1.5 system-ui, sans-serif', maxWidth: '40rem', margin: '4rem auto', padding: '0 1rem' }}>
      <h1>It&apos;s running.</h1>
      <p>This Next.js app is on Railway with WebDecoy bot detection in front of every route.</p>
      <p>Prove it reports: request any page with the test user agent, then open Detections in WebDecoy.</p>
      <pre>
        <code>curl -A &quot;WebDecoy-Test/1.0&quot; https://YOUR-APP.up.railway.app/</code>
      </pre>
      <p>
        Replace this page with your app. <code>/api/hello</code> is a route handler behind the same proxy.
      </p>
    </main>
  );
}
