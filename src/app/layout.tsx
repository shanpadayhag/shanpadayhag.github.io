import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { portfolio } from "@/features/portfolio";
import "./globals.css";
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: portfolio.title,
  description: portfolio.description,
  metadataBase: new URL("https://shanpadayhag.github.io"),
  openGraph: {
    title: portfolio.title,
    description: portfolio.description,
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';try{var s=localStorage.getItem('portfolio-theme');if(s==='light'||s==='dark')t=s;}catch{}document.documentElement.dataset.theme=t;})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
