import { Sidebar } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "react-pad",
  description: "a token launchpad",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sidebar>
      {children}
      <Toaster />
      </Sidebar>
  );
}
