import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { fullName, email, phone, subject, message, propertyId, propertyTitle } = body

        if (!fullName || !email || !phone || !message) {
            return NextResponse.json(
                { error: 'Full name, email, phone, and message are required.' },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                fullName,
                email,
                phone,
                subject: subject || null,
                message,
                propertyId: propertyId ? parseInt(propertyId) : null,
                propertyTitle: propertyTitle || null,
                status: 'Unread',
            },
        })

        return NextResponse.json({ success: true, inquiry }, { status: 201 })
    } catch (error) {
        console.error('Error saving inquiry:', error)
        return NextResponse.json({ error: 'Failed to save inquiry. Please try again.' }, { status: 500 })
    }
}
