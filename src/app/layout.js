import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/providers/AuthProvider'
import { EdgeStoreProvider } from '@/providers/EdgeStoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Textrade',
  description: 'Your premier destination for a seamless, service-oriented exchange platform offering a diverse range of used college essentials. Connect effortlessly, trade smartly, and elevate your academic journey. 📚✨',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <EdgeStoreProvider>
          <body className={inter.className}>
            <Navbar/>
            {children}
          </body>
        </EdgeStoreProvider>
      </AuthProvider>
    </html>
  )
}
