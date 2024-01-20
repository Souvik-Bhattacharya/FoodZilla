import { Mooli } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const mooli = Mooli({ subsets: ['latin'], display: 'swap', weight: '400' })

export const metadata = {
  title: 'FoodZilla',
  description: 'A Food Ordering Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mooli.className}>
        <div className='flex flex-col justify-between inset-0'>
          <Navbar />
          {children}
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
