import React from 'react'
import { Crown, Briefcase, User, ShieldCheck } from 'lucide-react'
import { Role } from '@/lib/permissions'

interface RoleBadgeProps {
    role: Role
    showIcon?: boolean
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, showIcon = true }) => {
    const config = {
        admin: {
            bg: 'bg-dark-blue',
            text: 'text-white',
            label: 'Admin',
            icon: Crown
        },
        manager: {
            bg: 'bg-orange',
            text: 'text-white',
            label: 'Manager',
            icon: Briefcase
        },
        employee: {
            bg: 'bg-grey-mid/20',
            text: 'text-grey-dark',
            label: 'Employee',
            icon: User
        }
    }

    const current = config[role] || config.employee
    const Icon = current.icon

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${current.bg} ${current.text} gap-1.5`}>
            {showIcon && <Icon size={12} />}
            {current.label}
        </span>
    )
}
