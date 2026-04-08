'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BarChart3, Trash2 } from 'lucide-react'
import { useComparison } from '@/lib/ComparisonContext'
import { parsePropertyArrayField } from '@/lib/parseProperty'
import Image from 'next/image'

function formatPrice(price: number): string {
    if (price >= 1000000) return `LKR ${(price / 1000000).toFixed(1)}M`
    return `LKR ${price.toLocaleString()}`
}

export default function CompareBar() {
    const router = useRouter()
    const { compareList, removeFromCompare, clearCompare } = useComparison()

    return (
        <AnimatePresence>
            {compareList.length > 0 && (
                <motion.div
                    key="compare-bar"
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 40,
                        backgroundColor: '#0B1F3A',
                        borderTop: '2px solid #FF6B1A',
                        boxShadow: '0 -8px 32px rgba(11,31,58,0.35)',
                    }}
                >
                    <div style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                    }}>
                        {/* Label */}
                        <div style={{ flexShrink: 0 }}>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#FF6B1A', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Compare</p>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                                {compareList.length} of 3 selected
                            </p>
                        </div>

                        {/* Property thumbnails */}
                        <div style={{ display: 'flex', gap: '12px', flex: 1, flexWrap: 'wrap' }}>
                            {compareList.map(property => {
                                const images = parsePropertyArrayField(property.images)
                                const imageUrl = images[0] || null
                                return (
                                    <div
                                        key={property.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            backgroundColor: 'rgba(255,255,255,0.06)',
                                            borderRadius: '10px',
                                            padding: '8px 12px 8px 8px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#1A3560' }}>
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={property.title}
                                                    width={44}
                                                    height={44}
                                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontSize: '18px' }}>🏠</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Info */}
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{
                                                fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600,
                                                color: 'white', margin: 0,
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                maxWidth: '140px',
                                            }}>
                                                {property.title}
                                            </p>
                                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#FF6B1A', margin: 0, fontWeight: 700 }}>
                                                {formatPrice(property.price)}
                                            </p>
                                        </div>
                                        {/* Remove button */}
                                        <button
                                            onClick={() => removeFromCompare(property.id)}
                                            aria-label={`Remove ${property.title} from comparison`}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                color: '#64748B', padding: '4px', flexShrink: 0,
                                                display: 'flex', alignItems: 'center',
                                                transition: 'color 0.2s',
                                            }}
                                            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#F87171'}
                                            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#64748B'}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )
                            })}

                            {/* Empty slots */}
                            {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                                <div
                                    key={`empty-${i}`}
                                    style={{
                                        width: '120px',
                                        height: '62px',
                                        border: '1.5px dashed rgba(255,255,255,0.15)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>+ Add</span>
                                </div>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                            <button
                                onClick={clearCompare}
                                title="Clear all"
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '10px 16px',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: '8px',
                                    color: '#94A3B8',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = 'white' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8' }}
                            >
                                <Trash2 size={15} /> Clear
                            </button>
                            <button
                                onClick={() => router.push('/compare')}
                                disabled={compareList.length < 2}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 20px',
                                    background: compareList.length >= 2
                                        ? 'linear-gradient(90deg, #FF6B1A, #FF9500)'
                                        : 'rgba(255,255,255,0.08)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: compareList.length >= 2 ? 'white' : '#475569',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700,
                                    cursor: compareList.length >= 2 ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s',
                                    opacity: compareList.length >= 2 ? 1 : 0.6,
                                }}
                            >
                                <BarChart3 size={16} /> Compare ({compareList.length})
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
