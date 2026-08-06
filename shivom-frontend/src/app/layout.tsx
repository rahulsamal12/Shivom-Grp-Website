import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButton } from "@/components/common/FloatingContactButton";
import { InitialLoader } from "@/components/common/InitialLoader";
import Script from "next/script";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Shivom Group",
    default: "Shivom Group | Infrastructure, Renewable Energy & Manufacturing",
  },
  description: "Shivom Group is a premier Odisha-based enterprise specializing in power distribution, solar EPC, civil infrastructure, and PSC pole manufacturing.",
  keywords: ["Infrastructure", "Solar EPC", "PSC Poles", "Odisha", "Power Distribution", "Civil Engineering"],
  authors: [{ name: "Shivom Group" }],
  verification: {
    google: "google-site-verification-placeholder",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shivomgroup.in/",
    siteName: "Shivom Group",
    title: "Shivom Group | Infrastructure, Renewable Energy & Manufacturing",
    description: "Delivering government-grade utility solutions across Odisha.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Shivom Group Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ShivomGroup",
    creator: "@ShivomGroup",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Shivom Group",
    "url": "https://shivomgroup.in",
    "logo": "https://shivomgroup.in/logo.png",
    "description": "Premier infrastructure, renewable energy, and PSC pole manufacturing enterprise in Odisha.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "addressCountry": "IN"
    }
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${epilogue.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans">
        <InitialLoader />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <QueryProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingContactButton />
        </QueryProvider>
      </body>
    </html>
  );
}
