import type { Metadata } from "next";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { I18nProvider, type Locale } from "@/i18n";
import "./globals.css";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mn-explorer - Preview",
  description: "Midnight Explorer Preview",
};

async function detectLocaleFromHeaders(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") ?? "";
  const lower = acceptLanguage.toLowerCase();

  if (lower.startsWith("ja")) {
    return "ja";
  }

  return "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await detectLocaleFromHeaders();

  return (
    <html lang={initialLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <GoogleAnalytics />
        <I18nProvider initialLocale={initialLocale}>
          <ErrorBoundary>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ErrorBoundary>
        </I18nProvider>
      </body>
    </html>
  );
}
