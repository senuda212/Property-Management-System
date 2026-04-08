'use client'

import { useEffect, useState } from 'react'
import {
    Building2,
    Globe,
    Save,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    AlertTriangle,
    Phone,
    MapPin
} from 'lucide-react'
import toast from 'react-hot-toast'

type PublicContactSettings = {
    companyName: string
    tagline: string
    officeAddress: string
    phonePrimary: string
    phoneSecondary: string
    email: string
    whatsappNumber: string
    ikmanProfileUrl: string
    facebookUrl: string
    instagramUrl: string
    linkedinUrl: string
    youtubeUrl: string
    managingDirectorName: string
    managingDirectorCredential: string
}

const emptySettings: PublicContactSettings = {
    companyName: '',
    tagline: '',
    officeAddress: '',
    phonePrimary: '',
    phoneSecondary: '',
    email: '',
    whatsappNumber: '',
    ikmanProfileUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    managingDirectorName: '',
    managingDirectorCredential: '',
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<PublicContactSettings>(emptySettings)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings', { cache: 'no-store' })
                if (!res.ok) throw new Error('Failed to load settings')

                const data = await res.json()
                setSettings({
                    companyName: data.companyName || '',
                    tagline: data.tagline || '',
                    officeAddress: data.officeAddress || '',
                    phonePrimary: data.phonePrimary || '',
                    phoneSecondary: data.phoneSecondary || '',
                    email: data.email || '',
                    whatsappNumber: data.whatsappNumber || '',
                    ikmanProfileUrl: data.ikmanProfileUrl || '',
                    facebookUrl: data.facebookUrl || '',
                    instagramUrl: data.instagramUrl || '',
                    linkedinUrl: data.linkedinUrl || '',
                    youtubeUrl: data.youtubeUrl || '',
                    managingDirectorName: data.managingDirectorName || '',
                    managingDirectorCredential: data.managingDirectorCredential || '',
                })
            } catch {
                toast.error('Failed to load settings')
            } finally {
                setIsLoading(false)
            }
        }

        loadSettings()
    }, [])

    const handleSave = async () => {
        if (!settings.officeAddress.trim()) {
            toast.error('Office address is required')
            return
        }

        setIsSaving(true)

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Failed to save settings')
            }

            toast.success('Settings updated successfully!')
        } catch {
            toast.error('Failed to save settings')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-8 pb-12">
                <h1 className="text-2xl font-serif font-bold text-dark-blue">Settings</h1>
                <p className="text-grey-mid text-sm">Loading settings...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="settings-header flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">Settings</h1>
                    <p className="text-grey-mid text-sm">Manage company information and dashboard settings</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="settings-save-btn bg-brand-orange text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] transition-transform disabled:opacity-70"
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
                        <h3 className="text-lg font-serif font-bold text-dark-blue">Public Contact Information</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Company Name</label>
                            <input
                                type="text"
                                aria-label="Company name"
                                value={settings.companyName}
                                onChange={(e) => setSettings((current) => ({ ...current, companyName: e.target.value }))}
                                className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Tagline</label>
                            <input
                                type="text"
                                aria-label="Tagline"
                                value={settings.tagline}
                                onChange={(e) => setSettings((current) => ({ ...current, tagline: e.target.value }))}
                                className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Primary Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={16} />
                                    <input
                                        type="text"
                                        aria-label="Primary phone number"
                                        value={settings.phonePrimary}
                                        onChange={(e) => setSettings((current) => ({ ...current, phonePrimary: e.target.value }))}
                                        className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Secondary Phone</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={16} />
                                    <input
                                        type="text"
                                        aria-label="Secondary phone number"
                                        value={settings.phoneSecondary}
                                        onChange={(e) => setSettings((current) => ({ ...current, phoneSecondary: e.target.value }))}
                                        className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">WhatsApp Number</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={16} />
                                <input
                                    type="text"
                                    aria-label="WhatsApp number"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => setSettings((current) => ({ ...current, whatsappNumber: e.target.value }))}
                                    className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Ikman.lk Profile URL</label>
                            <input
                                type="url"
                                aria-label="Ikman profile URL"
                                value={settings.ikmanProfileUrl}
                                onChange={(e) => setSettings((current) => ({ ...current, ikmanProfileUrl: e.target.value }))}
                                placeholder="https://ikman.lk/en/shops/..."
                                className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Email</label>
                            <input
                                type="email"
                                aria-label="Email address"
                                value={settings.email}
                                onChange={(e) => setSettings((current) => ({ ...current, email: e.target.value }))}
                                className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Managing Director</label>
                                <input
                                    type="text"
                                    aria-label="Managing director name"
                                    value={settings.managingDirectorName}
                                    onChange={(e) => setSettings((current) => ({ ...current, managingDirectorName: e.target.value }))}
                                    className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Director Credential</label>
                                <input
                                    type="text"
                                    aria-label="Managing director credential"
                                    value={settings.managingDirectorCredential}
                                    onChange={(e) => setSettings((current) => ({ ...current, managingDirectorCredential: e.target.value }))}
                                    className="w-full bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none focus:border-dark-blue"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-grey-mid uppercase tracking-widest mb-1">Office Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-4 text-grey-mid" size={16} />
                                <textarea
                                    rows={3}
                                    aria-label="Office address"
                                    value={settings.officeAddress}
                                    onChange={(e) => setSettings((current) => ({ ...current, officeAddress: e.target.value }))}
                                    className="w-full bg-off-white border border-grey-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue"
                                />
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
                            <div className="social-row flex items-center space-x-4">
                                <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg"><Facebook size={20} /></div>
                                <input
                                    type="text"
                                    aria-label="Facebook URL"
                                    value={settings.facebookUrl}
                                    onChange={(e) => setSettings((current) => ({ ...current, facebookUrl: e.target.value }))}
                                    placeholder="Facebook URL"
                                    className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none"
                                />
                            </div>
                            <div className="social-row flex items-center space-x-4">
                                <div className="p-3 bg-pink-600/10 text-pink-600 rounded-lg"><Instagram size={20} /></div>
                                <input
                                    type="text"
                                    aria-label="Instagram URL"
                                    value={settings.instagramUrl}
                                    onChange={(e) => setSettings((current) => ({ ...current, instagramUrl: e.target.value }))}
                                    placeholder="Instagram URL"
                                    className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none"
                                />
                            </div>
                            <div className="social-row flex items-center space-x-4">
                                <div className="p-3 bg-blue-700/10 text-blue-700 rounded-lg"><Linkedin size={20} /></div>
                                <input
                                    type="text"
                                    aria-label="LinkedIn URL"
                                    value={settings.linkedinUrl}
                                    onChange={(e) => setSettings((current) => ({ ...current, linkedinUrl: e.target.value }))}
                                    placeholder="LinkedIn URL"
                                    className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none"
                                />
                            </div>
                            <div className="social-row flex items-center space-x-4">
                                <div className="p-3 bg-red-600/10 text-red-600 rounded-lg"><Youtube size={20} /></div>
                                <input
                                    type="text"
                                    aria-label="YouTube URL"
                                    value={settings.youtubeUrl}
                                    onChange={(e) => setSettings((current) => ({ ...current, youtubeUrl: e.target.value }))}
                                    placeholder="YouTube URL"
                                    className="flex-1 bg-off-white border border-grey-light rounded-xl py-3 px-4 focus:outline-none"
                                />
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

                <style jsx>{`
                    @media (max-width: 768px) {
                        .settings-header {
                            flex-direction: column !important;
                            align-items: stretch !important;
                        }

                        .settings-save-btn {
                            width: 100% !important;
                            justify-content: center !important;
                        }

                        .social-row {
                            flex-direction: column !important;
                            align-items: stretch !important;
                            gap: 12px !important;
                        }

                        .social-row > div {
                            align-self: flex-start;
                        }

                        .social-row input {
                            width: 100% !important;
                        }

                        .bg-white.p-8 {
                            padding: 20px !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}
