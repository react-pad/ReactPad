import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/DynamicProviders";

const openSans = Albert_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "react-pad",
  description: "a token launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
