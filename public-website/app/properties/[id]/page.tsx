'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ChevronRight, MapPin, Bed, Bath, Square, Car, Share2, CheckCircle, ArrowLeft } from 'lucide-react'
import PropertyGallery from '@/components/properties/PropertyGallery'
import EnquiryForm from '@/components/properties/EnquiryForm'
import PropertyCard from '@/components/properties/PropertyCard'
import { parseProperty, parseProperties } from '@/lib/parseProperty'

interface Property {
    id: number
    title: string
    description: string
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
    latitude?: number | null
    longitude?: number | null
    images: string[]
    features: string[]
    isActive: boolean
    isFeatured: boolean
}

type TabKey = 'overview' | 'features' | 'location'

function formatPrice(price: number): string {
    return `LKR ${price.toLocaleString()}`
}

export default function PropertyDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [property, setProperty] = useState<Property | null>(null)
    const [similar, setSimilar] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<TabKey>('overview')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!id) return
        fetch(`/api/properties/${id}`)
            .then(async r => {
                if (r.status === 404) { router.push('/properties'); return }
                const data = await r.json()
                setProperty(parseProperty(data))
                // Fetch similar
                return fetch(`/api/properties?type=${data.type}&city=${data.city}`)
            })
            .then(async r => {
                if (!r) return
                const data = await r.json()
                const list = Array.isArray(data) ? data.filter((p: Property) => p.id !== Number(id)).slice(0, 3) : []
                setSimilar(parseProperties(list))
            })
            .finally(() => setLoading(false))
    }, [id, router])

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#F97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#94A3B8' }}>Loading property...</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )

    if (!property) return null

    const tabStyle = (tab: TabKey): React.CSSProperties => ({
        padding: '12px 24px',
        border: 'none',
        background: 'none',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        color: activeTab === tab ? '#FF6B1A' : '#4A5568',
        borderBottom: activeTab === tab ? '3px solid #FF6B1A' : '3px solid transparent',
        transition: 'all 0.2s',
    })

    return (
        <div style={{ backgroundColor: '#F5F7FA', minHeight: '100vh' }}>
            {/* Hero Header */}
            <section style={{ height: '340px', paddingTop: '80px', background: 'linear-gradient(135deg, #0F172A, #1E293B)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}><Home size={13} /> Home</Link>
                        <ChevronRight size={13} color="#F97316" />
                        <Link href="/properties" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}>Properties</Link>
                        <ChevronRight size={13} color="#F97316" />
                        <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}>{property.title}</span>
                    </div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{property.title}</h1>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <MapPin size={14} color="#F97316" /> {property.address}, {property.city}
                    </p>
                </div>
            </section>

            {/* Action Bar (Overlapping) */}
            <div style={{ maxWidth: '1280px', margin: '-30px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px 24px', boxShadow: '0 4px 20px rgba(11,31,58,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <Link href="/properties" style={{ color: '#64748B', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ArrowLeft size={16} /> Back to Listings
                    </Link>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <a href={`https://wa.me/94777855554?text=Hi%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`} target="_blank" style={{ padding: '10px 18px', borderRadius: '8px', background: '#25D366', color: 'white', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', minHeight: '44px' }}>WhatsApp</a>
                        <button onClick={handleCopyLink} style={{ padding: '10px 18px', borderRadius: '8px', background: copied ? '#22C55E' : '#F1F5F9', border: 'none', color: copied ? 'white' : '#0F172A', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                            <Share2 size={14} /> {copied ? 'Copied!' : 'Share'}
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
                {/* Gallery */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
                    <PropertyGallery images={property.images} title={property.title} />
                </motion.div>

                {/* Two-col layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }} className="property-detail-layout">
                    {/* Left column */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        {/* Header */}
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '20px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, background: property.status === 'Sold' ? '#E8ECF0' : 'linear-gradient(90deg, #39FF14, #00E676)', color: property.status === 'Sold' ? '#4A5568' : '#0B1F3A' }}>
                                    {property.status === 'Sold' ? 'Sold' : 'Available'}
                                </span>
                                <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '20px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, border: '1px solid #0B1F3A', color: '#0B1F3A' }}>
                                    {property.type}
                                </span>
                            </div>
                            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#0B1F3A', marginBottom: '12px', lineHeight: 1.3 }}>{property.title}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                                <MapPin size={16} color="#FF6B1A" />
                                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>{property.address}, {property.city}, {property.district}</span>
                            </div>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px', fontWeight: 700, background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
                                {formatPrice(property.price)}
                            </div>
                            {/* Feature badges */}
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                {property.bedrooms != null && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Bed size={18} color="#FF6B1A" />
                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>{property.bedrooms} Bedrooms</span>
                                    </div>
                                )}
                                {property.bathrooms != null && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Bath size={18} color="#FF6B1A" />
                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>{property.bathrooms} Bathrooms</span>
                                    </div>
                                )}
                                {property.sqft != null && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Square size={18} color="#FF6B1A" />
                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>{property.sqft.toLocaleString()} sqft</span>
                                    </div>
                                )}
                                {property.parking && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Car size={18} color="#FF6B1A" />
                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>Parking</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(11,31,58,0.06)', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', borderBottom: '1px solid #E8ECF0' }}>
                                <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>Overview</button>
                                <button style={tabStyle('features')} onClick={() => setActiveTab('features')}>Features</button>
                                <button style={tabStyle('location')} onClick={() => setActiveTab('location')}>Location</button>
                            </div>
                            <div style={{ padding: '28px' }}>
                                {activeTab === 'overview' && (
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#4A5568', lineHeight: 1.8 }}>
                                        {property.description}
                                    </p>
                                )}
                                {activeTab === 'features' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                                        {property.features.length > 0 ? property.features.map((f, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <CheckCircle size={16} color="#FF6B1A" />
                                                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>{f}</span>
                                            </div>
                                        )) : (
                                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#9AA3AF' }}>No features listed for this property.</p>
                                        )}
                                    </div>
                                )}
                                {activeTab === 'location' && (
                                    <div>
                                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', marginBottom: '16px' }}>
                                            📍 {property.address}, {property.city}, {property.district}
                                        </p>
                                        <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden' }}>
                                            <iframe
                                                src={property.latitude && property.longitude
                                                    ? `https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`
                                                    : `https://maps.google.com/maps?q=${encodeURIComponent(property.city + ', Sri Lanka')}&z=13&output=embed`}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                title="Property Location"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Similar Properties */}
                        {similar.length > 0 && (
                            <div style={{ marginBottom: '24px' }}>
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#0B1F3A', marginBottom: '20px' }}>Similar Properties You May Like</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                    {similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right sidebar — sticky so it scrolls alongside left content */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ position: 'sticky', top: '90px', alignSelf: 'start' }}>
                        <EnquiryForm propertyId={property.id} propertyTitle={property.title} />
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .property-detail-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          div[style*="padding: '32px 24px'"] {
            padding: 24px 16px !important;
          }
          div[style*="padding: '0 24px'"] {
            padding: 0 16px !important;
          }
          div[style*="display: 'flex', gap: '12px'"] {
            flex-direction: column !important;
            width: 100% !important;
          }
          div[style*="display: 'flex', gap: '12px'"] a,
          div[style*="display: 'flex', gap: '12px'"] button {
            width: 100% !important;
            justify-content: center !important;
          }
          div[style*="display: 'flex', borderBottom"] {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          div[style*="display: 'flex', borderBottom"] button {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            min-width: 120px !important;
          }
          div[style*="gridTemplateColumns: 'repeat"] {
            grid-template-columns: 1fr !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            display: flex !important;
            gap: 16px !important;
          }
          div[style*="gridTemplateColumns: 'repeat"] > * {
            min-width: 280px !important;
            flex-shrink: 0 !important;
          }
        }
        @media (max-width: 640px) {
          section[style*="height: '340px'"] {
            height: 280px !important;
            padding-top: 60px !important;
          }
          h1[style*="fontSize: 'clamp"] {
            font-size: 24px !important;
          }
        }
      `}</style>
        </div>
    )
}
