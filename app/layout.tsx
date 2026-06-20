import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  weight: ["300","400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Stock.io",
  description: "Sistema de gerenciamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${leagueSpartan.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}