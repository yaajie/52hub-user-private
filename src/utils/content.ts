import { getImageUrl } from './image'

const ALLOWED_TAGS = new Set([
    'a',
    'b',
    'blockquote',
    'br',
    'caption',
    'code',
    'col',
    'colgroup',
    'dd',
    'del',
    'details',
    'div',
    'dl',
    'dt',
    'em',
    'figcaption',
    'figure',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'i',
    'img',
    'ins',
    'li',
    'mark',
    'ol',
    'p',
    'pre',
    'small',
    'span',
    'strong',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'u',
    'ul',
])

const DROP_WITH_CONTENT_TAGS = new Set([
    'applet',
    'base',
    'embed',
    'form',
    'frame',
    'frameset',
    'iframe',
    'link',
    'meta',
    'object',
    'script',
    'style',
    'template',
])

const GLOBAL_ALLOWED_ATTRIBUTES = new Set([
    'aria-label',
    'class',
    'dir',
    'lang',
    'title',
])

const TAG_ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
    a: new Set(['href', 'target', 'rel']),
    img: new Set(['alt', 'decoding', 'height', 'loading', 'src', 'width']),
    table: new Set(['summary']),
    td: new Set(['colspan', 'rowspan']),
    th: new Set(['colspan', 'rowspan', 'scope']),
}

const URL_ATTRIBUTES = new Set(['href', 'src'])
const ALLOWED_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])
const SAFE_DATA_IMAGE_PATTERN = /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,[a-z0-9+/=\s]+$/i

function rewriteUploadImageUrls(html: string): string {
    // 匹配 src="/uploads/..."，支持单引号和双引号
    // 使用非贪婪匹配 .*?
    return html.replace(/src=["'](\/uploads\/.*?)["']/g, (_, path) => {
        return `src="${getImageUrl(path)}"`
    })
}

function isAllowedAttribute(tagName: string, attrName: string): boolean {
    return GLOBAL_ALLOWED_ATTRIBUTES.has(attrName) || TAG_ALLOWED_ATTRIBUTES[tagName]?.has(attrName) === true
}

function isSafeUrl(value: string): boolean {
    const trimmed = value.trim()
    if (!trimmed) return false
    if (SAFE_DATA_IMAGE_PATTERN.test(trimmed)) return true

    const compact = trimmed.replace(/[\u0000-\u001F\u007F\s]+/g, '')
    const lower = compact.toLowerCase()
    if (lower.startsWith('#') || lower.startsWith('/') || lower.startsWith('./') || lower.startsWith('../')) {
        return true
    }

    try {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://52hub.org'
        const parsed = new URL(compact, baseUrl)
        return ALLOWED_URL_PROTOCOLS.has(parsed.protocol)
    } catch {
        return false
    }
}

function sanitizeElement(element: Element) {
    const tagName = element.tagName.toLowerCase()
    const attributes = Array.from(element.attributes)

    for (const attr of attributes) {
        const attrName = attr.name.toLowerCase()

        if (attrName.startsWith('on') || attrName === 'srcdoc' || !isAllowedAttribute(tagName, attrName)) {
            element.removeAttribute(attr.name)
            continue
        }

        if (URL_ATTRIBUTES.has(attrName) && !isSafeUrl(attr.value)) {
            element.removeAttribute(attr.name)
        }
    }

    if (tagName === 'a') {
        const target = element.getAttribute('target')
        if (target && target !== '_blank' && target !== '_self') {
            element.removeAttribute('target')
        }
        if (element.getAttribute('target') === '_blank') {
            element.setAttribute('rel', 'noopener noreferrer')
        }
    }

    if (tagName === 'img') {
        element.setAttribute('loading', element.getAttribute('loading') || 'lazy')
        element.setAttribute('decoding', element.getAttribute('decoding') || 'async')
    }
}

function sanitizeNode(node: Node) {
    if (node.nodeType === Node.COMMENT_NODE) {
        node.parentNode?.removeChild(node)
        return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return

    const element = node as Element
    const tagName = element.tagName.toLowerCase()

    if (DROP_WITH_CONTENT_TAGS.has(tagName)) {
        element.remove()
        return
    }

    if (!ALLOWED_TAGS.has(tagName)) {
        const parent = element.parentNode
        if (!parent) return
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element)
        }
        element.remove()
        return
    }

    sanitizeElement(element)
}

function sanitizeHtml(html: string): string {
    if (typeof document === 'undefined') {
        return html
            .replace(/<\s*(script|style|iframe|object|embed|form|meta|link|base|template)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
            .replace(/<\s*(script|style|iframe|object|embed|form|meta|link|base|template)\b[^>]*\/?>/gi, '')
            .replace(/\s+on[a-z]+\s*=\s*(["']).*?\1/gi, '')
            .replace(/\s+on[a-z]+\s*=\s*[^\s>]+/gi, '')
            .replace(/\s+srcset\s*=\s*(["']).*?\1/gi, '')
            .replace(/\s+srcset\s*=\s*[^\s>]+/gi, '')
            .replace(/\s+(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '')
            .replace(/\s+(href|src)\s*=\s*javascript:[^\s>]+/gi, '')
    }

    const template = document.createElement('template')
    template.innerHTML = html

    const walker = document.createTreeWalker(
        template.content,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
    )
    const nodes: Node[] = []
    let current = walker.nextNode()

    while (current) {
        nodes.push(current)
        current = walker.nextNode()
    }

    nodes.forEach(sanitizeNode)
    return template.innerHTML
}

/**
 * 将 HTML 内容中的图片路径转换为显示用的绝对路径
 * /uploads/xxx -> http://domain/uploads/xxx
 */
export function processHtmlForDisplay(html: string): string {
    if (!html) return ''

    return sanitizeHtml(rewriteUploadImageUrls(html))
}

/**
 * 将 HTML 内容中的图片路径转换为存储用的相对路径
 * http://domain/uploads/xxx -> /uploads/xxx
 */
export function processHtmlForStorage(html: string): string {
    if (!html) return ''

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
    let apiHost = ''
    try {
        if (apiBaseUrl) {
            // 提取域名 (例如 localhost:8080 或 domain.com)
            apiHost = new URL(apiBaseUrl).host
        } else {
            // 如果未配置 API_BASE_URL，则认为是同源，使用当前域名
            apiHost = window.location.host
        }
    } catch (e) {
        // Fallback
        apiHost = window.location.host
    }

    // 匹配 src="value" 或 src='value'
    return html.replace(/src=["'](.*?)["']/g, (match, src) => {
        try {
            // 如果是完整 URL (http:// 或 https://)
            if (src.startsWith('http://') || src.startsWith('https://')) {
                const url = new URL(src)

                // 检查域名是否匹配 API 域名，且路径以 /uploads/ 开头
                // url.host 会自动处理端口号 (例如 localhost:8080)
                if (url.host === apiHost && url.pathname.startsWith('/uploads/')) {
                    // 返回相对路径，例如 src="/uploads/xxx.png"
                    // 始终标准化为双引号
                    return `src="${url.pathname}"`
                }
            }
        } catch (e) {
            // URL 解析失败，忽略，返回原样
        }
        return match
    })
}
