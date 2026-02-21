import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { auth } from '@/auth'
import { logActivity } from '@/lib/apiAuth'

export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const files = formData.getAll('files') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
        }

        const uploadDir = 'C:\\Users\\Administrator\\Desktop\\Property Website\\public-website\\public\\uploads'
        const uploadedPaths: string[] = []

        for (const file of files) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Create a unique filename
            const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
            const filePath = path.join(uploadDir, uniqueFilename)

            await writeFile(filePath, buffer)
            uploadedPaths.push(`/uploads/${uniqueFilename}`)
        }

        // Log the activity
        await logActivity(
            req,
            Number((session.user as any).id),
            (session.user as any).username,
            'UPLOAD_IMAGE',
            `Uploaded ${files.length} images`
        )

        return NextResponse.json({ paths: uploadedPaths })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
