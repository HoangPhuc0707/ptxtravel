import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";

import { LanguageProvider } from "@/components/layout/LanguageProvider";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[76px]">{children}</main>
        <Footer />
        <FloatingContact />
      </div>
    </LanguageProvider>
  );
}
