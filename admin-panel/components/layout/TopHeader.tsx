'use client'

import { usePathname } from 'next/navigation'
import { Bell, User, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TopHeader() {
    const pathname = usePathname()
    const [unreadCount, setUnreadCount] = useState(0)

    // Get display name for the current route
    const getPageTitle = () => {
        const segments = pathname.split('/')
        const last = segments[segments.length - 1]
        if (!last || last === 'dashboard') return 'Dashboard'
        return last.charAt(0).toUpperCase() + last.slice(1)
    }

    useEffect(() => {
        // Fetch unread count from API
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => setUnreadCount(data.unreadInquiries || 0))
            .catch(() => { })
    }, [])

    return (
        <header className="h-16 bg-white border-b border-grey-light flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-dark-blue">{getPageTitle()}</h2>

            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <div className="relative cursor-pointer hover:bg-grey-light p-2 rounded-full transition-colors">
                    <Bell size={20} className="text-grey-dark" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 bg-brand-orange text-white text-[10px] flex items-center justify-center rounded-full animate-pulse">
                            {unreadCount}
                        </span>
                    )}
                </div>

                <div className="h-8 w-px bg-grey-light" />

                {/* User Profile */}
                <div className="flex items-center space-x-3 cursor-pointer group">
                    <div className="h-10 w-10 bg-dark-blue rounded-full flex items-center justify-center border-2 border-brand-orange/20 overflow-hidden">
                        <span className="text-brand-orange text-sm font-bold">AD</span>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-bold text-dark-blue leading-tight">Admin</p>
                        <p className="text-xs text-grey-mid">Administrator</p>
                    </div>
                    <ChevronDown size={16} className="text-grey-mid group-hover:text-dark-blue transition-colors" />
                </div>
            </div>
        </header>
    )
}
