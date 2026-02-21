'use client'

import React, { useState, useEffect } from 'react'
import {
    UserPlus,
    Users,
    UserCheck,
    UserX,
    ShieldAlert,
    Search,
    Edit2,
    Unlock,
    Trash2,
    ToggleLeft,
    ToggleRight,
    X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { RoleBadge } from '@/components/ui/RoleBadge'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'

const userSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    username: z.string().min(4, 'Username must be at least 4 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
    role: z.enum(['admin', 'manager', 'employee']),
    isActive: z.boolean().default(true)
})

type UserFormData = z.infer<typeof userSchema>

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users')
            const data = await res.json()
            if (Array.isArray(data)) setUsers(data)
        } catch (error) {
            toast.error('Failed to load users')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const stats = {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        locked: users.filter(u => u.lockedUntil && new Date(u.lockedUntil) > new Date()).length
    }

    const filteredUsers = users.filter(u =>
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleToggleStatus = async (user: any) => {
        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ ...user, isActive: !user.isActive })
            })
            if (res.ok) {
                toast.success(`User ${user.isActive ? 'deactivated' : 'activated'}`)
                fetchUsers()
            } else {
                const err = await res.json()
                toast.error(err.error || 'Failed to update status')
            }
        } catch (error) {
            toast.error('Connection error')
        }
    }

    const handleUnlock = async (userId: number) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/unlock`, { method: 'POST' })
            if (res.ok) {
                toast.success('Account unlocked')
                fetchUsers()
            }
        } catch (error) {
            toast.error('Failed to unlock account')
        }
    }

    const handleDelete = async (userId: number) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
        try {
            const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('User deleted')
                fetchUsers()
            } else {
                const err = await res.json()
                toast.error(err.error || 'Failed to delete user')
            }
        } catch (error) {
            toast.error('Failed to delete user')
        }
    }

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold text-dark-blue">User Management</h1>
                <button
                    onClick={() => { setEditingUser(null); setIsPanelOpen(true); }}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                    <UserPlus size={18} />
                    Add New User
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Users} label="Total Users" value={stats.total} color="blue" />
                <StatCard icon={UserCheck} label="Active Users" value={stats.active} color="green" />
                <StatCard icon={ShieldAlert} label="Locked Accounts" value={stats.locked} color="red" />
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-grey-light flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, username or email..."
                        className="w-full pl-10 pr-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-light overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-grey-light/30 border-b border-grey-light">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Last Login</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey-dark uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-grey-light">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-grey-light/10 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${getAvatarColor(user.role)}`}>
                                            {user.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-dark-blue">{user.fullName}</div>
                                            <div className="text-xs text-grey-mid">@{user.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-grey-dark">{user.email}</td>
                                <td className="px-6 py-4">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge user={user} />
                                </td>
                                <td className="px-6 py-4 text-sm text-grey-mid">
                                    {user.lastLogin ? format(new Date(user.lastLogin), 'MMM d, HH:mm') : 'Never'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => { setEditingUser(user); setIsPanelOpen(true); }}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        {user.lockedUntil && new Date(user.lockedUntil) > new Date() && (
                                            <button
                                                onClick={() => handleUnlock(user.id)}
                                                className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Unlock"
                                            >
                                                <Unlock size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleToggleStatus(user)}
                                            className={`p-1.5 ${user.isActive ? 'text-grey-mid' : 'text-green-600'} hover:bg-opacity-10 rounded transition-colors`}
                                            title={user.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            {user.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="p-1.5 text-danger-red hover:bg-danger-red/10 rounded transition-colors" title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-12 text-center text-grey-mid">
                        No users found matching your search.
                    </div>
                )}
            </div>

            <UserPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                user={editingUser}
                onSuccess={() => { setIsPanelOpen(false); fetchUsers(); }}
            />
        </div>
    )
}

function StatCard({ icon: Icon, label, value, color }: any) {
    const colors = {
        blue: 'border-blue-500 text-blue-600',
        green: 'border-green-500 text-green-600',
        red: 'border-red-500 text-red-600'
    }
    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colors[color as keyof typeof colors]}`}>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-grey-mid">{label}</p>
                    <p className="text-3xl font-bold mt-1">{value}</p>
                </div>
                <Icon size={32} className="opacity-20" />
            </div>
        </div>
    )
}

function StatusBadge({ user }: { user: any }) {
    const isLocked = user.lockedUntil && new Date(user.lockedUntil) > new Date()
    if (isLocked) return <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Locked</span>
    if (user.isActive) return <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
    return <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Inactive</span>
}

function getAvatarColor(role: string) {
    if (role === 'admin') return 'bg-dark-blue'
    if (role === 'manager') return 'bg-orange'
    return 'bg-grey-mid'
}

function UserPanel({ isOpen, onClose, user, onSuccess }: any) {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            isActive: true,
            role: 'employee'
        }
    })

    const password = watch('password')
    const [strength, setStrength] = useState<'weak' | 'fair' | 'strong'>('weak')

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName,
                email: user.email,
                username: user.username,
                role: user.role,
                isActive: user.isActive
            })
        } else {
            reset({
                fullName: '',
                email: '',
                username: '',
                role: 'employee',
                isActive: true,
                password: ''
            })
        }
    }, [user, reset])

    useEffect(() => {
        if (!password) {
            setStrength('weak')
            return
        }
        let score = 0
        if (password.length >= 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[a-z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        if (score <= 2) setStrength('weak')
        else if (score <= 4) setStrength('fair')
        else setStrength('strong')
    }, [password])

    const onSubmit = async (data: UserFormData) => {
        try {
            const url = user ? `/api/admin/users/${user.id}` : '/api/admin/users'
            const method = user ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                body: JSON.stringify(data)
            })

            if (res.ok) {
                toast.success(user ? 'User updated' : 'User created')
                onSuccess()
            } else {
                const err = await res.json()
                toast.error(err.error || 'Operation failed')
            }
        } catch (error) {
            toast.error('Connection error')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-dark-blue/40 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-[70] border-l-4 border-brand-orange overflow-y-auto"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-serif font-bold text-dark-blue">
                                    {user ? 'Edit User' : 'Add New User'}
                                </h2>
                                <button onClick={onClose} className="p-2 hover:bg-grey-light rounded-full"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-grey-dark mb-1">Full Name</label>
                                    <input
                                        {...register('fullName')}
                                        className="w-full px-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-brand-orange/20 outline-none"
                                    />
                                    {errors.fullName && <p className="text-danger-red text-xs mt-1">{errors.fullName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-grey-dark mb-1">Email Address</label>
                                    <input
                                        {...register('email')}
                                        className="w-full px-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-brand-orange/20 outline-none"
                                    />
                                    {errors.email && <p className="text-danger-red text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-grey-dark mb-1">Username</label>
                                    <input
                                        {...register('username')}
                                        readOnly={!!user}
                                        className={`w-full px-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-brand-orange/20 outline-none ${user ? 'bg-grey-light/30 cursor-not-allowed' : ''}`}
                                    />
                                    {errors.username && <p className="text-danger-red text-xs mt-1">{errors.username.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-grey-dark mb-1">
                                        {user ? 'New Password (optional)' : 'Password'}
                                    </label>
                                    <input
                                        type="password"
                                        {...register('password')}
                                        className="w-full px-4 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-brand-orange/20 outline-none"
                                    />
                                    {password && (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                                                <span>Strength: {strength}</span>
                                            </div>
                                            <div className="h-1 w-full bg-grey-light rounded-full overflow-hidden flex">
                                                <div className={`h-full ${strength === 'weak' ? 'w-1/3 bg-danger-red' : strength === 'fair' ? 'w-2/3 bg-orange' : 'w-full bg-green-500'} transition-all`} />
                                            </div>
                                        </div>
                                    )}
                                    {errors.password && <p className="text-danger-red text-xs mt-1">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-grey-dark mb-3">System Role</label>
                                    <div className="space-y-3">
                                        <RoleOption
                                            value="employee"
                                            current={watch('role')}
                                            onSelect={() => setValue('role', 'employee')}
                                            title="Employee"
                                            desc="Can view properties and manage inquiries"
                                        />
                                        <RoleOption
                                            value="manager"
                                            current={watch('role')}
                                            onSelect={() => setValue('role', 'manager')}
                                            title="Manager"
                                            desc="Can add/edit properties and manage inquiries"
                                        />
                                        <RoleOption
                                            value="admin"
                                            current={watch('role')}
                                            onSelect={() => setValue('role', 'admin')}
                                            title="Admin"
                                            desc="Full access to all features including user management"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-grey-light/20 rounded-lg">
                                    <span className="text-sm font-bold text-dark-blue">Active Account</span>
                                    <button
                                        type="button"
                                        onClick={() => setValue('isActive', !watch('isActive'))}
                                        className="transition-colors"
                                    >
                                        {watch('isActive') ? <ToggleRight className="text-green-500" size={32} /> : <ToggleLeft className="text-grey-mid" size={32} />}
                                    </button>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Processing...' : user ? 'Update User' : 'Create User'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

function RoleOption({ value, current, onSelect, title, desc }: any) {
    const selected = current === value
    return (
        <div
            onClick={onSelect}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${selected ? 'border-brand-orange bg-brand-orange/5' : 'border-grey-light hover:border-grey-mid'}`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? 'border-brand-orange' : 'border-grey-light'}`}>
                    {selected && <div className="w-2 h-2 rounded-full bg-brand-orange" />}
                </div>
                <div>
                    <div className="text-sm font-bold text-dark-blue">{title}</div>
                    <div className="text-xs text-grey-mid">{desc}</div>
                </div>
            </div>
        </div>
    )
}
