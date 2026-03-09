import { NextRequest } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { requireAuth } from '@/lib/apiAuth'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(req: NextRequest) {
  // Verify admin is authenticated before allowing uploads
  const { error } = await requireAuth()
  if (error) return error

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return Response.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string; width: number; height: number }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'properties',
            upload_preset: 'ceylonroots_properties',
            resource_type: 'image',
            transformation: [
              { quality: 'auto:good' },
              { fetch_format: 'auto' },
              { width: 1920, height: 1080, crop: 'limit' },
            ],
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        .end(buffer)
    })

    return Response.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    return Response.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}

// DELETE route — remove image from Cloudinary
export async function DELETE(req: NextRequest) {
  const { error } = await requireAuth()
  if (error) return error

  try {
    const { publicId } = await req.json()

    if (!publicId) {
      return Response.json({ error: 'No public ID provided' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId)

    return Response.json({ success: true })
  } catch (err) {
    console.error('Cloudinary delete error:', err)
    return Response.json(
      { error: 'Delete failed. Please try again.' },
      { status: 500 }
    )
  }
}
