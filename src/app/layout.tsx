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
      <body className={`${splineSans.className} bg-[#000920]`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
