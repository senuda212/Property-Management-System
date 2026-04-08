'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEFAULT_PUBLIC_CONTACT_SETTINGS } from '@/lib/siteSettings'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [ikmanProfileUrl, setIkmanProfileUrl] = useState(DEFAULT_PUBLIC_CONTACT_SETTINGS.ikmanProfileUrl)
    const [brand, setBrand] = useState({
        companyName: DEFAULT_PUBLIC_CONTACT_SETTINGS.companyName,
        tagline: DEFAULT_PUBLIC_CONTACT_SETTINGS.tagline,
    })
    const pathname = usePathname()
    const brandInitials = brand.companyName
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 4)
        .toUpperCase() || 'CRH'

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await fetch('/api/settings', { cache: 'no-store' })
                if (!res.ok) return

                const data = await res.json()
                if (typeof data.ikmanProfileUrl === 'string' && data.ikmanProfileUrl.trim()) {
                    setIkmanProfileUrl(data.ikmanProfileUrl.trim())
                }
                if (typeof data.companyName === 'string' && data.companyName.trim()) {
                    setBrand((current) => ({ ...current, companyName: data.companyName.trim() }))
                }
                if (typeof data.tagline === 'string' && data.tagline.trim()) {
                    setBrand((current) => ({ ...current, tagline: data.tagline.trim() }))
                }
            } catch {
                // Keep fallback Ikman URL.
            }
        }

        loadSettings()
    }, [])

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    zIndex: 50,
                    backgroundColor: scrolled ? 'rgba(11, 31, 58, 0.92)' : 'rgba(11, 31, 58, 0.6)', // #0B1F3A
                    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: scrolled ? '64px' : '80px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <div className="header-shell" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <div className="header-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '14px',
                                        flexShrink: 0,
                                    }}>{brandInitials}</div>
                                    <div className="header-brand-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>
                                            {brand.companyName}
                                        </span>
                                        <span className="header-tagline" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '9px', fontWeight: 500, color: '#94A3B8', letterSpacing: '0.5px' }}>
                                            {brand.tagline}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="header-actions">
                                <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="nav-link"
                                                style={{
                                                    fontFamily: 'DM Sans, sans-serif',
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    color: isActive ? '#F97316' : '#E2E8F0',
                                                    textDecoration: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '20px',
                                                    backgroundColor: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                </nav>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <a
                                        href={ikmanProfileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hidden-mobile ikman-cta"
                                        style={{
                                            textDecoration: 'none',
                                            fontFamily: 'DM Sans, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: '#DCFCE7',
                                            border: '1px solid rgba(74, 222, 128, 0.65)',
                                            borderRadius: '8px',
                                            padding: '10px 16px',
                                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(22, 163, 74, 0.3) 100%)',
                                            backdropFilter: 'blur(6px)',
                                            WebkitBackdropFilter: 'blur(6px)',
                                            minHeight: '40px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.14)',
                                        }}
                                        aria-label="Open Ceylon Roots Holdings Ikman.lk profile"
                                    >
                                        Visit Ikman.lk
                                    </a>

                                    <Link
                                        href="/contact"
                                        className="btn-orange hidden-mobile"
                                        style={{
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            padding: '10px 20px',
                                        }}
                                    >
                                        List Property
                                    </Link>

                                    <button
                                        onClick={() => setMobileOpen(true)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '8px', minHeight: '44px', minWidth: '44px', display: 'none' }}
                                        className="show-mobile"
                                        aria-label="Open menu"
                                    >
                                        <Menu size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: '#0B1F3A',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: 'white' }}>
                                    {brand.companyName}
                                </span>
                                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#94A3B8' }}>
                                    {brand.tagline}
                                </span>
                            </div>
                            <button
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="mobile-nav-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '56px',
                                            fontFamily: 'Playfair Display, serif',
                                            fontSize: '28px',
                                            fontWeight: 600,
                                            color: pathname === link.href ? '#FF6B1A' : 'white',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <div className="mobile-menu-actions" style={{ marginTop: '32px', paddingBottom: '16px' }}>
                            <a
                                href={ikmanProfileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    textDecoration: 'none',
                                    padding: '14px',
                                    fontSize: '15px',
                                    minHeight: '52px',
                                    marginBottom: '10px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(74, 222, 128, 0.6)',
                                    color: '#DCFCE7',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.24) 0%, rgba(22, 163, 74, 0.32) 100%)',
                                }}
                            >
                                Visit Ikman.lk Profile
                            </a>

                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="btn-orange"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    textDecoration: 'none',
                                    padding: '16px',
                                    fontSize: '16px',
                                    minHeight: '56px',
                                }}
                            >
                                List Your Property
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @media (max-width: 1023px) {
                    .hidden-mobile { display: none !important; }
                    .show-mobile { display: flex !important; }
                }
                @media (max-width: 768px) {
                    .header-shell {
                        padding: 0 16px !important;
                    }

                    .header-brand {
                        gap: 6px !important;
                    }

                    .header-brand-text {
                        max-width: 150px;
                    }

                    .header-brand-text span:first-child {
                        font-size: 14px !important;
                    }

                    .header-tagline {
                        display: none !important;
                    }

                    .mobile-nav-list {
                        gap: 4px !important;
                    }

                    .mobile-nav-list a {
                        font-size: 22px !important;
                    }

                    .mobile-menu-actions {
                        margin-top: 24px !important;
                    }
                }

                @media (max-width: 640px) {
                    .header-actions {
                        gap: 10px !important;
                    }
                }
                .nav-link:hover {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    color: white !important;
                }
                .ikman-cta:hover {
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 8px 16px rgba(22, 163, 74, 0.22) !important;
                }
                @media (max-width: 640px) {
                    header div[style*="padding: 0 24px"] {
                        padding: 0 16px !important;
                    }
                }
            `}</style>
        </>
    )
}
