import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import PageTransitions from "@/animation/PageTransitions";
import ProgressBarComponent from "@/components/progress-bar/ProgressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MOLY",
  description:
    "MOLY, permainan monopoly yang ditunjukan untuk pendidikan anak - anak berkebutuhan khusus.",
};

export const viewport: Viewport = {
  themeColor: "#fff11",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBarComponent />
        <PageTransitions>{children}</PageTransitions>
      </body>
    </html>
  );
}
