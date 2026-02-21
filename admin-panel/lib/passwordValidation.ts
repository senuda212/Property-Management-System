// lib/passwordValidation.ts
export const passwordSchema = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
}

export function validatePassword(password: string): {
    valid: boolean
    errors: string[]
    strength: 'weak' | 'fair' | 'strong'
} {
    const errors: string[] = []
    if (password.length < 8) errors.push('At least 8 characters required')
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter required')
    if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter required')
    if (!/[0-9]/.test(password)) errors.push('At least one number required')
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) errors.push('At least one special character required')

    const score = 5 - errors.length
    const strength = score <= 2 ? 'weak' : score <= 4 ? 'fair' : 'strong'

    return { valid: errors.length === 0, errors, strength }
}
