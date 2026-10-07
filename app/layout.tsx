import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '每月預算',
  description: '簡單查看這個月還可以花多少錢。',
  applicationName: '還可以花多少',
  appleWebApp: {
    capable: true,
    title: '還可以花多少',
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
