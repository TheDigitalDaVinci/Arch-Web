import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "White Rock Builders & Interiors | Crafting Timeless Spaces",
  description:
    "White Rock Builders & Interiors designs and builds premium residences, villas, commercial spaces and luxury interiors. Award-winning architecture and construction excellence.",
  keywords: [
    "luxury builders",
    "interior design",
    "premium construction",
    "architecture",
    "luxury homes",
    "villa construction",
    "White Rock Builders",
  ],
  authors: [{ name: "White Rock Builders & Interiors" }],
  openGraph: {
    title: "White Rock Builders & Interiors | Crafting Timeless Spaces",
    description:
      "We design and build premium residences, villas, commercial spaces and luxury interiors.",
    type: "website",
    locale: "en_US",
    siteName: "White Rock Builders & Interiors",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Rock Builders & Interiors",
    description:
      "Crafting Timeless Spaces — Premium architecture, construction, and interior design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="font-sans antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "White Rock Builders & Interiors",
              description:
                "Premium architecture, construction, and interior design company.",
              url: "https://whiterockbuilders.com",
              telephone: "+1-310-555-0187",
              email: "hello@whiterockbuilders.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2847 Wilshire Boulevard, Suite 400",
                addressLocality: "Los Angeles",
                addressRegion: "CA",
                postalCode: "90010",
                addressCountry: "US",
              },
              sameAs: [
                "https://instagram.com/whiterockbuilders",
                "https://linkedin.com/company/whiterockbuilders",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-background text-text">
        {children}
        {/* Noise overlay for premium grain texture */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
