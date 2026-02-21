import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth, logActivity } from '@/lib/apiAuth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { user, error } = await requireAuth('EDIT_USER')
    if (error) return error

    try {
        const targetId = parseInt(params.id)

        const targetUser = await prisma.user.update({
            where: { id: targetId },
            data: {
                loginAttempts: 0,
                lockedUntil: null
            }
        })

        await logActivity(req, Number(user.id), user.username, 'UNLOCK_USER', `Unlocked account for: ${targetUser.username}`)

        return NextResponse.json({ message: 'Account unlocked successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to unlock account' }, { status: 500 })
    }
}
