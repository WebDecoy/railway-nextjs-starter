export function GET() {
  return Response.json({ message: `Hello from ${process.env.RENDER ? 'Render' : 'Railway'}` });
}
