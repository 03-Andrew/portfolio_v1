import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import ScrollProgress from "./components/ScrollProgress";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Backend Developer",
  description:
    "Portfolio of a backend developer aspiring to cloud engineering. Systems, AI integrations, and full-stack projects.",
  openGraph: {
    title: "Backend Developer",
    description: "Portfolio of a backend developer aspiring to cloud engineering. Systems, AI integrations, and full-stack projects.",
    url: "https://dreww.space",
    siteName: "Andrei's Portfolio",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Developer",
    description: "Portfolio of a backend developer aspiring to cloud engineering. Systems, AI integrations, and full-stack projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geist.variable} ${geistMono.variable} ${sora.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme:light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-canvas text-text-primary font-sans">
        <ThemeProvider>
          <ScrollProgress />

          <div aria-hidden="true" className="hidden lg:block fixed inset-y-0 left-[max(1.5rem,calc((100vw-1024px)/2-28px))] w-px bg-gradient-to-b from-transparent via-orange/25 to-transparent pointer-events-none z-0" />
          <div aria-hidden="true" className="hidden lg:block fixed inset-y-0 right-[max(1.5rem,calc((100vw-1024px)/2-28px))] w-px bg-gradient-to-b from-transparent via-orange/25 to-transparent pointer-events-none z-0" />

          <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
