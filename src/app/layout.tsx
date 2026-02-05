import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Background } from '@/components/background';
import { Navbar } from '@/components/navbar';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
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
    <html lang="en" suppressHydrationWarning className={jakarta.variable}>
      <body suppressHydrationWarning className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/80 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <Background />
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
