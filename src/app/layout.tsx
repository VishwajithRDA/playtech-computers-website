import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'
import { AuthProvider } from '../components/auth-provider'
import { AuthModal } from '../components/auth-modal'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Playtech | Elevate your Digital Experience',
  description:
    'Playtech — buy laptops, desktops, processors, motherboards, RAM, storage, casings and cooling in Sri Lanka. Best prices in LKR with island-wide delivery.',
  generator: 'v0.app',
  icons: {
    icon: 'https://playtech.lk/uploads/brand/playtech-icon.png',
    apple: 'https://playtech.lk/uploads/brand/playtech-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1120',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        {/* GoogleOAuthProvider wraps the app. It securely utilizes your public Client ID */}
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
          <AuthProvider>
            {children}
            <AuthModal />
          </AuthProvider>
        </GoogleOAuthProvider>
        {process.env.NODE_ENV === 'production' ? null : null}
      </body>
    </html>
  )
}