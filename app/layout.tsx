import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Constructeur de Food Trucks au Maroc | Marketplace',
  description: 'Découvrez notre gamme complète de food trucks personnalisés au Maroc. Construction sur mesure, design moderne et équipements professionnels.',
  keywords: 'food truck maroc, construction food truck, camion restaurant, food truck personnalisé',
  authors: [{ name: 'Constructeur de Food Trucks au Maroc' }],
  openGraph: {
    title: 'Constructeur de Food Trucks au Maroc',
    description: 'Découvrez notre gamme complète de food trucks personnalisés au Maroc.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1E3A8A',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
