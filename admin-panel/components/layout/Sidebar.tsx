'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    Building2,
    Mail,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Users,
    ClipboardList,
    X
} from 'lucide-react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/properties', label: 'Properties', icon: Building2 },
    { href: '/agents', label: 'Agents', icon: Users },
    { href: '/inquiries', label: 'Inquiries', icon: Mail },
    { href: '/interested-buyers', label: 'Interested Buyers', icon: Mail },
    { href: '/users', label: 'Users', icon: Users, adminOnly: true },
    { href: '/activity-logs', label: 'Activity Logs', icon: ClipboardList, adminOnly: true },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean; setMobileOpen?: (open: boolean) => void }) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [internalMobileOpen, setInternalMobileOpen] = useState(false)
    const isMobileOpen = mobileOpen !== undefined ? mobileOpen : internalMobileOpen
    const setIsMobileOpen = setMobileOpen || setInternalMobileOpen
    const { data: session } = useSession()
    const role = session?.user?.role as string

    return (
        <>
        <aside
            className={`fixed left-0 top-0 h-full bg-dark-blue text-white transition-all duration-300 z-50 ${isCollapsed ? 'w-16' : 'w-60'} hidden lg:block`}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center justify-between border-b border-brand-orange/30">
                {!isCollapsed && (
                    <div>
                        <h1 className="text-xl font-serif font-bold tracking-tight">
                            CRH<span className="text-brand-orange">.</span>
                        </h1>
                        <p className="text-grey-mid text-xs">Ceylon Roots Holdings</p>
                        <p className="text-grey-mid text-[10px] mt-0.5">Admin Panel</p>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-mid-blue rounded transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)

                        if (item.adminOnly && role !== 'admin') {
                            return null
                        }

                        return (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className={`flex items-center py-3 px-4 transition-all border-l-4 ${isActive
                                            ? 'bg-mid-blue border-brand-orange text-brand-orange'
                                            : 'border-transparent hover:bg-mid-blue hover:border-brand-orange/50'
                                            }`}
                                    >
                                        <div className="flex items-center flex-1">
                                            <item.icon size={20} className={isActive ? 'text-brand-orange' : 'text-white'} />
                                            {!isCollapsed && (
                                                <span className="ml-3 font-medium text-sm">{item.label}</span>
                                            )}
                                        </div>
                                        {!isCollapsed && item.adminOnly && (
                                            <span className="bg-brand-orange text-[10px] font-bold px-1.5 py-0.5 rounded text-white flex items-center">
                                                ADMIN
                                            </span>
                                        )}
                                    </motion.div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="absolute bottom-0 w-full p-4 border-t border-grey-dark/30">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center py-3 px-2 text-danger-red hover:bg-danger-red/10 rounded transition-colors"
                >
                    <LogOut size={20} />
                    {!isCollapsed && (
                        <span className="ml-3 font-medium text-sm">Logout</span>
                    )}
                </button>
            </div>
        </aside>
        
        {/* Mobile Sidebar Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileOpen(false)} />
        <aside className={`lg:hidden fixed left-0 top-0 h-full bg-dark-blue text-white transition-transform duration-300 z-50 w-64 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 flex items-center justify-between border-b border-brand-orange/30">
                <div>
                    <h1 className="text-xl font-serif font-bold tracking-tight">
                        CRH<span className="text-brand-orange">.</span>
                    </h1>
                    <p className="text-grey-mid text-xs">Ceylon Roots Holdings</p>
                    <p className="text-grey-mid text-[10px] mt-0.5">Admin Panel</p>
                </div>
                <button onClick={() => setIsMobileOpen(false)} aria-label="Close navigation menu" className="p-1 hover:bg-mid-blue rounded transition-colors text-white">
                    <X size={20} />
                </button>
            </div>
            <nav className="mt-6 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        if (item.adminOnly && role !== 'admin') return null
                        return (
                            <li key={item.href}>
                                <Link href={item.href} onClick={() => setIsMobileOpen(false)}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className={`flex items-center py-4 px-4 transition-all border-l-4 min-h-[56px] ${isActive
                                            ? 'bg-mid-blue border-brand-orange text-brand-orange'
                                            : 'border-transparent hover:bg-mid-blue hover:border-brand-orange/50'
                                            }`}
                                    >
                                        <div className="flex items-center flex-1">
                                            <item.icon size={20} className={isActive ? 'text-brand-orange' : 'text-white'} />
                                            <span className="ml-3 font-medium text-sm">{item.label}</span>
                                        </div>
                                        {item.adminOnly && (
                                            <span className="bg-brand-orange text-[10px] font-bold px-1.5 py-0.5 rounded text-white">ADMIN</span>
                                        )}
                                    </motion.div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-grey-dark/30">
                <button
                    onClick={() => { signOut(); setIsMobileOpen(false) }}
                    className="w-full flex items-center py-4 px-2 text-danger-red hover:bg-danger-red/10 rounded transition-colors min-h-[56px]"
                >
                    <LogOut size={20} />
                    <span className="ml-3 font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
        </>
    )
}
