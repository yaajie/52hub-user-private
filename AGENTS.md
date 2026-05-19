# 52HUB User Frontend — Codex Agent Entry

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
- **最新代码 commit：`7b1a9e2 52hub: HubSection grid 按 item 数动态选列数（修 4 卡 3+1 孤儿）`**
- private remote：`https://github.com/yaajie/52hub-user-private`（已同步）
- working tree：clean

---

## ⚠️ 任务完成后——强制清单，全部勾完才算完成

- [ ] `git add` 相关文件，`git commit`，`git push private 52hub/v1.0.2-user-hardening`
- [ ] `/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md`：新增改动条目（改了什么 / 是否上线 / commit hash / 备份路径）
- [ ] `/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md`：更新「当前 Git 快照」commit hash + 「最近改动速查」表
- [ ] `/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md`：更新相关状态描述
- [ ] 本文件（`AGENTS.md`）：更新「当前仓库快照」中的 commit hash
- [ ] `CLAUDE.md`（同目录）：更新「当前仓库快照」中的 commit hash

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

- Hub Batch 1.5 · HubSection 动态 grid（2026-05-19，commit `7b1a9e2`）：用户反馈 4 卡 section "3+1 排序难看"。`HubSection.vue` grid class 由固定 `md:grid-cols-3` 改为按 items.length 动态计算：1 卡 `max-w-md mx-auto` 居中，2 卡 `sm:grid-cols-2`，4 卡 `sm:grid-cols-2 lg:grid-cols-4`（sm/md 2+2，lg 4 一行），3/5/6/其他默认 3 列。Chrome 桌面 1787 实测 4 卡所有 section 4 一行、1 卡居中。5 卡 section 仍 3+2，Batch 2 内容补齐时调整。备份 `user.pre-hubgrid-20260519-122818`。
- Hub 改造 Batch 1（2026-05-19，commit `fa09864`）：新增 `src/components/hub/` 8 个共享组件（`HubLayout` / `HubHero` / `HubSection` / `HubResourceCard` / `HubCtaCard` / `HubModelTable` / `HubFaq` / `HubRelatedList`）；4 个 hub view 改为数据驱动接入，当前文案、资源链接、模型/档位表格、订阅直充卡、相关教程保持原样。Batch 1 未启用 FAQ 数据、动态商品 API、OG 图或新增 Schema。`npm run build` 通过；生产备份 `/opt/dujiao-next/web/user.pre-hubrevamp-batch1-20260519-105943`；Chrome headless 1440×900 + 430×932 实测 `/claude-hub` `/chatgpt-hub` `/openai-hub` `/gemini-hub` 均 200、无 console error、无横向溢出。

- 导航条文字 + BlogDetail 封面图比例（2026-05-19，commit `20d65bb`）：PC 桌面 "工具" → "工具集合"（图标保留现有 SVG）；`menuItems.blog.label` 由 i18n key `'nav.blog'` 改字面量 `'AI 资讯'`，桌面 menuItemsRight + 移动 drawer 同时生效，Footer/Blog H1/卡片标签/面包屑仍走 i18n nav.blog 显示"资讯"；BlogDetail 封面图容器 `h-64 md:h-96` → `aspect-video`，修移动端非 16:9 内容显示不完整问题，Chrome 实测容器 1.778 = 16:9。备份 `/opt/dujiao-next/web/user.pre-navlabels-20260519-100714`。
- mobile UX 紧凑收尾（2026-05-19，commit `8fe0047`）：4 文件 mobile 微调收尾。`ContactFloat.vue` mobile 浮按 `bottom-24` → `bottom-36` 避免遮挡 Footer；`Footer.vue` 容器 padding 进一步收紧 + Brand 加 `mx-auto w-fit text-left` mobile 居中；`SiteHero.vue` 首页 3 CTA 由 `flex flex-wrap` 改为 `grid grid-cols-3` 等宽紧凑 + 字号/padding 压缩；`Blog.vue` 资讯页顶部 padding、标题字号、副标题 max-w 全部缩小。Chrome 实测 430×932 Footer 总高 420px（之前 800+px）、SiteHero 3 CTA 等宽 102px 不换行。备份 `/opt/dujiao-next/web/user.pre-mobile-tighten-20260519-091923`。
- 后台 CSP unsafe-eval 修复 + mobile Footer 极简化（2026-05-19，commit `2befd37`）：生产 OpenResty `nginx.conf` line 48 `script-src` 增加 `'unsafe-eval'`，修复后台 `/login` 只显示版权、console `EvalError ... unsafe-eval is not an allowed source`；备份 `/opt/1panel/apps/openresty/52hub-openresty/conf/nginx.conf.pre-admin-csp-unsafe-eval-20260519-053729`，reload `2026-05-19T05:37:44+08:00`。Footer 在 `<640px` 隐藏快速链接 / AI 资源 / 在线工具，只保留品牌介绍和联系方式；sm+ 保留导航列；user 备份 `/opt/dujiao-next/web/user.pre-mobile-footer-minimal-20260519-054048`。
- Footer mobile 二次收口（2026-05-19，commit `5f0a6bf`）：按用户 iPhone 14 Pro Max 430×932 截图反馈复测。Chrome headless 线上量测 disclaimer bottom → footer top = 120px、→ Brand top = 185px，低于 200px，因此未动 Tools 页 bottom padding；Footer xs 改为 `grid-cols-2`，Brand `col-span-2` 全宽，快速链接 + AI 资源同行，在线工具采用 A 方案 `col-span-2 sm:col-span-1` 全宽避免孤儿；桌面 4 列断点从 `md` 提到 `lg`，确保 768px 为 Brand 全宽 + 3 列同行，1440px 仍 4 等宽。备份 `/opt/dujiao-next/web/user.pre-mobile-fix2-20260519-052226`。
- /tools 双卡 hero + arity 补齐 + Footer 移动修复（2026-05-19，commit `f5516e2`）：Hero 重排为紧凑 banner + 双卡（IP 占 2/3 + Browser 占 1/3）；新增 Browser 卡用 navigator API 同步读取 browser/os/screen/language/connection（含 Edge/Opera/Firefox/Chrome/Safari userAgent 解析 + 中文映射）；Tools 6 分类 arity 由 5/4/4/3/3/2 补齐为 6/6/6/6/3/3（+IP-API、+Cloudflare Status、+AmIUnique、+CoverYourTracks、+DNSChecker、+VirusTotal、+BGP.he.net、+SMS-Activate）；Footer 移动端 `grid-cols-2` → `grid-cols-1 sm:grid-cols-3 md:grid-cols-4`，Brand `col-span-2` → `sm:col-span-3 md:col-span-1`，解决 mobile 下"在线工具"半行孤儿。备份 `pre-tools-browserinfo-20260519-045904`。
- /tools hero IP 实时面板（2026-05-19，commit `e72606b`）：替换 mock SERVICE STATUS。ipapi.co/json 拉真实 IP / 地理 / ISP；28 keyword 判定 datacenter；实时时钟 + 闪烁光标 + AbortController 5s 超时；OpenResty CSP connect-src 加 ipapi.co（Python `open('r+')` 保 inode 71390929，备份 nginx.conf.pre-ipapi-20260519-0440）。实测 Oracle Cloud 识别为 datacenter ⚠。
- /tools 页重做（2026-05-19，commit `211c596`）：监控仪表盘风格 hero（左 H1 + live badge 右 SERVICE STATUS 4 条 mock 状态闪烁绿点）；6 分类加 [01]-[06] 编号 + 6 种 accent color；22 工具卡含首字 favicon + monospace host + spotlight + 外链 arrow hover；底部 disclaimer 改终端代码块风格。备份 `pre-tools-redesign-20260519-042528`。
- Phase 4 CSP enforce（2026-05-19，无 user 仓库 commit；OpenResty 配置改动）：nginx.conf 3 处改动（script-src + CF analytics 域名 + connect-src + CF insights 域名 + header name 切 enforce）。Python `open('r+')` 保 bind mount inode 71390929。5 个关键页面 0 CSP violation 实测。备份 `nginx.conf.pre-csp-enforce-20260519-041342` 可一行回滚。
- Phase 3 数据接入（2026-05-19，commit `d03ec74`）：Cloudflare Web Analytics beacon 嵌入 index.html `</head>` 之前。手动注入模式 + 排除欧盟访客。token 公开 `e1969593...`。实测 beacon.min.js 200 + RUM POST 204。CSP enforce 需后续白名单 `static.cloudflareinsights.com` 到 script-src + `cloudflareinsights.com` 到 connect-src。备份 `pre-cf-analytics-20260519-013215`。
- About 页重做（2026-05-19，commit `dba74a3`）：去 max-w-4xl 用标准 container；Hero 2 列（左 Jay 自述 + 右伪 macOS 终端卡，含 which-ai 命令展示 + uptime 自动计算 + 闪烁光标，AI 站技术感锚点）；3 卡横排发货/售后/隐私；底部 2 列服务内容 + 联系方式；样式内联 scoped。备份 `pre-about-redesign-20260519-011423`。
- About 扩展 + Spotlight（2026-05-19，commits `b3e5357` + `c3db562`）：About 加发货/售后/隐私 3 固定 section；新建 v-spotlight directive 应用到 4 hub 卡（含 border）+ 最新教程 6 卡 + Blog 列表 + ProductCard。备份 `pre-about-content-20260519-005838`。
- UX 批次 a1-a9（2026-05-19，commit `0e8d36a`）：Blog 缩略图 aspect-video 16:9；Navbar 顺序首页/AI 资源/工具/资讯/商品中心/关于（去公告）；首页最新教程 6 卡 + 缩略图；Footer 4 列 + 硬编码 slogan + 删后台长描述；删 Blog/BlogDetail/Notice 主区冗余 QQContactCard；Footer quickLinks 保留 notice 入口。备份 `pre-uxbatch-20260519-003722`。
- P1-O-3（2026-05-18，commit `f486493`）：游客订单密码 localStorage `guest_order_auth` 加 24h TTL。新建 `src/utils/guestAuth.ts` 统一 4 个 view（GuestOrderDetail/GuestOrders/Payment/Checkout）。saved_at 时间戳 + 兼容旧格式自动清除。Chrome 实测三场景（新鲜/48h 过期/旧格式）通过。`userAuth.ts` user_token 长期方案需 backend session 改造，不在本批。备份 `pre-p1o3-guestauth-20260519-000325`。
- P1-O-2（2026-05-18，commit `3d5d9a4`）：ProductDetail 核心路径类型化（11 any → 0）。`api/types.ts` 加 7 类型对应后端 dto（Product/ProductSKU/PaymentChannel/Category/PromotionRule/MemberLevelPrice/LocalizedText）。`ProductDetail.vue` ref<Product | null>, sku/channel/rule 参数全部类型化。images fallback explicit cast 保留旧后端兼容。Chrome 实测 claude-pro + apple-id-uk 正常。剩余 278 处 any 未来批次。备份 `pre-p1o2-types-20260518-235008`。
- P1-O-1（2026-05-18，commits `2f04e60` + `b31655e`）：技术债清理 a11y + i18n 轻量化。Navbar 4 个 icon 按钮加 aria-label + 抽屉 role="dialog"/aria-modal。替换 vue-i18n runtime 为 60 行自实现 `src/utils/i18n-lite.ts`（vite alias 'vue-i18n' → 自实现 shim，**52 个 import 一行未改**），抽出 messages-zh-cn.ts（967 行），i18n/index.ts 1956 → 10 行。**省 29 kB gzip**（vendor-vue-i18n chunk 消失）。vue-i18n 仍在 package.json 但 tree-shake 出 bundle。备份：aria `pre-p1o-aria-20260518-232511`，i18n `pre-p1o-i18nlite-20260518-233015`。
- P1-N-2（2026-05-18，commit `c7cf46d`）：admin 发 4 篇博客（id 17-20：gemini/apple-id/选店家/视频订阅）+ BlogDetail relatedLinks 加 4 主题分支（gemini/apple-id/sora/how-to-pick） + GeminiHub 加 Gemini 主题博客（解决审计 §3.3 0 篇缺口）+ ClaudeHub/ChatgptHub/OpenaiHub 加新博客 + sitemap 24 URL + urls-new-p1n2.txt 待 IndexNow 推送。备份 `/opt/dujiao-next/web/user.pre-p1n2-internlinks-20260518-211428`。
- P1-N-1（2026-05-18，commit `17df0a0`）：BlogDetail 相关资源由 hardcoded 4 链接改为 computed 按 slug 主题切换（claude/chatgpt/codex 各 1 套 + fallback）；OpenaiHub 底部 "相关教程" 4 篇博客（和 ChatgptHub 100% 重复）→ "相关阅读" 6 个 sibling hub + 单篇 codex 博客 + tools + products + /blog。备份 `/opt/dujiao-next/web/user.pre-p1n1-20260518-190542`。
- P1-M 视觉微调（2026-05-18，commit `f2e6229`）：桌面 `lg:grid-cols-3` → `lg:grid-cols-5`，前端 cap 6 → 5。用户实测全链路通过后反馈卡片太大。备份 `/opt/dujiao-next/web/user.pre-p1m-grid5-20260518-175701`。
- P1-M（2026-05-18，前端 `a4b6152` + 后端 `139055a`）：首页"精选推荐"接入后台 sort_order。后端 clone `dujiao-next/dujiao-next` 到 `/Users/Apple/52hub-source-hardening/dujiao-next-api`（本地 branch `52hub/v1.0.2-api-sortorder`，未 push），改 dto + handler 各 1 行暴露 sort_order；生产 docker build 新镜像 `dujiaonext/api:v1.0.2-52hub-sortorder` 已部署，老镜像保留可回滚。前端 Home.vue 拉 50 个 filter sort_order>0 取前 6，fallback 4 个最新；网格 3 列。**admin 后台操作**：商品编辑表 sort_order 数字输入（1+ 上首页，越大越靠前）。备份：api compose `/opt/dujiao-next/docker-compose.yml.pre-sortorder-20260518-163010`，前端 `/opt/dujiao-next/web/user.pre-p1m-frontend-20260518-165839`。
- P1-L follow-up（2026-05-18，commit `e4cc16c`）：修复 `Products.vue` Store JSON-LD 字段。P1-L 用 `children: JSON.stringify(...)` 注入 schema，但 @unhead/vue 把 `children` 当 slot prop 处理，Chrome 实测 `/products` 第 3 段 JSON-LD parse 失败。改用 `innerHTML`，三段 schema 全 parse 成功；分类页仍只 2 段 + noindex,follow。备份 `/opt/dujiao-next/web/user.pre-jsonld-fix-20260518-144959`。
- P1-L（2026-05-18，commit `4aa6354`）：SEO 收口 + hub 口径文案 + 4 核心页 useHead + 死 asset 清理。`index.html` 改 hub-first SEO 与 Organization + WebSite JSON-LD；Store schema 移到 `/products` 的 setup-level useHead；Home/Blog/Notice/Products 加 setup 顶层 useHead，分类页 `noindex,follow`；sitemap/categories URL 从 25 降到 20；删除无引用 `public/dj.svg`。备份 `/opt/dujiao-next/web/user.pre-p1l-20260518-135915`，构建产物 `dist/assets/index-CL5XHmkk.js`。
- BlogDetail 崩溃修复 + About useHead（2026-05-18，commit `22631e4`，P1-K hotfix）：P1-K 把 useHead 写在 watch 内导致 `useHead() was called without provide context`，整个 BlogDetail 页降级为「错误/重试」，8 篇博客全部崩。改回 setup 直接 call useHead + 传 computed 响应式 source。顺手给 About 加 useHead 避免继承首页 head。备份 `/opt/dujiao-next/web/user.pre-bloghotfix-20260518-131046`。
- P1-K（2026-05-18，commit `4f98c6c`）：SEO 收口 + 内链建设 + 死代码清理。sitemap 补 5 个新页面（25 URL）；5 个 hub/tools 扩 og+canonical；ClaudeHub/ChatgptHub/OpenaiHub 加"相关教程"，GeminiHub 加"相关阅读"；BlogDetail 加 useHead + "相关资源"；SiteHero 删顶部联系胶囊；删 HomeAnnouncement.vue + ContactStrip.vue。备份 `/opt/dujiao-next/web/user.pre-p1k-20260518-125422`。
- P1-J'-fix（2026-05-18，commit `6759758`）：修复桌面 AI 资源下拉打不开。Tailwind v4 具名 group `group/aihub` 实测未编译进 stylesheet，hover 永远 `display:none`；父容器 `overflow-x:auto` 同步把 overflow-y 升级为 auto 会裁切下拉。改用 Vue ref + `<Teleport to="body">` + `position:fixed`（基于 trigger `getBoundingClientRect`）+ `watch(() => route.path)` 自动关闭。Chrome 实测 hover/click 跳转通过。备份 `/opt/dujiao-next/web/user.pre-p1jfix-20260518-041645`。
- P1-J'（2026-05-18，commit `a766d45`）：
  - 仅改 `src/components/Navbar.vue`
  - 桌面端新增「AI 资源 ▾」hover 下拉（Claude/ChatGPT/OpenAI/Gemini）与「工具」顶级入口（`/tools`）
  - 移动抽屉新增「AI 资源」分组（4 hub + 工具集合）
  - 保持 `menuItems` / `mobileDrawerItems` 逻辑不变，不混入 backend builtin nav 配置
  - 备份：`/opt/dujiao-next/web/user.pre-p1j-navbar-20260518-034323`
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
  - `ProductDetail.vue` 在价格区后新增信任带（平台担保、人工客服、自动商品直充即开、余额可提现、售后见说明）
- P1-E（2026-05-17）：
  - 商品 description 支持 `whitespace-pre-line` 多行渲染（卡片 `line-clamp-5`，详情页全量展示）
  - 新增 `src/components/PurchaseTerms.vue`
  - 在 `Products.vue`、`ProductDetail.vue`、`Cart.vue`、`Home.vue` 底部渲染 `<PurchaseTerms />`

- P1-G（2026-05-18，commit `86ec92e`）：新增 Tools/ClaudeHub/ChatgptHub 页面，Home card mode 在公告卡下增加“最新教程”区块（3 篇 blog）。

- P1-H（2026-05-18，commit `1d71398`）：Tools 补充 `5sim.net` / `尼日利亚 Apple Store`，新增 `/openai-hub` 与 `/gemini-hub`，并按 SSH 流程完成生产部署与线上验证。

- P1-I（2026-05-18，commit `c5ff727`）：首页大改——新增 `SiteHero.vue` / `ResourceHubGrid.vue` / `ContactStrip.vue`；card mode 用 SiteHero + ResourceHubGrid 替换原 HomeAnnouncement；`Footer.vue` 改 5 列双子导航（AI 资源 + 在线工具）；备份 `/opt/dujiao-next/web/user.pre-p1i-20260518-014252`。

- 视觉微调（2026-05-18，commit `f331fcc`）：`SiteHero.vue` 顶部联系条恢复图标 + 单行胶囊样式；`Footer.vue` "联系我们"改紧凑图标行；备份 `/opt/dujiao-next/web/user.pre-visual-microtune-20260518-020752`。部署先于 commit，事后补提交。
