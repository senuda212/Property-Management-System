import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth, logActivity } from '@/lib/apiAuth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { user, error } = await requireAuth('UPDATE_INQUIRY')
    if (error) return error

    try {
        const { id } = await params
        const body = await req.json()
        const inquiry = await prisma.inquiry.update({
            where: { id: parseInt(id) },
            data: { status: body.status }
        })

        await logActivity(req, Number(user.id), user.username, 'UPDATE_INQUIRY', `Marked inquiry from ${inquiry.fullName} as ${body.status}`)

        return NextResponse.json(inquiry)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { user, error } = await requireAuth('DELETE_INQUIRY')
    if (error) return error

    try {
        const { id } = await params
        const inquiry = await prisma.inquiry.findUnique({
            where: { id: parseInt(id) },
            select: { fullName: true }
        })

        await prisma.inquiry.delete({
            where: { id: parseInt(id) }
        })

        if (inquiry) {
            await logActivity(req, Number(user.id), user.username, 'DELETE_INQUIRY', `Deleted inquiry from ${inquiry.fullName}`)
        }

        return NextResponse.json({ message: 'Inquiry deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 })
    }
}
