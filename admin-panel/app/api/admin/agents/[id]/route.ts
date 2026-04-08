import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { error } = await requireAuth('VIEW_PROPERTIES')
    if (error) return error

    try {
        const { id } = await params
        const agent = await prisma.propertyAgent.findUnique({
            where: { id: parseInt(id) },
            include: { properties: true }
        })

        if (!agent) {
            return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
        }

        return NextResponse.json(agent)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 })
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { error } = await requireAuth('EDIT_PROPERTY')
    if (error) return error

    try {
        const body = await req.json()
        const { id } = await params
        const agentId = parseInt(id)

        // Check if agent exists
        const existingAgent = await prisma.propertyAgent.findUnique({
            where: { id: agentId }
        })

        if (!existingAgent) {
            return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
        }

        // If email is being changed, check for duplicates
        if (body.email && body.email !== existingAgent.email) {
            const emailExists = await prisma.propertyAgent.findUnique({
                where: { email: body.email }
            })
            if (emailExists) {
                return NextResponse.json(
                    { error: 'Agent with this email already exists' },
                    { status: 409 }
                )
            }
        }

        const agent = await prisma.propertyAgent.update({
            where: { id: agentId },
            data: {
                fullName: body.fullName || undefined,
                email: body.email || undefined,
                phone: body.phone || undefined,
                specialization: body.specialization || undefined,
                bio: body.bio || undefined,
                image: body.image || undefined,
                isActive: body.isActive !== undefined ? body.isActive : undefined
            },
            include: { properties: true }
        })

        return NextResponse.json(agent)
    } catch {
        return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { error } = await requireAuth('DELETE_PROPERTY')
    if (error) return error

    try {
        const { id } = await params
        const agentId = parseInt(id)

        // Check if agent exists
        const agent = await prisma.propertyAgent.findUnique({
            where: { id: agentId }
        })

        if (!agent) {
            return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
        }

        // Unassign agent from all properties
        await prisma.property.updateMany({
            where: { agentId },
            data: { agentId: null }
        })

        // Delete agent
        await prisma.propertyAgent.delete({
            where: { id: agentId }
        })

        return NextResponse.json({ message: 'Agent deleted successfully' })
    } catch {
        return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 })
    }
}
