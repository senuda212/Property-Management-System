'use client'

import { useState } from 'react'
import {
    Building2,
    Globe,
    Lock,
    Bell,
    Save,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    AlertTriangle,
    Mail,
    Phone,
    Clock,
    MapPin
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            toast.success('Settings updated successfully!')
        }, 1000)
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">Settings</h1>
                    <p className="text-grey-mid text-sm">Manage company information and dashboard settings</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] transition-transform disabled:opacity-70"
                >
                    {isSaving ? 'Saving...' : (
                        <>
                            <Save size={20} />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Company Information */}
                <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                    <div className="flex items-center space-x-2 border-b border-grey-light pb-4">
                        <Building2 className="text-brand-orange" size={24} />
                        <h3 className="text-lg font-serif font-bold text-dark-blue">Company Information</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Company Name</label>
                            <input type="text" defaultValue="Ceylon Roots Holdings" className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Tagline</label>
                            <input type="text" defaultValue="Rooting For You" className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={16} />
                                    <input type="text" defaultValue="+94 77 123 4567" className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">WhatsApp</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={16} />
                                    <input type="text" defaultValue="+94 77 123 4567" className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Office Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-4 text-grey-mid" size={16} />
                                <textarea rows={3} defaultValue="123 Galle Road, Colombo 03, Sri Lanka" className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Account */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4">
                            <Globe className="text-brand-orange" size={24} />
                            <h3 className="text-lg font-serif font-bold text-dark-blue">Social Media Links</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg"><Facebook size={20} /></div>
                                <input type="text" placeholder="Facebook URL" className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-pink-600/10 text-pink-600 rounded-lg"><Instagram size={20} /></div>
                                <input type="text" placeholder="Instagram URL" className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-700/10 text-blue-700 rounded-lg"><Linkedin size={20} /></div>
                                <input type="text" placeholder="LinkedIn URL" className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 border-l-4 border-danger-red">
                        <div className="flex items-center space-x-2 border-b border-grey-light pb-4">
                            <AlertTriangle className="text-danger-red" size={24} />
                            <h3 className="text-lg font-serif font-bold text-dark-blue">Danger Zone</h3>
                        </div>
                        <p className="text-sm text-grey-dark">Actions here are permanent and cannot be undone.</p>
                        <button className="w-full border-2 border-danger-red text-danger-red font-bold py-3 rounded-xl hover:bg-danger-red hover:text-white transition-all">
                            Clear All Inquiries
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
