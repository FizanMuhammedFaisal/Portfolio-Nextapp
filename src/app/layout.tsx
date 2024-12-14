import type { Metadata } from 'next'
import './globals.css'
import { Raleway, Montserrat } from 'next/font/google'
import { TransitionProvider } from '@/context/TransitionContext'
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], // Add weights as per your requirements
})

export const metadata: Metadata = {
  title: 'Fizan Muhammed Faisal',
  description: 'Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} ${montserrat.className} antialiased`}
      >
        <TransitionProvider>
          <>{children}</>
        </TransitionProvider>
      </body>
    </html>
  )
}
