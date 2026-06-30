import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "K12 智能组卷",
  description: "K-12 数学考试智能出卷与题库管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        {/* KaTeX CSS — 本地文件，避免 CDN 被墙导致公式字符断裂 */}
        <link rel="stylesheet" href="/katex.min.css" />
      </head>
      <body className="h-full flex flex-col font-sans overflow-hidden">
        <TooltipProvider>
          <Navbar />
          <div className="flex-1 overflow-hidden">{children}</div>
        </TooltipProvider>
      </body>
    </html>
  );
}
