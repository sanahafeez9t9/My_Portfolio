import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
// @ts-ignore: allow side-effect css import without module declarations
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
  metadataBase: new URL("https://sanaz9t9.vercel.app"),
  title: {
    default: "Sana Hafeez | UI/UX Designer & Creative Enthusiast",
    template: "%s | Sana Hafeez Portfolio",
  },
  description:
    "Sana Hafeez - UI/UX Designer, Digital Marketing & Graphic Design Enthusiast from Pakistan. Crafting beautiful digital experiences with creativity and passion. View my portfolio, projects, and get in touch.",
  keywords: [
    "Sana Hafeez",
    "Sana Hafeez Portfolio",
    "Sana Hafeez Designer",
    "UI/UX Designer",
    "UI Designer Pakistan",
    "UX Designer",
    "Digital Marketing",
    "Graphic Design",
    "Web Designer",
    "Creative Designer",
    "Portfolio",
    "Pakistan Designer",
    "Freelance Designer",
    "Visual Designer",
    "Product Designer",
  ],
  authors: [{ name: "Sana Hafeez", url: "https://sanaz9t9.vercel.app" }],
  creator: "Sana Hafeez",
  publisher: "Sana Hafeez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanaz9t9.vercel.app",
    siteName: "Sana Hafeez Portfolio",
    title: "Sana Hafeez | UI/UX Designer & Creative Enthusiast",
    description:
      "Sana Hafeez - UI/UX Designer, Digital Marketing & Graphic Design Enthusiast. Crafting beautiful digital experiences with creativity and passion.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sana Hafeez - UI/UX Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana Hafeez | UI/UX Designer & Creative Enthusiast",
    description:
      "UI/UX Designer, Digital Marketing & Graphic Design Enthusiast - Crafting beautiful digital experiences",
    images: ["/images/og-image.png"],
    creator: "@sanahafeez",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://sanaz9t9.vercel.app",
  },
  category: "portfolio",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#ec4899",
    "msapplication-TileColor": "#ec4899",
  },
}

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sana Hafeez",
  url: "https://sanaz9t9.vercel.app",
  image: "https://sanaz9t9.vercel.app/images/profile.jpg",
  sameAs: [
    "https://www.linkedin.com/in/sana-hafeez-839599361/",
    "https://github.com/sanahafeez",
  ],
  jobTitle: "UI/UX Designer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  description:
    "UI/UX Designer, Digital Marketing & Graphic Design Enthusiast from Pakistan",
  knowsAbout: [
    "UI Design",
    "UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Web Design",
    "Figma",
    "Adobe XD",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "Pakistan",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://sanaz9t9.vercel.app" />
        <meta name="author" content="Sana Hafeez" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
