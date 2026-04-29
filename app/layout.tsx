import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Pulse Studio — Pre-test marketing & decode shelves, before you spend',
    template: '%s · Pulse Studio',
  },
  description:
    'Two products for modern marketers: Content Pulse simulates real consumers reacting to your creative; Shelf Pulse scrapes the live shelf so you launch into a market you actually understand.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://pulse-studio.example.com',
  ),
  openGraph: {
    type: 'website',
    title: 'Pulse Studio',
    description: 'Pre-test creative · Decode the shelf · Ship with confidence.',
    siteName: 'Pulse Studio',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
