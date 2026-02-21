'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, MessageCircle, Phone, Mail, MapPin } from 'lucide-react'

const quickLinks = ['Home', 'Properties', 'About Us', 'Contact Us', 'Blog']
const quickHrefs = ['/', '/properties', '/about', '/contact', '#']

const services = ['Buy Property', 'Sell Property', 'Rent Property', 'Property Valuation', 'Investment Consulting']

const socials = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/94112345678', label: 'WhatsApp' },
]

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#0F172A', color: 'white', position: 'relative', overflow: 'hidden' }}>
            {/* Grid Pattern Overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />

            {/* Radial Gradient Glow */}
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%' }} />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0', position: 'relative', zIndex: 10 }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px', paddingBottom: '64px' }}>
                    {/* Column 1 — Brand */}
                    <div>
                        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '32px', height: '32px',
                                background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                                borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: 'bold', fontFamily: 'Playfair Display, serif'
                            }}>C</div>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: 'white' }}>
                                CEYLON ROOTS
                            </span>
                        </div>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '32px', maxWidth: '300px' }}>
                            We connect buyers, sellers and renters with premium properties across Sri Lanka, delivering exceptional service and trusted expertise since 2014.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="social-btn"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        color: '#E2E8F0'
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 — Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '24px' }}>
                            Quick Links
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                            {quickLinks.map((label, i) => (
                                <li key={label}>
                                    <Link
                                        href={quickHrefs[i]}
                                        className="footer-link"
                                        style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <span style={{ opacity: 0, transition: 'opacity 0.2s', color: '#F97316' }}>›</span> {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Services */}
                    <div>
                        <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '24px' }}>
                            Our Services
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                            {services.map((service) => (
                                <li key={service}>
                                    <a
                                        href="#"
                                        className="footer-link"
                                        style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <span style={{ opacity: 0, transition: 'opacity 0.2s', color: '#F97316' }}>›</span> {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 — Contact */}
                    <div>
                        <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '24px' }}>
                            Contact Us
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { icon: Phone, text: '+94 11 234 5678', href: 'tel:+94112345678', label: 'Call Us' },
                                { icon: Mail, text: 'info@ceylonroots.lk', href: 'mailto:info@ceylonroots.lk', label: 'Email Us' },
                                { icon: MapPin, text: 'No. 123, Galle Road, Colombo 03', label: 'Visit Us' },
                            ].map(({ icon: Icon, text, href, label }) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: 'rgba(249,115,22,0.1)', padding: '8px', borderRadius: '8px', color: '#F97316' }}>
                                        <Icon size={16} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>{label}</span>
                                        {href ? (
                                            <a href={href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#E2E8F0', textDecoration: 'none', fontWeight: 500 }}>
                                                {text}
                                            </a>
                                        ) : (
                                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#E2E8F0', fontWeight: 500 }}>{text}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '32px' }} />

                {/* Bottom bar */}
                <div style={{ paddingBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#64748B' }}>
                        © 2025 Ceylon Roots Holdings. All Rights Reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Terms of Service</a>
                    </div>
                </div>
            </motion.div>
            <style jsx>{`
                .social-btn:hover { background: #F97316 !important; color: white !important; border-color: #F97316 !important; transform: translateY(-2px) !important; }
                .footer-link:hover { color: white !important; padding-left: 6px !important; }
                .footer-link:hover span { opacity: 1 !important; }
            `}</style>
        </footer>
    )
}
