export interface UserProfileData {
    id: number
    email: string
    nickname: string
    email_verified_at?: string | null
    locale: string
    member_level_id?: number
    total_recharged?: number | string
    total_spent?: number | string
    email_change_mode?: 'bind_only' | 'change_with_old_and_new'
    password_change_mode?: 'set_without_old' | 'change_with_old'
}

export interface PublicMemberLevel {
    id: number
    name: Record<string, string>
    slug: string
    icon: string
    discount_rate: number
    recharge_threshold: number
    spend_threshold: number
    is_default: boolean
    sort_order: number
}

export interface UpdateUserProfilePayload {
    nickname?: string
    locale?: string
}

export interface UserLoginLogItem {
    id: number
    user_id: number
    email: string
    status: string
    fail_reason?: string
    client_ip?: string
    user_agent?: string
    login_source?: string
    created_at?: string
}

export interface SendChangeEmailCodePayload {
    kind: 'old' | 'new'
    new_email?: string
}

export interface ChangeEmailPayload {
    new_email: string
    old_code?: string
    new_code: string
}

export interface ChangeUserPasswordPayload {
    old_password?: string
    new_password: string
}

export interface TelegramAuthPayload {
    id: number
    first_name?: string
    last_name?: string
    username?: string
    photo_url?: string
    auth_date: number
    hash: string
}

export interface TelegramMiniAppAuthPayload {
    init_data: string
}

export interface TelegramBindingData {
    bound: boolean
    provider?: string
    provider_user_id?: string
    username?: string
    avatar_url?: string
    auth_at?: string | null
    updated_at?: string | null
}

export interface WalletAccountData {
    balance: string
}

export interface WalletTransactionData {
    id: number
    type: string
    direction: string
    amount: string
    balance_after: string
    remark: string
    created_at: string
}

export interface WalletRechargePayload {
    amount: string
    channel_id: number
    currency?: string
    remark?: string
}

export interface WalletRechargeOrderData {
    id: number
    recharge_no: string
    amount: string
    payable_amount: string
    fee_amount: string
    currency: string
    status: string
    remark: string
    paid_at?: string
    created_at: string
}

export interface WalletRechargeResult {
    recharge?: WalletRechargeOrderData
    recharge_no?: string
    recharge_status?: string
    account?: WalletAccountData
    payment_id?: number
    provider_type?: string
    channel_type?: string
    interaction_mode?: string
    pay_url?: string
    qr_code?: string
    expires_at?: string
    status?: string
}

export interface GiftCardData {
    id: number
    name: string
    code: string
    amount: string
    currency: string
    status: string
    redeemed_at?: string
}

export interface GiftCardRedeemResult {
    gift_card: GiftCardData
    wallet: WalletAccountData
    transaction: WalletTransactionData
    wallet_delta: string
}

export interface AffiliateDashboardData {
    opened: boolean
    affiliate_code: string
    promotion_path: string
    click_count: number
    valid_order_count: number
    conversion_rate: number
    pending_commission: string
    available_commission: string
    withdrawn_commission: string
}

export interface AffiliateCommissionData {
    id: number
    commission_type: string
    commission_amount: string
    status: string
    confirm_at?: string
    available_at?: string
    created_at: string
}

export interface AffiliateWithdrawData {
    id: number
    amount: string
    channel: string
    account: string
    status: string
    reject_reason?: string
    created_at: string
}

export interface AffiliateWithdrawApplyPayload {
    amount: string
    channel: string
    account: string
}

export interface CreatePaymentPayload {
    order_no: string
    channel_id?: number
    use_balance?: boolean
}

export interface PaymentCreateResult {
    order_paid?: boolean
    wallet_paid_amount?: string
    online_pay_amount?: string
    payment_id?: number
    order_no?: string
    channel_id?: number
    provider_type?: string
    channel_type?: string
    interaction_mode?: string
    pay_url?: string
    qr_code?: string
    expires_at?: string
}

export interface CaptchaPayload {
    captcha_id?: string
    captcha_code?: string
    turnstile_token?: string
}

// ============================================================
// 公开商品 API 类型（P1-O-2 新增，对应后端 dto.ProductResp）
// ============================================================

/** 多语言文本字段，{ 'zh-CN': '...', 'en-US': '...', 'zh-TW': '...' } */
export type LocalizedText = Record<string, string>

export interface Category {
    id: number
    parent_id?: number
    slug: string
    name?: LocalizedText
    icon?: string
}

export interface PromotionRule {
    type?: string
    value?: number | string
    min_amount?: number | string
    name?: string
}

export interface MemberLevelPrice {
    member_level_id: number
    sku_id: number
    price_amount: string | number
}

export interface ProductSKU {
    id: number
    sku_code?: string
    /** SKU 规格值（结构因品类而异，保留 unknown 让消费方收紧） */
    spec_values?: Record<string, unknown>
    price_amount: string | number
    manual_stock_total?: number
    manual_stock_sold?: number
    manual_stock_locked?: number
    auto_stock_available?: number
    upstream_stock?: number
    is_active: boolean
    promotion_price_amount?: string | number | null
    member_price_amount?: string | number | null
}

export interface PaymentChannel {
    id: number
    name?: string
    code?: string
    icon?: string
    fee_rate?: number
    fixed_fee?: number
    is_active?: boolean
}

export type FulfillmentType = 'manual' | 'auto'
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'
export type PurchaseType = 'guest' | 'member' | 'all'

export interface Product {
    id: number
    category_id: number
    slug: string
    seo_meta?: Record<string, unknown>
    title: LocalizedText
    description: LocalizedText
    content: LocalizedText
    price_amount: string | number
    images: string[]
    tags: string[]
    purchase_type: PurchaseType | string
    min_purchase_quantity?: number
    max_purchase_quantity: number
    fulfillment_type: FulfillmentType | string
    manual_form_schema?: Record<string, unknown>
    manual_stock_available: number
    manual_stock_sold?: number
    auto_stock_available: number
    auto_stock_sold?: number
    stock_status: StockStatus | string
    is_sold_out: boolean
    /** P1-M 新增：首页精选排序权重（0 不上首页，1+ 越大越靠前） */
    sort_order?: number
    payment_channel_ids?: number[]
    category?: Category
    skus?: ProductSKU[]
    /** 促销字段（仅商品详情接口可能填充） */
    promotion_id?: number | null
    promotion_name?: string
    promotion_type?: string
    promotion_price_amount?: string | number | null
    promotion_rules?: PromotionRule[]
    member_prices?: MemberLevelPrice[]
    /** 商品详情接口可能填充关联文章 */
    related_posts?: Array<{ id: number; slug: string; title?: LocalizedText }>
}
