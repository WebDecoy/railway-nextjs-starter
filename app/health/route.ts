// Railway's healthcheck. Excluded from the proxy matcher, so it is never analyzed.
export function GET() {
  return Response.json({ status: 'ok' });
}
