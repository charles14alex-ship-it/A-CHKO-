import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A-CHKO",
  description: "Watch, connect and discover opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
