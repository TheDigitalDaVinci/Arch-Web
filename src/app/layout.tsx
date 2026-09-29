import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";

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
              telephone: "+91-9446518549",
              email: "whiterockkerala@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2nd Floor, Penta Plaza",
                addressLocality: "North Paravur, Ernakulam",
                addressRegion: "Kerala",
                postalCode: "683513",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/w.h.i.t.e_r.o.c.k/",
                "https://www.youtube.com/@W.h.i.t.e.R.o.c.k",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-background text-text">
        <CustomCursor />
        <FloatingButtons />
        {children}
        {/* Noise overlay for premium grain texture */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
