"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { companyInfo } from "@/data/content";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function FloatingButtons() {
  const isMobile = useIsMobile();

  // Clean whatsapp number (remove + and spaces)
  const whatsappNumber = companyInfo.whatsapp.replace(/[^0-9]/g, "");

  return (
    <>
      {/* ===== Bottom-right floating buttons ===== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Phone Button — Mobile only */}
        {isMobile && (
          <a
            href={`tel:${companyInfo.phone}`}
            aria-label="Call White Rock Builders"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-black/10 transition-shadow duration-300 hover:shadow-xl"
          >
            <FaPhoneAlt className="text-lg text-secondary" />
          </a>
        )}

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl"
          style={{ backgroundColor: "#25D366" }}
        >
          <FaWhatsapp className="text-2xl text-white" />
        </a>
      </div>

      {/* ===== Desktop "Contact Us" Side Button ===== */}
      {!isMobile && (
        <a
          href={companyInfo.consultationForm}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book Consultation / Contact White Rock"
          className="fixed right-0 top-1/2 z-50 origin-center -translate-y-1/2"
        >
          <div className="group flex -rotate-90 origin-right translate-x-[-50%] items-center gap-2 rounded-t-lg border border-b-0 border-accent/30 bg-secondary px-5 py-2.5 transition-all duration-300 hover:bg-accent hover:text-secondary shadow-lg shadow-black/30">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-colors duration-300 group-hover:text-secondary">
              Contact Us
            </span>
          </div>
        </a>
      )}

      {/* ===== Mobile bottom "Contact Us" bar ===== */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-accent/20 bg-secondary/95 backdrop-blur-lg">
          <a
            href={companyInfo.consultationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3.5"
            aria-label="Book Consultation / Contact White Rock"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
              Contact Us
            </span>
          </a>
        </div>
      )}
    </>
  );
}
