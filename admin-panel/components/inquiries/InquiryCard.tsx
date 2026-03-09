'use client'

import { Mail, Phone, Calendar, Building, CheckCircle, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

interface InquiryCardProps {
    inquiry: any
    onView: (id: number) => void
    onUpdateStatus: (id: number, status: string) => void
}

export default function InquiryCard({ inquiry, onView, onUpdateStatus }: InquiryCardProps) {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Unread': return 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'
            case 'Read': return 'bg-grey-mid/10 text-grey-mid border-grey-mid/20'
            case 'Responded': return 'bg-success-green/10 text-success-green border-success-green/20'
            default: return 'bg-grey-light text-grey-dark'
        }
    }

    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="bg-white rounded-xl shadow-sm border border-grey-light p-6 hover:shadow-md transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-dark-blue flex items-center">
                        {inquiry.fullName}
                        {inquiry.status === 'Unread' && (
                            <span className="ml-2 w-2 h-2 bg-brand-orange rounded-full animate-ping" />
                        )}
                    </h4>
                    <p className="text-xs text-grey-mid flex items-center mt-1">
                        <Calendar size={12} className="mr-1" />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${getStatusStyle(inquiry.status)}`}>
                    {inquiry.status}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <p className="text-sm text-grey-dark flex items-center">
                    <Mail size={14} className="mr-2 text-grey-mid" />
                    {inquiry.email}
                </p>
                <p className="text-sm text-grey-dark flex items-center">
                    <Phone size={14} className="mr-2 text-grey-mid" />
                    {inquiry.phone}
                </p>
                <p className={`text-sm font-medium flex items-center ${inquiry.propertyTitle ? 'text-brand-orange' : 'text-grey-mid italic'}`}>
                    <Building size={14} className="mr-2 opacity-70" />
                    {inquiry.propertyTitle || 'General Inquiry'}
                </p>
            </div>

            <div className="bg-off-white p-3 rounded-lg mb-6 group-hover:bg-grey-light/30 transition-colors">
                <p className="text-xs text-grey-dark italic line-clamp-2">
                    &ldquo;{inquiry.message}&rdquo;
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onView(inquiry.id)}
                    className="flex-1 text-xs font-bold border border-dark-blue text-dark-blue py-2 rounded-lg hover:bg-dark-blue hover:text-white transition-all"
                >
                    View Full Message
                </button>
                {inquiry.status === 'Unread' && (
                    <button
                        onClick={() => onUpdateStatus(inquiry.id, 'Read')}
                        className="px-3 bg-grey-light text-grey-dark rounded-lg hover:bg-grey-mid hover:text-white transition-colors"
                        title="Mark as Read"
                    >
                        <CheckCircle size={16} />
                    </button>
                )}
                {inquiry.status !== 'Responded' && (
                    <button
                        onClick={() => onUpdateStatus(inquiry.id, 'Responded')}
                        className="px-3 bg-success-green/10 text-success-green rounded-lg hover:bg-success-green hover:text-white transition-colors"
                        title="Mark as Responded"
                    >
                        <MessageSquare size={16} />
                    </button>
                )}
            </div>
        </motion.div>
    )
}
