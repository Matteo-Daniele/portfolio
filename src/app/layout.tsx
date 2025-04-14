import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "../components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Matteo Daniele portfolio",
  description: "Personal portfolio of Matte Daniele, Full-Stack Developer",
  openGraph: {
    title: "Matteo Daniele portfolio",
    description: "Personal portfolio of Matte Daniele, Full-Stack Developer",
    url: "https://matteodaniele.vercel.app",
    siteName: "Matteo Daniele",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Matteo Daniele Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matteo Daniele portfolio",
    description: "Personal portfolio of Matte Daniele, Full-Stack Developer",
    images: ["/Logo.png"],
    creator: "@matteodaniele"
  },
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

