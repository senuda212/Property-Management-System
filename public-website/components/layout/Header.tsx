'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
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
                    zIndex: 50,
                    backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.85)' : 'transparent', // Slate 900
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: scrolled ? '64px' : '80px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        {/* Logo */}
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '32px', height: '32px',
                                    background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                                    borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 'bold', fontFamily: 'Playfair Display, serif'
                                }}>C</div>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>
                                        CEYLON ROOTS
                                    </span>
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 500, color: '#94A3B8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                        Holdings
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        style={{
                                            fontFamily: 'DM Sans, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: isActive ? '#F97316' : '#E2E8F0', // Orange 500 or Slate 200
                                            textDecoration: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            backgroundColor: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                                            transition: 'all 0.2s ease',
                                        }}
                                        className="nav-link"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* CTA Button */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(true)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '4px', display: 'none' }}
                                className="show-mobile"
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
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
                            backgroundColor: '#0F172A', // Slate 900
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: 'white' }}>
                                Navigation
                            </span>
                            <button
                                onClick={() => setMobileOpen(false)}
                                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            display: 'block',
                                            fontFamily: 'Playfair Display, serif',
                                            fontSize: '32px',
                                            fontWeight: 500,
                                            color: pathname === link.href ? '#F97316' : 'white',
                                            textDecoration: 'none',
                                            paddingBottom: '8px',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <div style={{ marginTop: 'auto' }}>
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
                                }}
                            >
                                List Your Property
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @media (max-width: 768px) {
                    .hidden-mobile { display: none !important; }
                    .show-mobile { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .show-mobile { display: none !important; }
                    .hidden-mobile { display: flex !important; }
                }
                .nav-link:hover {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    color: white !important;
                }
            `}</style>
        </>
    )
}
