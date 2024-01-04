import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FoodZilla - Food Ordering Application',
  description: 'Food Ordering Application',
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </>
  )

}
