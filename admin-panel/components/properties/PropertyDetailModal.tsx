'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, DollarSign, Home, Bed, Bath, Zap, Shield, User, Eye } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface PropertyDetailModalProps {
    property: any
    isOpen: boolean
    onClose: () => void
    onOpenBuyers: (propertyId: number) => void
}

export default function PropertyDetailModal({ property, isOpen, onClose, onOpenBuyers }: PropertyDetailModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!property) return null

    const images = property.images ? (typeof property.images === 'string' ? JSON.parse(property.images) : property.images) : []
    const features = property.features ? (typeof property.features === 'string' ? JSON.parse(property.features) : property.features) : []

    const handleOpenBuyers = () => {
        onOpenBuyers(property.id)
    }

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
                        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="p-5 bg-off-white border-b border-grey-light flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-2xl font-serif font-bold text-dark-blue">{property.title}</h3>
                                <p className="text-sm text-grey-mid flex items-center mt-2">
                                    <MapPin size={16} className="mr-1" />
                                    {property.address}, {property.city}, {property.district}
                                </p>
                            </div>
                            <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-grey-light rounded-full transition-colors">
                                <X size={24} className="text-grey-dark" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6 max-h-[68vh] overflow-y-auto">
                            {/* Image Gallery - Show first image */}
                            {images.length > 0 && (
                                <div className="relative mx-auto w-full max-w-[760px] h-44 md:h-52 rounded-xl overflow-hidden bg-grey-light">
                                    <Image
                                        src={images[0]}
                                        alt={property.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 760px"
                                        className="object-contain bg-grey-light"
                                    />
                                </div>
                            )}

                            {/* Price & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-brand-orange/5 p-5 rounded-xl border border-brand-orange/20">
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2">Price</p>
                                    <p className="text-2xl font-bold text-brand-orange">
                                        {property.currency} {property.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="bg-grey-light/50 p-5 rounded-xl border border-grey-light">
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2">Status</p>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-base font-bold px-3 py-1.5 rounded-full ${
                                            property.status === 'Sold' ? 'bg-red-100 text-red-700' :
                                            property.status === 'For Rent' ? 'bg-blue-100 text-blue-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {property.status}
                                        </span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            property.isActive ? 'bg-success-green/10 text-success-green' : 'bg-grey-light text-grey-dark'
                                        }`}>
                                            {property.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {property.bedrooms !== null && (
                                    <div className="bg-off-white p-3 rounded-lg border border-grey-light text-center">
                                        <Bed size={24} className="text-brand-orange mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-dark-blue">{property.bedrooms}</p>
                                        <p className="text-xs text-grey-mid uppercase font-bold">Bedrooms</p>
                                    </div>
                                )}
                                {property.bathrooms !== null && (
                                    <div className="bg-off-white p-3 rounded-lg border border-grey-light text-center">
                                        <Bath size={24} className="text-brand-orange mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-dark-blue">{property.bathrooms}</p>
                                        <p className="text-xs text-grey-mid uppercase font-bold">Bathrooms</p>
                                    </div>
                                )}
                                {property.sqft && (
                                    <div className="bg-off-white p-3 rounded-lg border border-grey-light text-center">
                                        <Home size={24} className="text-brand-orange mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-dark-blue">{property.sqft.toLocaleString()}</p>
                                        <p className="text-xs text-grey-mid uppercase font-bold">Sq Ft</p>
                                    </div>
                                )}
                                <div className="bg-off-white p-3 rounded-lg border border-grey-light text-center">
                                    <Zap size={24} className={`${property.parking ? 'text-success-green' : 'text-grey-mid'} mx-auto mb-2`} />
                                    <p className="text-2xl font-bold text-dark-blue">{property.parking ? 'Yes' : 'No'}</p>
                                    <p className="text-xs text-grey-mid uppercase font-bold">Parking</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-off-white p-5 rounded-xl border border-grey-light">
                                <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-3">Description</p>
                                <p className="text-grey-dark leading-relaxed">{property.description}</p>
                            </div>

                            {/* Features */}
                            {features.length > 0 && (
                                <div className="bg-off-white p-6 rounded-xl border border-grey-light">
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-4 flex items-center">
                                        <Shield size={14} className="mr-2" />
                                        Features
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {features.map((feature: string, idx: number) => (
                                            <div key={idx} className="flex items-center text-grey-dark">
                                                <span className="w-2 h-2 bg-brand-orange rounded-full mr-2"></span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Agent Info */}
                            {property.agent && (
                                <div className="bg-brand-orange/5 p-6 rounded-xl border border-brand-orange/20">
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-4 flex items-center">
                                        <User size={14} className="mr-2" />
                                        Assigned Agent
                                    </p>
                                    <div className="flex items-start gap-4">
                                        {property.agent.image && (
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={property.agent.image}
                                                    alt={property.agent.fullName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="font-bold text-dark-blue text-lg">{property.agent.fullName}</p>
                                            <p className="text-sm text-grey-mid">{property.agent.specialization}</p>
                                            <p className="text-sm text-grey-dark mt-2">{property.agent.phone}</p>
                                            <a href={`mailto:${property.agent.email}`} className="text-brand-orange text-sm hover:underline">
                                                {property.agent.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Property Type</p>
                                    <p className="text-dark-blue font-medium">{property.type}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Listed Since</p>
                                    <p className="text-dark-blue font-medium">{new Date(property.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-5 bg-off-white border-t border-grey-light flex gap-3 justify-end flex-wrap">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg text-dark-blue font-medium hover:bg-grey-light transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleOpenBuyers}
                                className="px-6 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange/90 transition-colors flex items-center gap-2"
                            >
                                <Eye size={18} />
                                View Interested Buyers
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
