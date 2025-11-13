// app/layout.tsx
import './globals.css';
import DockNav from '@/components/common/DockNav';
import { Space_Grotesk, Sora } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora',
});
export const metadata = {
  title: 'Shreya Portfolio',
  description: 'Personal portfolio built with Next.js + Tailwind + ReactBits',
  icons: {
    icon: '/favicon.ico',        // default
    shortcut: '/favicon.ico',    // optional
    apple: '/apple-touch-icon.png', // optional (for iOS)
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-black text-cyan-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Page content */}
        {children}

        {/* Dock (client component) */}
        <DockNav />
      </body>
    </html>
  );
}
