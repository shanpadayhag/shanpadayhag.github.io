import { TooltipProvider } from '@/components/atoms/tooltip';
import env from '@/configs/environments/env';
import { cn } from '@/lib/shadcn/utils';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter as FontSans } from "next/font/google";
import '@/assets/css/shadcn.css';
import Navbar from '@/app/_components/organisms/navbar';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.url),
  title: {
    default: 'Portfolio',
    template: `%s | ${env.name}`,
  },
  openGraph: {
    title: 'Shan Padayhag – Software Engineer Portfolio',
    description: "Explore Shan Padayhag's portfolio, showcasing expertise in TypeScript, PHP, Laravel, and Next.js. Discover innovative projects with a focus on database optimization, high-performance solutions, and problem-solving. Based in Manila, Philippines.",
    url: env.url,
    siteName: `${env.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: 'https://lh3.googleusercontent.com/d/1t3_MTe0UIhX392JwzF8k-SFpQpPQjcI5',
        width: 1200,
        height: 630,
        alt: 'Shan Padayhag Portfolio',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${env.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
  keywords: ['Software Engineer', 'TypeScript', 'PHP', 'Laravel', 'Next.js', 'Shan Padayhag', 'Manila'],
  description: "Shan Padayhag's software engineer portfolio highlights skills in TypeScript, PHP, Laravel, Next.js, and database optimization. Based in Manila, Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
