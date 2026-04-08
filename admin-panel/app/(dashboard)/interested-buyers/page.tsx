'use client'

import { useState, useEffect } from 'react'
import { Loader2, Heart, Mail, Phone, Eye } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import BuyerDetailModal from '@/components/layout/BuyerDetailModal'

interface BuyerInquiry {
    propertyId?: number | null
    propertyTitle?: string | null
    createdAt?: string
}

interface Buyer {
    id: string
    fullName: string
    email: string
    phone: string
    inquiries: BuyerInquiry[]
    interestedCount: number
}

interface BuyerPropertySummary {
    id?: number
    title: string
    city?: string
    district?: string
    status?: string
}

export default function InterestedBuyersPage() {
    const searchParams = useSearchParams()
    const propertyIdFilter = searchParams.get('propertyId')

    const [buyers, setBuyers] = useState<Buyer[]>([])
    const [properties, setProperties] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedBuyer, setSelectedBuyer] = useState<any>(null)
    const [selectedBuyerProperties, setSelectedBuyerProperties] = useState<BuyerPropertySummary[]>([])
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [filterByProperty, setFilterByProperty] = useState(propertyIdFilter ? parseInt(propertyIdFilter) : null)

    const fetchBuyers = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/admin/inquiries')
            const data = await res.json()

            if (Array.isArray(data)) {
                const buyerMap = new Map<string, Buyer>()

                data.forEach((inquiry) => {
                    const key = `${inquiry.fullName}|${inquiry.email}`

                    if (!buyerMap.has(key)) {
                        buyerMap.set(key, {
                            id: key,
                            fullName: inquiry.fullName,
                            email: inquiry.email,
                            phone: inquiry.phone,
                            inquiries: [],
                            interestedCount: 0,
                        })
                    }

                    const buyer = buyerMap.get(key)!
                    buyer.inquiries.push({
                        propertyId: inquiry.propertyId,
                        propertyTitle: inquiry.propertyTitle,
                        createdAt: inquiry.createdAt,
                    })
                    buyer.interestedCount = buyer.inquiries.length
                })

                setBuyers(Array.from(buyerMap.values()))
            } else if (res.status === 401) {
                toast.error('Session expired. Please login again.')
            } else {
                toast.error(data.error || 'Failed to load buyers')
            }
        } catch {
            toast.error('Failed to load buyers')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchProperties = async () => {
        try {
            const res = await fetch('/api/admin/properties')
            const data = await res.json()
            if (Array.isArray(data)) {
                setProperties(data)
            }
        } catch {
            // Silent fail for properties
        }
    }

    useEffect(() => {
        fetchBuyers()
        fetchProperties()
    }, [])

    const openBuyerDetail = (buyer: Buyer) => {
        const uniquePropertyMap = new Map<string | number, BuyerPropertySummary>()

        buyer.inquiries.forEach((inquiry) => {
            const matchingProperty = properties.find((property) => property.id === inquiry.propertyId)
            const key = matchingProperty?.id ?? inquiry.propertyId ?? inquiry.propertyTitle ?? buyer.id

            if (!uniquePropertyMap.has(key)) {
                uniquePropertyMap.set(key, {
                    id: matchingProperty?.id ?? inquiry.propertyId ?? undefined,
                    title: matchingProperty?.title || inquiry.propertyTitle || 'Property',
                    city: matchingProperty?.city,
                    district: matchingProperty?.district,
                    status: matchingProperty?.status,
                })
            }
        })

        setSelectedBuyer({
            ...buyer,
            createdAt: buyer.inquiries[0]?.createdAt || new Date().toISOString(),
        })
        setSelectedBuyerProperties(Array.from(uniquePropertyMap.values()))
        setIsDetailModalOpen(true)
    }

    const closeBuyerDetail = () => {
        setIsDetailModalOpen(false)
        setSelectedBuyer(null)
        setSelectedBuyerProperties([])
    }

    const filteredBuyers = filterByProperty
        ? buyers.filter((buyer) => buyer.inquiries.some((inquiry) => inquiry.propertyId === filterByProperty))
        : buyers

    const visibleBuyers = filteredBuyers.slice(0, 2)

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark-blue flex items-center gap-3">
                        <Heart className="text-brand-orange" size={32} />
                        Interested Buyers
                    </h1>
                    <p className="text-grey-mid text-sm mt-1">View buyers interested in your properties</p>
                </div>
            </div>

            {filterByProperty && (
                <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-lg p-4">
                    <p className="text-sm text-dark-blue">
                        Showing buyers interested in: <span className="font-bold">{properties.find((property) => property.id === filterByProperty)?.title || 'Property'}</span>
                    </p>
                    <button
                        onClick={() => setFilterByProperty(null)}
                        className="text-xs text-brand-orange hover:underline mt-2 font-medium"
                    >
                        Clear filter
                    </button>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="animate-spin mx-auto text-brand-orange mb-4" size={40} />
                        <p className="text-grey-mid">Loading interested buyers...</p>
                    </div>
                ) : filteredBuyers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-grey-light">
                            <thead className="bg-off-white">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-grey-mid w-[24%]">Buyer</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-grey-mid w-[28%]">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-grey-mid w-[28%]">Interested In</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-grey-mid w-[10%]">Count</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-grey-mid w-[10%]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-grey-light bg-white">
                                {visibleBuyers.map((buyer) => {
                                    const interestedText = buyer.inquiries
                                        .map((inquiry) => inquiry.propertyTitle)
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .join(', ') || 'Property'

                                    return (
                                        <tr
                                            key={buyer.id}
                                            className="hover:bg-off-white/70 transition-colors cursor-pointer"
                                            onClick={() => openBuyerDetail(buyer)}
                                        >
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="h-9 w-9 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold shrink-0">
                                                        {buyer.fullName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-dark-blue leading-tight">{buyer.fullName}</p>
                                                        <p className="text-xs text-grey-mid">Interested Buyer</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex items-center gap-2 text-grey-dark">
                                                        <Mail size={14} className="text-brand-orange" />
                                                        <a href={`mailto:${buyer.email}`} className="text-brand-orange hover:underline truncate max-w-[170px]">
                                                            {buyer.email}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-grey-dark">
                                                        <Phone size={14} className="text-brand-orange" />
                                                        <a href={`tel:${buyer.phone}`} className="hover:underline">
                                                            {buyer.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top text-sm text-grey-dark">
                                                <div className="truncate max-w-[240px]">{interestedText}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-2.5 py-1 text-brand-orange font-bold text-xs">
                                                    <Heart size={14} className="fill-brand-orange" />
                                                    {buyer.interestedCount}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-mid-blue px-3 py-1.5 text-white text-xs font-medium hover:bg-mid-blue/90 transition-colors"
                                                >
                                                    <Eye size={13} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center">
                        <Heart className="text-grey-light mx-auto mb-4" size={48} />
                        <p className="text-grey-mid">
                            {filterByProperty ? 'No interested buyers for this property yet' : 'No interested buyers yet'}
                        </p>
                    </div>
                )}
                {filteredBuyers.length > visibleBuyers.length && (
                    <div className="border-t border-grey-light px-4 py-3 text-xs text-grey-mid bg-off-white/60">
                        Showing {visibleBuyers.length} of {filteredBuyers.length} buyers
                    </div>
                )}
            </div>

            {selectedBuyer && (
                <BuyerDetailModal
                    buyer={selectedBuyer}
                    isOpen={isDetailModalOpen}
                    onClose={closeBuyerDetail}
                    properties={selectedBuyerProperties}
                />
            )}
        </div>
    )
}
