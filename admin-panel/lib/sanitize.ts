import DOMPurify from 'isomorphic-dompurify'

export function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input.trim())
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized: any = {}
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            sanitized[key] = sanitizeInput(obj[key])
        } else {
            sanitized[key] = obj[key]
        }
    }
    return sanitized as T
}
