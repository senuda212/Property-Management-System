import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')
        const status = searchParams.get('status')
        const city = searchParams.get('city')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const bedrooms = searchParams.get('bedrooms')
        const featured = searchParams.get('featured')

        const where: Record<string, unknown> = { isActive: true }
        if (type && type !== 'All Types') where.type = type
        if (status && status !== 'All') where.status = status
        if (city && city !== 'All Locations') where.city = city
        if (featured === 'true') where.isFeatured = true
        if (minPrice || maxPrice) {
            where.price = {}
            if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice)
            if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice)
        }
        if (bedrooms && bedrooms !== 'Any') {
            where.bedrooms = { gte: parseInt(bedrooms) }
        }

        const properties = await prisma.property.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(properties)
    } catch (error) {
        console.error('Error fetching properties:', error)
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
    }
}
