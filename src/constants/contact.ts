// 联系方式常量（2026-06-10 改：删 QQ 群，改企微在线客服 + 公开 QQ 号）
// - telegramService 是后台 config.contact.telegram 的兜底（后台填了优先用后台）
// - wechatService 企微在线客服接入链接（公开首触，无需加好友，进机器人+人工接待）
// - qq 公开 QQ 号（灵活细聊，风控更松）
export const CONTACTS = {
  telegramService: 'https://t.me/HUB52service',
  telegramChannel: 'https://t.me/Hub52Notice',
  wechatService: 'https://work.weixin.qq.com/kfid/kfcbbf5731aecc5daeb',
  qq: '3691445470',
} as const
