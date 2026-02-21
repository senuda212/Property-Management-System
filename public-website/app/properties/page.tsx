'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ChevronRight, Search, X } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import SkeletonCard from '@/components/ui/SkeletonCard'

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

const cities = ['All Locations', 'Colombo', 'Galle', 'Kandy', 'Negombo', 'Battaramulla', 'Nugegoda', 'Dehiwala', 'Moratuwa', 'Kurunegala']
const types = ['All Types', 'Apartment', 'House', 'Land', 'Villa', 'Commercial']
const bedroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
const priceRanges = [
    { label: 'Any Price', min: '', max: '' },
    { label: 'Under LKR 5M', min: '0', max: '5000000' },
    { label: 'LKR 5M–15M', min: '5000000', max: '15000000' },
    { label: 'LKR 15M–30M', min: '15000000', max: '30000000' },
    { label: 'LKR 30M–50M', min: '30000000', max: '50000000' },
    { label: 'Above LKR 50M', min: '50000000', max: '' },
]

const PAGE_SIZE = 9

function PropertiesContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)

    const [city, setCity] = useState(searchParams.get('city') || 'All Locations')
    const [type, setType] = useState(searchParams.get('type') || 'All Types')
    const [status, setStatus] = useState(searchParams.get('status') || '')
    const [bedrooms, setBedrooms] = useState('Any')
    const [priceRange, setPriceRange] = useState(0)

    const fetchProperties = useCallback(async () => {
        setLoading(true)
        setError(false)
        try {
            const params = new URLSearchParams()
            if (city !== 'All Locations') params.set('city', city)
            if (type !== 'All Types') params.set('type', type)
            if (status) params.set('status', status)
            if (bedrooms !== 'Any') params.set('bedrooms', bedrooms.replace('+', ''))
            if (priceRanges[priceRange].min) params.set('minPrice', priceRanges[priceRange].min)
            if (priceRanges[priceRange].max) params.set('maxPrice', priceRanges[priceRange].max)

            const res = await fetch(`/api/properties?${params.toString()}`)
            if (!res.ok) throw new Error()
            const data = await res.json()
            setProperties(Array.isArray(data) ? data : [])
            setPage(1)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [city, type, status, bedrooms, priceRange])

    useEffect(() => { fetchProperties() }, [fetchProperties])

    const handleReset = () => {
        setCity('All Locations'); setType('All Types'); setStatus(''); setBedrooms('Any'); setPriceRange(0)
        router.push('/properties')
    }

    const totalPages = Math.ceil(properties.length / PAGE_SIZE)
    const paginated = properties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const selectStyle: React.CSSProperties = {
        fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#0B1F3A',
        border: '1px solid #E8ECF0', borderRadius: '8px', padding: '10px 14px',
        background: 'white', outline: 'none', cursor: 'pointer', flex: 1, minWidth: '140px',
    }

    return (
        <>
            {/* Header Banner */}
            <section style={{ height: '360px', paddingTop: '80px', background: 'linear-gradient(135deg, #0F172A, #1E293B)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>
                            <Home size={14} /> Home
                        </Link>
                        <ChevronRight size={14} color="#F97316" />
                        <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>Properties</span>
                    </div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Explore Properties</h1>
                    <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #F97316, #FB923C)', borderRadius: '2px', margin: '0 auto 20px' }} />
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#94A3B8' }}>Discover your perfect property across Sri Lanka</p>
                </div>
            </section>

            {/* Sticky Filters */}
            <div style={{ position: 'sticky', top: '72px', zIndex: 40, backgroundColor: 'white', boxShadow: '0 4px 20px rgba(11,31,58,0.1)', padding: '16px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <select value={city} onChange={e => setCity(e.target.value)} style={selectStyle}>
                        {cities.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                        {types.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                        <option value="">All Status</option>
                        <option>For Sale</option>
                        <option>For Rent</option>
                    </select>
                    <select value={String(priceRange)} onChange={e => setPriceRange(Number(e.target.value))} style={selectStyle}>
                        {priceRanges.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
                    </select>
                    <select value={bedrooms} onChange={e => setBedrooms(e.target.value)} style={selectStyle}>
                        {bedroomOptions.map(b => <option key={b}>{b}</option>)}
                    </select>
                    <button onClick={fetchProperties} style={{ background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Search size={16} /> Search
                    </button>
                    <button onClick={handleReset} style={{ background: 'none', border: 'none', color: '#9AA3AF', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <X size={14} /> Reset
                    </button>
                    {!loading && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#9AA3AF', marginLeft: 'auto' }}>Showing {properties.length} properties</span>}
                </div>
            </div>

            {/* Property Grid */}
            <section style={{ backgroundColor: '#F5F7FA', padding: '48px 24px 80px', minHeight: '400px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#4A5568', marginBottom: '16px' }}>Something went wrong loading properties.</p>
                            <button onClick={fetchProperties} style={{ background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Try Again</button>
                        </div>
                    ) : paginated.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
                            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#0B1F3A', marginBottom: '12px' }}>No Properties Found</p>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#9AA3AF', marginBottom: '24px' }}>Try adjusting your filters to find more results.</p>
                            <button onClick={handleReset} style={{ background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Reset Filters</button>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                                {paginated.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px', flexWrap: 'wrap' }}>
                                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '10px 18px', border: '2px solid #0B1F3A', borderRadius: '8px', background: 'transparent', color: '#0B1F3A', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}>Previous</button>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                                        return (
                                            <button key={p} onClick={() => setPage(p)} style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', background: page === p ? 'linear-gradient(90deg, #FF6B1A, #FF9500)' : 'white', color: page === p ? 'white' : '#0B1F3A', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(11,31,58,0.08)' }}>{p}</button>
                                        )
                                    })}
                                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '10px 18px', border: '2px solid #0B1F3A', borderRadius: '8px', background: 'transparent', color: '#0B1F3A', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}>Next</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F5F7FA' }} />}>
            <PropertiesContent />
        </Suspense>
    )
}
