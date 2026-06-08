type PaymentChannelLike = {
  provider_type?: unknown
  channel_type?: unknown
  interaction_mode?: unknown
}

const EPAY_CHANNEL_TYPES = new Set(['wechat', 'wxpay', 'alipay', 'qqpay'])

const normalize = (value: unknown) => String(value || '').trim().toLowerCase()

export const isSupportedDisplayChannel = (channel: PaymentChannelLike) => {
  const providerType = normalize(channel?.provider_type)
  const channelType = normalize(channel?.channel_type)
  if (providerType === 'epay') {
    return EPAY_CHANNEL_TYPES.has(channelType)
  }
  return true
}

export const isMobilePaymentClient = () => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua)) {
    return true
  }
  if (/iPad/i.test(ua)) return true
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(pointer: coarse) and (max-width: 767px)').matches
  }
  return false
}

export const filterPaymentChannelsForDevice = <T extends PaymentChannelLike>(channels: T[]) => {
  const base = channels.filter(isSupportedDisplayChannel)
  const officialAlipay = base.filter((channel) =>
    normalize(channel?.provider_type) === 'official' &&
    normalize(channel?.channel_type) === 'alipay'
  )
  if (officialAlipay.length <= 1) return base

  const targetMode = isMobilePaymentClient() ? 'wap' : 'page'
  const preferred = officialAlipay.find((channel) => normalize(channel?.interaction_mode) === targetMode)
  if (!preferred) return base

  return base.filter((channel) => {
    const isOfficialAlipay =
      normalize(channel?.provider_type) === 'official' &&
      normalize(channel?.channel_type) === 'alipay'
    return !isOfficialAlipay || channel === preferred
  })
}
