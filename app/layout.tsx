import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import "./globals.css";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Looking Forward | Supportive Housing",
  description:
    "Looking Forward offers safe, structured supportive housing with dignity, community, and a clear path to stability.",
  metadataBase: new URL("https://landingforward.com"),
  openGraph: {
    title: "Looking Forward",
    description: "A safe place to land — and move forward.",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libre.variable} ${montserrat.variable}`}>
      <body className="font-[var(--font-montserrat)]">{children}</body>
    </html>
  );
}
