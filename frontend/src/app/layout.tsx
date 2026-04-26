import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToasterProvider } from '@/components/ToasterProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Espaço Livre',
  description: 'Um aplicativo de alocação de espaços',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link
          id="favicon-light"
          rel="icon"
          href="/favicon_claro.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          id="favicon-dark"
          rel="icon"
          href="/favicon_escuro.ico"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100`}
      >
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
