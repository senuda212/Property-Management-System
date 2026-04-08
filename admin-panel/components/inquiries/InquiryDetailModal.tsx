'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, Building, CheckCircle, MessageSquare, ExternalLink, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface InquiryDetailModalProps {
    inquiry: any
    isOpen: boolean
    onClose: () => void
    onUpdateStatus: (id: number, status: string) => void
}

export default function InquiryDetailModal({ inquiry, isOpen, onClose, onUpdateStatus }: InquiryDetailModalProps) {
    const [isUpdatingReply, setIsUpdatingReply] = useState(false)

    if (!inquiry) return null

    const handleMarkReplied = async () => {
        setIsUpdatingReply(true)
        try {
            const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ replied: true, repliedAt: new Date().toISOString() })
            })

            if (res.ok) {
                toast.success('Marked as replied')
                onUpdateStatus(inquiry.id, 'Responded')
            } else {
                toast.error('Failed to update status')
            }
        } catch {
            toast.error('Failed to update status')
        } finally {
            setIsUpdatingReply(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-dark-blue/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="p-6 bg-off-white border-b border-grey-light flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark-blue">Inquiry Details</h3>
                                <p className="text-xs text-grey-mid">Received on {new Date(inquiry.createdAt).toLocaleString()}</p>
                            </div>
                            <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-grey-light rounded-full transition-colors">
                                <X size={24} className="text-grey-dark" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                            {/* Client Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Full Name</p>
                                        <p className="text-lg font-bold text-dark-blue">{inquiry.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Email Address</p>
                                        <a href={`mailto:${inquiry.email}`} className="text-brand-orange font-medium flex items-center hover:underline">
                                            <Mail size={16} className="mr-2" />
                                            {inquiry.email}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Phone Number</p>
                                        <a href={`tel:${inquiry.phone}`} className="text-dark-blue font-medium flex items-center hover:underline">
                                            <Phone size={16} className="mr-2" />
                                            {inquiry.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Interested In</p>
                                        <p className={`text-lg font-bold flex items-center ${inquiry.propertyTitle ? 'text-brand-orange' : 'text-grey-mid italic'}`}>
                                            <Building size={20} className="mr-2 opacity-70" />
                                            {inquiry.propertyTitle || 'General Inquiry'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Current Status</p>
                                        <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full ${inquiry.status === 'Unread' ? 'bg-brand-orange/10 text-brand-orange' :
                                                inquiry.status === 'Read' ? 'bg-grey-mid/10 text-grey-mid' : 'bg-success-green/10 text-success-green'
                                            }`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                    {inquiry.replied && (
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-1">Reply Status</p>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle size={16} className="text-success-green fill-success-green" />
                                                <span className="text-sm font-bold text-success-green">Replied</span>
                                            </div>
                                            {inquiry.repliedAt && (
                                                <p className="text-xs text-grey-mid mt-1">
                                                    {new Date(inquiry.repliedAt).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="bg-off-white p-6 rounded-xl border border-grey-light">
                                <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-4 flex items-center">
                                    <MessageSquare size={14} className="mr-2" />
                                    Client Message
                                </p>
                                <div className="text-grey-dark leading-relaxed whitespace-pre-wrap italic">
                                    &ldquo;{inquiry.message}&rdquo;
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-grey-light">
                                <a
                                    href={`mailto:${inquiry.email}?subject=Re: Inquiry about ${inquiry.propertyTitle || 'Premier Estates'}`}
                                    className="flex-1 min-w-[200px] bg-dark-blue text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-mid-blue transition-all"
                                >
                                    <Mail size={18} />
                                    <span>Reply via Email</span>
                                </a>
                                <a
                                    href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    className="flex-1 min-w-[200px] bg-success-green text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-green-600 transition-all"
                                >
                                    <ExternalLink size={18} />
                                    <span>Reply via WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 bg-off-white flex justify-between gap-4 flex-wrap">
                            <div className="flex gap-2">
                                {inquiry.status !== 'Read' && (
                                    <button
                                        onClick={() => onUpdateStatus(inquiry.id, 'Read')}
                                        className="text-xs font-bold text-grey-mid hover:text-dark-blue flex items-center"
                                    >
                                        <CheckCircle size={14} className="mr-1" />
                                        Mark as Read
                                    </button>
                                )}
                                {!inquiry.replied && (
                                    <button
                                        onClick={handleMarkReplied}
                                        disabled={isUpdatingReply}
                                        className="text-xs font-bold text-success-green hover:underline flex items-center disabled:opacity-50"
                                    >
                                        {isUpdatingReply && <Loader2 size={12} className="mr-1 animate-spin" />}
                                        <CheckCircle size={14} className="mr-1" />
                                        Mark as Replied
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-xs font-bold text-grey-mid hover:text-danger-red transition-colors"
                            >
                                Close Details
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
