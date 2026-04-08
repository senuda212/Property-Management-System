import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

export async function GET(req: NextRequest) {
    const { error } = await requireAuth('VIEW_PROPERTIES') // Use same permission as properties
    if (error) return error

    try {
        const agents = await prisma.propertyAgent.findMany({
            where: { isActive: true },
            orderBy: { fullName: 'asc' },
            include: {
                properties: true
            }
        })

        return NextResponse.json(agents)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { user, error } = await requireAuth('ADD_PROPERTY') // Use same permission as properties
    if (error) return error

    try {
        const body = await req.json()

        // Validate required fields
        if (!body.fullName || !body.email || !body.phone) {
            return NextResponse.json(
                { error: 'Missing required fields: fullName, email, phone' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const existingAgent = await prisma.propertyAgent.findUnique({
            where: { email: body.email }
        })

        if (existingAgent) {
            return NextResponse.json(
                { error: 'Agent with this email already exists' },
                { status: 409 }
            )
        }

        const agent = await prisma.propertyAgent.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                phone: body.phone,
                specialization: body.specialization || null,
                bio: body.bio || null,
                image: body.image || null,
                isActive: body.isActive ?? true
            }
        })

        return NextResponse.json(agent, { status: 201 })
    } catch {
        return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 })
    }
}
