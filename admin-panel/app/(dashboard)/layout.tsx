'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import TopHeader from '@/components/layout/TopHeader'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen flex bg-off-white overflow-x-hidden w-full max-w-[100vw]">
            <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
            <main className="flex-1 transition-all duration-300 lg:ml-60 overflow-x-hidden w-full max-w-[100vw] min-w-0">
                <TopHeader onMenuClick={() => setMobileMenuOpen(true)} />
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
