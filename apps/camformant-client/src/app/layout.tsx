import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/navigation-bar/navigation-bar";
import Chat from "@/components/chat-home/chat";
import { AuthProvider } from "@/context/auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camformant Client App",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "icons/camformant-128.png" },
    { rel: "icon", url: "icons/camformant-128.png" },
  ],
};

// New viewport export
export const viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  shrinkToFit: "no",
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavigationBar />
          {children}

          {/* 
          <Chat className="fixed bottom-20 right-0 p-4 bg-gradient-to-br from-orange-400 via-pink-300 to-yellow-300 shadow-2xl rounded-full text-white transform transition-transform hover:scale-105" />
          */}
        </AuthProvider>
      </body>
    </html>
  );
}
