import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Majstor Peđa — Kućne popravke Beograd',
  description: 'Profesionalne kućne popravke u Beogradu i okolini. Vodoinstalacije, elektrika, stolarija, farbanje i pločice.',
  keywords: 'majstor beograd, kucne popravke, vodoinstalater, elektricar, stolar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  )
}
