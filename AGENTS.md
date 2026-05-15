# 52HUB User Frontend Agent Entry

当前目录是 52HUB user 前台源码仓库。

开始任务前必须先读：

1. `/Users/Apple/52hub-source-hardening/52HUB-AGENT-BOOTSTRAP.md`
2. `/Users/Apple/52hub-source-hardening/52HUB-PROJECT-STATUS.md`
3. `/Users/Apple/52hub-source-hardening/52HUB-OPERATIONS-RUNBOOK.md`
4. `/Users/Apple/52hub-source-hardening/52HUB-CHANGELOG.md`

当前关键状态：

- 分支：`52hub/v1.0.2-user-hardening`
- 当前有未提交改动。
- 未提交改动中包含已经上线的客服入口、QQ 群入口、人工发货说明。
- 也包含之前遗留的页面/路由改动，commit 前必须 review `git diff`。

边界：

- 不修改 admin。
- 不 push 到 `origin`。
- 不碰生产，除非用户明确要求上线。
- 上线只同步 `dist/` 到 `/opt/dujiao-next/web/user/`。
- 上线前必须备份 `/opt/dujiao-next/web/user`。
- 不输出任何配置密钥。

构建命令：

```bash
npm run build
```

