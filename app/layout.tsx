import type { Metadata } from "next";
import "./globals.css";
import { Lalezar } from "next/font/google";
import { UsernameProvider } from "./context/UsernameContext";
const lalezar = Lalezar({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "KnowUrLove",
  description: "Get to now your Love More...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lalezar.className}>
        <UsernameProvider>{children}</UsernameProvider>
      </body>
    </html>
  );
}
