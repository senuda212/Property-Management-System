'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const locations = ['All Locations', 'Colombo', 'Galle', 'Kandy', 'Negombo', 'Battaramulla', 'Nugegoda', 'Dehiwala', 'Moratuwa', 'Kurunegala']
const types = ['All Types', 'Apartment', 'House', 'Land', 'Villa', 'Commercial']
const statuses = ['For Sale', 'For Rent']
const priceRanges = [
    { label: 'Any Price', value: '' },
    { label: 'Under LKR 5M', value: '0-5000000' },
    { label: 'LKR 5M – 15M', value: '5000000-15000000' },
    { label: 'LKR 15M – 30M', value: '15000000-30000000' },
    { label: 'LKR 30M – 50M', value: '30000000-50000000' },
    { label: 'Above LKR 50M', value: '50000000-' },
]

const selectStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
    color: '#0B1F3A',
    border: '1px solid #E8ECF0',
    borderRadius: '8px',
    padding: '12px 16px',
    background: 'white',
    outline: 'none',
    cursor: 'pointer',
    flex: 1,
    minWidth: '140px',
}

export default function SearchBar() {
    const router = useRouter()
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [price, setPrice] = useState('')

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (location && location !== 'All Locations') params.set('city', location)
        if (type && type !== 'All Types') params.set('type', type)
        if (status) params.set('status', status)
        if (price) {
            const [min, max] = price.split('-')
            if (min) params.set('minPrice', min)
            if (max) params.set('maxPrice', max)
        }
        router.push(`/properties?${params.toString()}`)
    }

    return (
        <div style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 20px 60px rgba(11,31,58,0.3)',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
            maxWidth: '900px',
            width: '100%',
        }}>
            <select value={location} onChange={e => setLocation(e.target.value)} style={selectStyle}>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                <option value="">All Status</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={price} onChange={e => setPrice(e.target.value)} style={selectStyle}>
                {priceRanges.map(r => <option key={r.label} value={r.value}>{r.label}</option>)}
            </select>
            <button
                onClick={handleSearch}
                style={{
                    background: 'linear-gradient(90deg, #FF6B1A, #FF9500)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,26,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
                <Search size={18} />
                Search
            </button>
        </div>
    )
}
