'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Phone, Mail, MapPin, Youtube, MessageCircle } from 'lucide-react'
import { DEFAULT_PUBLIC_CONTACT_SETTINGS } from '@/lib/siteSettings'

const quickLinks = ['Home', 'Properties', 'Blog', 'About Us', 'Contact Us']
const quickHrefs = ['/', '/properties', '/blog', '/about', '/contact']

const services = [
    'Real Estate',
    'Property Management & Maintenance',
    'Interior Designing',
    'Tyre Sales',
    'Low Services',
]

export default function Footer() {
    const [settings, setSettings] = useState(DEFAULT_PUBLIC_CONTACT_SETTINGS)
    const brandInitials = settings.companyName
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 4)
        .toUpperCase() || 'CRH'

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await fetch('/api/settings', { cache: 'no-store' })
                if (!res.ok) return

                const data = await res.json()
                setSettings((current) => ({
                    ...current,
                    ...Object.fromEntries(
                        Object.entries(data).filter(([, value]) => typeof value === 'string' && value.trim())
                    ),
                }))
            } catch {
                // Keep fallback values on fetch failure.
            }
        }

        loadSettings()
    }, [])

    const socials = [
        { icon: MessageCircle, href: `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`, label: 'WhatsApp' },
        { icon: Facebook, href: settings.facebookUrl, label: 'Facebook' },
        { icon: Youtube, href: settings.youtubeUrl, label: 'YouTube' },
        { icon: Instagram, href: settings.instagramUrl, label: 'Instagram' },
    ]

    return (
        <footer style={{ backgroundColor: '#0B1F3A', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%' }} />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ maxWidth: '1280px', margin: '0 auto', padding: '44px 24px 0', position: 'relative', zIndex: 10 }}
            >
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px', paddingBottom: '32px' }}>
                    <div>
                        <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontFamily: 'Playfair Display, serif', fontSize: '12px' }}>{brandInitials}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: 'white' }}>{settings.companyName}</span>
                                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#94A3B8' }}>{settings.tagline}</span>
                            </div>
                        </div>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#FF6B1A', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px', maxWidth: '300px' }}>Rooting For You</p>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748B', lineHeight: 1.5, marginBottom: '18px', maxWidth: '300px' }}>We connect buyers, sellers and renters with premium properties across Sri Lanka, delivering exceptional service and trusted expertise.</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {socials.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href || '#'}
                                    aria-label={item.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn"
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1.5px solid rgba(255, 255, 255, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        color: '#E2E8F0',
                                        minHeight: '44px',
                                        minWidth: '44px',
                                    }}
                                >
                                    {typeof item.icon === 'string' ? (
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={20}
                                            height={20}
                                            style={{ width: '20px', height: '20px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                                        />
                                    ) : (
                                        <item.icon size={20} strokeWidth={1.5} />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '14px' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                            {quickLinks.map((label, i) => (
                                <li key={label}>
                                    <Link href={quickHrefs[i]} className="footer-link" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ opacity: 0, transition: 'opacity 0.2s', color: '#F97316' }}>›</span> {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '14px' }}>Our Services</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                            {services.map((service) => (
                                <li key={service}>
                                    <a href="#" className="footer-link" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ opacity: 0, transition: 'opacity 0.2s', color: '#F97316' }}>›</span> {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '14px' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { icon: Phone, text: settings.phonePrimary, href: `tel:${settings.phonePrimary.replace(/\s+/g, '')}`, label: 'Call Us' },
                                { icon: Phone, text: settings.phoneSecondary, href: `tel:${settings.phoneSecondary.replace(/\s+/g, '')}`, label: 'Call Us' },
                                { icon: Mail, text: settings.email, href: `mailto:${settings.email}`, label: 'Email Us' },
                                { icon: MapPin, text: settings.officeAddress, label: 'Visit Us' },
                            ].map(({ icon: Icon, text, href, label }) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: 'rgba(249,115,22,0.1)', padding: '8px', borderRadius: '8px', color: '#F97316' }}>
                                        <Icon size={16} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>{label}</span>
                                        {href ? (
                                            <a href={href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#E2E8F0', textDecoration: 'none', fontWeight: 500, wordBreak: 'break-word' }}>{text}</a>
                                        ) : (
                                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#E2E8F0', fontWeight: 500, wordBreak: 'break-word' }}>{text}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />

                <div className="footer-bottom" style={{ paddingBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div className="footer-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#64748B' }}>© 2025 {settings.companyName}. All Rights Reserved.</span>
                        <span style={{ color: '#475569', opacity: 0.75, display: 'inline-flex', alignItems: 'center', lineHeight: 1, transform: 'translateY(-1px)' }}>|</span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>Managing Director: {settings.managingDirectorName} ({settings.managingDirectorCredential})</span>
                    </div>
                    <div className="footer-policy-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', whiteSpace: 'nowrap', lineHeight: 1 }}>
                        <a href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Privacy Policy</a>
                        <span style={{ color: '#475569', opacity: 0.75, display: 'inline-flex', alignItems: 'center', lineHeight: 1, transform: 'translateY(-1px)' }}>|</span>
                        <a href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Terms of Service</a>
                    </div>
                </div>
            </motion.div>
            <style jsx>{`
                .social-btn:hover { 
                    background: rgba(249, 115, 22, 0.2) !important; 
                    border-color: rgba(249, 115, 22, 0.4) !important; 
                    color: #F97316 !important; 
                    transform: translateY(-2px) !important; 
                }
                .footer-link:hover { color: white !important; padding-left: 6px !important; }
                .footer-link:hover span { opacity: 1 !important; }
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 18px !important;
                    }
                    footer div[style*="padding: 44px 24px 0"] {
                        padding: 36px 16px 0 !important;
                    }

                    .footer-bottom {
                        gap: 10px !important;
                    }

                    .footer-meta-row,
                    .footer-policy-row {
                        flex-direction: column !important;
                        white-space: normal !important;
                        text-align: center !important;
                    }

                    .footer-meta-row span:nth-child(2),
                    .footer-policy-row span:nth-child(2) {
                        display: none !important;
                    }
                }
            `}</style>
        </footer>
    )
}
