import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "AniType",
  description: "AniType v2."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
      {children}
      <Analytics />
      </body>
    </html>
  )
}
