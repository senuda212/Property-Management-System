import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

export async function GET(req: NextRequest) {
    const { user, error } = await requireAuth('VIEW_LOGS')
    if (error) return error

    try {
        const { searchParams } = new URL(req.url)
        const username = searchParams.get('username')
        const action = searchParams.get('action')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '25')
        const skip = (page - 1) * limit

        const where: any = {}
        if (username && username !== 'All') where.username = username
        if (action && action !== 'All') where.action = action

        const [logs, total] = await prisma.$transaction([
            prisma.activityLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: skip
            }),
            prisma.activityLog.count({ where })
        ])

        return NextResponse.json({
            logs,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
    }
}
