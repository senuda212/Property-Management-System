import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth, logActivity } from '@/lib/apiAuth'
import { sanitizeObject } from '@/lib/sanitize'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { error } = await requireAuth('VIEW_PROPERTIES')
    if (error) return error

    try {
        const { id } = await params
        const property = await prisma.property.findUnique({
            where: { id: parseInt(id) }
        })
        if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 })

        return NextResponse.json({
            ...property,
            images: JSON.parse(property.images || '[]'),
            features: JSON.parse(property.features || '[]'),
        })
    } catch {
        return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { user, error } = await requireAuth('EDIT_PROPERTY')
    if (error) return error

    try {
        const { id } = await params
        const body = await req.json()
        const sanitizedData = sanitizeObject(body)

        const property = await prisma.property.update({
            where: { id: parseInt(id) },
            data: {
                ...sanitizedData,
                images: JSON.stringify(body.images || []),
                features: JSON.stringify(body.features || []),
            }
        })

        await logActivity(req, Number(user.id), user.username, 'EDIT_PROPERTY', `Updated: ${property.title}`)

        return NextResponse.json(property)
    } catch {
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { user, error } = await requireAuth('DELETE_PROPERTY')
    if (error) return error

    try {
        const { id } = await params
        const property = await prisma.property.findUnique({
            where: { id: parseInt(id) },
            select: { title: true }
        })

        await prisma.property.delete({
            where: { id: parseInt(id) }
        })

        if (property) {
            await logActivity(req, Number(user.id), user.username, 'DELETE_PROPERTY', `Deleted: ${property.title}`)
        }

        return NextResponse.json({ message: 'Property deleted' })
    } catch {
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
    }
}
