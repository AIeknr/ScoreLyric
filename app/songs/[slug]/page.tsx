import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, SiteHeader } from "../../../components/site-shell";
import { findSong, songs } from "../../../lib/catalog";

/* eslint-disable @next/next/no-img-element */

export function generateStaticParams() {
  return songs.map((song) => ({ slug: song.slug }));
}

export default async function SongPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const song = findSong(slug);
  if (!song) notFound();

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="detail-wrap">
        <Link href="/" className="back-link"><CaretLeft />返回歌词库</Link>
        <section className="song-hero">
          <img className="detail-cover" src={song.cover} alt={`${song.title} 专辑封面`} />
          <div className="song-hero-copy">
            <p className="eyebrow">LYRIC RECORD · {song.source}</p>
            <h1>{song.title}</h1>
            <p className="detail-en-title">{song.englishTitle}</p>
            <dl>
              <div><dt>演唱 / 作者</dt><dd>{song.artist}</dd></div>
              <div><dt>专辑 / 收录</dt><dd>{song.album}</dd></div>
              <div><dt>年份</dt><dd>{song.year}</dd></div>
            </dl>
          </div>
        </section>
        <section className="lyric-toolbar">
          <div><button className="selected">中英双语</button><button>中文</button><button>英文</button></div>
          <div><button className="selected">完整段落</button><button>精简段落</button></div>
        </section>
        <section className="lyric-sheet">
          <div className="sheet-margin"><span>校对版本</span><strong>v1.0</strong><span>共 {song.lyrics.length} 段</span></div>
          <div className="lyric-content">
            {song.lyrics.map((section, idx) => (
              <article className="lyric-section" key={`${section.type}-${idx}`}>
                <header><span>{section.type}</span>{section.repeats && <b>× {section.repeats}</b>}</header>
                {section.zh.map((line, lineIndex) => <div className="lyric-line" key={line}><p>{line}</p><p>{section.en[lineIndex]}</p></div>)}
              </article>
            ))}
          </div>
        </section>
        <aside className="source-note"><span>来源说明</span><p>本页为产品流程示例。正式版本将显示原始歌谱缩略图、识别置信度、校对者和修改历史。</p></aside>
      </main>
      <Footer />
    </div>
  );
}
