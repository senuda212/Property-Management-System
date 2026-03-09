import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth, logActivity } from '@/lib/apiAuth'
import { sanitizeObject } from '@/lib/sanitize'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { error } = await requireAuth('VIEW_USERS')
    if (error) return error

    try {
        const { id } = await params
        const targetUser = await prisma.user.findUnique({
            where: { id: parseInt(id) },
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
            }
        })

        if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        return NextResponse.json(targetUser)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { user, error } = await requireAuth('EDIT_USER')
    if (error) return error

    try {
        const { id } = await params
        const targetId = parseInt(id)
        const body = await req.json()
        const sanitizedData = sanitizeObject(body)

        // Security checks
        const targetUser = await prisma.user.findUnique({ where: { id: targetId } })
        if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        // Prevent deactivating self
        if (targetId === Number(user.id) && sanitizedData.isActive === false) {
            return NextResponse.json({ error: 'You cannot deactivate your own account' }, { status: 400 })
        }

        // Prevent demoting last admin
        if (targetUser.role === 'admin' && sanitizedData.role !== 'admin') {
            const adminCount = await prisma.user.count({ where: { role: 'admin', isActive: true } })
            if (adminCount <= 1) {
                return NextResponse.json({ error: 'At least one active admin is required' }, { status: 400 })
            }
        }

        const updateData: { fullName: string; email: string; role: string; isActive: boolean; passwordHash?: string } = {
            fullName: sanitizedData.fullName,
            email: sanitizedData.email,
            role: sanitizedData.role,
            isActive: sanitizedData.isActive
        }

        if (body.password) {
            updateData.passwordHash = await bcrypt.hash(body.password, 12)
        }

        const updatedUser = await prisma.user.update({
            where: { id: targetId },
            data: updateData
        })

        await logActivity(req, Number(user.id), user.username, 'EDIT_USER', `Updated user: ${updatedUser.username}`)

        const { passwordHash: _, ...userWithoutPassword } = updatedUser
        return NextResponse.json(userWithoutPassword)
    } catch {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { user, error } = await requireAuth('DELETE_USER')
    if (error) return error

    try {
        const { id } = await params
        const targetId = parseInt(id)

        if (targetId === Number(user.id)) {
            return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 })
        }

        const targetUser = await prisma.user.findUnique({ where: { id: targetId } })
        if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        if (targetUser.role === 'admin') {
            const adminCount = await prisma.user.count({ where: { role: 'admin' } })
            if (adminCount <= 1) {
                return NextResponse.json({ error: 'Cannot delete the last admin account' }, { status: 400 })
            }
        }

        await prisma.user.delete({
            where: { id: targetId }
        })

        await logActivity(req, Number(user.id), user.username, 'DELETE_USER', `Deleted user: ${targetUser.username}`)

        return NextResponse.json({ message: 'User deleted' })
    } catch {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
