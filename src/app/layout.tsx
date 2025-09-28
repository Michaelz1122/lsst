import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Michael Zahy - Performance Marketing Expert | Media Buyer & Growth Strategist",
    template: "%s | Michael Zahy Marketing"
  },
  description: "Professional performance marketing specialist and media buyer delivering exceptional ROI through strategic Facebook ads, Meta campaigns, and data-driven digital marketing solutions. Expert in CAC optimization, LTV maximization, and scalable growth strategies for businesses in Egypt and worldwide.",
  keywords: [
    "Michael Zahy", "Performance Marketing", "Media Buyer", "Meta Ads", "Facebook Ads", 
    "Digital Marketing", "ROI Optimization", "Growth Hacking", "CAC Calculator", "LTV Calculator", 
    "Marketing Strategy", "Conversion Rate Optimization", "Ad Budget Calculator", "Break-even Analysis",
    "Performance Marketing Expert", "Media Buying Specialist", "Facebook Advertising", "Meta Campaigns",
    "Digital Marketing Strategy", "Marketing ROI", "Growth Marketing", "Marketing Analytics",
    "Egypt Marketing", "Cairo Digital Marketing", "Middle East Marketing", "E-commerce Marketing",
    "Lead Generation", "Social Media Marketing", "PPC Advertising", "Marketing Automation",
    "Customer Acquisition", "Marketing Funnels", "A/B Testing", "Campaign Optimization"
  ],
  authors: [{ name: "Michael Zahy", url: "https://michaelzahy.com" }],
  creator: "Michael Zahy",
  publisher: "Michael Zahy Marketing",
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
    url: "https://michaelzahy.com",
    siteName: "Michael Zahy Marketing",
    title: "Michael Zahy - Performance Marketing Expert & Media Buyer",
    description: "Professional performance marketing specialist delivering exceptional ROI through strategic digital advertising campaigns and data-driven optimization. Serving clients in Egypt and globally.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Michael Zahy - Performance Marketing Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Zahy - Performance Marketing Expert",
    description: "Professional media buyer and performance marketing specialist delivering exceptional ROI through strategic digital advertising campaigns.",
    images: ["/twitter-image.jpg"],
    creator: "@michaelzahy",
    site: "@michaelzahy",
  },
  alternates: {
    canonical: "https://michaelzahy.com",
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "marketing",
  classification: "Business, Marketing, Digital Marketing, Advertising",
  metadataBase: new URL('https://michaelzahy.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'twitter:label1': 'Services',
    'twitter:data1': 'Performance Marketing, Media Buying, Growth Hacking',
    'twitter:label2': 'Location',
    'twitter:data2': 'Egypt, Middle East, Global',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
