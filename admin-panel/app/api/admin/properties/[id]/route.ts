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
            where: { id: parseInt(id) },
            include: { agent: true }
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
        const {
            images,
            features,
            agent,
            agentFullName,
            agentEmail,
            agentPhone,
            agentSpecialization,
            agentBio,
            agentIsActive,
            ...propertyBody
        } = body

        const agentPayload = agent || {
            fullName: agentFullName,
            email: agentEmail,
            phone: agentPhone,
            specialization: agentSpecialization,
            bio: agentBio,
            isActive: agentIsActive,
        }

        if (!agentPayload?.fullName || !agentPayload?.email || !agentPayload?.phone) {
            return NextResponse.json({ error: 'Agent full name, email and phone are required' }, { status: 400 })
        }

        const linkedAgent = await prisma.propertyAgent.upsert({
            where: { email: agentPayload.email },
            update: {
                fullName: agentPayload.fullName,
                phone: agentPayload.phone,
                specialization: agentPayload.specialization || null,
                bio: agentPayload.bio || null,
                isActive: agentPayload.isActive !== undefined ? Boolean(agentPayload.isActive) : true,
            },
            create: {
                fullName: agentPayload.fullName,
                email: agentPayload.email,
                phone: agentPayload.phone,
                specialization: agentPayload.specialization || null,
                bio: agentPayload.bio || null,
                isActive: agentPayload.isActive !== undefined ? Boolean(agentPayload.isActive) : true,
            },
        })

        const sanitizedData = sanitizeObject(propertyBody)

        const property = await prisma.property.update({
            where: { id: parseInt(id) },
            data: {
                ...sanitizedData,
                agentId: linkedAgent.id,
                images: JSON.stringify(images || []),
                features: JSON.stringify(features || []),
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
