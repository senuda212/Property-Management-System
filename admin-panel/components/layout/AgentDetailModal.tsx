'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, User, MapPin } from 'lucide-react'
import Image from 'next/image'

interface AgentDetailModalProps {
    agent: any
    isOpen: boolean
    onClose: () => void
    properties: any[]
}

export default function AgentDetailModal({ agent, isOpen, onClose, properties }: AgentDetailModalProps) {
    if (!agent) return null

    const agentProperties = properties.filter((p) => p.agentId === agent.id)

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
                        <div className="p-6 bg-off-white border-b border-grey-light flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-2xl font-serif font-bold text-dark-blue">{agent.fullName}</h3>
                                <p className="text-sm text-grey-mid mt-1">{agent.specialization || 'Property Agent'}</p>
                            </div>
                            <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-grey-light rounded-full transition-colors">
                                <X size={24} className="text-grey-dark" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
                            {/* Agent Photo & Contact */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Photo */}
                                <div className="md:col-span-1">
                                    {agent.image && (
                                        <div className="relative w-full h-64 rounded-xl overflow-hidden">
                                            <Image
                                                src={agent.image}
                                                alt={agent.fullName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Contact Info */}
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2 flex items-center">
                                            <Mail size={14} className="mr-2" />
                                            Email Address
                                        </p>
                                        <a href={`mailto:${agent.email}`} className="text-brand-orange font-medium hover:underline">
                                            {agent.email}
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2 flex items-center">
                                            <Phone size={14} className="mr-2" />
                                            Phone Number
                                        </p>
                                        <a href={`tel:${agent.phone}`} className="text-dark-blue font-medium hover:underline">
                                            {agent.phone}
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-2">Status</p>
                                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                                            agent.isActive ? 'bg-success-green/10 text-success-green' : 'bg-grey-light text-grey-dark'
                                        }`}>
                                            {agent.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            {agent.bio && (
                                <div className="bg-off-white p-6 rounded-xl border border-grey-light">
                                    <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-3">About</p>
                                    <p className="text-grey-dark leading-relaxed">{agent.bio}</p>
                                </div>
                            )}

                            {/* Properties */}
                            <div>
                                <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest mb-4">
                                    Properties ({agentProperties.length})
                                </p>
                                {agentProperties.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {agentProperties.map((prop) => (
                                            <div key={prop.id} className="bg-off-white p-4 rounded-lg border border-grey-light hover:border-brand-orange transition-colors">
                                                <div className="flex gap-3">
                                                    <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-grey-light">
                                                        {JSON.parse(prop.images || '[]')[0] && (
                                                            <Image
                                                                src={JSON.parse(prop.images || '[]')[0]}
                                                                alt={prop.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-dark-blue truncate">{prop.title}</p>
                                                        <p className="text-xs text-grey-mid flex items-center mt-1">
                                                            <MapPin size={12} className="mr-1" />
                                                            {prop.city}
                                                        </p>
                                                        <p className="text-sm font-bold text-brand-orange mt-1">
                                                            LKR {prop.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-grey-mid italic text-sm">No properties assigned yet</p>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-off-white border-t border-grey-light flex gap-3 justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg text-dark-blue font-medium hover:bg-grey-light transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
