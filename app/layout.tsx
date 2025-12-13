import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Sana Hafeez | UI/UX Designer & Creative Enthusiast",
  description:
    "UI/UX Designer, Digital Marketing & Graphic Design Enthusiast - Crafting beautiful digital experiences with creativity and passion",
  keywords: ["Sana Hafeez", "UI/UX Designer", "Digital Marketing", "Graphic Design", "Portfolio", "Pakistan"],
  authors: [{ name: "Sana Hafeez" }],
  creator: "Sana Hafeez",
  openGraph: {
    title: "Sana Hafeez | UI/UX Designer & Creative Enthusiast",
    description:
      "UI/UX Designer, Digital Marketing & Graphic Design Enthusiast - Crafting beautiful digital experiences",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana Hafeez | UI/UX Designer & Creative Enthusiast",
    description: "UI/UX Designer, Digital Marketing & Graphic Design Enthusiast",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
