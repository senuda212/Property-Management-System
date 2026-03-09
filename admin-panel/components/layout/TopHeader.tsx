'use client'

import { usePathname } from 'next/navigation'
import { Bell, ChevronDown, Menu, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function TopHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname()
    const [unreadCount, setUnreadCount] = useState(0)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { data: session } = useSession()

    const pageTitleMap: Record<string, string> = {
        '/dashboard': 'Dashboard',
        '/properties': 'Properties',
        '/inquiries': 'Inquiries',
        '/users': 'User Management',
        '/activity-logs': 'Activity Logs',
        '/settings': 'Settings',
    }

    const getPageTitle = () => {
        const segments = pathname.split('/')
        const last = '/' + segments[segments.length - 1]
        return pageTitleMap[last] || (segments[segments.length - 1]
            ? segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1)
            : 'Dashboard')
    }

    const userName = session?.user?.name || 'Admin'
    const userRole = (session?.user?.role as string) || 'Administrator'
    const initials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => setUnreadCount(data.unreadInquiries || 0))
            .catch(() => { })
    }, [])

    return (
        <header className="h-16 bg-white border-b border-grey-light flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-grey-light rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Open menu"
                >
                    <Menu size={20} className="text-dark-blue" />
                </button>
                <h2 className="text-lg md:text-xl font-serif font-bold text-dark-blue truncate">{getPageTitle()}</h2>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Notifications */}
                <div className="relative cursor-pointer hover:bg-grey-light p-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <Bell size={20} className="text-grey-dark" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 h-4 w-4 bg-brand-orange text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </div>

                <div className="h-8 w-px bg-grey-light" />

                {/* User Profile with Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 md:space-x-3 cursor-pointer hover:bg-grey-light/50 rounded-lg px-2 py-1 transition-all min-h-[44px]"
                    >
                        <div className="h-9 w-9 bg-dark-blue rounded-full flex items-center justify-center border-2 border-brand-orange/30 flex-shrink-0">
                            <span className="text-brand-orange text-sm font-bold">{initials}</span>
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-bold text-dark-blue leading-tight">{userName}</p>
                            <p className="text-xs text-grey-mid capitalize">{userRole}</p>
                        </div>
                        <ChevronDown size={14} className={`text-grey-mid transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-grey-light z-50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-grey-light">
                                <p className="text-sm font-bold text-dark-blue">{userName}</p>
                                <p className="text-xs text-grey-mid capitalize">{userRole}</p>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger-red hover:bg-danger-red/5 transition-colors min-h-[44px]"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
