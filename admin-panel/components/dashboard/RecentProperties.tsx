import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Building2, Edit } from 'lucide-react'

export default async function RecentProperties() {
    const properties = await prisma.property.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-grey-light flex justify-between items-center">
                <h3 className="text-lg font-serif font-bold text-dark-blue">Recent Properties</h3>
                <Link href="/properties" className="text-brand-orange text-sm font-bold hover:underline">
                    View All →
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-off-white text-grey-dark text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-4">Property</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-grey-light">
                        {properties.map((property) => (
                            <tr key={property.id} className="hover:bg-grey-light/30 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-dark-blue">{property.title}</p>
                                    <p className="text-xs text-grey-mid">{property.city}</p>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-dark-blue">
                                    LKR {property.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${property.status === 'For Sale' ? 'bg-brand-orange/10 text-brand-orange' :
                                            property.status === 'For Rent' ? 'bg-success-green/10 text-success-green' : 'bg-grey-mid/10 text-grey-mid'
                                        }`}>
                                        {property.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/properties/${property.id}/edit`} className="text-mid-blue hover:text-brand-orange p-1 block">
                                        <Edit size={16} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {properties.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-grey-mid">
                                    <Building2 className="mx-auto mb-2 opacity-20" size={40} />
                                    No properties yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-grey-light">
                {properties.map((property) => (
                    <div key={property.id} className="p-4 space-y-2">
                        <div>
                            <p className="text-sm font-bold text-dark-blue">{property.title}</p>
                            <p className="text-xs text-grey-mid">{property.city}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-dark-blue">LKR {property.price.toLocaleString()}</p>
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${property.status === 'For Sale' ? 'bg-brand-orange/10 text-brand-orange' :
                                property.status === 'For Rent' ? 'bg-success-green/10 text-success-green' : 'bg-grey-mid/10 text-grey-mid'
                            }`}>
                                {property.status}
                            </span>
                        </div>
                        <div className="pt-2 border-t border-grey-light">
                            <Link href={`/properties/${property.id}/edit`} className="text-mid-blue hover:text-brand-orange inline-flex items-center gap-2">
                                <Edit size={16} />
                                <span className="text-sm font-medium">Edit</span>
                            </Link>
                        </div>
                    </div>
                ))}
                {properties.length === 0 && (
                    <div className="p-8 text-center text-grey-mid">
                        <Building2 className="mx-auto mb-2 opacity-20" size={40} />
                        No properties yet
                    </div>
                )}
            </div>
        </div>
    )
}
