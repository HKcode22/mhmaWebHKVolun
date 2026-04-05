import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mountain House Muslim Association – Strengthening The Ties of Brotherhood",
  description: "Strengthening The Bond of brotherhood - MAKE A DIFFERENCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
