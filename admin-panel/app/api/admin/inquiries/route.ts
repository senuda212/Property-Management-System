import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

export async function GET(req: NextRequest) {
    const { error } = await requireAuth('VIEW_INQUIRIES')
    if (error) return error

    try {
        const { searchParams } = new URL(req.url)
        const status = searchParams.get('status')
        const search = searchParams.get('search')

        const where: Prisma.InquiryWhereInput = {}
        if (status && status !== 'All') where.status = status
        if (search) {
            where.OR = [
                { fullName: { contains: search } },
                { email: { contains: search } },
                { message: { contains: search } },
            ]
        }

        const inquiries = await prisma.inquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { property: true }
        })

        return NextResponse.json(inquiries)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
    }
}
