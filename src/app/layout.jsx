import localFont from "next/font/local";
import { Suspense } from "react";
import Header from "@/components/Header";
import "./globals.css";

const proxima = localFont({
  src: "../fonts/proximanova_regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-proxima",
  display: "swap",
});

export const metadata = {
  title: { default: "Parcel — Everyday things, picked well", template: "%s — Parcel" },
  description: "A small product showcase built with Next.js and the FakeStore API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={proxima.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Suspense fallback={<div />}>
          <Header />
        </Suspense>
        <main id="main" className="wrap">
          {children}
        </main>
      </body>
    </html>
  );
}
