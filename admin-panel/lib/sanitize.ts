import DOMPurify from 'isomorphic-dompurify'

export function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input.trim())
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const sanitized = {} as T
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            sanitized[key] = sanitizeInput(obj[key] as string) as T[typeof key]
        } else {
            sanitized[key] = obj[key]
        }
    }
    return sanitized
}
