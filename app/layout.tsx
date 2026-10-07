import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '還可以花多少',
  description: '簡單查看這個月還可以花多少錢。',
  applicationName: '還可以花多少',

  manifest: '/budget-left/manifest.webmanifest',

  icons: {
    icon: '/budget-left/icon.svg',
    apple: '/budget-left/icon.svg',
  },

  appleWebApp: {
    capable: true,
    title: '還可以花多少',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f3ee',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="zh-Hant-TW">
      <body>{children}</body>
    </html>
  );
}
