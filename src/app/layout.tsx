import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { themeScript } from "@/core/theme/theme-script";
import { portfolioContent } from "@/features/portfolio/data_sources/content/portfolio-content";
import "@/core/styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: portfolioContent.title,
  description: portfolioContent.description,
  metadataBase: new URL("https://shanpadayhag.github.io"),
  openGraph: {
    title: portfolioContent.title,
    description: portfolioContent.description,
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1512" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${fraunces.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
