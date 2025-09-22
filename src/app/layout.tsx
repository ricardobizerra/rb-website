import './globals.css';
import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Background } from '@/components/background';
import { Navbar } from '@/components/navbar';

const splineSans = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Ricardo Bizerra',
  description: 'Ricardo Bizerra - Full Stack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={splineSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/80 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <Background />
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
