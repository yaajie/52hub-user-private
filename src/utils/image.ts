export function getImageUrl(path: string | undefined | null): string {
    if (!path) return ''

    if (
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('data:') ||
        path.startsWith('blob:')
    ) {
        return path
    }

    const origin =
        typeof window !== 'undefined' && window.location?.origin
            ? window.location.origin
            : ''
    const normalizedPath = path.startsWith('/') ? path : `/${path}`

    return `${origin}${normalizedPath}`
}

/**
 * 从 images 数组中获取第一张图片的完整 URL
 */
export function getFirstImageUrl(images: any): string {
    if (!images) return ''

    let imageUrl = ''

    if (Array.isArray(images)) {
        imageUrl = images[0] || ''
    } else if (images.images && Array.isArray(images.images)) {
        imageUrl = images.images[0] || ''
    }

    return getImageUrl(imageUrl)
}
