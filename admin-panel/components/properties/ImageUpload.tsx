'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, Loader2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface UploadedImage {
    url: string
    publicId: string
    uploading?: boolean
    error?: string
    file?: File
    preview?: string
}

interface ImageUploadProps {
    value: UploadedImage[]
    onChange: (images: UploadedImage[] | ((prev: UploadedImage[]) => UploadedImage[])) => void
    maxImages?: number
}

export default function ImageUpload({
    value = [],
    onChange,
    maxImages = 10,
}: ImageUploadProps) {
    const uploadFile = async (file: File): Promise<UploadedImage> => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/cloudinary/upload', {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Upload failed')
        }

        return {
            url: data.url,
            publicId: data.publicId,
        }
    }

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const remainingSlots = maxImages - value.length
            const filesToUpload = acceptedFiles.slice(0, remainingSlots)

            if (filesToUpload.length === 0) return

            // Add placeholder uploading items
            const placeholders: UploadedImage[] = filesToUpload.map((file) => ({
                url: '',
                publicId: '',
                uploading: true,
                file,
                preview: URL.createObjectURL(file),
            }))

            onChange([...value, ...placeholders])

            // Upload each file
            const uploadPromises = filesToUpload.map(async (file, index) => {
                try {
                    const result = await uploadFile(file)
                    return { index, result, error: null }
                } catch (err: any) {
                    return { index, result: null, error: err.message }
                }
            })

            const results = await Promise.all(uploadPromises)

            // Update state with results
            onChange((prev: UploadedImage[]) => {
                const updated = [...prev]
                const startIndex = prev.length - filesToUpload.length

                results.forEach(({ index, result, error }) => {
                    const itemIndex = startIndex + index
                    if (result) {
                        updated[itemIndex] = result
                    } else {
                        updated[itemIndex] = {
                            ...updated[itemIndex],
                            uploading: false,
                            error: error || 'Upload failed',
                        }
                    }
                })

                return updated
            })
        },
        [value, onChange, maxImages]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        maxSize: 10 * 1024 * 1024,
        disabled: value.length >= maxImages,
    })

    const removeImage = async (index: number) => {
        const image = value[index]

        // Remove from state immediately
        const updated = value.filter((_, i) => i !== index)
        onChange(updated)

        // Delete from Cloudinary if it has a publicId
        if (image.publicId) {
            try {
                await fetch('/api/cloudinary/upload', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ publicId: image.publicId }),
                })
            } catch (err) {
                console.error('Failed to delete from Cloudinary:', err)
            }
        }
    }

    const moveImage = (fromIndex: number, toIndex: number) => {
        const updated = [...value]
        const [moved] = updated.splice(fromIndex, 1)
        updated.splice(toIndex, 0, moved)
        onChange(updated)
    }

    return (
        <div className="space-y-4">
            {/* Upload Zone */}
            {value.length < maxImages && (
                <div
                    {...getRootProps()}
                    className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive
                            ? 'border-brand-orange bg-orange-50 scale-[1.02]'
                            : 'border-grey-light hover:border-brand-orange hover:bg-orange-50/50'
                        }
          `}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col items-center gap-3">
                        <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isDragActive ? 'bg-orange-100' : 'bg-grey-light'}
              transition-colors duration-200
            `}>
                            <Upload
                                className={`w-7 h-7 ${isDragActive ? 'text-brand-orange' : 'text-grey-mid'}`}
                            />
                        </div>

                        <div>
                            <p className="text-dark-blue font-semibold DM Sans">
                                {isDragActive
                                    ? 'Drop images here...'
                                    : 'Drag & drop property images here'
                                }
                            </p>
                            <p className="text-grey-mid text-sm mt-1">
                                or <span className="text-brand-orange font-medium">browse from your device</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-grey-mid">
                            <span>JPG, PNG, WebP</span>
                            <span>•</span>
                            <span>Max 10MB per image</span>
                            <span>•</span>
                            <span>{value.length}/{maxImages} uploaded</span>
                        </div>
                    </div>

                    {/* First image label */}
                    {value.length === 0 && (
                        <p className="text-xs text-grey-mid mt-3">
                            💡 The first image will be used as the property cover photo
                        </p>
                    )}
                </div>
            )}

            {/* Image Preview Grid */}
            <AnimatePresence>
                {value.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                    >
                        {value.map((image, index) => (
                            <motion.div
                                key={image.url || image.preview || index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group aspect-video rounded-lg overflow-hidden bg-grey-light border border-grey-light"
                            >
                                {/* Cover photo badge */}
                                {index === 0 && !image.uploading && !image.error && (
                                    <div className="absolute top-2 left-2 z-10 bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                        Cover
                                    </div>
                                )}

                                {/* Uploading state */}
                                {image.uploading && (
                                    <div className="absolute inset-0 bg-dark-blue/60 flex flex-col items-center justify-center gap-2 z-10">
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        <span className="text-white text-xs font-medium">Uploading...</span>
                                    </div>
                                )}

                                {/* Error state */}
                                {image.error && (
                                    <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center gap-2 z-10 p-2">
                                        <AlertCircle className="w-6 h-6 text-red-300" />
                                        <span className="text-red-200 text-xs text-center">{image.error}</span>
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="text-xs text-white bg-red-600 px-2 py-1 rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                {/* Image preview */}
                                {(image.url || image.preview) && (
                                    <Image
                                        src={image.url || image.preview || ''}
                                        alt={`Property image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                )}

                                {/* Hover actions */}
                                {!image.uploading && !image.error && (
                                    <div className="absolute inset-0 bg-dark-blue/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                        {/* Move left */}
                                        {index > 0 && (
                                            <button
                                                onClick={() => moveImage(index, index - 1)}
                                                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
                                                title="Move left"
                                            >
                                                ←
                                            </button>
                                        )}

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                                            title="Remove image"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>

                                        {/* Move right */}
                                        {index < value.length - 1 && (
                                            <button
                                                onClick={() => moveImage(index, index + 1)}
                                                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
                                                title="Move right"
                                            >
                                                →
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Image number */}
                                {!image.uploading && !image.error && (
                                    <div className="absolute bottom-2 right-2 bg-dark-blue/60 text-white text-xs px-1.5 py-0.5 rounded">
                                        {index + 1}
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Add more slot */}
                        {value.length < maxImages && value.length > 0 && (
                            <div
                                {...getRootProps()}
                                className="aspect-video rounded-lg border-2 border-dashed border-grey-light hover:border-brand-orange cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors group"
                            >
                                <input {...getInputProps()} />
                                <div className="w-10 h-10 rounded-full bg-grey-light group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                                    <Upload className="w-5 h-5 text-grey-mid group-hover:text-brand-orange transition-colors" />
                                </div>
                                <span className="text-xs text-grey-mid group-hover:text-brand-orange transition-colors">
                                    Add more
                                </span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Helper text */}
            {value.length > 0 && (
                <p className="text-xs text-grey-mid">
                    💡 Drag images to reorder. The first image is the cover photo shown in listings.
                </p>
            )}
        </div>
    )
}
