'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, Building2, MapPin } from 'lucide-react'

interface BuyerDetailModalProps {
    buyer: any
    isOpen: boolean
    onClose: () => void
    properties: Array<{
        id?: number | string
        title?: string
        city?: string
        district?: string
        status?: string
    }>
}

export default function BuyerDetailModal({ buyer, isOpen, onClose, properties }: BuyerDetailModalProps) {
    if (!buyer) return null

    const buyerProperties = properties

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-dark-blue/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="p-5 bg-off-white border-b border-grey-light flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-dark-blue">{buyer.fullName}</h3>
                                <p className="text-sm text-grey-mid mt-1">Interested Buyer</p>
                            </div>
                            <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-grey-light rounded-full transition-colors">
                                <X size={24} className="text-grey-dark" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-5 max-h-[68vh] overflow-y-auto">
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2 flex items-center">
                                        <Mail size={14} className="mr-2" />
                                        Email Address
                                    </p>
                                    <a href={`mailto:${buyer.email}`} className="text-brand-orange font-medium hover:underline break-all">
                                        {buyer.email}
                                    </a>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2 flex items-center">
                                        <Phone size={14} className="mr-2" />
                                        Phone Number
                                    </p>
                                    <a href={`tel:${buyer.phone}`} className="text-dark-blue font-medium hover:underline">
                                        {buyer.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Interested Property */}
                            {buyerProperties.length > 0 && (
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-3 flex items-center">
                                        <Building2 size={14} className="mr-2" />
                                        Interested Property
                                    </p>
                                    <div className="space-y-3">
                                        {buyerProperties.map((prop, index) => (
                                            <div key={`${prop.id || prop.title || 'property'}-${index}`} className="bg-off-white p-4 rounded-lg border border-grey-light">
                                                <p className="font-bold text-dark-blue text-base">{prop.title || 'Property'}</p>
                                                <p className="text-sm text-grey-mid flex items-center mt-1">
                                                    <MapPin size={14} className="mr-1" />
                                                    {[prop.city, prop.district].filter(Boolean).join(', ') || 'Location not available'}
                                                </p>
                                                {prop.status && (
                                                    <span className="inline-block text-xs font-bold uppercase px-2 py-1 rounded-full mt-2 bg-brand-orange/10 text-brand-orange">
                                                        {prop.status}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Inquiry Date</p>
                                    <p className="text-dark-blue font-medium">{new Date(buyer.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5 bg-off-white border-t border-grey-light flex gap-3 justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg text-dark-blue font-medium hover:bg-grey-light transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
