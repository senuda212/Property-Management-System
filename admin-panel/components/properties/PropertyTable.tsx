'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Edit,
    Trash2,
    Eye,
    Star,
    Loader2,
    Search,
    Building2
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function PropertyTable() {
    const [properties, setProperties] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({
        search: '',
        type: 'All',
        status: 'All',
        isActive: 'All'
    })

    const fetchProperties = async () => {
        setIsLoading(true)
        const params = new URLSearchParams(filters)
        try {
            const res = await fetch(`/api/admin/properties?${params.toString()}`)
            const data = await res.json()
            if (Array.isArray(data)) {
                setProperties(data)
            } else {
                setProperties([])
                if (res.status === 401) {
                    toast.error('Session expired. Please login again.')
                } else if (data.error) {
                    toast.error(data.error)
                }
            }
        } catch {
            toast.error('Failed to load properties')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProperties()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.type, filters.status, filters.isActive])

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) return

        try {
            const res = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Property deleted')
                fetchProperties()
            }
        } catch {
            toast.error('Failed to delete property')
        }
    }

    const toggleFeatured = async (id: number, current: boolean) => {
        try {
            await fetch(`/api/admin/properties/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ isFeatured: !current })
            })
            toast.success('Property updated')
            fetchProperties()
        } catch {
            toast.error('Failed to update property')
        }
    }

    return (
        <div className="space-y-6">
            {/* Search & Filter Bar — stacked full width on mobile */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row flex-wrap gap-4 items-stretch md:items-center">
                <div className="relative flex-1 min-w-0 w-full md:min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or city..."
                        className="w-full bg-off-white border border-grey-light rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && fetchProperties()}
                    />
                </div>

                <select
                    aria-label="Filter by property type"
                    className="w-full md:w-auto bg-off-white border border-grey-light rounded-lg py-2 px-4 text-sm focus:outline-none"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                    <option value="All">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                </select>

                <select
                    aria-label="Filter by listing status"
                    className="w-full md:w-auto bg-off-white border border-grey-light rounded-lg py-2 px-4 text-sm focus:outline-none"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                    <option value="All">All Status</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Sold">Sold</option>
                </select>

                <button
                    onClick={fetchProperties}
                    className="w-full md:w-auto bg-brand-orange text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-orange/90 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-off-white text-grey-dark text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Active</th>
                                <th className="px-6 py-4 text-center">Featured</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-grey-light">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-brand-orange" size={40} />
                                    </td>
                                </tr>
                            ) : properties.map((prop: any, idx) => (
                                <tr key={prop.id} className="hover:bg-grey-light/30 transition-colors">
                                    <td className="px-6 py-4 text-sm text-grey-mid">{idx + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 bg-grey-light rounded overflow-hidden">
                                                {JSON.parse(prop.images || '[]')[0] ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={JSON.parse(prop.images || '[]')[0]} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-grey-mid"><Building2 size={16} /></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-dark-blue">{prop.title}</p>
                                                <p className="text-xs text-grey-mid">{prop.city}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-dark-blue">
                                        LKR {prop.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${prop.status === 'For Sale' ? 'bg-brand-orange/10 text-brand-orange' :
                                            prop.status === 'For Rent' ? 'bg-success-green/10 text-success-green' : 'bg-grey-mid/10 text-grey-mid'
                                            }`}>
                                            {prop.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={`mx-auto h-5 w-10 rounded-full transition-colors cursor-pointer relative ${prop.isActive ? 'bg-success-green' : 'bg-grey-mid'}`}>
                                            <div className={`absolute top-1 h-3 w-3 bg-white rounded-full transition-all ${prop.isActive ? 'left-6' : 'left-1'}`} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => toggleFeatured(prop.id, prop.isFeatured)} aria-label={prop.isFeatured ? 'Remove featured' : 'Mark as featured'}>
                                            <Star size={18} className={prop.isFeatured ? 'text-warning-yellow fill-warning-yellow' : 'text-grey-mid'} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <Link href={`/properties/${prop.id}/edit`} title="Edit" className="text-mid-blue hover:text-brand-orange transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <a href={`http://localhost:4000/property/${prop.id}`} target="_blank" title="View" className="text-grey-dark hover:text-dark-blue transition-colors">
                                                <Eye size={18} />
                                            </a>
                                            <button onClick={() => handleDelete(prop.id)} title="Delete" className="text-danger-red hover:scale-110 transition-transform">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && properties.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center text-grey-mid">
                                        No properties found. Add your first listing!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Mobile Card View — 60x60 thumbnail, title/city/price/status/toggle, full-width action row */}
                <div className="md:hidden divide-y divide-grey-light">
                    {isLoading ? (
                        <div className="p-8 text-center">
                            <Loader2 className="animate-spin mx-auto text-brand-orange" size={40} />
                        </div>
                    ) : properties.map((prop: any) => (
                        <div key={prop.id} className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="h-[60px] w-[60px] rounded-l overflow-hidden flex-shrink-0 bg-grey-light">
                                    {JSON.parse(prop.images || '[]')[0] ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={JSON.parse(prop.images || '[]')[0]} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-grey-mid"><Building2 size={24} /></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-dark-blue truncate">{prop.title}</p>
                                    <p className="text-xs text-grey-mid">{prop.city}</p>
                                    <p className="text-sm font-bold text-brand-orange mt-0.5">LKR {prop.price.toLocaleString()}</p>
                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${prop.status === 'For Sale' ? 'bg-brand-orange/10 text-brand-orange' :
                                            prop.status === 'For Rent' ? 'bg-success-green/10 text-success-green' : 'bg-grey-mid/10 text-grey-mid'
                                        }`}>
                                            {prop.status}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {}}
                                            className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                                            aria-label={prop.isActive ? 'Active' : 'Inactive'}
                                        >
                                            <div className={`h-5 w-10 rounded-full transition-colors cursor-pointer ${prop.isActive ? 'bg-success-green' : 'bg-grey-mid'}`}>
                                                <div className={`h-3 w-3 bg-white rounded-full transition-all mt-1 ${prop.isActive ? 'ml-6' : 'ml-1'}`} />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-grey-light w-full">
                                <Link href={`/properties/${prop.id}/edit`} className="flex-1 min-h-[44px] flex items-center justify-center text-mid-blue hover:text-brand-orange transition-colors font-medium text-sm">
                                    Edit
                                </Link>
                                <a href={`http://localhost:4000/property/${prop.id}`} target="_blank" rel="noreferrer" className="flex-1 min-h-[44px] flex items-center justify-center text-grey-dark hover:text-dark-blue transition-colors font-medium text-sm">
                                    View
                                </a>
                                <button onClick={() => handleDelete(prop.id)} className="flex-1 min-h-[44px] flex items-center justify-center text-danger-red font-medium text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {!isLoading && properties.length === 0 && (
                        <div className="p-8 text-center text-grey-mid">
                            No properties found. Add your first listing!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
