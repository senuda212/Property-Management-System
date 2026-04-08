import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'
import { getPublicContactSettings, setPublicContactSettings } from '@/lib/siteSettings'

export async function GET() {
    const { error } = await requireAuth()
    if (error) return error

    try {
        const settings = await getPublicContactSettings()
        return NextResponse.json(settings)
    } catch (apiError) {
        console.error('Failed to fetch settings:', apiError)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const { error } = await requireAuth()
    if (error) return error

    try {
        const body = await req.json()
        const nextSettings = {
            companyName: typeof body.companyName === 'string' ? body.companyName.trim() : '',
            tagline: typeof body.tagline === 'string' ? body.tagline.trim() : '',
            officeAddress: typeof body.officeAddress === 'string' ? body.officeAddress.trim() : '',
            phonePrimary: typeof body.phonePrimary === 'string' ? body.phonePrimary.trim() : '',
            phoneSecondary: typeof body.phoneSecondary === 'string' ? body.phoneSecondary.trim() : '',
            email: typeof body.email === 'string' ? body.email.trim() : '',
            whatsappNumber: typeof body.whatsappNumber === 'string' ? body.whatsappNumber.trim() : '',
            ikmanProfileUrl: typeof body.ikmanProfileUrl === 'string' ? body.ikmanProfileUrl.trim() : '',
            facebookUrl: typeof body.facebookUrl === 'string' ? body.facebookUrl.trim() : '',
            instagramUrl: typeof body.instagramUrl === 'string' ? body.instagramUrl.trim() : '',
            linkedinUrl: typeof body.linkedinUrl === 'string' ? body.linkedinUrl.trim() : '',
            youtubeUrl: typeof body.youtubeUrl === 'string' ? body.youtubeUrl.trim() : '',
            managingDirectorName: typeof body.managingDirectorName === 'string' ? body.managingDirectorName.trim() : '',
            managingDirectorCredential: typeof body.managingDirectorCredential === 'string' ? body.managingDirectorCredential.trim() : '',
        }

        if (!nextSettings.officeAddress) {
            return NextResponse.json({ error: 'Office address is required' }, { status: 400 })
        }

        await setPublicContactSettings(nextSettings)
        return NextResponse.json({ success: true, ...nextSettings })
    } catch (apiError) {
        console.error('Failed to update settings:', apiError)
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }
}
