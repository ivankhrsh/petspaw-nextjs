import './globals.scss'
import React from 'react'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { PetsPaw } from '@/public/svg';
import NavigationContent from '@/components/NavigationContent/NavigationContent';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pets Paw'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jost.className} page`}>
        <div className="pageDesktopContent">
        <div className={'logo'}>
          <PetsPaw/>
        </div>
        <h1 className={'title'}>Hi!👋</h1>
        <h2 className={'welcomeMessage'}>Welcome to MacPaw Bootcamp 2023</h2>
        <h2 className={'linksTitle'}>Lets start using The Cat API</h2>
        <div className={'navigationContent'}>
          <NavigationContent/>
        </div>
        </div>
        {children}
      </body>
    </html>
  )
}
