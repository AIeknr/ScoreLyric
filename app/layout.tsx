import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ScoreLyric 谱词库", template: "%s · ScoreLyric" },
  description: "从歌谱识别、校对并整理中英文歌词，建立可搜索的个人歌词档案。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN"><body>{children}</body></html>
  );
}
