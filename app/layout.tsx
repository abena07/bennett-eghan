import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bennett-eghan.com"),
  title: {
    default: "phil's portfolio | swe",
    template: "%s | phil",
  },
  description: "explore phil's projects, blog, and insights.",
  twitter: {
    card: "summary_large_image",
    site: "@1bp7l_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmMono.variable}>
      <body>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="4534085d-50c5-419d-a512-87a2e21d79aa"
          strategy="afterInteractive"
        />
        <div className="min-h-screen flex flex-col items-center px-6 w-full">
          <div className="w-full max-w-2xl flex flex-col pt-20 sm:pt-28 md:pt-32 lg:pt-40">
            <main className="w-full mt-0.5 flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
