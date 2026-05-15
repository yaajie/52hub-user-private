# 52HUB User Frontend Claude Entry

当前目录是 52HUB user 前台源码仓库。

开始任务前必须先读：

1. `/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md`
2. `/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md`
3. `/Users/Apple/52hub-source-hardening/52HUB-OPERATIONS-RUNBOOK.md`
4. `/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md`

当前关键状态：

- 分支：`52hub/v1.0.2-user-hardening`
- 最新 commit：`da061bd 52hub: optimize ContactFloat mobile UX and remove redundant ProductDetail blocks`
- remote backup：`https://github.com/yaajie/52hub-user-private`（private，已 push）
- working tree：clean（CLAUDE.md 本地 dirty，待 commit）
- ContactFloat 移动端优化已上线；ProductDetail 冗余块已移除。
- 关于页面 QQ 群入口已上线；资讯（博客）首篇文章已发布。

边界：

- 不修改 admin。
- 不 push 到 `origin`。
- 不碰生产，除非用户明确要求上线。
- 上线只同步 `dist/` 到 `/opt/dujiao-next/web/user/`。
- 上线前必须备份 `/opt/dujiao-next/web/user`。
- 不输出任何配置密钥。
- 每次完成任何改动后，必须同步更新父目录 Markdown：
  - `/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md`
  - `/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md`
  - `/Users/Apple/52hub-source-hardening/52HUB-OPERATIONS-RUNBOOK.md`
  - `/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md`
- 如果本仓库 commit、dirty/clean 状态或部署状态变化，必须同步更新本文件和 `AGENTS.md`。

构建命令：

```bash
npm run build
```
