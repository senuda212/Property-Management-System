'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, Mail, FileDown } from 'lucide-react'
import InquiryCard from '@/components/inquiries/InquiryCard'
import InquiryDetailModal from '@/components/inquiries/InquiryDetailModal'
import toast from 'react-hot-toast'

interface Inquiry {
    id: number
    fullName: string
    email: string
    phone: string
    subject: string | null
    message: string
    propertyId: number | null
    propertyTitle: string | null
    status: string
    createdAt: string
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({
        status: 'All',
        search: ''
    })
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchInquiries = async () => {
        setIsLoading(true)
        const params = new URLSearchParams(filters)
        try {
            const res = await fetch(`/api/admin/inquiries?${params.toString()}`)
            const data = await res.json()
            if (Array.isArray(data)) {
                setInquiries(data)
            } else {
                setInquiries([])
                if (res.status === 401) {
                    toast.error('Session expired. Please login again.')
                } else if (data.error) {
                    toast.error(data.error)
                }
            }
        } catch {
            toast.error('Failed to load inquiries')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchInquiries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.status])

    const updateStatus = async (id: number, status: string) => {
        try {
            const res = await fetch(`/api/admin/inquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
            if (res.ok) {
                toast.success(`Inquiry marked as ${status}`)
                fetchInquiries()
                // Update selected inquiry status if modal is open
                if (selectedInquiry?.id === id) {
                    setSelectedInquiry(prev => prev ? { ...prev, status } : null)
                }
            }
        } catch {
            toast.error('Failed to update status')
        }
    }

    const handleViewDetails = (id: number) => {
        const inquiry = inquiries.find(i => i.id === id)
        if (inquiry) {
            setSelectedInquiry(inquiry)
            setIsModalOpen(true)
            if (inquiry.status === 'Unread') {
                updateStatus(id, 'Read')
            }
        }
    }

    const exportCSV = () => {
        if (inquiries.length === 0) return
        const headers = ['Name', 'Email', 'Phone', 'Property', 'Date', 'Status', 'Message']
        const csvContent = inquiries.map(i => [
            i.fullName, i.email, i.phone, i.propertyTitle || 'General',
            new Date(i.createdAt).toLocaleDateString(), i.status, i.message
        ].join(',')).join('\n')

        const blob = new Blob([headers.join(',') + '\n' + csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `inquiries_${new Date().toLocaleDateString()}.csv`
        a.click()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">Inquiries</h1>
                    <p className="text-grey-mid text-sm">Manage all incoming queries from Premier Estates clients</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center space-x-2 border-2 border-grey-light text-grey-dark px-4 py-2 rounded-xl font-bold hover:bg-white transition-all"
                >
                    <FileDown size={18} />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: inquiries.length, color: 'text-dark-blue' },
                    { label: 'Unread', value: inquiries.filter(i => i.status === 'Unread').length, color: 'text-brand-orange' },
                    { label: 'Read', value: inquiries.filter(i => i.status === 'Read').length, color: 'text-grey-mid' },
                    { label: 'Responded', value: inquiries.filter(i => i.status === 'Responded').length, color: 'text-success-green' },
                ].map(s => (
                    <div key={s.label} className="bg-white p-4 rounded-xl shadow-sm border border-grey-light flex justify-between items-center">
                        <span className="text-grey-mid text-sm font-medium">{s.label}</span>
                        <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={18} />
                    <input
                        type="text"
                        placeholder="Search name, email or message..."
                        className="w-full bg-off-white border border-grey-light rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && fetchInquiries()}
                    />
                </div>

                <div className="flex bg-off-white p-1 rounded-lg border border-grey-light">
                    {['All', 'Unread', 'Read', 'Responded'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilters({ ...filters, status: s })}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${filters.status === s ? 'bg-white text-brand-orange shadow-sm' : 'text-grey-mid hover:text-dark-blue'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inbox Grid */}
            {isLoading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="animate-spin text-brand-orange" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {inquiries.map(inquiry => (
                        <InquiryCard
                            key={inquiry.id}
                            inquiry={inquiry}
                            onView={handleViewDetails}
                            onUpdateStatus={updateStatus}
                        />
                    ))}
                    {inquiries.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-grey-mid/30">
                            <Mail className="mx-auto mb-4 opacity-10" size={60} />
                            <p className="text-grey-mid font-medium">No inquiries found in your inbox.</p>
                        </div>
                    )}
                </div>
            )}

            <InquiryDetailModal
                inquiry={selectedInquiry}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdateStatus={updateStatus}
            />
        </div>
    )
}
