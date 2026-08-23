# ScoreLyric 首页与歌词库设计 QA

**Source visual truth**

- Path: `/Users/aikenr/.codex/generated_images/01a02e7a-202c-7751-99a4-90173dead35f/exec-c8549cc9-a25e-4a67-8347-0c65e4462203.png`
- Source pixels: 882 × 1784
- Selected direction: 第二版（白色博物馆式歌词库）

**Rendered implementation**

- URL: `http://localhost:4173/`
- Desktop viewport: 1280 × 720 CSS px, device pixel ratio 2
- Mobile viewport: 390 × 844 CSS px, device pixel ratio 2
- Desktop captures: `work/design-qa/outputs-home-first-screen.png`, `work/design-qa/outputs-home-library-screen.png`, `work/design-qa/outputs-library-categories.png`, `work/design-qa/outputs-library-recent.png`
- Mobile captures: `work/design-qa/outputs-home-mobile.png`, `work/design-qa/outputs-library-mobile.png`
- Combined comparison: `work/design-qa/outputs-design-comparison.png` (2026 × 1440)
- State: 一张精选专辑激活，搜索关闭，首页/歌词库/分类/最近更新均已实拍

**Full-view comparison evidence**

- 参考图与实现截图已合成在同一对照图中检查。
- 实现保留了选定方案的暗色动态首页与白色独立歌词库；根据用户后续要求，首页由参考图的半屏改为严格 `100svh`，歌词库从第二屏开始，属于有意产品偏离。

**Focused region comparison evidence**

- 首屏：导航、搜索、精选歌词、精选专辑带、轮播按钮与下滑提示在独立 1280 × 720 截图中检查。
- 歌词库：歌手、全部专辑、拼音索引在第二屏截图中检查；语言、年代、曲风、歌谱来源和收藏栏目另行检查。
- 最近更新：单独检查五栏高度交错的瀑布流、封面裁切、歌词摘录与时间信息。

**Required fidelity surfaces**

- Fonts and typography: 中文主标题和歌词使用 Georgia/宋体回退，导航与元数据使用现有无衬线体；桌面和移动端字号、行高与截断正常。
- Spacing and layout rhythm: 首页准确占满第一屏；歌词库使用稳定的分隔线、六栏资源带和五栏分类；移动端改为横向滑动与双栏分类。
- Colors and visual tokens: 首页色彩可随精选封面变化；歌词库始终使用白、炭黑和固定朱红强调色，不继承 Hero 色相。
- Image quality and asset fidelity: 全部使用项目内真实 raster 封面资产，`object-fit: cover`，无占位图、CSS 绘画或 emoji 替代。
- Copy and content: 精选专辑置于首页；歌词库包含歌手、专辑、语言、年代、曲风、来源、收藏与最近更新。

**Primary interactions tested**

- 自动轮播在预览期间从《月亮代表我的心》切换至后续精选项。
- 点击“下一张精选专辑”后，标题从《那些年》切换为《茉莉花》，且只有一个 `aria-pressed=true` 的选中项。
- 点击“浏览歌词库”正确滚动到第二屏。
- 搜索、歌曲详情链接、上传入口保留可交互。
- 桌面端 1280 × 720 与移动端 390 × 844 均通过浏览器实拍检查；应用控制台无 error。

**Comparison history**

1. Initial implementation comparison — passed
   - 无可执行的 P0/P1/P2 差异。
   - 用户要求的首屏整屏化、自动轮播和更丰富分类已作为明确产品覆盖，不按原始静态参考图的半屏比例判为偏差。
   - P3: 歌手头像暂以项目封面圆形裁切表现；待真实歌手资料入库后可替换。

**Implementation checklist**

- [x] 首页严格占满第一屏
- [x] 精选专辑位于首页并驱动背景与歌词
- [x] 自动轮播、手动切换、选中态与过渡动画
- [x] 服务端传入精选配置，便于后台数据源替换
- [x] 独立白色歌词库视觉系统与丰富分类
- [x] 最近更新五栏瀑布流
- [x] 桌面和移动端实拍验收
- [x] ESLint 通过，Vinext 生产构建通过

final result: passed
