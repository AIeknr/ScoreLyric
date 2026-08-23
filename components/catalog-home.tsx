"use client";

/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import { ArrowDown, ArrowRight, CaretLeft, CaretRight, Heart, MagnifyingGlass, UploadSimple, X } from "@phosphor-icons/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { songs } from "../lib/catalog";

const languages = ["中文", "粤语", "English", "日语", "韩语", "法语"];
const decades = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
const genres = ["流行", "民谣", "摇滚", "古典", "爵士", "R&B / 灵魂", "儿童音乐"];
const sources = ["手工录入", "扫描谱集", "出版印刷", "网络收集", "用户上传"];

export function CatalogHome({ featuredSlugs }: { featuredSlugs: string[] }) {
  const featuredSongs = useMemo(() => {
    const configured = featuredSlugs.map((slug) => songs.find((song) => song.slug === slug)).filter((song): song is (typeof songs)[number] => Boolean(song));
    return configured.length ? configured : songs;
  }, [featuredSlugs]);
  const [activeSlug, setActiveSlug] = useState(featuredSongs[0].slug);
  const [query, setQuery] = useState("");
  const [paused, setPaused] = useState(false);
  const activeIndex = featuredSongs.findIndex((song) => song.slug === activeSlug);
  const activeSong = featuredSongs[activeIndex] ?? featuredSongs[0];
  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [];
    return songs.filter((song) => [song.title, song.englishTitle, song.artist, song.album, song.excerpt].join(" ").toLowerCase().includes(keyword));
  }, [query]);

  const move = (direction: number) => {
    const nextIndex = (activeIndex + direction + featuredSongs.length) % featuredSongs.length;
    setActiveSlug(featuredSongs[nextIndex].slug);
    setQuery("");
  };

  useEffect(() => {
    if (paused || featuredSongs.length < 2) return;
    const timer = window.setInterval(() => move(1), 6500);
    return () => window.clearInterval(timer);
    // Restart after each selection so every slide receives a full interval.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug, paused, featuredSongs.length]);

  return <main className="catalog-page">
    <section className="cinema-home" aria-label="本期精选" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <img key={activeSong.slug} className="cinema-backdrop cinema-backdrop-enter" src={activeSong.hero ?? activeSong.cover} alt="" aria-hidden="true" />
      <div className="cinema-shade" />
      <header className="cinema-header"><a className="cinema-logo" href="/" aria-label="ScoreLyric 谱词库首页"><strong>ScoreLyric</strong><span>谱词库</span></a><nav className="cinema-nav" aria-label="主导航"><a className="active" href="#library">歌词库</a><a href="/recognize">识别歌谱</a></nav><a className="cinema-upload" href="/recognize"><UploadSimple size={18} />上传歌谱</a></header>
      <section className="cinema-search-wrap" aria-label="歌词搜索"><div className="cinema-search"><MagnifyingGlass size={22} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索歌名、歌手、专辑或歌词片段" aria-label="搜索歌词库" />{query && <button type="button" onClick={() => setQuery("")} aria-label="清除搜索"><X size={18} /></button>}</div>{query && <div className="search-results" role="status">{results.length ? results.map((song) => <a key={song.slug} href={`/songs/${song.slug}`}><img src={song.cover} alt="" /><span><strong>{song.title}</strong><small>{song.artist} · {song.album}</small></span><ArrowRight size={18} /></a>) : <p>没有找到匹配的歌词，试试歌手或专辑名称。</p>}</div>}</section>
      <section className="cinema-feature" key={`copy-${activeSong.slug}`} aria-live="polite"><p className="cinema-kicker">本期精选 · {activeSong.year}</p><h1>{activeSong.title}</h1><p className="cinema-english">{activeSong.englishTitle}</p><p className="cinema-meta">{activeSong.artist}<span />{activeSong.album}</p><blockquote>{activeSong.excerpt}</blockquote><a className="cinema-read" href={`/songs/${activeSong.slug}`}>查看歌词<ArrowRight size={19} /></a></section>
      <section className="cinema-browse" aria-label="精选专辑"><div className="cinema-browse-heading"><span>精选专辑</span><small>{String(activeIndex + 1).padStart(2, "0")} / {String(featuredSongs.length).padStart(2, "0")}</small></div><div className="cinema-carousel">{featuredSongs.map((song) => <button className={`album-card ${song.slug === activeSong.slug ? "selected" : ""}`} key={song.slug} type="button" onClick={() => { setActiveSlug(song.slug); setQuery(""); }} aria-label={`展示 ${song.title}`} aria-pressed={song.slug === activeSong.slug}><img src={song.cover} alt={`${song.title} 专辑封面`} /><span><strong>{song.title}</strong><small>{song.artist}</small></span></button>)}</div><div className="cinema-carousel-controls"><button type="button" onClick={() => move(-1)} aria-label="上一张精选专辑"><CaretLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="下一张精选专辑"><CaretRight size={20} /></button></div></section>
      <a className="hero-scroll-cue" href="#library"><span>浏览歌词库</span><ArrowDown size={17} /></a>
    </section>

    <section className="library-home" id="library"><div className="library-inner">
      <header className="library-title"><div><p>LOCAL LYRIC ARCHIVE</p><h2>歌词库</h2></div><nav aria-label="按拼音浏览"><span>按拼音浏览</span>{"ABCDEFGHJKLMNOPQRSTWXYZ".split("").map((letter) => <a href="#artists" key={letter}>{letter}</a>)}</nav></header>
      <LibraryRow id="artists" title="歌手" action="查看全部歌手"><div className="artist-strip">{songs.map((song) => <a href={`/songs/${song.slug}`} key={song.slug}><img src={song.cover} alt="" /><strong>{song.artist}</strong><small>{song.title}</small></a>)}</div></LibraryRow>
      <LibraryRow title="全部专辑" action="查看全部专辑"><div className="album-strip">{songs.map((song) => <a href={`/songs/${song.slug}`} key={song.slug}><img src={song.cover} alt={`${song.album} 封面`} /><strong>{song.album}</strong><small>{song.artist} · {song.year}</small></a>)}</div></LibraryRow>
      <section className="library-index" aria-label="歌词库分类"><IndexColumn title="语言" items={languages} /><IndexColumn title="年代" items={decades} /><IndexColumn title="曲风" items={genres} /><IndexColumn title="歌谱来源" items={sources} /><div className="index-column personal"><h3><Heart size={18} />收藏与最近浏览</h3><a href="#recent">我喜欢的歌词 <span>126</span></a><a href="#recent">收藏的专辑 <span>38</span></a><a href="#recent">稍后再听 <span>21</span></a><a href="#recent">最近播放 <span>48</span></a></div></section>
      <section className="recent-section" id="recent"><header><div><p>CONTINUOUSLY UPDATED</p><h2>最近更新</h2></div><a href="#recent">查看全部<ArrowRight size={16} /></a></header><div className="recent-masonry">{[...songs, ...songs, ...songs].map((song, index) => <article className={`recent-card recent-card-${index % 5}`} key={`${song.slug}-${index}`}><a href={`/songs/${song.slug}`}><img src={song.hero ?? song.cover} alt="" /><div><h3>{song.title}</h3><p className="recent-artist">{song.artist} · {song.language}</p><blockquote>{song.excerpt}</blockquote><time>{index < 3 ? `${index + 2} 小时前` : `${Math.ceil(index / 3)} 天前`}</time></div></a></article>)}</div><div className="loading-more"><span />向下滚动继续加载</div></section>
    </div></section>
  </main>;
}

function LibraryRow({ id, title, action, children }: { id?: string; title: string; action: string; children: ReactNode }) { return <section className="library-row" id={id}><header><h3>{title}</h3><a href="#recent">{action}<ArrowRight size={15} /></a></header>{children}</section>; }
function IndexColumn({ title, items }: { title: string; items: string[] }) { return <div className="index-column"><h3>{title}</h3>{items.map((item) => <a href="#recent" key={item}>{item}</a>)}</div>; }
