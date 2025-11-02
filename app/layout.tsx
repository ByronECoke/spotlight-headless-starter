import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Spotlight on Local – Media Network',
  description: 'Local media & podcast features that turn attention into bookings.'
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container py-4 flex items-center gap-4">
            <a href="/" className="font-bold">Spotlight on Local</a>
            <nav className="text-sm text-gray-600">
              <a href="/bristol" className="mr-4">Bristol</a>
              <a href="/cheltenham" className="mr-4">Cheltenham</a>
              <a href="/cambridge" className="mr-4">Cambridge</a>
              <a href="/episodes" className="mr-4">Episodes</a>
              <a href="/snippets">Snippets</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t mt-16">
          <div className="container py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Spotlight on Local
          </div>
        </footer>
      </body>
    </html>
  )
}
