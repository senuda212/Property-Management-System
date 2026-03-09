import {
    Mail,
    Plus,
    ExternalLink,
    Clock
} from 'lucide-react'
import Link from 'next/link'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentInquiries from '@/components/dashboard/RecentInquiries'
import RecentProperties from '@/components/dashboard/RecentProperties'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

export default async function DashboardPage() {
    const stats = {
        totalProperties: await prisma.property.count(),
        activeListings: await prisma.property.count({ where: { isActive: true } }),
        unreadInquiries: await prisma.inquiry.count({ where: { status: 'Unread' } }),
        featuredProperties: await prisma.property.count({ where: { isFeatured: true } }),
        totalUsers: await prisma.user.count(),
    }

    const recentActivity = await prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatsCard
                    label="Total Properties"
                    value={stats.totalProperties}
                    iconName="Building"
                    color="border-dark-blue"
                />
                <StatsCard
                    label="Active Listings"
                    value={stats.activeListings}
                    iconName="CheckCircle"
                    color="border-success-green"
                />
                <StatsCard
                    label="New Inquiries"
                    value={stats.unreadInquiries}
                    iconName="Mail"
                    color="border-brand-orange"
                />
                <StatsCard
                    label="Featured"
                    value={stats.featuredProperties}
                    iconName="Star"
                    color="border-warning-yellow"
                />
                <StatsCard
                    label="Total Users"
                    value={stats.totalUsers}
                    iconName="Users"
                    color="border-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentInquiries />
                <RecentProperties />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-light overflow-hidden">
                <div className="p-6 border-b border-grey-light flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Clock className="text-brand-orange" size={20} />
                        <h2 className="text-lg font-serif font-bold text-dark-blue">Recent Activity</h2>
                    </div>
                    <Link href="/activity-logs" className="text-brand-orange text-sm font-bold hover:underline">
                        View All Logs →
                    </Link>
                </div>
                <div className="divide-y divide-grey-light">
                    {recentActivity.map((log) => (
                        <div key={log.id} className="p-4 flex items-center justify-between hover:bg-grey-light/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <ActionTinyBadge action={log.action} />
                                <div>
                                    <span className="text-sm font-bold text-dark-blue">{log.username}</span>
                                    <span className="text-sm text-grey-dark mx-2">{log.detail}</span>
                                </div>
                            </div>
                            <span className="text-xs text-grey-mid">
                                {format(new Date(log.createdAt), 'HH:mm')}
                            </span>
                        </div>
                    ))}
                    {recentActivity.length === 0 && (
                        <div className="p-8 text-center text-grey-mid text-sm">
                            No recent activity found.
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
                <Link href="/properties/new" className="flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-orange to-orange-400 text-white p-6 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-transform">
                    <Plus size={24} />
                    <span>Add New Property</span>
                </Link>
                <Link href="/inquiries" className="flex items-center justify-center space-x-3 bg-dark-blue text-white p-6 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                    <Mail size={24} />
                    <span>View All Inquiries</span>
                </Link>
                <a href="http://localhost:4000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 bg-white border-2 border-grey-light text-grey-dark p-6 rounded-xl font-bold hover:bg-off-white hover:scale-[1.02] transition-transform">
                    <ExternalLink size={24} />
                    <span>View Public Website</span>
                </a>
            </div>
        </div>
    )
}

function ActionTinyBadge({ action }: { action: string }) {
    const config: Record<string, string> = {
        LOGIN: 'bg-green-500',
        LOGOUT: 'bg-grey-mid',
        FAILED_LOGIN: 'bg-danger-red',
        ADD_PROPERTY: 'bg-blue-500',
        EDIT_PROPERTY: 'bg-warning-yellow',
        DELETE_PROPERTY: 'bg-danger-red',
        ADD_USER: 'bg-blue-600',
        EDIT_USER: 'bg-warning-yellow',
        DELETE_USER: 'bg-danger-red',
        UPDATE_INQUIRY: 'bg-brand-orange',
    }
    const color = config[action] || 'bg-grey-300'
    return <div className={`w-2 h-2 rounded-full ${color}`} title={action} />
}
