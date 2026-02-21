'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

interface StatsCardProps {
    label: string
    value: number | string
    iconName: keyof typeof LucideIcons
    color: string
}

export default function StatsCard({ label, value, iconName, color }: StatsCardProps) {
    const Icon = (LucideIcons[iconName] as any) || LucideIcons.HelpCircle

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${color} flex items-center space-x-4`}
        >
            <div className={`p-3 rounded-full bg-opacity-10 bg-current ${color.replace('border-', 'text-')}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-grey-mid text-sm font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-dark-blue">{value}</h3>
                <p className="text-success-green text-xs font-bold mt-1">+2 this week</p>
            </div>
        </motion.div>
    )
}
