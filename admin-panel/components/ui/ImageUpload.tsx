'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, ImageIcon, Loader2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImageUploadProps {
    value: string[]
    onChange: (urls: string[]) => void
    maxImages?: number
}

export default function ImageUpload({ value, onChange, maxImages = 10 }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)

    const handleUpload = async (files: FileList | File[]) => {
        if (!files || files.length === 0) return

        if (value.length + files.length > maxImages) {
            toast.error(`You can only upload up to ${maxImages} images`)
            return
        }

        setIsUploading(true)
        const formData = new FormData()
        Array.from(files).forEach((file) => {
            formData.append('files', file)
        })

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if (res.ok && data.paths) {
                onChange([...value, ...data.paths])
                toast.success(`Successfully uploaded ${data.paths.length} images`)
            } else {
                toast.error(data.error || 'Upload failed')
            }
        } catch (error) {
            toast.error('An error occurred during upload')
        } finally {
            setIsUploading(false)
        }
    }

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(true)
    }, [])

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
    }, [])

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files)
        }
    }, [value])

    const removeImage = (index: number) => {
        const newImages = [...value]
        newImages.splice(index, 1)
        onChange(newImages)
    }

    return (
        <div className="space-y-4">
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer
                    ${dragActive ? 'border-brand-orange bg-brand-orange/5' : 'border-grey-light hover:border-brand-orange/50 hover:bg-off-white'}
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleUpload(e.target.files)}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-10 w-10 text-brand-orange animate-spin mb-2" />
                        <p className="text-sm text-grey-mid font-medium">Uploading images...</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-brand-orange/10 p-4 rounded-full mb-4">
                            <Upload className="h-8 w-8 text-brand-orange" />
                        </div>
                        <h4 className="text-lg font-bold text-dark-blue mb-1">Upload Property Images</h4>
                        <p className="text-sm text-grey-mid max-w-xs">
                            Drag and drop images here, or click to select from your device gallery.
                        </p>
                        <p className="text-xs text-grey-mid mt-2 font-medium">
                            Supported formats: JPG, PNG, WEBP (Max {maxImages} images)
                        </p>
                    </>
                )}
            </div>

            {value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {value.map((url, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-grey-light shadow-sm">
                            <img src={url} alt={`Property ${index + 1}`} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeImage(index)
                                    }}
                                    className="p-2 bg-danger-red text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            {index === 0 && (
                                <span className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">Main</span>
                            )}
                        </div>
                    ))}
                    {value.length < maxImages && !isUploading && (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-lg border-2 border-dashed border-grey-light flex flex-col items-center justify-center text-grey-mid hover:border-brand-orange hover:text-brand-orange transition-all bg-off-white/50"
                        >
                            <Plus size={24} />
                            <span className="text-[10px] font-bold mt-1 uppercase">Add More</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
