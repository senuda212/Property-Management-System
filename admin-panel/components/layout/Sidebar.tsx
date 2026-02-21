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
    ClipboardList
} from 'lucide-react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/properties', label: 'Properties', icon: Building2 },
    { href: '/inquiries', label: 'Inquiries', icon: Mail },
    { href: '/users', label: 'Users', icon: Users, adminOnly: true },
    { href: '/activity-logs', label: 'Activity Logs', icon: ClipboardList, adminOnly: true },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-dark-blue text-white transition-all duration-300 z-50 ${isCollapsed ? 'w-16' : 'w-60'
                }`}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center justify-between border-b border-brand-orange/30">
                {!isCollapsed && (
                    <div>
                        <h1 className="text-xl font-serif font-bold tracking-tight">
                            CEYLON ROOTS<span className="text-brand-orange">.</span>
                        </h1>
                        <p className="text-grey-mid text-xs">Admin Panel</p>
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
                        const { data: session } = useSession()
                        const role = session?.user?.role as string
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
    )
}
