import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth, logActivity } from '@/lib/apiAuth'
import { sanitizeObject } from '@/lib/sanitize'
import bcrypt from 'bcryptjs'

export async function GET() {
    const { error } = await requireAuth('VIEW_USERS')
    if (error) return error

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                username: true,
                role: true,
                isActive: true,
                lastLogin: true,
                loginAttempts: true,
                lockedUntil: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(users)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { user, error } = await requireAuth('ADD_USER')
    if (error) return error

    try {
        const body = await req.json()
        const sanitizedData = sanitizeObject(body)

        // Validate unique username/email
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: sanitizedData.username },
                    { email: sanitizedData.email }
                ]
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'Username or Email already exists' }, { status: 400 })
        }

        const passwordHash = await bcrypt.hash(body.password, 12)

        const newUser = await prisma.user.create({
            data: {
                fullName: sanitizedData.fullName,
                email: sanitizedData.email,
                username: sanitizedData.username,
                passwordHash,
                role: sanitizedData.role,
                isActive: sanitizedData.isActive ?? true,
                createdBy: Number(user.id)
            }
        })

        await logActivity(req, Number(user.id), user.username, 'ADD_USER', `Created user: ${newUser.username} (${newUser.role})`)

        const { passwordHash: _, ...userWithoutPassword } = newUser
        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        console.error('Create user error:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}
