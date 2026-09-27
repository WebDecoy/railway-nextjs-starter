import type { ReactNode } from 'react';
import { honeytokenLink } from '@webdecoy/nextjs';

export const metadata = {
  title: 'Next.js on Railway with WebDecoy',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // A hidden link only bots follow. proxy.ts arms the tripwire on the same path.
  const apiKey = process.env.WEBDECOY_API_KEY;
  const bait = apiKey ? await honeytokenLink(apiKey) : null;
  const { text, ...anchor } = bait?.linkProps ?? { text: '' };

  return (
    <html lang="en">
      <body>
        {children}
        {bait && <a {...anchor}>{text}</a>}
      </body>
    </html>
  );
}
