"use client";

/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import { ArrowRight, CaretLeft, CaretRight, MagnifyingGlass, UploadSimple, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { songs } from "../lib/catalog";

export function CatalogHome() {
  const [activeSlug, setActiveSlug] = useState(songs[0].slug);
  const [query, setQuery] = useState("");
  const activeIndex = songs.findIndex((song) => song.slug === activeSlug);
  const activeSong = songs[activeIndex] ?? songs[0];

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [];
    return songs.filter((song) => [song.title, song.englishTitle, song.artist, song.album, song.excerpt]
      .join(" ").toLowerCase().includes(keyword));
  }, [query]);

  const browseSongs = songs.filter((song) => song.slug !== activeSong.slug);
  const move = (direction: number) => {
    const nextIndex = (activeIndex + direction + songs.length) % songs.length;
    setActiveSlug(songs[nextIndex].slug);
    setQuery("");
  };

  return (
    <main className="cinema-home">
      <img className="cinema-backdrop" src={activeSong.hero ?? activeSong.cover} alt="" aria-hidden="true" />
      <div className="cinema-shade" />

      <header className="cinema-header">
        <a className="cinema-logo" href="/" aria-label="ScoreLyric 谱词库首页">
          <strong>ScoreLyric</strong><span>谱词库</span>
        </a>
        <nav className="cinema-nav" aria-label="主导航">
          <a className="active" href="/">歌词库</a>
          <a href="/recognize">识别歌谱</a>
        </nav>
        <a className="cinema-upload" href="/recognize"><UploadSimple size={18} />上传歌谱</a>
      </header>

      <section className="cinema-search-wrap" aria-label="歌词搜索">
        <div className="cinema-search">
          <MagnifyingGlass size={22} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索歌名、歌手、专辑或歌词片段" aria-label="搜索歌词库" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="清除搜索"><X size={18} /></button>}
        </div>
        {query && (
          <div className="search-results" role="status">
            {results.length ? results.map((song) => (
              <button key={song.slug} type="button" onClick={() => { setActiveSlug(song.slug); setQuery(""); }}>
                <img src={song.cover} alt="" /><span><strong>{song.title}</strong><small>{song.artist} · {song.album}</small></span><ArrowRight size={18} />
              </button>
            )) : <p>没有找到匹配的歌词，试试歌手或专辑名称。</p>}
          </div>
        )}
      </section>

      <section className="cinema-feature" aria-live="polite">
        <p className="cinema-kicker">最近收录 · {activeSong.year}</p>
        <h1>{activeSong.title}</h1>
        <p className="cinema-english">{activeSong.englishTitle}</p>
        <p className="cinema-meta">{activeSong.artist}<span />{activeSong.album}</p>
        <blockquote>{activeSong.excerpt}</blockquote>
        <a className="cinema-read" href={`/songs/${activeSong.slug}`}>查看歌词<ArrowRight size={19} /></a>
      </section>

      <section className="cinema-browse" aria-label="最近收录歌词">
        <div className="cinema-browse-heading"><span>最近收录</span><small>{String(activeIndex + 1).padStart(2, "0")} / {String(songs.length).padStart(2, "0")}</small></div>
        <div className="cinema-carousel">
          {browseSongs.map((song) => (
            <button className="album-card" key={song.slug} type="button" onClick={() => { setActiveSlug(song.slug); setQuery(""); }} aria-label={`展示 ${song.title}`}>
              <img src={song.cover} alt={`${song.title} 专辑封面`} />
              <span><strong>{song.title}</strong><small>{song.artist}</small></span>
            </button>
          ))}
        </div>
        <div className="cinema-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="上一首"><CaretLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} aria-label="下一首"><CaretRight size={20} /></button>
        </div>
      </section>
    </main>
  );
}
