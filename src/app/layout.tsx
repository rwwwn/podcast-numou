import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Fustat, Noto_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { HeroHeader } from "@/components/Header";        // ⬅️ الهيدر
import FooterSection from "@/components/Footer";          // ⬅️ الفوتر

const fustat = Fustat({ subsets: ["arabic","latin"], weight: ["400","600","700"], variable: "--font-fustat" });
const noto   = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400","600"], variable: "--font-brando" });

export const metadata: Metadata = { /* كما هي عندك */ };
export const viewport: Viewport = { /* كما هي عندك */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${fustat.variable} ${noto.variable}`}>
      <body className="min-h-dvh flex flex-col bg-background text-foreground antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <HeroHeader />                          {/* ⬅️ الهيدر ثابت */}
            <main id="main" className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <FooterSection />                       {/* ⬅️ الفوتر ثابت */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}