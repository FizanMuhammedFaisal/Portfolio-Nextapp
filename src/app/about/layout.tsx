import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Fizan Muhammed Faisal',
  description:
    'Hey, I’m Fizan who loves learning and diving deep into   how things work. I’m especially into low-level systems and design I enjoy building clean, thoughtful interfaces, but I also like breaking things down to understand them better. Whether it’s debugging something weird or trying out a new layout idea, I’m up for it',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
