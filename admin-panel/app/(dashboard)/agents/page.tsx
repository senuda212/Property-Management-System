'use client'

import { useState, useEffect } from 'react'
import { Loader2, Users, Mail, Phone, Edit2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import AgentDetailModal from '@/components/layout/AgentDetailModal'

export default function AgentsPage() {
    const [agents, setAgents] = useState<any[]>([])
    const [properties, setProperties] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAgent, setSelectedAgent] = useState<any>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    const fetchAgents = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/admin/agents')
            const data = await res.json()
            if (Array.isArray(data)) {
                setAgents(data)
            } else if (res.status === 401) {
                toast.error('Session expired. Please login again.')
            } else {
                toast.error(data.error || 'Failed to load agents')
            }
        } catch {
            toast.error('Failed to load agents')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchProperties = async () => {
        try {
            const res = await fetch('/api/admin/properties')
            const data = await res.json()
            if (Array.isArray(data)) {
                setProperties(data)
            }
        } catch {
            // Silent fail for properties
        }
    }

    useEffect(() => {
        fetchAgents()
        fetchProperties()
    }, [])

    const openAgentDetail = (agent: any) => {
        setSelectedAgent(agent)
        setIsDetailModalOpen(true)
    }

    const closeAgentDetail = () => {
        setIsDetailModalOpen(false)
        setSelectedAgent(null)
    }

    const countProperties = (agentId: number) => {
        return properties.filter((p) => p.agentId === agentId).length
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-dark-blue flex items-center gap-3">
                        <Users className="text-brand-orange" size={32} />
                        Property Agents
                    </h1>
                    <p className="text-grey-mid text-sm mt-1">Agents are created automatically from property submissions</p>
                </div>
            </div>

            {/* Agents Grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="animate-spin mx-auto text-brand-orange mb-4" size={40} />
                        <p className="text-grey-mid">Loading agents...</p>
                    </div>
                ) : agents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {agents.map((agent) => (
                            <div
                                key={agent.id}
                                onClick={() => openAgentDetail(agent)}
                                className="bg-off-white rounded-lg border border-grey-light p-6 hover:border-brand-orange hover:shadow-lg transition-all cursor-pointer"
                            >
                                {/* Agent Name & Specialization */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-dark-blue">{agent.fullName}</h3>
                                    <p className="text-sm text-grey-mid">{agent.specialization || 'Property Agent'}</p>
                                </div>

                                {/* Status Badge */}
                                <div className="mb-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        agent.isActive ? 'bg-success-green/10 text-success-green' : 'bg-grey-light text-grey-dark'
                                    }`}>
                                        {agent.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2 mb-4 pb-4 border-b border-grey-light">
                                    <div className="flex items-center gap-2 text-sm text-grey-dark">
                                        <Mail size={14} className="text-brand-orange" />
                                        <a href={`mailto:${agent.email}`} className="hover:underline text-brand-orange">
                                            {agent.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-grey-dark">
                                        <Phone size={14} className="text-brand-orange" />
                                        <a href={`tel:${agent.phone}`} className="hover:underline">
                                            {agent.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Properties Count & Edit Button */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-grey-mid tracking-widest">Properties</p>
                                        <p className="text-2xl font-bold text-brand-orange">{countProperties(agent.id)}</p>
                                    </div>
                                    <Link 
                                        href={`/agents/${agent.id}/edit`} 
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 hover:bg-grey-light rounded-lg transition-colors"
                                        title="Edit agent"
                                    >
                                        <Edit2 size={20} className="text-brand-orange" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-20 text-center">
                        <Users className="text-grey-light mx-auto mb-4" size={48} />
                        <p className="text-grey-mid mb-1">No agents found yet</p>
                        <p className="text-xs text-grey-mid">Add a property with agent details to create an agent automatically.</p>
                    </div>
                )}
            </div>

            {/* Agent Detail Modal */}
            <AgentDetailModal
                agent={selectedAgent}
                isOpen={isDetailModalOpen}
                onClose={closeAgentDetail}
                properties={properties}
            />
        </div>
    )
}
