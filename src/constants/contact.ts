// P1-A (2026-05-16): 联系方式常量
// - telegramService 是后台 config.contact.telegram 的兜底（后台填了优先用后台）
// - telegramChannel 后台暂无字段，前端硬编码
// - qqGroup 后台无字段，前端硬编码
export const CONTACTS = {
  telegramService: 'https://t.me/HUB52service',
  telegramChannel: 'https://t.me/Hub52Notice',
  qqGroup: '1105879333',
  qqGroupVerifyAnswer: '52hub',
} as const
