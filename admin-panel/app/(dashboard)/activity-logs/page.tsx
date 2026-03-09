'use client'

import React, { useState, useEffect } from 'react'
import {
    Download,
    Filter,
    RefreshCw,
    Clock,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'

interface ActivityLog {
    id: number
    userId?: number | null
    username?: string | null
    action: string
    detail?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt: string
}

export default function ActivityLogsPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({
        username: 'All',
        action: 'All'
    })

    const fetchLogs = async () => {
        setIsLoading(true)
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                username: filters.username,
                action: filters.action
            })
            const res = await fetch(`/api/admin/activity-logs?${query}`)
            const data = await res.json()
            setLogs(data.logs || [])
            setTotal(data.total || 0)
        } catch {
            toast.error('Failed to load activity logs')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filters])

    const exportToCSV = () => {
        const headers = ['Timestamp', 'User', 'Action', 'Detail', 'IP Address']
        const csvContent = [
            headers.join(','),
            ...logs.map(log => [
                format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm:ss'),
                log.username,
                log.action,
                `"${log.detail?.replace(/"/g, '""')}"`,
                log.ipAddress
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `activity_logs_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`
        link.click()
    }

    return (
        <div className="space-y-6 overflow-x-hidden w-full max-w-[100vw]">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Clock className="text-brand-orange" size={24} />
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">Activity Logs</h1>
                </div>
                <button
                    onClick={exportToCSV}
                    className="bg-white border border-grey-light hover:bg-grey-light/10 text-grey-dark px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm w-full sm:w-auto"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Filter Bar — full width stacked on mobile */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-grey-light flex flex-col md:flex-row flex-wrap md:items-center gap-4">
                <div className="flex items-center gap-2 bg-grey-light/20 px-3 py-2 rounded-lg w-full md:w-auto">
                    <Filter size={16} className="text-grey-mid" />
                    <span className="text-sm font-medium text-grey-mid">Filters:</span>
                </div>

                <select
                    aria-label="Filter by action"
                    className="w-full md:w-auto px-3 py-2 border border-grey-light rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-orange/20"
                    value={filters.action}
                    onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                >
                    <option value="All">All Actions</option>
                    <option value="LOGIN">Login</option>
                    <option value="LOGOUT">Logout</option>
                    <option value="FAILED_LOGIN">Failed Login</option>
                    <option value="ADD_PROPERTY">Add Property</option>
                    <option value="EDIT_PROPERTY">Edit Property</option>
                    <option value="DELETE_PROPERTY">Delete Property</option>
                    <option value="ADD_USER">Add User</option>
                    <option value="EDIT_USER">Edit User</option>
                    <option value="DELETE_USER">Delete User</option>
                    <option value="UPDATE_INQUIRY">Update Inquiry</option>
                </select>

                <div className="flex items-center justify-between md:ml-auto w-full md:w-auto">
                    <span className="text-sm text-grey-mid">{total} total entries</span>
                    <button
                        onClick={fetchLogs}
                        className="p-2 hover:bg-grey-light rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Refresh"
                    >
                        <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Logs — Table on desktop, Card/List view on mobile */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-light overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-grey-light/30 border-b border-grey-light">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Detail</th>
                                <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-grey-light">
                            {logs.map((log) => (
                                <tr
                                    key={log.id}
                                    className={`hover:bg-grey-light/5 transition-colors ${['FAILED_LOGIN', 'DELETE_PROPERTY', 'DELETE_USER'].includes(log.action)
                                            ? 'bg-danger-red/5' : ''
                                        }`}
                                >
                                    <td className="px-6 py-4 text-sm text-grey-mid">
                                        {format(new Date(log.createdAt), 'dd MMM yyyy HH:mm:ss')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-grey-light flex items-center justify-center text-[10px] font-bold">
                                                {log.username?.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-dark-blue">{log.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <ActionBadge action={log.action} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-grey-dark max-w-xs truncate" title={log.detail ?? undefined}>
                                        {log.detail}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-grey-mid">
                                        {log.ipAddress}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile List/Card View — action badge + timestamp, avatar + username, detail truncate tap to expand */}
                <div className="md:hidden divide-y divide-grey-light">
                    {isLoading ? (
                        <div className="p-8 text-center text-grey-mid">Loading...</div>
                    ) : logs.map((log) => (
                        <LogEntryCard key={log.id} log={log} />
                    ))}
                    {!isLoading && logs.length === 0 && (
                        <div className="p-12 text-center text-grey-mid">
                            No activity logs found.
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination — Prev | page | Next on mobile */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-grey-light shadow-sm">
                <button
                    disabled={page === 1 || isLoading}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 border border-grey-light rounded-lg text-sm disabled:opacity-50 hover:bg-grey-light/30 transition-all font-bold min-h-[44px]"
                >
                    Prev
                </button>
                <div className="text-sm font-bold text-dark-blue">
                    <span className="hidden sm:inline">Page </span>{page} <span className="hidden sm:inline">of {Math.ceil(total / 25) || 1}</span>
                </div>
                <button
                    disabled={page >= Math.ceil(total / 25) || isLoading}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 border border-grey-light rounded-lg text-sm disabled:opacity-50 hover:bg-grey-light/30 transition-all font-bold min-h-[44px]"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

function ActionBadge({ action }: { action: string }) {
    const config: Record<string, string> = {
        LOGIN: 'bg-green-100 text-green-700',
        LOGOUT: 'bg-gray-200 text-gray-700',
        FAILED_LOGIN: 'bg-red-100 text-red-700',
        ADD_PROPERTY: 'bg-blue-100 text-blue-700',
        EDIT_PROPERTY: 'bg-yellow-100 text-yellow-700',
        DELETE_PROPERTY: 'bg-red-100 text-red-700',
        ADD_USER: 'bg-blue-100 text-blue-700',
        EDIT_USER: 'bg-yellow-100 text-yellow-700',
        DELETE_USER: 'bg-red-100 text-red-700',
        UPDATE_INQUIRY: 'bg-yellow-100 text-yellow-700',
    }
    const style = config[action] || 'bg-grey-100 text-grey-600'
    return <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${style}`}>{action.replace(/_/g, ' ')}</span>
}

function LogEntryCard({ log }: { log: ActivityLog }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <div
            className="py-3 px-4 border-b border-grey-light/50 last:border-b-0"
            onClick={() => setExpanded((e) => !e)}
        >
            <div className="flex items-start justify-between gap-2">
                <ActionBadge action={log.action} />
                <span className="text-xs text-grey-mid flex-shrink-0">
                    {format(new Date(log.createdAt), 'dd MMM HH:mm')}
                </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-grey-light flex items-center justify-center text-xs font-bold text-grey-dark">
                    {log.username?.charAt(0) || '?'}
                </div>
                <span className="text-sm font-medium text-grey-dark">{log.username}</span>
            </div>
            <p className={`mt-1.5 text-sm text-grey-mid ${expanded ? '' : 'line-clamp-1'}`} title={log.detail ?? undefined}>
                {log.detail || '—'}
            </p>
        </div>
    )
}
