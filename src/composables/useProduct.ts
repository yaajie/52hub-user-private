import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../stores/app'
import { amountToCents, centsToAmount } from '../utils/money'

export function useLocalized() {
  const appStore = useAppStore()

  const getLocalizedText = (jsonData: any): string => {
    if (!jsonData) return ''
    const locale = appStore.locale
    return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
  }

  const siteCurrency = computed(() => {
    const raw = String(appStore.config?.currency || '').trim().toUpperCase()
    return /^[A-Z]{3}$/.test(raw) ? raw : 'CNY'
  })

  const formatPrice = (amount: any, currency?: any): string => {
    const cur = currency ?? siteCurrency.value
    if (amount === null || amount === undefined || amount === '') return '-'
    // 定点化: 任何金额渲染统一 2 位小数, 从边界堵住浮点脏值(如 2.8999999999999986)
    const n = Number(amount)
    const shown = Number.isFinite(n) ? n.toFixed(2) : String(amount)
    if (cur === null || cur === undefined || cur === '') {
      return shown
    }
    return `${shown} ${cur}`
  }

  return { getLocalizedText, siteCurrency, formatPrice }
}

export function useProductLabels() {
  const { t } = useI18n()

  const getPurchaseTypeLabel = (purchaseType: string) => {
    return purchaseType === 'guest' ? t('productPurchase.guest') : t('productPurchase.member')
  }

  const getFulfillmentTypeLabel = (fulfillmentType: string) => {
    return fulfillmentType === 'auto' ? t('products.fulfillmentType.auto') : t('products.fulfillmentType.manual')
  }

  const getStockBadgeClass = (status: string) => {
    switch (status) {
      case 'unlimited':
        return 'theme-badge-info'
      case 'low_stock':
        return 'theme-badge-warning'
      case 'out_of_stock':
        return 'theme-badge-danger'
      default:
        return 'theme-badge-success'
    }
  }

  const getStockStatusLabel = (product: any) => {
    const status = product?.stock_status || ''
    if (status === 'unlimited') return t('products.stockStatus.unlimited')
    if (status === 'out_of_stock') return t('products.stockStatus.outOfStock')
    if (status === 'low_stock') {
      const count = Number(product?.fulfillment_type === 'manual' ? product?.manual_stock_available : product?.auto_stock_available)
      if (Number.isFinite(count) && count > 0) {
        return t('products.stockStatus.lowStockCount', { count })
      }
      return t('products.stockStatus.lowStock')
    }
    return t('products.stockStatus.inStock')
  }

  const isSoldOut = (product: any) => Boolean(product?.is_sold_out || product?.stock_status === 'out_of_stock')

  const parsePriceAmount = (amount: any) => amountToCents(amount)

  const getPromotionPriceAmount = (product: any) => product?.promotion_price_amount

  const hasPromotionPrice = (product: any) => {
    if (!product) return false
    const original = parsePriceAmount(product.price_amount)
    const promotion = parsePriceAmount(product.promotion_price_amount)
    if (original === null || promotion === null) return false
    return promotion >= 0 && promotion < original
  }

  const getPromotionSaveAmount = (product: any) => {
    const original = parsePriceAmount(product?.price_amount)
    const promotion = parsePriceAmount(product?.promotion_price_amount)
    if (original === null || promotion === null || promotion >= original) {
      return '0.00'
    }
    return centsToAmount(original - promotion)
  }

  const hasSkuPromotionPrice = (sku: any) => {
    if (!sku) return false
    const original = parsePriceAmount(sku.price_amount)
    const promotion = parsePriceAmount(sku.promotion_price_amount)
    if (original === null || promotion === null) return false
    return promotion >= 0 && promotion < original
  }

  const getSkuPromotionPriceAmount = (sku: any) => sku?.promotion_price_amount

  const getSkuPromotionSaveAmount = (sku: any) => {
    const original = parsePriceAmount(sku?.price_amount)
    const promotion = parsePriceAmount(sku?.promotion_price_amount)
    if (original === null || promotion === null || promotion >= original) {
      return '0.00'
    }
    return centsToAmount(original - promotion)
  }

  // 会员省差价: 整数分算(仿 getSkuPromotionSaveAmount), 不用浮点直减
  const getSkuMemberSaveAmount = (sku: any, memberPrice: any) => {
    const original = parsePriceAmount(sku?.price_amount)
    const member = amountToCents(memberPrice)
    if (original === null || member === null || member >= original) return '0.00'
    return centsToAmount(original - member)
  }
  // 有效单价(购物车用): 有促销取促销价, 否则原价
  const getSkuEffectivePrice = (sku: any, product?: any) => {
    if (sku && hasSkuPromotionPrice(sku)) return getSkuPromotionPriceAmount(sku)
    if (sku) return sku.price_amount
    if (product && hasPromotionPrice(product)) return getPromotionPriceAmount(product)
    return product?.price_amount
  }

  const hasPromotionRules = (product: any) => product?.promotion_rules?.length > 0
  const getPromotionRules = (product: any): any[] => product?.promotion_rules ?? []

  return {
    getPurchaseTypeLabel,
    getFulfillmentTypeLabel,
    getStockBadgeClass,
    getStockStatusLabel,
    isSoldOut,
    hasPromotionPrice,
    getPromotionPriceAmount,
    getPromotionSaveAmount,
    hasSkuPromotionPrice,
    getSkuPromotionPriceAmount,
    getSkuPromotionSaveAmount,
    getSkuMemberSaveAmount,
    getSkuEffectivePrice,
    hasPromotionRules,
    getPromotionRules,
  }
}
