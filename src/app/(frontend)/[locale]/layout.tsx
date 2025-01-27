import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { cn } from "src/utilities/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/globals/Footer/Component";
import { Header } from "@/globals/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";
import { Locale } from "@/i18n/config";
import { LivePreviewListener } from "@/components/LivePreviewListener";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, "twp")}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body className="max-w-screen overflow-x-clip lg:overflow-y-auto">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {/* <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            /> */}
            {isEnabled && <LivePreviewListener />}

            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@adrianmaj1122",
  },
};
