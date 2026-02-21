// Simple in-memory rate limiter for API routes
// Limit login attempts: max 10 requests per IP per 15 minutes
// Limit general API: max 100 requests per IP per minute
const ipRequestMap = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now()
    const entry = ipRequestMap.get(ip)

    if (!entry || now > entry.resetAt) {
        ipRequestMap.set(ip, { count: 1, resetAt: now + windowMs })
        return true // allowed
    }

    if (entry.count >= maxRequests) {
        return false // blocked
    }

    entry.count++
    return true // allowed
}
