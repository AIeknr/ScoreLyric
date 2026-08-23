import Link from "next/link";
import { BookOpenText, UploadSimple } from "@phosphor-icons/react/dist/ssr";

export function Logo() {
  return <Link href="/" className="logo" aria-label="ScoreLyric 谱词库首页"><strong>ScoreLyric</strong><small>谱词库</small></Link>;
}

export function SiteHeader({ active = "library" }: { active?: "library" | "recognize" }) {
  return <header className="site-header"><div className="header-inner"><Logo /><nav className="main-nav" aria-label="主导航"><Link className={active === "library" ? "active" : ""} href="/"><BookOpenText />歌词库</Link><Link className={active === "recognize" ? "active" : ""} href="/recognize"><UploadSimple />识别歌谱</Link></nav></div></header>;
}

export function Footer() {
  return <footer className="footer"><div><Logo /><p>让每一份歌谱里的文字，都能被看见、整理与传唱。</p></div><p>ScoreLyric · 个人开发预览版</p></footer>;
}
