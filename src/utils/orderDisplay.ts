import { amountToCents } from './money'
import { getImageUrl } from './image'

export const formatDate = (raw?: string) => {
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return date.toLocaleString()
}

export const orderItemImage = (item: any) => {
  const snapshot = item?.sku_snapshot
  if (!snapshot || typeof snapshot !== 'object') return ''
  const rawImage = String(snapshot.image || '').trim()
  if (!rawImage) return ''
  return getImageUrl(rawImage)
}

export const formatMoney = (amount?: string, currency?: string) => {
  if (amount === null || amount === undefined || amount === '') return '-'
  if (currency === null || currency === undefined || currency === '') {
    return String(amount)
  }
  return `${amount} ${currency}`
}

export const hasDiscountAmount = (amount?: string) => {
  if (amount === null || amount === undefined || amount === '') return false
  const valueCents = amountToCents(amount)
  return valueCents !== null && valueCents > 0
}

export const hasAmount = (amount?: string) => {
  if (amount === null || amount === undefined || amount === '') return false
  const valueCents = amountToCents(amount)
  return valueCents !== null && valueCents > 0
}

export const formatManualValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(', ')
  }
  if (value === null || value === undefined) {
    return '-'
  }
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

export interface ManualFormSnapshotField {
  key: string
  label?: Record<string, string> | string
}

export const normalizeManualSnapshotFields = (schemaSnapshot: any): ManualFormSnapshotField[] => {
  if (!schemaSnapshot || typeof schemaSnapshot !== 'object') return []
  const rawFields = Array.isArray(schemaSnapshot.fields) ? schemaSnapshot.fields : []
  return rawFields
    .map((field: any) => {
      const key = String(field?.key || '').trim()
      if (!key) return null
      return {
        key,
        label: field?.label,
      } as ManualFormSnapshotField
    })
    .filter(Boolean) as ManualFormSnapshotField[]
}

export const fulfillmentDeliveryLines = (fulfillment: any) => {
  const deliveryData = fulfillment?.delivery_data || fulfillment?.logistics
  const lines: string[] = []
  if (deliveryData && typeof deliveryData === 'object') {
    const note = String(deliveryData.note || '').trim()
    if (note) {
      lines.push(note)
    }
    const entries = Array.isArray(deliveryData.entries) ? deliveryData.entries : []
    entries.forEach((entry: any) => {
      const key = String(entry?.key || '').trim()
      const value = String(entry?.value || '').trim()
      if (!key && !value) {
        return
      }
      if (!key) {
        lines.push(value)
      } else if (!value) {
        lines.push(key)
      } else {
        lines.push(`${key}: ${value}`)
      }
    })
  }
  return lines
}
