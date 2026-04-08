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
        <tr className="border-b border-slate-100">
            <td className="min-w-[140px] whitespace-nowrap border-r border-slate-200 bg-slate-50 px-5 py-[14px] font-['DM_Sans'] text-[13px] font-bold text-slate-500">
                {label}
            </td>
            {values.map((val, i) => {
                const cellBg = highlight
                    ? (i === 0 ? 'bg-orange-50' : i === 1 ? 'bg-sky-50' : 'bg-emerald-50')
                    : 'bg-white'
                if (isBool) {
                    return (
                        <td key={i} className={`px-5 py-[14px] text-center ${cellBg}`}>
                            {val ? (
                                <Check size={18} className="mx-auto text-green-500" />
                            ) : (
                                <X size={18} className="mx-auto text-red-500" />
                            )}
                        </td>
                    )
                }
                return (
                    <td
                        key={i}
                        className={`px-5 py-[14px] text-center font-['DM_Sans'] text-sm ${val != null ? 'text-slate-900' : 'text-slate-300'} ${cellBg}`}
                    >
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
            <div className="compare-empty flex min-h-[80vh] flex-col items-center justify-center gap-5 px-10 pb-10 pt-[120px] text-center text-slate-400 max-md:gap-3.5 max-md:px-5 max-md:pb-7 max-md:pt-24">
                <span className="text-[64px]">⚖️</span>
                <h1 className="m-0 font-['Playfair_Display'] text-[28px] text-[#0B1F3A]">No Properties to Compare</h1>
                <p className="max-w-[400px] font-['DM_Sans'] text-base leading-[1.6] text-slate-500">
                    Browse our properties and click the compare button on any listing to add it here.
                </p>
                <Link
                    href="/properties"
                    className="inline-block rounded-[10px] bg-gradient-to-r from-[#FF6B1A] to-[#FF9500] px-8 py-[14px] font-['DM_Sans'] text-[15px] font-bold text-white no-underline"
                >
                    Browse Properties
                </Link>
            </div>
        )
    }

    const cols = compareList.length
    const headerGridClass =
        cols === 1
            ? 'grid-cols-[180px_minmax(220px,1fr)]'
            : cols === 2
                ? 'grid-cols-[180px_minmax(220px,1fr)_minmax(220px,1fr)]'
                : cols === 3
                    ? 'grid-cols-[180px_minmax(220px,1fr)_minmax(220px,1fr)_minmax(220px,1fr)]'
                    : 'grid-cols-[180px_repeat(4,minmax(220px,1fr))]'

    return (
        <div className="compare-page min-h-screen bg-slate-50 pt-20 max-md:pt-[72px]">
            {/* Header */}
            <div className="compare-hero bg-[#0B1F3A] px-6 py-10 max-md:px-4 max-md:py-7">
                <div className="mx-auto max-w-[1280px]">
                    <Link href="/properties" className="mb-5 inline-flex items-center gap-2 font-['DM_Sans'] text-sm text-slate-400 no-underline">
                        <ArrowLeft size={16} /> Back to Properties
                    </Link>
                    <h1 className="mb-2 mt-0 font-['Playfair_Display'] text-[clamp(24px,4vw,36px)] font-bold text-white">
                        Property Comparison
                    </h1>
                    <p className="m-0 font-['DM_Sans'] text-[15px] text-slate-400">
                        Comparing {cols} {cols === 1 ? 'property' : 'properties'} side by side
                    </p>
                </div>
            </div>

            <div className="compare-shell mx-auto max-w-[1280px] px-6 pb-20 pt-10 max-md:px-4 max-md:pb-[60px] max-md:pt-6">
                {/* Property header cards */}
                <div className="overflow-x-auto">
                    <div className={`compare-header-grid grid min-w-max rounded-t-2xl border border-b-0 border-slate-200 bg-white ${headerGridClass} max-md:grid-cols-[140px_repeat(4,minmax(180px,1fr))]`}>
                        <div className="flex items-center border-r border-slate-200 bg-slate-50 p-5">
                        <button
                            onClick={clearCompare}
                            className="rounded-lg border border-slate-200 bg-transparent px-[14px] py-2 font-['DM_Sans'] text-[13px] text-slate-400 transition-colors hover:border-red-500 hover:text-red-500"
                        >
                            Clear All
                        </button>
                    </div>
                    {compareList.map((property, i) => {
                        const images = parsePropertyArrayField(property.images)
                        const imageUrl = images[0] || null
                        const headerBg = i === 0 ? 'bg-orange-50' : i === 1 ? 'bg-sky-50' : 'bg-emerald-50'
                        return (
                            <div
                                key={property.id}
                                className={`relative p-5 ${headerBg} ${i < cols - 1 ? 'border-r border-slate-200' : ''}`}
                            >
                                {/* Remove button */}
                                <button
                                    onClick={() => removeFromCompare(property.id)}
                                    aria-label={`Remove ${property.title}`}
                                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-none bg-black/5 text-slate-500 transition-colors hover:bg-red-500 hover:text-white"
                                >
                                    <X size={14} />
                                </button>

                                {/* Property image */}
                                <div className="mb-[14px] aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-slate-200">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={property.title}
                                            width={400}
                                            height={300}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <span className="text-[40px]">🏠</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="mb-1.5 mt-0 font-['DM_Sans'] text-[15px] font-bold leading-[1.3] text-slate-900">
                                    {property.title}
                                </h3>
                                <div className="mb-3 flex items-center gap-1">
                                    <MapPin size={13} className="text-[#FF6B1A]" />
                                    <span className="font-['DM_Sans'] text-[13px] text-slate-500">
                                        {property.city}, {property.district}
                                    </span>
                                </div>
                                <Link
                                    href={`/properties/${property.id}`}
                                    className="inline-block rounded-lg bg-gradient-to-r from-[#FF6B1A] to-[#FF9500] px-4 py-2 font-['DM_Sans'] text-[13px] font-bold text-white no-underline"
                                >
                                    View Listing
                                </Link>
                            </div>
                        )
                    })}
                </div>
                </div>

                {/* Comparison table */}
                <div className="compare-table-shell overflow-x-auto rounded-b-2xl border border-slate-200 bg-white max-md:rounded-2xl">
                    <table className="w-full border-collapse">
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
                                label={<span className="flex items-center gap-1.5"><Bed size={14} /> Bedrooms</span>}
                                values={compareList.map(p => p.bedrooms ?? null)}
                            />
                            <CompareRow
                                label={<span className="flex items-center gap-1.5"><Bath size={14} /> Bathrooms</span>}
                                values={compareList.map(p => p.bathrooms ?? null)}
                            />
                            <CompareRow
                                label={<span className="flex items-center gap-1.5"><Square size={14} /> Sqft</span>}
                                values={compareList.map(p => p.sqft != null ? p.sqft.toLocaleString() : null)}
                            />
                            <CompareRow
                                label={<span className="flex items-center gap-1.5"><Car size={14} /> Parking</span>}
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
                        <div className="compare-features-shell mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white max-md:rounded-2xl">
                            <div className="border-b border-slate-100 px-5 pb-4 pt-5">
                                <h3 className="m-0 font-['Playfair_Display'] text-lg text-[#0B1F3A]">Features</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
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
