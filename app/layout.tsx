import Nav from '@/components/nav'
import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'IceByte',
  description: 'Built by nerds, for nerds.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
