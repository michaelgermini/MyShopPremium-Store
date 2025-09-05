import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './mobile.css'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from '@/components/session-provider'
import { ImprovedHeader } from '@/components/header/improved-header'
import { ImprovedFooter } from '@/components/footer/improved-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyShop - Modern E-commerce',
  description: 'Modern online store with Next.js and shadcn/ui',
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <SessionProvider>
          <ImprovedHeader />
          <main className="flex-1">
            {children}
          </main>
          <ImprovedFooter />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
