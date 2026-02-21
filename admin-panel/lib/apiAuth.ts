import { auth } from '@/auth'
import { hasPermission, Permission, Role } from './permissions'
import { prisma } from './prisma'
import { NextRequest } from 'next/server'

export async function getAuthenticatedUser() {
    const session = await auth()
    if (!session?.user) {
        return null
    }
    return session.user as {
        id: string
        name: string
        email: string
        username: string
        role: Role
    }
}

export async function requireAuth(permission?: Permission) {
    const user = await getAuthenticatedUser()

    if (!user) {
        return {
            user: null,
            error: Response.json({ error: 'Unauthorized. Please log in.' }, { status: 401 })
        }
    }

    if (permission && !hasPermission(user.role as Role, permission)) {
        return {
            user: null,
            error: Response.json(
                { error: 'Forbidden. You do not have permission to perform this action.' },
                { status: 403 }
            )
        }
    }

    return { user, error: null }
}

export async function logActivity(
    req: NextRequest,
    userId: number | null,
    username: string,
    action: string,
    detail?: string
) {
    const ipAddress = req.headers.get('x-forwarded-for') ||
        req.headers.get('x-real-ip') ||
        'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    await prisma.activityLog.create({
        data: {
            userId,
            username,
            action,
            detail,
            ipAddress,
            userAgent
        }
    })
}
