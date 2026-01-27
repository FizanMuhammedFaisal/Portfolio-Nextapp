import type { Metadata } from 'next'
import './globals.css'
import { Raleway, Montserrat } from 'next/font/google'
import { TransitionProvider } from '@/context/TransitionContext'
import Header from '@/components/Header'
import { HeaderProvider } from '@/context/HeaderContext'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const siteUrl = 'https://fizanfaisal.vercel.app'

export const metadata: Metadata = {
  title: 'Fizan M Faisal | Software Engineer',
  description:
    'Software Engineer passionate about building scalable applications, exploring system design, and sharing insights on modern web development.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Fizan M Faisal | Software Engineer',
    description:
      'Software Engineer passionate about building scalable applications, exploring system design, and sharing insights on modern web development.',
    url: siteUrl,
    siteName: 'Fizan M Faisal',
    images: [
      {
        url: `${siteUrl}/og?title=Fizan M Faisal`,
        width: 1200,
        height: 630,
        alt: 'Fizan M Faisal - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fizan M Faisal | Software Engineer',
    description:
      'Software Engineer passionate about building scalable applications, exploring system design, and sharing insights on modern web development.',
    images: [`${siteUrl}/og?title=Fizan M Faisal`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} ${montserrat.className} antialiased bg-black`}
      >
        <HeaderProvider>
          <TransitionProvider>
            <Header />
            <>{children}</>
          </TransitionProvider>
        </HeaderProvider>
      </body>
    </html>
  )
}
