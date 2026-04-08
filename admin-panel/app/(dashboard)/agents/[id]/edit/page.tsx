'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EditAgentPage() {
    const router = useRouter()
    const params = useParams()
    const agentId = params.id as string
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        bio: '',
        image: '',
        isActive: true
    })

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const res = await fetch(`/api/admin/agents/${agentId}`)
                if (res.ok) {
                    const data = await res.json()
                    setFormData({
                        fullName: data.fullName || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        specialization: data.specialization || '',
                        bio: data.bio || '',
                        image: data.image || '',
                        isActive: data.isActive ?? true
                    })
                } else {
                    toast.error('Failed to load agent')
                    router.back()
                }
            } catch {
                toast.error('Failed to load agent')
            } finally {
                setIsLoading(false)
            }
        }

        fetchAgent()
    }, [agentId, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement & { name: string; type: string }

        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.fullName || !formData.email || !formData.phone) {
            toast.error('Please fill in all required fields')
            return
        }

        setIsSaving(true)
        try {
            const res = await fetch(`/api/admin/agents/${agentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                toast.success('Agent updated successfully')
                router.push('/agents')
            } else {
                const error = await res.json()
                toast.error(error.error || 'Failed to update agent')
            }
        } catch {
            toast.error('Failed to update agent')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this agent? This action cannot be undone.')) return

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/admin/agents/${agentId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                toast.success('Agent deleted successfully')
                router.push('/agents')
            } else {
                const error = await res.json()
                toast.error(error.error || 'Failed to delete agent')
            }
        } catch {
            toast.error('Failed to delete agent')
        } finally {
            setIsDeleting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="animate-spin text-brand-orange" size={40} />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/agents" className="p-2 hover:bg-off-white rounded-lg transition-colors">
                    <ArrowLeft size={24} className="text-dark-blue" />
                </Link>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark-blue">Edit Agent</h1>
                    <p className="text-grey-mid text-sm mt-1">Update property agent profile</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-bold text-dark-blue mb-2">
                            Full Name <span className="text-danger-red">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-off-white border border-grey-light rounded-lg py-3 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-dark-blue mb-2">
                            Email Address <span className="text-danger-red">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-off-white border border-grey-light rounded-lg py-3 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-dark-blue mb-2">
                            Phone Number <span className="text-danger-red">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-off-white border border-grey-light rounded-lg py-3 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                            required
                        />
                    </div>

                    {/* Specialization */}
                    <div>
                        <label htmlFor="specialization" className="block text-sm font-bold text-dark-blue mb-2">
                            Specialization
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            placeholder="e.g., Residential Properties, Luxury Homes"
                            className="w-full bg-off-white border border-grey-light rounded-lg py-3 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-bold text-dark-blue mb-2">
                            Biography
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Brief bio about the agent..."
                            rows={4}
                            className="w-full bg-off-white border border-grey-light rounded-lg py-3 px-4 text-dark-blue focus:outline-none focus:border-brand-orange resize-none"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-grey-light cursor-pointer"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-dark-blue cursor-pointer">
                            Active Agent
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-grey-light">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-6 py-3 rounded-lg text-dark-blue font-medium hover:bg-off-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-6 py-3 bg-danger-red text-white rounded-lg font-medium hover:bg-danger-red/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
                        >
                            {isDeleting && <Loader2 size={20} className="animate-spin" />}
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 px-6 py-3 bg-brand-orange text-white rounded-lg font-medium hover:bg-brand-orange/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
                        >
                            {isSaving && <Loader2 size={20} className="animate-spin" />}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
