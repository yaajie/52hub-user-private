# 52HUB User Frontend — Claude Code Entry

当前目录是 52HUB user 前台源码仓库。

---

## ⚠️ 开始任务前——强制执行，不可跳过

### 第一步：读完四份共享文档

```
/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md
/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md
/Users/Apple/52hub-source-hardening/52HUB-OPERATIONS-RUNBOOK.md
/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md
```

### 第二步：只读预检

```bash
cd /Users/Apple/52hub-source-hardening/dujiao-next-user
git branch --show-current
git log --oneline -5
git status --short
```

**对比下方「当前仓库快照」，若 commit hash 不一致，以 git log 为准，文档滞后请继续工作但完成后必须补更新。**

---

## 当前仓库快照（每次 commit 后必须更新此块）

- 分支：`52hub/v1.0.2-user-hardening`
- **最新代码 commit：`4aa7ba7 Polish Codex Auth tool layout`**
- private remote：`https://github.com/yaajie/52hub-user-private`（只推 private，不推 origin）
- working tree：clean（代码 commit `4aa7ba7` 已上线；交接文档已同步）

---

## ⚠️ 任务完成后——强制清单，全部勾完才算完成

- [x] `git add` 相关文件，`git commit`，`git push private 52hub/v1.0.2-user-hardening`
- [x] `/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md`：新增改动条目（改了什么 / 是否上线 / commit hash / 备份路径）
- [x] `/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md`：更新「当前 Git 快照」commit hash + 「最近改动速查」表
- [x] `/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md`：更新相关状态描述
- [x] 本文件（`CLAUDE.md`）：更新「当前仓库快照」中的 commit hash
- [x] `AGENTS.md`（同目录）：更新「当前仓库快照」中的 commit hash

**以上清单未完成 = 任务未完成。下一个 agent 将读到错误状态。**

---

## 操作边界

- 不修改 admin
- 不 push 到 `origin`（只推 `private`）
- 部署前必须备份：`cp -a /opt/dujiao-next/web/user /opt/dujiao-next/web/user.pre-<描述>-$(date +%Y%m%d-%H%M%S)`
- 上线只同步 `dist/` 到 `/opt/dujiao-next/web/user/`
- 不输出任何配置密钥
- SSH 私钥：`/Users/Apple/.ssh/codex_vps_154_12_18_190_20260510`

## 构建命令

```bash
cd /Users/Apple/52hub-source-hardening/dujiao-next-user
npm run build
```

## 最近任务记录

- Codex Auth 工具页大屏化与路径复制体验（2026-06-04，commit `4aa7ba7`）：
  - `/tools/codex-auth` 将“生成结果”移动到“放置路径”上方，生成、复制、下载和放置路径按真实使用顺序组织
  - “粘贴 ChatGPT session JSON”和“账号识别”桌面同高同顶对齐，账号识别徽章从 `parse.report` 改为“本地识别”
  - 全页提高标题、说明、路径和命令字号，扩大输入区、结果区和路径说明区间距，减少测试页感
  - macOS/Windows 放置路径卡片改为大号 SVG 系统图标 + 单行系统/工具标题，桌面双列等高，移动端单列
  - `~/.codex/auth.json` 和 `C:\Users\你的用户名\.codex\auth.json` 增加一键复制路径按钮；macOS 增加 `ls -la ~/.codex/auth.json` 检查文件命令
  - 生产备份：`/opt/dujiao-next/web/user.pre-codex-auth-premium-layout-20260604-193001`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、本地四视口 Playwright、生产路由 smoke、生产四视口 Playwright 截图，console error 0 / warning 0

- Codex Auth 路径说明图标化 + 布局收口（2026-06-04，commit `3ba3403`）：
  - `/tools/codex-auth` 将“放置路径”改为独立整宽面板，桌面 macOS / Windows 双列、移动端单列
  - macOS/Windows 加系统识别图标；Windows 可见路径改为 `C:\Users\你的用户名\.codex\auth.json`，并说明 `%USERPROFILE% = C:\Users\你的用户名`
  - “粘贴 ChatGPT session JSON”和“账号识别”桌面同排对齐，减少左侧空白和右侧拥挤
  - 生产备份：`/opt/dujiao-next/web/user.pre-codex-auth-layout-icons-20260604-185350`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、本地四视口 Playwright、生产路由 smoke、生产四视口 Playwright 截图，console error 0

- Codex Auth 放置路径重构 + ChatGPT 登录提示（2026-06-04，commits `32a805f` + `1ee8aef`）：
  - `CodexAuth.vue` 将“放置路径”前置为操作面板，macOS / Windows 都展示目标路径、打开目录命令、复制下载文件命令和复制按钮
  - Windows 可见路径修正为 `%USERPROFILE%\.codex\auth.json`
  - 在“获取 session JSON”旁边新增提示和 `先登录 ChatGPT` 按钮，直达 `https://chatgpt.com/`
  - 生产备份：`/opt/dujiao-next/web/user.pre-codex-auth-placement-login-20260604-181702`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、本地浅/深色和移动端 Playwright 截图、生产路由 smoke、生产静态扫描、生产 Playwright 截图，console error 0

- 首页精选与商品中心主图改为 5:4（2026-06-04，commit `22622fd`）：
  - `ProductCard.vue` 商品卡主图从 `aspect-square` 改为 `aspect-[5/4]`
  - 覆盖首页精选商品和 `/products` 商品中心网格
  - `Products.vue` 加载骨架同步改为 `aspect-[5/4]`，避免加载态和真实卡片比例跳变
  - 紧凑列表 `ProductListItem.vue` 小缩略图未动，避免列表行被撑高
  - 生产备份：`/opt/dujiao-next/web/user.pre-products-home-5x4-20260604-160715`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、本地临时 dev server + 生产只读 API 视觉验收、生产路由 smoke、生产静态扫描、Playwright 生产量测截图

- 商品详情页支付方式同行 + 真实销量门槛展示（2026-06-04，commit `f9209bd`）：
  - `ProductDetail.vue` 将“支持支付：支付宝 / 微信”移动到价格同行，并用 `items-end` 与价格底部对齐
  - `ProductCard.vue` 已售徽章只在真实销量 `>= 10` 时展示
  - 详情顶部只读真实 `manual_stock_sold + auto_stock_sold`：`50-99` 显示 `已售 xx`，`>=100` 显示 `近期热卖`，低于 50 不显示
  - `api/types.ts` 补充 `manual_stock_sold?` / `auto_stock_sold?` 类型字段；本轮不造假、不写虚拟销量
  - 生产备份：`/opt/dujiao-next/web/user.pre-sales-badge-payment-inline-20260604-152047`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、生产路由 smoke、生产 chunk 扫描、Playwright 生产商品页截图

- 商品详情页主图改为 5:4（2026-06-04，commit `8f2423b`）：
  - `ProductImageGallery.vue` 主图和空占位从 `aspect-square` 改为 `aspect-[5/4]`
  - 商品列表卡片和缩略图仍保持 `1:1`
  - 当前仍使用 `object-cover`，方图会轻微上下裁切；本轮先看实际视觉效果
  - 生产备份：`/opt/dujiao-next/web/user.pre-product-image-5x4-20260604-144807`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、生产路由 smoke、生产 chunk 扫描、Chrome 生产商品页截图

- 商品详情页首屏压缩与余额提现文案下线（2026-06-04，commit `a39439a`）：
  - 商品图区域改 `self-start h-fit`，减少左侧商品图下方空白
  - 首屏移除不可点击分类/标签与简单描述，SEO meta/JSON-LD 仍用商品描述兜底
  - 信任带移除“余额可提现”；钱包余额经代码核查不支持提现，推广返佣提现功能未动
  - 生产备份：`/opt/dujiao-next/web/user.pre-product-detail-hero-20260604-140554`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、生产路由 smoke、生产静态 chunk 扫描、Chrome 生产商品页截图

- 前台隐藏售罄 SKU + 订单交付说明展示（2026-06-04，commit `9a36fdb`）：
  - 商品详情页与快速购买弹窗只展示 `visibleSkus`（active + 可购买），隐藏库存 0 的已启用 SKU，修 `chatgpt-plus` 中“只保到账”显示为已售罄的问题
  - 订单详情/游客订单详情展示商品级固定交付说明，用于在卡密外补充充值入口、注意事项等说明
  - 生产备份：`/opt/dujiao-next/web/user.pre-sku-instructions-20260604-130847`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、生产路由 smoke、浏览器商品页 DOM、console error 0

- 前台视觉与 Codex Auth 上线（2026-06-04，commit `fa80422`）：
  - 首页浅色模式重做、`/tools` 信息架构收口、`/tools/codex-auth` 本地生成器上线、浅/深色右侧黑块收口、移动端隐藏纯视觉屏、购物车入口隐藏、动态富文本白名单净化、sitemap 扩到 `<loc>`=37、P2 chunk 拆分和图片解码属性落地
  - 生产备份：`/opt/dujiao-next/web/user.pre-frontend-visual-tools-20260604-052825`
  - 部署边界：只同步 `dist/` 到 `/opt/dujiao-next/web/user/`；未动 admin/API/数据库/OpenResty/容器
  - 验证：`git diff --check`、`npm run build`、生产 API/page smoke、Chrome 桌面/移动渲染 smoke 全通过，console error 0、购物车文字/链接 0、无横向溢出

- Hub OG SVG → PNG + 扩长 og:title/description（2026-05-19，commit `13be4e6`）：
  - 修 opengraph.xyz 检测出的 2 个问题
  - **SVG → PNG**：Facebook / WhatsApp / X 等 OG scraper 不识别 SVG（截图显示分享预览为黑色）。用 macOS headless Chrome 渲染 4 SVG → 1200×630 PNG（每张 270-400KB），命令：`Google Chrome --headless --disable-gpu --window-size=1200,630 --screenshot file://.../X.svg`。4 hub view `og-image` prop 从 `.svg` 改 `.png`。保留 SVG 作源文件
  - **扩 og:title / description**：原 24 / 45 字符过短（opengraph 建议 50-60 / 110-160）。重写 4 hub useHead，抽出 pageTitle / pageDesc const 避免重复。Claude title 60 / desc 154、ChatGPT title 56 / desc 155、OpenAI title 57 / desc 145、Gemini title 56 / desc 150，全部在推荐范围
  - 备份 `/opt/dujiao-next/web/user.pre-og-png-20260519-203425`

- Hub 改造 Batch 4 · Schema + OG 图（2026-05-19，commit `4362517`）：
  - 新增 4 张 `public/og/{claude,chatgpt,openai,gemini}-hub.svg` 1200×630 占位图（品牌色渐变 + 标题 + 副标 + URL footer，纯 SVG 避免 npm 依赖）
  - HubLayout 新增 useHead 注入：
    - **BreadcrumbList Schema**：自动从 hero.title + route.path 推导（首页 → 当前 hub）
    - **ItemList Schema**：从 cta 数组推导，**过滤只保留 `/products/:slug` 链接**（自动跳过 `/categories/*` 之类非商品链接）
    - **og:image + twitter:image**：通过 ogImage prop 注入 + width/height meta + twitter:card=summary_large_image
  - 4 hub view 全部加 `og-image="/og/<name>-hub.svg"` prop
  - Chrome 实测：4 hub 各注入 5 个 JSON-LD（Organization + WebSite + BreadcrumbList + ItemList + FAQPage）；Gemini ItemList 自动过滤 categories 后剩 1 item
  - 后续可用 Figma 出正式 PNG 替换占位 SVG
  - 备份 `/opt/dujiao-next/web/user.pre-hubrevamp-batch4-20260519-182940`

- Hub 改造 Batch 3 · HubCtaCard 商品 API 联动（2026-05-19，commit `0f9c2bd`）：
  - HubCtaCard 由静态 fallback 卡改为商品 API 实时联动
  - onMounted 拉 `productAPI.detail(slug)`，slug 优先 props.slug，否则从 `/products/:slug` URL 末尾解析
  - 三态渲染：loading (4 段 skeleton) / 成功 (实时商品标题 + 发货徽章 ⚡/💬 + 库存徽章 + 价格 accent 色加粗 + "立即下单" 实色按钮) / fallback (静态 name+desc + "查看商品 →")
  - 已售罄商品按钮文案 "已售罄 · 查看详情"
  - 复用 `useLocalized` / `useProductLabels` composable，displayName / stockLabel / isSoldOut 全部 computed
  - targetUrl 优先 product.slug，无 product 时回退 props.url（兼容 Gemini 的 `/categories/*` 非 product 链接）
  - 卡顶部加 1px accent 渐变装饰条
  - Chrome 实测：ChatGPT 3 张全部 API 成功，Gemini 1 张 API + 2 张 fallback
  - 备份 `/opt/dujiao-next/web/user.pre-hubrevamp-batch3-20260519-155628`

- Hub 改造 Batch 2 · accent / FAQ / Hero CTA / 内容补齐（2026-05-19，commit `66fc9f3`）：
  - 4 hub view 全部应用品牌色 accent + FAQ 数据 + Hero CTA + 5 卡 sections 补齐
  - **Claude**：accent `#D97757`（Anthropic 橙），FAQ 5 条；教程 5→4（删 ChatGPT Codex vs Claude Code）
  - **ChatGPT**：accent `#10A37F`（OpenAI 绿），FAQ 5 条；sections 原本 4/3/4 无需调
  - **OpenAI**：accent `#404040`（深灰中性），FAQ 4 条；官方入口 5→4（删 Sora 去重）/ 产品矩阵 5→4（删 Whisper 开发者资源）；**新增 modelTable 6 行**（GPT-5 / GPT-4o / o3 / Codex / DALL-E 3 / Sora）
  - **Gemini**：accent `#4285F4` + accentGradient `linear-gradient(135deg, #4285F4, #9333EA)`（蓝紫渐变 Primary CTA）；FAQ 5 条；官方入口 5→4（删 Google AI）/ 教程 1→4（补 Pro vs Advanced / 视频订阅 / 选店家 / 全部教程）
  - Hero CTA primary/secondary 已落地，所有 hub Hero 区有"看 XX 攻略 / 立即下单"双 CTA
  - JSON-LD FAQPage Schema 自动注入 head（HubFaq 组件已在 Batch 1 实现）
  - 验证 Chrome 桌面 1787：accent 渐变正确，FAQ 折叠正常 + Schema 注入，所有 sections arity ∈ {3, 4, 6, 8} 无孤儿
  - 备份 `/opt/dujiao-next/web/user.pre-hubrevamp-batch2-20260519-140639`

- Hub 改造 Batch 1.5 · HubSection 动态 grid（2026-05-19，commit `7b1a9e2`）：
  - 用户反馈"3+1 排序难看"（4 卡 section 在 md viewport 显示 3+1 孤儿）
  - 改 `src/components/hub/HubSection.vue`：grid class 由固定 `md:grid-cols-3` 改为按 items.length 动态计算
    - 1 卡 → `max-w-md mx-auto`（居中显示）
    - 2 卡 → `sm:grid-cols-2`
    - 4 卡 → `sm:grid-cols-2 lg:grid-cols-4`（sm/md 2+2，lg 4 一行）
    - 3/5/6/其他 → 默认 `md:grid-cols-3`
  - 验证（Chrome 桌面 1787）：4 卡所有 section 改为 4 一行，1 卡居中
  - 5 卡 section 仍 3+2，将在 Batch 2 内容补齐时调整到 4 或 6
  - 备份 `/opt/dujiao-next/web/user.pre-hubgrid-20260519-122818`

- Hub 改造 Batch 1（2026-05-19，commit `fa09864`）：
  - 新增 `src/components/hub/` 8 个共享组件：`HubLayout` / `HubHero` / `HubSection` / `HubResourceCard` / `HubCtaCard` / `HubModelTable` / `HubFaq` / `HubRelatedList`
  - 4 个 hub view 改为数据驱动接入，当前文案、资源链接、模型/档位表格、订阅直充卡、相关教程保持原样
  - Batch 1 未启用 FAQ 数据、动态商品 API、OG 图或新增 Schema
  - `npm run build` 通过；生产备份 `/opt/dujiao-next/web/user.pre-hubrevamp-batch1-20260519-105943`
  - Chrome headless 1440×900 + 430×932 实测 `/claude-hub` `/chatgpt-hub` `/openai-hub` `/gemini-hub` 均 200、无 console error、无横向溢出

- 导航条文字 + BlogDetail 封面图比例（2026-05-19，commit `20d65bb`）：
  - **Navbar.vue line 53**：PC 桌面 "工具" → "工具集合"（与移动端 drawer 文字一致，图标保留现有 SVG gear）
  - **Navbar.vue line 387**：`menuItems.blog.label` 由 `'nav.blog'`（i18n key）改为字面量 `'AI 资讯'`
    - 桌面 menuItemsRight + 移动 drawer 同时生效（两处都通过 `menuItems.blog` 渲染）
    - **故意不改 i18n nav.blog**：Footer 快速链接、Blog 页 H1、BlogDetail 面包屑、Blog 卡片 type 标签、NotFound 仍走 i18n nav.blog = '资讯'，符合用户"只改导航条的字"要求
  - **BlogDetail.vue line 31**：封面图容器 `h-64 md:h-96`（固定 256px / 384px）→ `aspect-video`（16:9 自适应）
    - 修移动端封面图非 16:9 内容显示不完整问题
    - Chrome 实测容器 ratio = 1.778 = 16:9，原图 1.777 完美贴合，object-cover 不裁切
  - 备份 `/opt/dujiao-next/web/user.pre-navlabels-20260519-100714`

- mobile UX 紧凑收尾（2026-05-19，commit `8fe0047`）：4 文件 mobile 微调
  - **ContactFloat.vue**：mobile 浮按 `bottom-24` → `bottom-36`（96→144px），sm+ 恢复 `bottom-24`，避免遮挡 Footer 顶部
  - **Footer.vue**：mobile 容器 `pt-10 pb-32` → `pt-6 pb-28`；链接区 `mb-10` → `mb-8`；Brand 块加 `mx-auto w-fit text-left`（mobile 居中显示，sm+ 恢复左对齐 col-span-3）；Copyright `pt-8` → `pt-6 sm:pt-8`
  - **SiteHero.vue**：首页 3 CTA（看资讯 / 在线工具 / 商品中心）mobile 由 `flex flex-wrap` 改为 `grid grid-cols-3 gap-2`，等宽 102px；按钮内 `whitespace-nowrap` + padding/字号压缩；sm+ 恢复 flex 自然宽
  - **Blog.vue**：资讯页顶部 `pt-20 pb-16` → `pt-16 pb-12`（mobile）；标题 `mb-16 mt-12` → `mb-8 mt-4`，字号 `text-4xl` → `text-3xl`；副标题 `max-w-2xl` → `max-w-xl`、`text-lg` → `text-sm`
  - 备份 `/opt/dujiao-next/web/user.pre-mobile-tighten-20260519-091923`
  - Chrome 实测 430×932：Footer 总高 420px（之前 800+px），3 link col 隐藏；SiteHero 3 CTA 等宽 102px 不换行

- 后台 CSP unsafe-eval 修复 + mobile Footer 极简化（2026-05-19，commit `2befd37`）：
  - 后台问题：`https://ht.52hub.org/login` 只显示版权，Chrome console 报 `EvalError ... 'unsafe-eval' is not an allowed source`。
  - OpenResty 修复：生产 `/opt/1panel/apps/openresty/52hub-openresty/conf/nginx.conf` line 48 `script-src` 加 `'unsafe-eval'`；候选先过临时容器 `openresty -t`，再 `cat candidate > nginx.conf` 保 inode `71390929`；reload 时间 `2026-05-19T05:37:44+08:00`。
  - OpenResty 备份：`/opt/1panel/apps/openresty/52hub-openresty/conf/nginx.conf.pre-admin-csp-unsafe-eval-20260519-053729`。
  - Footer 修复：`<640px` 隐藏快速链接 / AI 资源 / 在线工具，只保留 52HUB brand、slogan、TG 客服、TG 频道、QQ 群、版权和隐私/服务条款；sm+ 保留三列导航，lg+ 仍 4 等宽。
  - user 备份：`/opt/dujiao-next/web/user.pre-mobile-footer-minimal-20260519-054048`。
  - 验证：后台登录页恢复用户名/密码/登录按钮且无 CSP EvalError；线上 430×932 Footer 高度 468px，仅 Brand 可见；768 和桌面布局正常。

- Footer mobile 二次收口（2026-05-19，commit `5f0a6bf`）：
  - 背景：用户在 iPhone 14 Pro Max 430×932 截图反馈 Footer mobile 排序仍乱、disclaimer 与 Footer Brand 体感过空。
  - 预检量测：Chrome / Chrome headless 线上 430×932 实测 disclaimer bottom → footer top = 120px、→ Brand top = 185px，低于 200px；因此未动 `Tools.vue` `pb-16` / Footer `py-16` / `mb-16`。
  - 布局方案：采用 A 方案。Footer xs 改 `grid-cols-2`；Brand `col-span-2` 全宽；快速链接 + AI 资源同行；在线工具 `col-span-2 sm:col-span-1`，xs 全宽避免孤儿。
  - 断点修正：4 等宽桌面断点从 `md` 提到 `lg`，确保 768px 为 Brand 全宽 + 3 列同行；1440px 仍 4 等宽。
  - 验证：线上 430×932 / 768×1024 / 1440×900 DOM rect 量测通过；ContactFloat 默认按钮 44×40（mobile）不遮挡 Footer；Tools hero 桌面 2/3 + 1/3 不受影响。
  - 备份：`/opt/dujiao-next/web/user.pre-mobile-fix2-20260519-052226`。

- /tools 双卡 hero + arity 补齐 + Footer 移动修复（2026-05-19，commit `f5516e2`）：
  - **Hero 重排**：紧凑 banner（badge + H1 + counts 一行）+ 下方双卡 `grid md:grid-cols-3`：IP 卡 `md:col-span-2` + Browser 卡 `md:col-span-1`
  - **Browser 卡**（新增）：navigator API 本地读取（无 IO），同步 onMounted 赋值（rAF 在某些时序不触发）
    - 展示：browser (parseBrowser 含 Edge/Opera/Firefox/Chrome/Safari 顺序判定) / os.name (parseOS 含 iOS/Android/Windows/macOS/Linux) / screen (W×H · DPR) / language (zh-CN/en-US 等中文映射) / net.type (4G/WiFi/有线 + downlink Mbps)
    - 右上 chip：desktop / mobile / tablet
  - **Tools 分类 arity 补齐**：原 5/4/4/3/3/2 → 6/6/6/6/3/3（4 主类 6 卡 + 2 短类 3 卡，无 4/5/7 孤儿）：
    - IP 检测 +IP-API、服务状态 +Cloudflare Status、DNS/隐私 +AmIUnique +CoverYourTracks、域名/备案 +DNSChecker +VirusTotal +BGP.he.net、接码 +SMS-Activate
  - **Footer 移动修复**（同 commit）：`grid-cols-2 md:grid-cols-4` → `grid-cols-1 sm:grid-cols-3 md:grid-cols-4`；Brand `col-span-2 md:col-span-1` → `sm:col-span-3 md:col-span-1`
    - xs：4 行堆叠（Brand 全宽 / 快速链接 / AI 资源 / 在线工具）
    - sm：Brand 跨 3 + 3 链接列同行
    - md+：4 等宽列
    - 解决 mobile 下"在线工具"被挤为半行孤儿
  - 备份：`/opt/dujiao-next/web/user.pre-tools-browserinfo-20260519-045904`
  - Chrome 实测：IP/Browser 卡均填充正确，arity 6/6/6/6/3/3，Footer 桌面 4 等列、sm 3+1 错落

- /tools hero IP 实时面板（2026-05-19，commit `e72606b`）：替换之前的 mock SERVICE STATUS
  - 调 `https://ipapi.co/json/`（免费 30k req/月，无 API key）拉访客真实 IP / 地理 / ISP
  - 客户端 28 keyword 判定 datacenter vs residential（含国内云：alibaba/tencent/baidu/huawei/bytedance/ucloud/qcloud 等）
  - 实时时钟每秒 tick + 闪烁光标 + AbortController 5s 超时
  - 终端风格 `$ curl ifconfig.me` / `$ geo.lookup` / `$ ip.type` / `$ date` 输出
  - OpenResty CSP connect-src 加 `https://ipapi.co`（Python in-place 保 inode 71390929；备份 nginx.conf.pre-ipapi-20260519-0440）
  - 验证：ipapi.co/json GET 200；实测识别 Oracle Cloud 为 datacenter ⚠
- /tools 页重做（2026-05-19，commit `211c596`）：用户反馈原 /tools "丑、不像 AI 工具"
  - **Hero 2 列**：左 H1 + live badge（emerald ping 动画）+ 工具/分类计数；右 SERVICE STATUS 面板（4 条 mock 状态 + 闪烁绿点 + 链真实 status 页）
  - **6 分类 sections** 加 [01]-[06] 编号 + 6 种 accent color 左条 + 右上 tool count tag
  - **22 工具卡**：9x9 首字 favicon 图标（accent 色 + 半透明背景）+ name + monospace host + 描述 + 外链 arrow icon hover + v-spotlight + 左侧 2px 渐变色条 hover
  - **底部 disclaimer** 改终端代码块风格 `$ cat disclaimer.txt`
  - 备份：`/opt/dujiao-next/web/user.pre-tools-redesign-20260519-042528`
- Phase 4 CSP enforce（2026-05-19，**OpenResty 配置改动，无 user 仓库 commit**）：
  - 改 `/opt/1panel/apps/openresty/52hub-openresty/conf/nginx.conf` 3 处：script-src 加 `https://static.cloudflareinsights.com`、connect-src 加 `https://cloudflareinsights.com`、header name `Content-Security-Policy-Report-Only` → `Content-Security-Policy`
  - 写入方式：Python `open('r+')` + seek/truncate（保 bind mount inode `71390929`）
  - admin scripts 实测 0 条 → `customScripts.ts` inline 注入器无实际使用，script-src 保留 `'unsafe-inline'` 留余量
  - 验证：nginx -t OK + reload OK + 容器 inode 一致 + 5 个关键页面（首页/products/详情/cart/login）0 CSP violation + Cloudflare beacon 持续工作
  - 备份：`/opt/1panel/apps/openresty/52hub-openresty/conf/nginx.conf.pre-csp-enforce-20260519-041342`
- Phase 3 数据接入（2026-05-19，commit `d03ec74`）：Cloudflare Web Analytics beacon 嵌入 `index.html </head>` 之前
  - 模式：手动注入（52hub.org 灰云直连，不走 CF 代理）+ 排除欧盟访客（GDPR safe）
  - Token 公开（client-side beacon）：`e1969593a9d74947b33f79a0488377b6`
  - 实测：beacon.min.js GET 200 + cdn-cgi/rum POST 204
  - CSP 余项：切 enforce（P1-L-2）需 OpenResty 加 `static.cloudflareinsights.com` 到 script-src + `cloudflareinsights.com` 到 connect-src
  - 备份：`/opt/dujiao-next/web/user.pre-cf-analytics-20260519-013215`
- About 页重做（2026-05-19，commit `dba74a3`）：用户反馈宽度与全站不一致 + 内容单薄
  - 去 `max-w-4xl`，改用标准 container（width 1536px on lg）
  - **Hero 2 列**：左 Jay 自述 / 右**伪 macOS 终端卡**（3 圆点 + `~ jay@52hub` 标题 + `which-ai claude/chatgpt/gemini` + `52hub --status` uptime + 闪烁光标），AI 工具站技术感锚点
  - 终端 uptime 自动计算（按 2026-05-07 上线日）
  - **3 卡横排**：发货说明 / 售后政策 / 数据与隐私（替代竖向堆叠）
  - **底部 2 列**：服务内容 + 需要帮助（合并简化，去 WhatsApp 占位）
  - 联系卡精简（TG 客服 + QQ 群 2 张）
  - `<style scoped>` 内联伪终端配色（不污染全局）
  - 备份：`/opt/dujiao-next/web/user.pre-about-redesign-20260519-011423`
- About 扩展 + Spotlight（2026-05-19，commits `b3e5357` + `c3db562`）：
  - **About**：在站长 Jay 自述与服务内容之间插入 3 个固定 section（发货说明 2 卡 / 售后政策 5 条 / 数据与隐私 3 条），不依赖后台 about_config
  - **Spotlight**：新建 `src/directives/spotlight.ts`（v-spotlight directive，rAF 节流）+ `.spotlight` / `.spotlight-border` 全局 CSS。应用到 ResourceHubGrid 4 卡（含 `.border` 修饰）/ Home 最新教程 6 卡 / Blog 列表 / ProductCard
  - 备份：`/opt/dujiao-next/web/user.pre-about-content-20260519-005838`
  - 真鼠标 hover 应可见跟随 radial gradient + （hub 卡）conic-gradient 边框；Chrome MCP 自动化 hover 不触发 :hover 状态，需用户真浏览器验收
- UX 批次 a1-a9（2026-05-19，commit `0e8d36a`）：用户反馈 9 块视觉/导航/内链调整
  - **a1+a2** `Blog.vue` 缩略图 `h-48` → `aspect-video`（16:9 原比例），删黑色蒙层
  - **a3** `BlogDetail.vue` / `Blog.vue` 列表删主区 `<QQContactCard>` + import
  - **a4** `Navbar.vue` 顺序：首页 / AI 资源 ▾ / 工具 / 资讯 / 商品中心 / 关于（hub 优先 + 去公告）；拆 `menuItemsLeft` + `menuItemsRight` 让 AI/工具 嵌中间；`NAV_HIDDEN_BUILTIN` 过滤 notice 桌面+移动抽屉
  - **a5** 首页最新教程 已动态（无改动）
  - **a6** `Home.vue` 最新教程 `page_size: 3 → 6`；卡片加 `aspect-video` 缩略图 + group-hover；md 3 列 × 2 行
  - **a7** `Notice.vue` 删顶部 `<QQContactCard>` + import
  - **a8** Footer quickLinks 加 `/notice` 链接（Navbar 已去）
  - **a9** `Footer.vue` `md:grid-cols-5 → md:grid-cols-4`；删后台 site_description 渲染 → 硬编码 slogan；删 `brandDescription` computed；删社交图标占位 + WhatsApp v-if；联系 3 行 flex 替代 `<br />`
  - 备份：`/opt/dujiao-next/web/user.pre-uxbatch-20260519-003722`
- P1-O-3（2026-05-18，commit `f486493`）：游客订单密码 localStorage 加 24h 过期
  - 新建 `src/utils/guestAuth.ts`（统一 loadGuestAuth / saveGuestAuth / clearGuestAuth；saved_at 时间戳 + 24h TTL）
  - 改 4 个 view：`GuestOrderDetail.vue` / `GuestOrders.vue` / `Payment.vue` / `Checkout.vue` 全部直接 `localStorage.getItem/setItem/removeItem('guest_order_auth')` → util 函数
  - 安全收益：公用设备 48h 后回访 localStorage 已清；旧无 saved_at 格式第一次加载即被清除
  - 用户成本：仅一次性重新填邮箱 + 订单密码
  - 验证：Chrome 三场景实测（新鲜 / 48h 过期 / 旧格式）全部按预期 ✅
  - 备份：`/opt/dujiao-next/web/user.pre-p1o3-guestauth-20260519-000325`
  - 不在本批：`userAuth.ts` `user_token` 长期方案应转 HttpOnly cookie（需 backend session 改造）
- P1-O-2（2026-05-18，commit `3d5d9a4`）：ProductDetail 核心路径类型化
  - 根因：`src/api/types.ts` 没有 Product/SKU/PaymentChannel interface（289 处 any 的源头）
  - `src/api/types.ts` 新增 7 类型（Product / ProductSKU / PaymentChannel / Category / PromotionRule / MemberLevelPrice / LocalizedText + 3 string union）对应后端 dto.ProductResp
  - `src/views/ProductDetail.vue` 11 处 any → 0：ref<Product | null>，sku 参数 ProductSKU，channel PaymentChannel，rule PromotionRule
  - images fallback 用 explicit cast 保留旧后端 `{images: string[]}` 兼容，无运行时改动
  - 验证：Chrome 实测 /products/claude-pro + /products/apple-id-uk 全部正常 ✅
  - 备份：`/opt/dujiao-next/web/user.pre-p1o2-types-20260518-235008`
  - 遗留：其它 ~278 处 any 在 ProductCard / Cart / Checkout 等，未来批次渐进
- P1-O-1（2026-05-18，commits `2f04e60` + `b31655e`）：技术债清理 a11y + i18n 轻量化
  - **aria-label**（commit `2f04e60`）：`Navbar.vue` 4 个 icon 按钮加 aria-label（AI 资源下拉 + 主题切换 + 移动汉堡 + 抽屉关闭）+ 移动抽屉容器 `role="dialog"` / `aria-modal` / `aria-label`
  - **vue-i18n 替换**（commit `b31655e`）：
    - 新增 `src/utils/i18n-lite.ts`（60 行：useI18n shim 含 t() 嵌套 key + `{var}` 插值 + locale ref）
    - 新增 `src/i18n/messages-zh-cn.ts`（967 行 zh-CN data）
    - 改 `src/i18n/index.ts`：1956 → 10 行 noop stub + `global: { t, locale }` 兼容 `client.ts` 模块顶层 `i18n.global.t()`
    - 改 `vite.config.ts`：`resolve.alias` `'vue-i18n'` → `'./src/utils/i18n-lite.ts'`，**52 个 `from 'vue-i18n'` import 一行未改**
    - 删 `vendor-vue-i18n` manual chunk
    - 实际收益：vendor-vue-i18n chunk **消失**（50.35 kB gzip → 0），main bundle +21 kB（zh-CN data 内联），**净省 29 kB gzip**
  - 验证：Chrome 实测首页 / 商品中心 / 404 + `{site}` 插值全部正常
  - vue-i18n 仍在 `package.json` dependencies（per 红线"不主动改 lockfile"），但被 tree-shake 出 bundle
  - 备份：aria `/opt/dujiao-next/web/user.pre-p1o-aria-20260518-232511`；i18n `/opt/dujiao-next/web/user.pre-p1o-i18nlite-20260518-233015`
- P1-N-2（2026-05-18，commit `c7cf46d`）：4 篇新博客发布 + 内链对接
  - admin 发布 4 篇博客（id 17-20）：`gemini-pro-vs-advanced` / `apple-id-overseas-registration-guide` / `how-to-pick-ai-subscription-store` / `sora-veo-hailuo-video-subscription`
  - `BlogDetail.vue` relatedLinks 新增 4 主题分支（gemini / apple-id / sora / how-to-pick），按 slug 前缀切换
  - `GeminiHub.vue` "相关阅读"→"相关教程"，加首篇 Gemini 主题博客 + 视频订阅博客（解决审计 §3.3 "Gemini 0 篇主题博客" 缺口）
  - `ClaudeHub.vue` 底部加"如何挑店家" + "Apple ID 注册攻略"
  - `ChatgptHub.vue` 底部加 "视频订阅" + "如何挑店家" + "Apple ID 注册"
  - `OpenaiHub.vue` "相关阅读" 加 "视频订阅" + "如何挑店家"
  - `public/sitemap.xml` + `scripts/urls-core.txt` 加 4 条 URL（24 / 25 行）
  - `scripts/urls-new-p1n2.txt` 新建（仅 4 个新 URL 用于增量 IndexNow + 百度推送）
  - Chrome 实测 3 个新博客相关资源切换正确 ✅
  - 备份：`/opt/dujiao-next/web/user.pre-p1n2-internlinks-20260518-211428`
  - **遗留 todo**：用户手动跑 `BAIDU_PUSH_TOKEN=xxx INDEXNOW_KEY=yyy ./scripts/push-search.sh scripts/urls-new-p1n2.txt`
- P1-N-1（2026-05-18，commit `17df0a0`）：内链动态化
  - `BlogDetail.vue` 相关资源由 hardcoded 4 链接改为 `v-for relatedLinks`，computed 按 slug 前缀切换：
    - `claude-*` slug → Claude 中心 + Claude Pro + Claude Max 5x + tools
    - `chatgpt-*` slug → ChatGPT 中心 + ChatGPT Plus + ChatGPT Pro 5x + tools
    - 含 `codex` 关键字（codex vs claude code 那篇）→ ChatGPT 中心 + Claude 中心 + 双方 Pro/Max
    - fallback（公告 / 未匹配）→ 原 4 个通用链接
  - `OpenaiHub.vue` "相关教程" 4 篇博客（和 ChatgptHub 100% 重复）→ "相关阅读" sibling hub + 1 篇 codex 博客 + /blog + /tools + /products
  - 备份：`/opt/dujiao-next/web/user.pre-p1n1-20260518-190542`
- P1-M 视觉微调（2026-05-18，commit `f2e6229`）：桌面网格 `lg:grid-cols-3` → `lg:grid-cols-5`，前端 cap 从 6 → 5；fallback 4 个最新（5 列里留一格空，可接受）。背景：用户实测 sort_order 全链路通过（1/2/3 顺序、99 跳第一、0 fallback 都正常），反馈"3 列卡片在 PC 上有点大"。备份 `/opt/dujiao-next/web/user.pre-p1m-grid5-20260518-175701`。
- P1-M（2026-05-18，前端 commit `a4b6152` + 后端 commit `139055a`）：首页"精选推荐"接入后台 sort_order
  - **后端**（首次涉及 backend 源码改动）：
    - 仓库 clone 到 `/Users/Apple/52hub-source-hardening/dujiao-next-api`，本地分支 `52hub/v1.0.2-api-sortorder`（未 push，因无 fork remote）
    - 改 `internal/dto/product.go` + `internal/http/handlers/public/public.go` 共 2 行，把 `sort_order` 暴露到公开 API
    - 生产机 docker build 新镜像 `dujiaonext/api:v1.0.2-52hub-sortorder` + 改 docker-compose 切镜像 + `docker compose up -d api`
    - api compose 备份：`/opt/dujiao-next/docker-compose.yml.pre-sortorder-20260518-163010`
  - **前端**：
    - `views/Home.vue`：loadFeaturedProducts 改为拉 50 个商品后 filter `sort_order > 0`，取前 6；fallback 4 个最新避免空白
    - 网格 5 列 → 3 列
    - 备份：`/opt/dujiao-next/web/user.pre-p1m-frontend-20260518-165839`
  - **admin 后台操作**：商品编辑表已有 sort_order 数字输入（之前一直存在但前端没读），设 1+ 即上首页"精选推荐"，数字越大越靠前
- P1-L follow-up（2026-05-18，commit `e4cc16c`）：修复 `Products.vue` Store JSON-LD 字段
  - P1-L 用 `useHead({script:[{type:'application/ld+json', children: JSON.stringify(...)}]})`，但 `@unhead/vue` 把 `children` 当 slot prop，不是 script tag 的 inline 内容；Chrome 实测 `/products` 第 3 段 JSON-LD parse 失败
  - 修复：`children` → `innerHTML`（@unhead/vue 标准字段）
  - 验证：`/products` 3 段 schema 全 parse 成功（Organization + WebSite + Store）；`/categories/claude` 仍只 2 段 + robots noindex,follow
  - 备份：`/opt/dujiao-next/web/user.pre-jsonld-fix-20260518-144959`
- P1-L（2026-05-18，commit `4aa6354`）：SEO 收口 + hub 口径文案 + 4 核心页 useHead + 死 asset 清理
  - `index.html`：title/desc/OG/Twitter 改 hub-first 口径；JSON-LD 从 Store + WebSite 改为 Organization + WebSite
  - `src/i18n/index.ts`：home featured / products subtitle / About / footer 文案对齐 hub 定位；保留 `nav.products = 商品中心`
  - `Home.vue` / `Blog.vue` / `Notice.vue` / `Products.vue`：setup 顶层同步 `useHead`，禁止 watch/onMounted 内调用；`Products.vue` 用 computed 响应 `/categories/:slug`
  - `/products` 注入 Store JSON-LD；`/categories/:slug` 注入 `robots=noindex,follow`
  - `public/sitemap.xml` 从 25 URL 降到 20；`scripts/urls-core.txt` 同步移除 categories URL；删除无引用 `public/dj.svg`
  - 备份：`/opt/dujiao-next/web/user.pre-p1l-20260518-135915`
  - 构建产物：`dist/assets/index-CL5XHmkk.js`
- BlogDetail 崩溃修复 + About useHead（2026-05-18，commit `22631e4`，P1-K hotfix）：
  - P1-K 把 `useHead` 写在 `watch(() => post.value, (p) => {...useHead({...})}, { immediate:true })` 内，但 `useHead` 必须在 setup 同步调用 → 在 watch callback 内 context 丢失 → 抛 `useHead() was called without provide context` → 整个 BlogDetail 页降级为「错误/重试」按钮，**8 篇博客全部受影响**
  - 修复：单次 setup-level `useHead({...})`，title/meta/link 各传 `computed(() => ...)`，head 响应 post 加载
  - `About.vue` 顺手加 useHead（原本 0 调用，会继承前一个路由 head 导致 `/about` 显示首页 title + canonical=`/`）
  - 备份：`/opt/dujiao-next/web/user.pre-bloghotfix-20260518-131046`
  - 遗留：Home / Blog 列表 / Notice / Products 仍缺 useHead，进第三轮审计
- P1-K（2026-05-18，commit `4f98c6c`）：SEO 收口 + 内链建设 + 死代码清理
  - `public/sitemap.xml` 补 5 个新页面（tools + 4 hubs），总 25 URL
  - `scripts/urls-core.txt` 同步 5 个 URL
  - 5 个 hub/tools 页扩展 useHead 加 og:title/description/url/type + canonical
  - ClaudeHub/ChatgptHub/OpenaiHub 底部加"相关教程"链回 blog（slug 实测存在）
  - GeminiHub 底部加"相关阅读"（无 Gemini 主题博客，链到兄弟 hub + /blog + /products）
  - `BlogDetail.vue` 加 useHead（watch post 数据后注入 title/og/canonical）+ 文末"相关资源"
  - `SiteHero.vue` 删除顶部 TG/TG/QQ 联系胶囊条（Footer 已覆盖，按 memory 偏好去重）
  - 删除 `HomeAnnouncement.vue`（P1-I 后死代码）+ `ContactStrip.vue`（创建但未在 Home 渲染）
  - 备份：`/opt/dujiao-next/web/user.pre-p1k-20260518-125422`
- P1-J'-fix（2026-05-18，commit `6759758`）：
  - 仅改 `src/components/Navbar.vue`
  - 桌面 AI 资源下拉之前用 Tailwind v4 具名 group (`group/aihub`) — stylesheet 实测未编译该规则，hover 永远 `display:none`
  - 父容器 `overflow-x:auto` 会同步把 overflow-y 升级为 auto，即使下拉能 display:block 也会被裁
  - 修复：删除具名 group，改用 Vue ref + `@mouseenter/@mouseleave` + `<Teleport to="body">` + fixed 定位（位置基于 trigger `getBoundingClientRect`），加 `watch(() => route.path, ...)` 路由切换自动关闭
  - Chrome 实测：hover → 4 个 hub 链接弹出；点击「Claude 资源」→ URL 跳转 `/claude-hub`
  - 备份：`/opt/dujiao-next/web/user.pre-p1jfix-20260518-041645`
- P1-J'（2026-05-18，commit `a766d45`）：
  - 仅改 `src/components/Navbar.vue`
  - 桌面端新增「AI 资源 ▾」hover 下拉（Claude/ChatGPT/OpenAI/Gemini）与「工具」顶级入口（`/tools`）
  - 移动抽屉新增「AI 资源」分组（4 hub + 工具集合）
  - 保持 `menuItems` / `mobileDrawerItems` 逻辑不变，不混入 backend builtin nav 配置
  - 备份：`/opt/dujiao-next/web/user.pre-p1j-navbar-20260518-034323`
- 视觉微调（2026-05-18，commit `f331fcc`）：
  - `SiteHero.vue` 顶部联系条恢复图标 + 单行胶囊样式，主标题不再被联系条压住
  - `Footer.vue` "联系我们"由边框卡片改为紧凑图标行，5 列网格保留以避免"在线工具"换行
  - 备份：`/opt/dujiao-next/web/user.pre-visual-microtune-20260518-020752`
  - 部署先于 commit，事后补提交完成 git/生产一致性
- P1-I（2026-05-18，commit `c5ff727`）：首页大改
  - 新增 `SiteHero.vue` / `ResourceHubGrid.vue` / `ContactStrip.vue` 三个组件
  - card mode 用 SiteHero + ResourceHubGrid 替换原 HomeAnnouncement（HomeAnnouncement 保留未删）
  - `Footer.vue` 改 5 列：Brand / 快速链接 / AI 资源 / 在线工具（双子导航）
  - PROJECT-STATUS §2.5 新增"定位演进"章节
  - 备份：`/opt/dujiao-next/web/user.pre-p1i-20260518-014252`
- P1-H（2026-05-18，commit `1d71398`）：
  - 新增 `views/OpenaiHub.vue`、`views/GeminiHub.vue`
  - `router/index.ts` 加 `/openai-hub`、`/gemini-hub`
  - `views/Tools.vue` 新增 5sim.net + 尼日利亚 Apple Store
- P1-G（2026-05-18，commit `86ec92e`）：
  - 新增 `views/Tools.vue`（6 工具分类）、`views/ClaudeHub.vue`、`views/ChatgptHub.vue`
  - `router/index.ts` 加 `/tools`、`/claude-hub`、`/chatgpt-hub`
  - `views/Home.vue` card mode 在公告卡下新增"最新教程"区块（3 篇 blog）
- P0-2.3（2026-05-18）：
  - 新增 `scripts/push-search.sh`（百度推送 + Bing IndexNow，读取 `BAIDU_PUSH_TOKEN` 和 `INDEXNOW_KEY` 环境变量）
  - 新增 `scripts/urls-core.txt`（20 个核心 URL）
  - 新增并部署 `public/<indexnow-key>.txt`（线上可访问，供 IndexNow 验证）
  - 新增 `.env.local.example`（仅占位符，不含真实 token/key）
- P0-2.2（2026-05-17）：
  - 新增并纳入版本控制：`public/google983c3b37d4dafb06.html`、`public/baidu_verify_codeva-xBQwq8EIH8.html`、`public/BingSiteAuth.xml`
  - 说明：Google/百度/Bing 验证文件已在生产可访问，本次仅做 git 收口
- P0-2.1（2026-05-17）：
  - 更新 `public/sitemap.xml`：移除 `/auth/login` `/auth/register` `/guest/orders`
  - 新增 5 个分类页（`chatgpt/claude/gemini/apple/google`）+ 8 篇博客 URL
  - 线上验证：`https://52hub.org/sitemap.xml` 的 `<loc>` 计数为 `20`，`content-type: text/xml`
- P1-F（2026-05-17）：
  - `ProductCard.vue` 价格下新增信任徽章（自动/人工发货、库存分级、已售）
  - `ProductDetail.vue` 在价格区后新增信任带（平台担保、人工客服、自动商品直充即开、售后见说明；“余额可提现”已在 `a39439a` 下线）
- P1-E（2026-05-17）：
  - 商品 description 支持 `whitespace-pre-line` 多行渲染（卡片 `line-clamp-5`，详情页全量展示）
  - 新增 `src/components/PurchaseTerms.vue`
  - 在 `Products.vue`、`ProductDetail.vue`、`Cart.vue`、`Home.vue` 底部渲染 `<PurchaseTerms />`

- P1-G（2026-05-18）：新增 Tools/ClaudeHub/ChatgptHub 页面，Home card mode 在公告卡下增加“最新教程”区块（3 篇 blog）。

- P1-H（2026-05-18）：Tools 补充 `5sim.net` / `尼日利亚 Apple Store`，新增 `/openai-hub` 与 `/gemini-hub`，并按 SSH 流程完成生产部署与线上验证。
