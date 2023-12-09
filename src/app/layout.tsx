import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Spline_Sans } from 'next/font/google'

const splineSans = Spline_Sans({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'Ricardo Bizerra',
  description: 'Site oficial de Ricardo Bizerra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${splineSans.className} bg-blue-300 p-8 max-w-[1200px] ml-auto mr-auto`}>
        <Navbar />
        <line className="w-screen absolute left-0 overflow-hidden h-[1px] bg-white mb-8" />
        {children}
      </body>
    </html>
  )
}
