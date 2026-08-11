import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ptxtravel.com'),
  title: {
    template: '%s | PTX Travel',
    default: 'PTX Travel | Khám phá thế giới cùng bạn',
  },
  description: "Chuyên cung cấp tour du lịch trong nước và quốc tế, mang đến dịch vụ chuyên nghiệp, tận tâm và những trải nghiệm đáng nhớ cho mỗi hành trình.",
  openGraph: {
    title: 'PTX Travel | Khám phá thế giới cùng bạn',
    description: 'Chuyên cung cấp tour du lịch trong nước và quốc tế, mang đến dịch vụ chuyên nghiệp, tận tâm và những trải nghiệm đáng nhớ cho mỗi hành trình.',
    url: 'https://ptxtravel.com',
    siteName: 'PTX Travel',
    images: [
      {
        url: '/assets/tour_halong.png',
        width: 1200,
        height: 630,
        alt: 'PTX Travel',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PTX Travel | Khám phá thế giới cùng bạn',
    description: 'Chuyên cung cấp tour du lịch trong nước và quốc tế, mang đến dịch vụ chuyên nghiệp, tận tâm và những trải nghiệm đáng nhớ cho mỗi hành trình.',
    images: ['/assets/tour_halong.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="h-full bg-slate-50 font-body text-slate-900">
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KWKNC6YQJZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KWKNC6YQJZ');
          `}
        </Script>
      </body>
    </html>
  );
}
