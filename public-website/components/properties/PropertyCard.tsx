'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, ArrowRight } from 'lucide-react'
import { parsePropertyArrayField } from '@/lib/parseProperty'

interface Property {
    id: number
    title: string
    type: string
    status: string
    price: number
    currency: string
    bedrooms?: number | null
    bathrooms?: number | null
    sqft?: number | null
    parking: boolean
    address: string
    city: string
    district: string
    images: string[] | string
    features: string[] | string
    isFeatured: boolean
}

interface PropertyCardProps {
    property: Property
    index?: number
}

function formatPrice(price: number): string {
    if (price >= 1000000) {
        return `LKR ${(price / 1000000).toFixed(1)}M`
    }
    return `LKR ${price.toLocaleString()}`
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
    const [saved, setSaved] = useState(false)
    const safeImages = parsePropertyArrayField(property.images)
    const imageUrl = safeImages[0] || null

    const statusColor = property.status === 'For Sale'
        ? 'linear-gradient(90deg, #F97316, #FB923C)'
        : property.status === 'For Rent'
            ? 'linear-gradient(90deg, #22C55E, #4ADE80)'
            : 'linear-gradient(90deg, #94A3B8, #64748B)'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="modern-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'white',
            }}
        >
            {/* Image Container */}
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="card-image"
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#CBD5E1', fontSize: '48px' }}>🏠</span>
                    </div>
                )}

                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%)' }} />

                {/* Status badge */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: statusColor, color: 'white', padding: '6px 14px', borderRadius: '30px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    {property.status}
                </div>

                {/* Bookmark */}
                <button
                    onClick={(e) => { e.preventDefault(); setSaved(!saved) }}
                    aria-label={saved ? 'Remove from saved' : 'Save property'}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Heart size={20} color={saved ? '#F97316' : '#64748B'} fill={saved ? '#F97316' : 'none'} />
                </button>

                {/* Price Tag Overlay */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                            {formatPrice(property.price)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={14} color="#F97316" />
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#F1F5F9', fontWeight: 500 }}>{property.city}, {property.district}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', fontWeight: 700, color: '#0F172A', lineHeight: 1.4, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {property.title}
                </h3>

                {/* Features */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    {property.bedrooms != null && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px' }}>
                            <Bed size={16} color="#64748B" />
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', fontWeight: 600 }}>{property.bedrooms}</span>
                        </div>
                    )}
                    {property.bathrooms != null && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px' }}>
                            <Bath size={16} color="#64748B" />
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', fontWeight: 600 }}>{property.bathrooms}</span>
                        </div>
                    )}
                    {property.sqft != null && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px' }}>
                            <Square size={16} color="#64748B" />
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', fontWeight: 600 }}>{property.sqft.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                        {property.type}
                    </span>
                    <Link
                        href={`/properties/${property.id}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#F97316',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '14px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'gap 0.2s'
                        }}
                        className="hover-arrow"
                    >
                        View Details <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .card-image:hover { transform: scale(1.05) !important; }
                .hover-arrow:hover { gap: 10px !important; }
            `}</style>
        </motion.div>
    )
}
