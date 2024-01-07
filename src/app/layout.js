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
    <html lang="en">
      {/* <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"/>
      </head> */}
      <body className={inter.className}>
        <div className='flex flex-col justify-between'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )

}
