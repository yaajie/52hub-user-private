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
- **最新 commit：`4f98c6c 52hub: P1-K SEO + internal links + dead code + contact dedupe`**
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
