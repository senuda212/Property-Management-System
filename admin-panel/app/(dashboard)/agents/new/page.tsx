'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewAgentPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        bio: '',
        image: '',
        isActive: true
    })

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

        setIsLoading(true)
        try {
            const res = await fetch('/api/admin/agents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                toast.success('Agent added successfully')
                router.push('/agents')
            } else {
                const error = await res.json()
                toast.error(error.error || 'Failed to add agent')
            }
        } catch {
            toast.error('Failed to add agent')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link href="/agents" className="p-1.5 hover:bg-off-white rounded-lg transition-colors">
                    <ArrowLeft size={22} className="text-dark-blue" />
                </Link>
                <div>
                    <h1 className="text-[2rem] font-serif font-bold text-dark-blue leading-tight">Add New Agent</h1>
                    <p className="text-grey-mid text-sm mt-0.5">Create a new property agent profile</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 max-w-5xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-bold text-dark-blue mb-1.5">
                            Full Name <span className="text-danger-red">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full bg-off-white border border-grey-light rounded-lg py-2.5 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-dark-blue mb-1.5">
                            Email Address <span className="text-danger-red">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="agent@example.com"
                            className="w-full bg-off-white border border-grey-light rounded-lg py-2.5 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-dark-blue mb-1.5">
                            Phone Number <span className="text-danger-red">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+94 71 234 5678"
                            className="w-full bg-off-white border border-grey-light rounded-lg py-2.5 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                            required
                        />
                    </div>

                    {/* Specialization */}
                    <div>
                        <label htmlFor="specialization" className="block text-sm font-bold text-dark-blue mb-1.5">
                            Specialization
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            placeholder="e.g., Residential Properties, Luxury Homes"
                            className="w-full bg-off-white border border-grey-light rounded-lg py-2.5 px-4 text-dark-blue focus:outline-none focus:border-brand-orange"
                        />
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-bold text-dark-blue mb-1.5">
                            Biography
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Brief bio about the agent..."
                            rows={2}
                            className="w-full bg-off-white border border-grey-light rounded-lg py-2.5 px-4 text-dark-blue focus:outline-none focus:border-brand-orange resize-none"
                        />
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2 flex items-center gap-2.5">
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
                    <div className="md:col-span-2 flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-6 py-2.5 rounded-lg text-dark-blue font-medium hover:bg-off-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-6 py-2.5 bg-brand-orange text-white rounded-lg font-medium hover:bg-brand-orange/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[40px]"
                        >
                            {isLoading && <Loader2 size={20} className="animate-spin" />}
                            {isLoading ? 'Adding...' : 'Add Agent'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
