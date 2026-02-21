'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Plus,
    X,
    Save,
    Eye,
    Building2,
    MapPin,
    ImageIcon,
    Tag,
    Check,
    Loader2,
    Star
} from 'lucide-react'
import toast from 'react-hot-toast'
import ImageUpload from './ImageUpload'

interface UploadedImage {
    url: string
    publicId: string
    uploading?: boolean
    error?: string
    file?: File
    preview?: string
}

const propertySchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    type: z.string().min(1, 'Type is required'),
    status: z.string().min(1, 'Status is required'),
    price: z.coerce.number().positive('Price must be a positive number'),
    currency: z.string().min(1, 'Currency is required'),
    bedrooms: z.coerce.number().nullable().optional(),
    bathrooms: z.coerce.number().nullable().optional(),
    sqft: z.coerce.number().nullable().optional(),
    parking: z.boolean().default(false),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    district: z.string().min(1, 'District is required'),
    latitude: z.coerce.number().nullable().optional(),
    longitude: z.coerce.number().nullable().optional(),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    features: z.array(z.string()).default([]),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
})

export type PropertyFormValues = z.infer<typeof propertySchema>

interface PropertyFormProps {
    initialData?: any
    id?: string
}

export default function PropertyForm({ initialData, id }: PropertyFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [featureInput, setFeatureInput] = useState('')
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: initialData ? {
            title: initialData.title || '',
            description: initialData.description || '',
            type: initialData.type || 'Apartment',
            status: initialData.status || 'For Sale',
            price: Number(initialData.price) || 0,
            currency: initialData.currency || 'LKR',
            bedrooms: initialData.bedrooms ?? null,
            bathrooms: initialData.bathrooms ?? null,
            sqft: initialData.sqft ?? null,
            parking: Boolean(initialData.parking),
            address: initialData.address || '',
            city: initialData.city || '',
            district: initialData.district || '',
            latitude: initialData.latitude ?? null,
            longitude: initialData.longitude ?? null,
            images: initialData.images || [],
            features: initialData.features || [],
            isActive: initialData.isActive !== undefined ? Boolean(initialData.isActive) : true,
            isFeatured: initialData.isFeatured !== undefined ? Boolean(initialData.isFeatured) : false,
        } : {
            title: '',
            description: '',
            type: 'Apartment',
            status: 'For Sale',
            currency: 'LKR',
            price: 0,
            address: '',
            city: '',
            district: '',
            parking: false,
            isActive: true,
            isFeatured: false,
            images: [],
            features: [],
        }
    })

    // Initialize images from initialData when editing
    useEffect(() => {
        if (initialData?.images && Array.isArray(initialData.images) && initialData.images.length > 0) {
            const existingImages: UploadedImage[] = (initialData.images as string[]).map((url: string) => ({
                url,
                publicId: '' // We don't store publicId for existing images from database
            }))
            setUploadedImages(existingImages)
        }
    }, [initialData])

    // Sync uploadedImages state to react-hook-form's images field
    useEffect(() => {
        const urls = uploadedImages
            .filter(img => img.url && !img.uploading && !img.error)
            .map(img => img.url)
        setValue('images', urls, { shouldValidate: true })
    }, [uploadedImages, setValue])

    /* Removing useFieldArray logic for images as we use ImageUpload component */

    // Watch values for live preview
    const watchedValues = watch()

    const onSubmit: SubmitHandler<PropertyFormValues> = async (data) => {
        setIsSubmitting(true)
        try {
            const url = id ? `/api/admin/properties/${id}` : '/api/admin/properties'
            const method = id ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                toast.success(id ? 'Property updated successfully!' : 'Property created successfully!')
                router.push('/properties')
                router.refresh()
            } else {
                toast.error('Failed to save property')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    const addFeature = () => {
        const val = featureInput.trim()
        if (val && !watchedValues.features.includes(val)) {
            setValue('features', [...watchedValues.features, val])
            setFeatureInput('')
        }
    }

    const removeFeature = (index: number) => {
        const newFeatures = [...watchedValues.features]
        newFeatures.splice(index, 1)
        setValue('features', newFeatures)
    }

    const quickAddFeatures = ["Swimming Pool", "Air Conditioning", "Security", "Garden", "Balcony", "Generator", "Furnished", "CCTV"]

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1 w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">

                    {/* Section 1: Basic Information */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4 mb-4">
                            <Building2 className="text-brand-orange" size={20} />
                            <h3 className="font-serif font-bold text-dark-blue">Basic Information</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark-blue mb-1">Property Title *</label>
                            <input
                                {...register('title')}
                                className={`w-full bg-off-white border ${errors.title ? 'border-danger-red' : 'border-grey-light'} rounded-lg py-2 px-4 focus:outline-none focus:border-dark-blue`}
                                placeholder="e.g. Modern 3-Bedroom Luxury Apartment"
                            />
                            {errors.title && <p className="text-danger-red text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark-blue mb-1">Description *</label>
                            <textarea
                                {...register('description')}
                                rows={5}
                                className={`w-full bg-off-white border ${errors.description ? 'border-danger-red' : 'border-grey-light'} rounded-lg py-2 px-4 focus:outline-none focus:border-dark-blue`}
                                placeholder="Describe the property in detail..."
                            />
                            {errors.description && <p className="text-danger-red text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Property Type *</label>
                                <select
                                    {...register('type')}
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                >
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Land">Land</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Listing Status *</label>
                                <select
                                    {...register('status')}
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                >
                                    <option value="For Sale">For Sale</option>
                                    <option value="For Rent">For Rent</option>
                                    <option value="Sold">Sold</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Pricing */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4 mb-4">
                            <Tag className="text-brand-orange" size={20} />
                            <h3 className="font-serif font-bold text-dark-blue">Pricing</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Price (LKR) *</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid text-sm">LKR</span>
                                    <input
                                        {...register('price', { valueAsNumber: true })}
                                        type="number"
                                        className={`w-full bg-off-white border ${errors.price ? 'border-danger-red' : 'border-grey-light'} rounded-lg py-2 pl-12 pr-4 focus:outline-none focus:border-dark-blue`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && <p className="text-danger-red text-xs mt-1">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Currency</label>
                                <input
                                    value="LKR"
                                    disabled
                                    className="w-full bg-grey-light/50 border border-grey-light rounded-lg py-2 px-4 text-grey-mid cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Property Details */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4 mb-4">
                            <Check className="text-brand-orange" size={20} />
                            <h3 className="font-serif font-bold text-dark-blue">Property Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Bedrooms</label>
                                <input
                                    {...register('bedrooms', { valueAsNumber: true })}
                                    type="number"
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Bathrooms</label>
                                <input
                                    {...register('bathrooms', { valueAsNumber: true })}
                                    type="number"
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Size (Sqft)</label>
                                <input
                                    {...register('sqft', { valueAsNumber: true })}
                                    type="number"
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 pt-2">
                            <input
                                type="checkbox"
                                id="parking"
                                {...register('parking')}
                                className="h-5 w-5 rounded border-grey-light text-brand-orange focus:ring-brand-orange"
                            />
                            <label htmlFor="parking" className="text-sm font-medium text-dark-blue">Parking Available</label>
                        </div>
                    </div>

                    {/* Section 4: Location */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4 mb-4">
                            <MapPin className="text-brand-orange" size={20} />
                            <h3 className="font-serif font-bold text-dark-blue">Location</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark-blue mb-1">Address *</label>
                            <input
                                {...register('address')}
                                className={`w-full bg-off-white border ${errors.address ? 'border-danger-red' : 'border-grey-light'} rounded-lg py-2 px-4 focus:outline-none focus:border-dark-blue`}
                                placeholder="Flat No, Street Name"
                            />
                            {errors.address && <p className="text-danger-red text-xs mt-1">{errors.address.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">City *</label>
                                <select
                                    {...register('city')}
                                    className={`w-full bg-off-white border ${errors.city ? 'border-danger-red' : 'border-grey-light'} rounded-lg py-2 px-4 focus:outline-none`}
                                >
                                    <option value="">Select City</option>
                                    <option value="Colombo">Colombo</option>
                                    <option value="Galle">Galle</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Negombo">Negombo</option>
                                    <option value="Battaramulla">Battaramulla</option>
                                    <option value="Nugegoda">Nugegoda</option>
                                    <option value="Dehiwala">Dehiwala</option>
                                    <option value="Moratuwa">Moratuwa</option>
                                    <option value="Kurunegala">Kurunegala</option>
                                    <option value="Jaffna">Jaffna</option>
                                    <option value="Trincomalee">Trincomalee</option>
                                </select>
                                {errors.city && <p className="text-danger-red text-xs mt-1">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">District *</label>
                                <input
                                    {...register('district')}
                                    className={`w-full bg-off-white border ${errors.district ? 'border-danger-red' : 'border-grey-light'} rounded-lg py-2 px-4 focus:outline-none`}
                                    placeholder="e.g. Colombo"
                                />
                                {errors.district && <p className="text-danger-red text-xs mt-1">{errors.district.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Latitude (Optional)</label>
                                <input
                                    {...register('latitude', { valueAsNumber: true })}
                                    type="number" step="any"
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-blue mb-1">Longitude (Optional)</label>
                                <input
                                    {...register('longitude', { valueAsNumber: true })}
                                    type="number" step="any"
                                    className="w-full bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Images */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4 mb-4">
                            <ImageIcon className="text-brand-orange" size={20} />
                            <h3 className="font-serif font-bold text-dark-blue">Images</h3>
                        </div>

                        <div className="space-y-3">
                            <ImageUpload
                                value={uploadedImages}
                                onChange={setUploadedImages}
                                maxImages={10}
                            />
                            {errors.images && <p className="text-danger-red text-xs mt-1">{errors.images.message}</p>}
                            {uploadedImages.length === 0 && (
                                <p className="text-xs text-danger-red">At least one image is required</p>
                            )}
                        </div>
                    </div>

                    {/* Section 6: Features */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4 mb-4">
                            <Plus className="text-brand-orange" size={20} />
                            <h3 className="font-serif font-bold text-dark-blue">Features</h3>
                        </div>

                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                placeholder="Add a feature (e.g. Swimming Pool)"
                                className="flex-1 bg-off-white border border-grey-light rounded-lg py-2 px-4 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="bg-mid-blue text-white px-4 py-2 rounded-lg"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {watchedValues.features.map((feature, idx) => (
                                <span key={idx} className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                    {feature}
                                    <button type="button" onClick={() => removeFeature(idx)} className="ml-2 hover:text-dark-blue">
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="pt-2">
                            <p className="text-xs text-grey-mid mb-2">Quick Add:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickAddFeatures.map(f => (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => {
                                            if (!watchedValues.features.includes(f)) {
                                                setValue('features', [...watchedValues.features, f])
                                            }
                                        }}
                                        className="text-[10px] bg-grey-light text-grey-dark px-2 py-1 rounded hover:bg-grey-mid hover:text-white transition-colors"
                                    >
                                        + {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 7: Visibility */}
                    <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-dark-blue">Active Listing</p>
                                <p className="text-xs text-grey-mid">Visible to the public website</p>
                            </div>
                            <div
                                onClick={() => setValue('isActive', !watchedValues.isActive)}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${watchedValues.isActive ? 'bg-success-green' : 'bg-grey-mid'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${watchedValues.isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-dark-blue">Featured Listing</p>
                                <p className="text-xs text-grey-mid">Shown in the featured section on home page</p>
                            </div>
                            <div
                                onClick={() => setValue('isFeatured', !watchedValues.isFeatured)}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${watchedValues.isFeatured ? 'bg-brand-orange' : 'bg-grey-mid'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${watchedValues.isFeatured ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-brand-orange to-orange-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:scale-[1.02] transition-transform flex items-center justify-center disabled:opacity-70"
                        >
                            {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : (
                                <>
                                    <Save size={20} className="mr-2" />
                                    <span>{id ? 'Update Property' : 'Save Property'}</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/properties')}
                            className="px-8 border-2 border-grey-light text-grey-dark font-bold rounded-xl hover:bg-off-white transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-[320px] hidden lg:block">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-grey-light">
                        <div className="flex items-center space-x-2 mb-4">
                            <Eye size={18} className="text-brand-orange" />
                            <h3 className="font-serif font-bold text-dark-blue">Live Preview</h3>
                        </div>

                        <div className="bg-off-white rounded-lg overflow-hidden border border-grey-light group">
                            <div className="h-40 bg-grey-light relative">
                                {watchedValues.images && watchedValues.images[0] ? (
                                    <img src={watchedValues.images[0]} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-grey-mid">
                                        <ImageIcon size={40} />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                    <span className="bg-brand-orange text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{watchedValues.status}</span>
                                    {watchedValues.isFeatured && (
                                        <span className="bg-warning-yellow text-white text-[10px] px-2 py-1 rounded font-bold uppercase flex items-center">
                                            <Star size={10} className="mr-1 fill-white" /> Featured
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">{watchedValues.type}</p>
                                <h4 className="font-serif font-bold text-dark-blue truncate">{watchedValues.title || 'Property Title'}</h4>
                                <div className="flex items-center text-grey-mid text-xs">
                                    <MapPin size={12} className="mr-1" />
                                    <span className="truncate">{watchedValues.city ? `${watchedValues.city}, ${watchedValues.district || ''}` : 'Location'}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-grey-light">
                                    <span className="text-brand-orange font-bold">LKR {(watchedValues.price || 0).toLocaleString()}</span>
                                    <div className="flex space-x-2 text-[10px] text-grey-mid font-medium">
                                        {(watchedValues.bedrooms ?? 0) > 0 && <span>{watchedValues.bedrooms} Bd</span>}
                                        {(watchedValues.bathrooms ?? 0) > 0 && <span>{watchedValues.bathrooms} Ba</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-mid-blue/5 p-6 rounded-xl border border-mid-blue/10">
                        <h4 className="text-sm font-bold text-mid-blue mb-3">Quick Tips</h4>
                        <ul className="text-xs text-grey-dark space-y-3">
                            <li className="flex items-start">
                                <span className="mr-2">📸</span>
                                <span>Use high-quality landscape images for best results.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">📍</span>
                                <span>Adding coordinates enables the map on the public website.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">⭐</span>
                                <span>Featured properties appear on the home page.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✅</span>
                                <span>Set Active = ON to make this property visible.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
