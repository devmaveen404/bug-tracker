
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './theme-config.css'
import { Container, Theme, } from '@radix-ui/themes'
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';
import Pathname from './components/Pathname';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bug Tracker',
  description: 'Homepage',
  icons: ['/favicon.png']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="crimson" scaling="100%" hasBackground={false}>
              <Pathname />
              {/* contains page.tsx */}
              <main>
                <Container maxWidth={'1440px'}>
                  {children}
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
