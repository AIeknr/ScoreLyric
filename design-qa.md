# ScoreLyric 首页设计 QA

**Source visual truth**

- Path: `/workspace/scratch/76a138749e36/generated_images/exec-dbdaa2fa-9aab-4753-a4af-d782e47620a6.png`
- Source pixels: 1487 × 1058
- Intended CSS viewport/state: 1440 × 1024，桌面端，默认展示《月亮代表我的心》

**Rendered implementation**

- URL/capture source: Cloud Browser 本地预览根页面；最终浏览器截图已在 QA 会话中以图片证据输出
- Browser viewport: 1363 × 936；页面 scroll width/height 同为 1363 × 936，无桌面端溢出
- Comparison normalization: 参考图与实现均放入 1440 × 1024 的同尺寸画布，再以 0.46 比例并排呈现在同一张浏览器对照截图中；参考图按 cover 裁切，实现由 1440 × 1024 iframe 原生渲染
- Additional responsive evidence: 390 × 844 iframe 浏览器实拍；页面自然纵向滚动，专辑列表横向滚动，无元素重叠或横向页面溢出

**Full-view comparison evidence**

- 同一对照输入中检查了顶栏、搜索、月夜主视觉、主歌词信息、CTA 与五张专辑封面的相对位置。
- 最终实现保留参考图的暗色月夜、右侧树影、左下主标题、右下封面带和极简导航；月亮位置与海面反光在第二轮资产修正后与参考视觉重心一致。

**Focused region comparison evidence**

- 顶部区域：检查了文字标志、双导航、上传按钮、宽搜索线与图标对齐。
- 左下区域：检查了标题单行显示、英文副题、歌手/专辑信息、歌词摘录和“查看歌词”基线。
- 右下区域：检查了五张真实封面、封面裁切、标题截断和收录序号。
- 未另存局部裁切图：关键区域已在未缩放的桌面浏览器截图中单独检查，并在同画布对照图中复核层级和位置。

**Required fidelity surfaces**

- Fonts and typography: 标题使用 Georgia/宋体回退形成参考中的编辑感衬线层级；小型导航、元数据和英文副题字重、行高与字距均已检查；桌面标题保持单行，移动端可读。
- Spacing and layout rhythm: 顶部 104px 导航区、居中搜索、左下内容和右下封面带形成与参考相同的四区构图；桌面无溢出，移动端改为纵向内容与横向封面轨道。
- Colors and tokens: 主色为蓝黑、银白与低饱和灰；使用真实夜景图、半透明遮罩和阴影控制可读性，无彩色装饰噪声。
- Image quality and asset fidelity: 首页主视觉与六张专辑封面均为真实 raster 资源；封面使用 object-fit cover；没有用 CSS 绘画、占位框、emoji 或手写 SVG 替代可见资产。
- Copy and content: 首页只保留歌词库、识别歌谱、搜索、最近收录与查看歌词；AI 服务中心、系统状态和管理员头像已移除。
- Icons: 可见图标来自 Phosphor Icons，同一线性风格，尺寸与按钮基线一致。
- Accessibility: 搜索有可见 label/placeholder，按钮和封面具有 aria-label，图片有 alt，键盘 focus 可见，支持 prefers-reduced-motion。

**Comparison history**

1. First comparison — blocked
   - [P1] 月亮位于实现右上方，而参考图在左中区域，视觉重心明显漂移。
   - Fix: 以第三版参考图为构图依据，重新生成无 UI、无文字的月夜背景 `hero-moonlit-sea-v2.png` 并替换首页资产。
   - Post-fix evidence: 第二张并排浏览器截图显示月亮、海面反光与右侧树影已回到参考构图。
2. Second comparison — blocked
   - [P1] 主标题在 1363px 桌面视口换成两行，改变了参考图的左下层级。
   - Fix: 将桌面标题最大字号调至 64px，并把信息区宽度调整为 `min(520px, 38vw)`。
   - Post-fix evidence: 最终桌面截图与最终并排截图中标题均保持单行，且不遮挡封面带。
3. Final comparison — passed
   - 无剩余可操作的 P0/P1/P2 视觉问题。
   - P3 acceptable: 封面题材与参考图同属复古摄影/植物画方向，但不是逐像素相同的原图；这是生成式 DEMO 资产的预期差异。

**Primary interactions tested**

- 搜索“茉莉花”显示正确结果。
- 点击《那些年》封面后主标题与主视觉状态切换。
- 点击“查看歌词”进入 `/songs/those-years`，真实专辑封面可见。
- `/recognize` 上传工作台可访问。
- `/admin/ai-services` 构建测试返回 404。
- 在全新浏览器标签中重复导航后检查应用日志：无应用级 error/warning；浏览器扩展自身的 metadata 错误已排除在应用日志之外。

**Implementation checklist**

- [x] 删除 AI 服务中心入口和路由
- [x] 使用真实主视觉和专辑封面
- [x] 实现搜索、专辑切换、详情跳转
- [x] 完成桌面与 390px 移动端检查
- [x] 完成构建与渲染测试

final result: passed
