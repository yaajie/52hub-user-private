// 游客订单认证 localStorage 管理（含过期机制）
//
// 背景：审计 §9.2 (Codex scan) 指出 GuestOrderDetail.vue 等 4 个视图
// 把 { email, order_password } 永久写到 localStorage，公用设备 / 借用
// 场景下后来者可查到所有订单。P1-O-3 加 24 小时过期。
//
// 迁移成本：旧数据缺 saved_at，会被 loadGuestAuth() 自动判定为过期清空，
// 用户下次进站需重新填一次邮箱 + 订单密码。

const STORAGE_KEY = 'guest_order_auth'
const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface GuestAuth {
  email: string
  order_password: string
}

interface StoredAuth extends GuestAuth {
  saved_at?: number
}

const EMPTY: GuestAuth = { email: '', order_password: '' }

export function loadGuestAuth(): GuestAuth {
  if (typeof localStorage === 'undefined') return { ...EMPTY }
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { ...EMPTY }
  let parsed: StoredAuth
  try {
    parsed = JSON.parse(raw)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { ...EMPTY }
  }
  // 过期检查：缺 saved_at（迁移前旧数据）或已超 TTL → 清除返回空
  if (!parsed.saved_at || Date.now() - parsed.saved_at > TTL_MS) {
    localStorage.removeItem(STORAGE_KEY)
    return { ...EMPTY }
  }
  return {
    email: parsed.email || '',
    order_password: parsed.order_password || '',
  }
}

export function saveGuestAuth(auth: GuestAuth): void {
  if (typeof localStorage === 'undefined') return
  // 空数据不写入（避免 logout 后又被无意义保留）
  if (!auth.email && !auth.order_password) {
    clearGuestAuth()
    return
  }
  const stored: StoredAuth = {
    email: auth.email,
    order_password: auth.order_password,
    saved_at: Date.now(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

export function clearGuestAuth(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
