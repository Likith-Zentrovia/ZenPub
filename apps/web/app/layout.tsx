import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: {
    default: "ZenPub — Read EPUB Files Online | Free Browser-Based EPUB Viewer",
    template: "%s | ZenPub",
  },
  description:
    "Read EPUB files directly in your browser. Free, fast, and private. No signup required. Upload your EPUB and start reading instantly with customizable themes and fonts.",
  keywords: [
    "epub reader",
    "read epub online",
    "epub viewer",
    "open epub in browser",
    "epub reader online",
    "free epub reader",
    "epub reader no install",
  ],
  openGraph: {
    title: "ZenPub — Read EPUB Files Online",
    description:
      "Free browser-based EPUB viewer. Upload and read instantly. No signup required.",
    type: "website",
    locale: "en_US",
    siteName: "ZenPub",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenPub — Read EPUB Files Online",
    description:
      "Free browser-based EPUB viewer. Upload and read instantly. No signup required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />

        {adsensePubId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}

        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
