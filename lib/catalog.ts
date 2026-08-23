export type Song = {
  slug: string;
  title: string;
  englishTitle: string;
  artist: string;
  album: string;
  year: string;
  language: "中文" | "英文" | "中英";
  source: string;
  accent: string;
  cover: string;
  hero?: string;
  excerpt: string;
  lyrics: { type: string; zh: string[]; en: string[]; repeats?: number }[];
};

// Server-side selection source. Replace this list with persisted admin settings
// when the local NAS database is connected; the homepage UI needs no changes.
export const featuredSongSlugs = [
  "the-moon-represents-my-heart",
  "those-years",
  "jasmine-flower",
  "auld-lang-syne",
  "orchid-grass",
  "farewell",
] as const;

export const songs: Song[] = [
  {
    slug: "the-moon-represents-my-heart",
    title: "月亮代表我的心",
    englishTitle: "The Moon Represents My Heart",
    artist: "邓丽君",
    album: "岛国之情歌 第四集",
    year: "1977",
    language: "中英",
    source: "简谱扫描",
    accent: "#d46a4c",
    cover: "/albums/hero-moonlit-sea-v2.png",
    hero: "/albums/hero-moonlit-sea-v2.png",
    excerpt: "你问我爱你有多深，我爱你有几分……",
    lyrics: [
      { type: "主歌 A", zh: ["你问我爱你有多深", "我爱你有几分", "我的情也真，我的爱也真"], en: ["You ask how deeply I love you", "And how much my love can be", "My feelings are true, my love is true"] },
      { type: "副歌", repeats: 2, zh: ["月亮代表我的心", "轻轻的一个吻，已经打动我的心", "深深的一段情，教我思念到如今"], en: ["The moon represents my heart", "A gentle kiss has touched my heart", "A love so deep has stayed with me until today"] },
    ],
  },
  {
    slug: "those-years",
    title: "那些年",
    englishTitle: "Those Bygone Years",
    artist: "胡夏",
    album: "那些年，我们一起追的女孩",
    year: "2011",
    language: "中英",
    source: "五线谱 PDF",
    accent: "#527c77",
    cover: "/albums/cover-those-years.png",
    excerpt: "又回到最初的起点，记忆中你青涩的脸……",
    lyrics: [
      { type: "主歌 A", zh: ["又回到最初的起点", "记忆中你青涩的脸", "我们终于来到了这一天"], en: ["Back again at where it all began", "Your youthful face remains in memory", "At last, we have arrived at this day"] },
      { type: "副歌", repeats: 2, zh: ["那些年错过的大雨", "那些年错过的爱情", "好想拥抱你，拥抱错过的勇气"], en: ["The downpours we missed in those years", "The love we missed in those years", "I wish I could hold you and the courage we once missed"] },
    ],
  },
  {
    slug: "jasmine-flower",
    title: "茉莉花",
    englishTitle: "Jasmine Flower",
    artist: "中国民歌",
    album: "江苏民歌选",
    year: "1957",
    language: "中英",
    source: "简谱拍照",
    accent: "#8a7852",
    cover: "/albums/cover-jasmine.png",
    excerpt: "好一朵美丽的茉莉花，芬芳美丽满枝桠……",
    lyrics: [{ type: "主题", repeats: 2, zh: ["好一朵美丽的茉莉花", "芬芳美丽满枝桠", "又香又白人人夸"], en: ["What a beautiful jasmine flower", "Fragrant and lovely on every branch", "Pure and sweet, admired by everyone"] }],
  },
  {
    slug: "auld-lang-syne",
    title: "友谊地久天长",
    englishTitle: "Auld Lang Syne",
    artist: "苏格兰民歌",
    album: "世界经典民歌",
    year: "1788",
    language: "中英",
    source: "五线谱扫描",
    accent: "#596d8c",
    cover: "/albums/cover-auld-lang-syne.png",
    excerpt: "怎能忘记旧日朋友，心中能不怀想……",
    lyrics: [
      { type: "主歌", zh: ["怎能忘记旧日朋友", "心中能不怀想", "旧日朋友岂能相忘"], en: ["Should old acquaintance be forgot", "And never brought to mind", "Should old acquaintance be forgot"] },
      { type: "副歌", zh: ["友谊万岁，朋友，友谊万岁", "举杯痛饮，同声歌颂友谊地久天长"], en: ["For auld lang syne, my dear", "We'll take a cup of kindness yet, for auld lang syne"] },
    ],
  },
  {
    slug: "orchid-grass",
    title: "兰花草",
    englishTitle: "Orchid Grass",
    artist: "银霞",
    album: "回答",
    year: "1979",
    language: "中文",
    source: "简谱扫描",
    accent: "#7c6a91",
    cover: "/albums/cover-orchid-grass.png",
    excerpt: "我从山中来，带着兰花草……",
    lyrics: [{ type: "主歌", repeats: 2, zh: ["我从山中来，带着兰花草", "种在小园中，希望花开早"], en: ["I came down from the mountains, carrying orchid grass", "I planted it in my garden, hoping it would bloom soon"] }],
  },
  {
    slug: "farewell",
    title: "送别",
    englishTitle: "Farewell",
    artist: "李叔同",
    album: "中文学堂乐歌",
    year: "1915",
    language: "中英",
    source: "手抄歌谱",
    accent: "#a05e52",
    cover: "/albums/cover-farewell.png",
    excerpt: "长亭外，古道边，芳草碧连天……",
    lyrics: [{ type: "主歌", repeats: 2, zh: ["长亭外，古道边", "芳草碧连天", "晚风拂柳笛声残，夕阳山外山"], en: ["Beyond the pavilion, beside the ancient road", "Green grass stretches to the sky", "The evening wind brushes willows as the flute fades"] }],
  },
];

export function findSong(slug: string) {
  return songs.find((song) => song.slug === slug);
}
