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
- **最新 commit：`dba74a3 52hub: redesign /about layout — full-width + terminal hero + 3-col grid`**
- private remote：`https://github.com/yaajie/52hub-user-private`（已同步）
- working tree：clean

---

## ⚠️ 任务完成后——强制清单，全部勾完才算完成

- [ ] `git add` 相关文件，`git commit`，`git push private 52hub/v1.0.2-user-hardening`
- [ ] `/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md`：新增改动条目（改了什么 / 是否上线 / commit hash / 备份路径）
- [ ] `/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md`：更新「当前 Git 快照」commit hash + 「最近改动速查」表
- [ ] `/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md`：更新相关状态描述
- [ ] 本文件（`CLAUDE.md`）：更新「当前仓库快照」中的 commit hash
- [ ] `AGENTS.md`（同目录）：更新「当前仓库快照」中的 commit hash

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
  - `ProductDetail.vue` 在价格区后新增信任带（平台担保、人工客服、自动商品直充即开、余额可提现、售后见说明）
- P1-E（2026-05-17）：
  - 商品 description 支持 `whitespace-pre-line` 多行渲染（卡片 `line-clamp-5`，详情页全量展示）
  - 新增 `src/components/PurchaseTerms.vue`
  - 在 `Products.vue`、`ProductDetail.vue`、`Cart.vue`、`Home.vue` 底部渲染 `<PurchaseTerms />`

- P1-G（2026-05-18）：新增 Tools/ClaudeHub/ChatgptHub 页面，Home card mode 在公告卡下增加“最新教程”区块（3 篇 blog）。

- P1-H（2026-05-18）：Tools 补充 `5sim.net` / `尼日利亚 Apple Store`，新增 `/openai-hub` 与 `/gemini-hub`，并按 SSH 流程完成生产部署与线上验证。
