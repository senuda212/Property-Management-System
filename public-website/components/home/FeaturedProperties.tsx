'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PropertyCard from '@/components/properties/PropertyCard'
import SkeletonCard from '@/components/ui/SkeletonCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { parseProperties } from '@/lib/parseProperty'

const tabs = ['All', 'For Sale', 'For Rent', 'Land', 'Commercial']

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
    images: string[]
    features: string[]
    isFeatured: boolean
}

export default function FeaturedProperties() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('All')

    useEffect(() => {
        fetch('/api/properties/featured')
            .then(r => r.json())
            .then(data => { setProperties(parseProperties(Array.isArray(data) ? data : [])); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const filtered = activeTab === 'All'
        ? properties
        : properties.filter(p => {
            if (activeTab === 'For Sale' || activeTab === 'For Rent') return p.status === activeTab
            return p.type === activeTab
        })

    return (
        <section style={{ backgroundColor: '#F5F7FA', padding: '80px 0' }} className="featured-properties-section">
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <SectionHeading label="HAND PICKED FOR YOU" title="Featured Properties" />
                </motion.div>

                {/* Filter tabs */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '14px',
                                fontWeight: 600,
                                background: activeTab === tab ? 'linear-gradient(90deg, #FF6B1A, #FF9500)' : '#E8ECF0',
                                color: activeTab === tab ? 'white' : '#4A5568',
                                transition: 'all 0.2s',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="featured-grid">
                    {loading
                        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : filtered.length > 0
                            ? filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)
                            : (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#9AA3AF', fontFamily: 'DM Sans, sans-serif' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
                                    <p style={{ fontSize: '18px', fontWeight: 600, color: '#4A5568' }}>No featured properties yet</p>
                                    <p style={{ marginTop: '8px' }}>Add properties and mark them as featured to display them here.</p>
                                </div>
                            )
                    }
                </div>

                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link
                        href="/properties"
                        style={{ display: 'inline-block', padding: '14px 36px', border: '2px solid #0B1F3A', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0B1F3A', textDecoration: 'none', transition: 'all 0.3s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#0B1F3A'; (e.currentTarget as HTMLAnchorElement).style.color = 'white' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#0B1F3A' }}
                    >
                        View All Properties →
                    </Link>
                </div>
            </div>
            <style jsx>{`
                @media (max-width: 640px) {
                    .featured-properties-section {
                        padding: 48px 0 !important;
                    }
                    .featured-properties-section > div {
                        padding: 0 16px !important;
                    }
                    .featured-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    div[style*="display: 'flex', gap: '8px'"] {
                        overflow-x: auto !important;
                        -webkit-overflow-scrolling: touch !important;
                        justify-content: flex-start !important;
                        padding-bottom: 8px !important;
                    }
                    div[style*="display: 'flex', gap: '8px'"] button {
                        flex-shrink: 0 !important;
                        white-space: nowrap !important;
                    }
                }
                @media (min-width: 641px) and (max-width: 1024px) {
                    .featured-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </section>
    )
}
