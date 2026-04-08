'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { useComparison } from '@/lib/ComparisonContext'
import { parsePropertyArrayField } from '@/lib/parseProperty'
import { ArrowLeft, Check, X, Bed, Bath, Square, Car, MapPin } from 'lucide-react'

function formatPrice(price: number): string {
    if (price >= 1000000) return `LKR ${(price / 1000000).toFixed(1)}M`
    return `LKR ${price.toLocaleString()}`
}

interface RowProps {
    label: ReactNode
    values: (string | number | boolean | null | undefined)[]
    isBool?: boolean
    highlight?: boolean
}

function CompareRow({ label, values, isBool, highlight }: RowProps) {
    return (
        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
            <td style={{
                padding: '14px 20px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: '#64748B',
                backgroundColor: '#F8FAFC',
                borderRight: '1px solid #E2E8F0',
                whiteSpace: 'nowrap',
                minWidth: '140px',
            }}>
                {label}
            </td>
            {values.map((val, i) => {
                const cellBg = highlight
                    ? (i === 0 ? '#FFF7ED' : i === 1 ? '#F0F9FF' : '#F0FDF4')
                    : 'white'
                if (isBool) {
                    return (
                        <td key={i} style={{ padding: '14px 20px', textAlign: 'center', backgroundColor: cellBg }}>
                            {val ? (
                                <Check size={18} color="#22C55E" style={{ margin: '0 auto' }} />
                            ) : (
                                <X size={18} color="#EF4444" style={{ margin: '0 auto' }} />
                            )}
                        </td>
                    )
                }
                return (
                    <td key={i} style={{
                        padding: '14px 20px',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: val != null ? '#0F172A' : '#CBD5E1',
                        textAlign: 'center',
                        backgroundColor: cellBg,
                    }}>
                        {val != null ? String(val) : '—'}
                    </td>
                )
            })}
        </tr>
    )
}

export default function ComparePage() {
    const { compareList, removeFromCompare, clearCompare } = useComparison()

    if (compareList.length === 0) {
        return (
            <div style={{ paddingTop: '80px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', color: '#94A3B8', textAlign: 'center', padding: '40px' }}>
                <span style={{ fontSize: '64px' }}>⚖️</span>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#0B1F3A', margin: 0 }}>No Properties to Compare</h1>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#64748B', maxWidth: '400px', lineHeight: 1.6 }}>
                    Browse our properties and click the compare button on any listing to add it here.
                </p>
                <Link
                    href="/properties"
                    style={{
                        display: 'inline-block',
                        padding: '14px 32px',
                        background: 'linear-gradient(90deg, #FF6B1A, #FF9500)',
                        color: 'white',
                        borderRadius: '10px',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    Browse Properties
                </Link>
            </div>
        )
    }

    const cols = compareList.length

    return (
        <div style={{ paddingTop: '80px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ background: '#0B1F3A', padding: '40px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <Link href="/properties" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                        textDecoration: 'none', marginBottom: '20px',
                    }}>
                        <ArrowLeft size={16} /> Back to Properties
                    </Link>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'white', margin: '0 0 8px' }}>
                        Property Comparison
                    </h1>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
                        Comparing {cols} {cols === 1 ? 'property' : 'properties'} side by side
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>
                {/* Property header cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `180px repeat(${cols}, 1fr)`,
                    gap: '0',
                    marginBottom: '0',
                    backgroundColor: 'white',
                    borderRadius: '16px 16px 0 0',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    borderBottom: 'none',
                }}>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRight: '1px solid #E2E8F0', display: 'flex', alignItems: 'center' }}>
                        <button
                            onClick={clearCompare}
                            style={{
                                padding: '8px 14px',
                                background: 'none',
                                border: '1px solid #E2E8F0',
                                borderRadius: '8px',
                                fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#EF4444'; (e.currentTarget as HTMLButtonElement).style.color = '#EF4444' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8' }}
                        >
                            Clear All
                        </button>
                    </div>
                    {compareList.map((property, i) => {
                        const images = parsePropertyArrayField(property.images)
                        const imageUrl = images[0] || null
                        const headerBg = i === 0 ? '#FFF7ED' : i === 1 ? '#F0F9FF' : '#F0FDF4'
                        return (
                            <div key={property.id} style={{ padding: '20px', backgroundColor: headerBg, borderRight: i < cols - 1 ? '1px solid #E2E8F0' : 'none', position: 'relative' }}>
                                {/* Remove button */}
                                <button
                                    onClick={() => removeFromCompare(property.id)}
                                    aria-label={`Remove ${property.title}`}
                                    style={{
                                        position: 'absolute', top: '12px', right: '12px',
                                        background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%',
                                        width: '28px', height: '28px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', color: '#64748B', transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EF4444'; (e.currentTarget as HTMLButtonElement).style.color = 'white' }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(0,0,0,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#64748B' }}
                                >
                                    <X size={14} />
                                </button>

                                {/* Property image */}
                                <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px', backgroundColor: '#E2E8F0' }}>
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={property.title}
                                            width={400}
                                            height={300}
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '40px' }}>🏠</span>
                                        </div>
                                    )}
                                </div>

                                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px', lineHeight: 1.3 }}>
                                    {property.title}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                                    <MapPin size={13} color="#FF6B1A" />
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#64748B' }}>
                                        {property.city}, {property.district}
                                    </span>
                                </div>
                                <Link
                                    href={`/properties/${property.id}`}
                                    style={{
                                        display: 'inline-block',
                                        padding: '8px 16px',
                                        background: 'linear-gradient(90deg, #FF6B1A, #FF9500)',
                                        color: 'white',
                                        borderRadius: '8px',
                                        fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700,
                                        textDecoration: 'none',
                                    }}
                                >
                                    View Listing
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* Comparison table */}
                <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '0 0 16px 16px', backgroundColor: 'white' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <CompareRow
                                label="Price"
                                values={compareList.map(p => formatPrice(p.price))}
                                highlight
                            />
                            <CompareRow
                                label="Type"
                                values={compareList.map(p => p.type)}
                            />
                            <CompareRow
                                label="Status"
                                values={compareList.map(p => p.status)}
                            />
                            <CompareRow
                                label={<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bed size={14} /> Bedrooms</span>}
                                values={compareList.map(p => p.bedrooms ?? null)}
                            />
                            <CompareRow
                                label={<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bath size={14} /> Bathrooms</span>}
                                values={compareList.map(p => p.bathrooms ?? null)}
                            />
                            <CompareRow
                                label={<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Square size={14} /> Sqft</span>}
                                values={compareList.map(p => p.sqft != null ? p.sqft.toLocaleString() : null)}
                            />
                            <CompareRow
                                label={<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Car size={14} /> Parking</span>}
                                values={compareList.map(p => p.parking)}
                                isBool
                            />
                            <CompareRow
                                label="District"
                                values={compareList.map(p => p.district)}
                            />
                            <CompareRow
                                label="City"
                                values={compareList.map(p => p.city)}
                            />
                        </tbody>
                    </table>
                </div>

                {/* Features comparison */}
                {(() => {
                    const allFeatures = Array.from(
                        new Set(compareList.flatMap(p => parsePropertyArrayField(p.features)))
                    )
                    if (allFeatures.length === 0) return null
                    return (
                        <div style={{ marginTop: '24px', backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #F1F5F9' }}>
                                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#0B1F3A', margin: 0 }}>Features</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {allFeatures.map(feature => (
                                            <CompareRow
                                                key={feature}
                                                label={feature}
                                                values={compareList.map(p => parsePropertyArrayField(p.features).includes(feature))}
                                                isBool
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })()}
            </div>
        </div>
    )
}
