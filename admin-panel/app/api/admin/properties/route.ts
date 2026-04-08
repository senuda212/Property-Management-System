import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth, logActivity } from '@/lib/apiAuth'
import { sanitizeObject } from '@/lib/sanitize'

export async function GET(req: NextRequest) {
    const { error } = await requireAuth('VIEW_PROPERTIES')
    if (error) return error

    try {
        const { searchParams } = new URL(req.url)
        const type = searchParams.get('type')
        const status = searchParams.get('status')
        const isActive = searchParams.get('isActive')
        const search = searchParams.get('search')

        const where: Prisma.PropertyWhereInput = {}
        if (type && type !== 'All') where.type = type
        if (status && status !== 'All') where.status = status
        if (isActive !== null && isActive !== 'All') where.isActive = isActive === 'true'
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { city: { contains: search } },
                { address: { contains: search } },
            ]
        }

        const properties = await prisma.property.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { agent: true }
        })

        return NextResponse.json(properties)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { user, error } = await requireAuth('ADD_PROPERTY')
    if (error) return error

    try {
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

        const property = await prisma.property.create({
            data: {
                ...sanitizedData,
                agentId: linkedAgent.id,
                images: JSON.stringify(images || []),
                features: JSON.stringify(features || []),
            }
        })

        await logActivity(req, Number(user.id), user.username, 'ADD_PROPERTY', `Added: ${property.title}`)

        return NextResponse.json(property)
    } catch (error) {
        console.error('Create property error:', error)
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
    }
}
