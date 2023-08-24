import './globals.scss'
import React from 'react'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

const jost = Jost({ subsets: ['latin'] })

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
      <body className={`${jost.className} pageContent`}>{children}</body>
    </html>
  )
}
