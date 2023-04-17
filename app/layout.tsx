import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
