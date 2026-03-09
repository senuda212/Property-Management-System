import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

export async function GET() {
    const { error } = await requireAuth()
    if (error) return error

    try {
        const totalProperties = await prisma.property.count()
        const activeListings = await prisma.property.count({ where: { isActive: true } })
        const unreadInquiries = await prisma.inquiry.count({ where: { status: 'Unread' } })
        const featuredProperties = await prisma.property.count({ where: { isFeatured: true } })
        const totalUsers = await prisma.user.count()

        return NextResponse.json({
            totalProperties,
            activeListings,
            unreadInquiries,
            featuredProperties,
            totalUsers
        })
    } catch {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
