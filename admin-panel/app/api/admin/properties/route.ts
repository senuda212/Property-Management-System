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
            orderBy: { createdAt: 'desc' }
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
        const sanitizedData = sanitizeObject(body)

        const property = await prisma.property.create({
            data: {
                ...sanitizedData,
                images: JSON.stringify(body.images || []),
                features: JSON.stringify(body.features || []),
            }
        })

        await logActivity(req, Number(user.id), user.username, 'ADD_PROPERTY', `Added: ${property.title}`)

        return NextResponse.json(property)
    } catch (error) {
        console.error('Create property error:', error)
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
    }
}
