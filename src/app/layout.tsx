import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Shan Padayhag — Software Engineer",
  description:
    "A performance-minded software engineer focused on reliable systems and practical product engineering.",
  icons: {
    icon: "/icon.svg",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Design direction: calibrated engineering instrument — graphite field, warm amber measurement signals, and evidence-first typography. */}
        {children}
      </body>
    </html>
  );
}
