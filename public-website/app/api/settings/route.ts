import { NextResponse } from 'next/server'
import { getPublicContactSettings } from '@/lib/siteSettings'

export async function GET() {
    try {
        const settings = await getPublicContactSettings()
        return NextResponse.json(settings)
    } catch (apiError) {
        console.error('Failed to fetch public settings:', apiError)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}
