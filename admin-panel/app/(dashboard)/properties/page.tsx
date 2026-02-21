'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import PropertyTable from '@/components/properties/PropertyTable'

export default function PropertiesListPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-dark-blue">Properties</h1>
                <Link
                    href="/properties/new"
                    className="bg-brand-orange text-white px-4 sm:px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] transition-transform w-full sm:w-auto"
                >
                    <Plus size={20} />
                    <span>Add New Property</span>
                </Link>
            </div>

            <PropertyTable />
        </div>
    )
}
