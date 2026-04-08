'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, MessageCircle, Phone, Mail, MapPin, Youtube } from 'lucide-react'

const quickLinks = ['Home', 'Properties', 'Blog', 'About Us', 'Contact Us']
const quickHrefs = ['/', '/properties', '/blog', '/about', '/contact']

const services = [
    'Real Estate',
    'Property Management & Maintenance',
    'Interior Designing',
    'Tyre Sales',
    'Low Services',
]

const socials = [
    { icon: MessageCircle, href: 'https://wa.me/94777855554', label: 'WhatsApp', color: '#25D366' },
    { icon: Facebook, href: 'https://facebook.com/ceylonrootsholdings', label: 'Facebook', color: '#1877F2' },
    { icon: Youtube, href: 'https://youtube.com/@ceylonrootsholdings', label: 'YouTube', color: '#FF0000' },
    { icon: Instagram, href: 'https://instagram.com/ceylonrootsholdings', label: 'Instagram', color: '#E1306C' },
    { icon: Linkedin, href: 'https://linkedin.com/company/ceylonrootsholdings', label: 'LinkedIn', color: '#0A66C2' },
]

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#0B1F3A', color: 'white', position: 'relative', overflow: 'hidden' }}>
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
                                color: 'white', fontWeight: 'bold', fontFamily: 'Playfair Display, serif', fontSize: '12px'
                            }}>CRH</div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: 'white' }}>
                                    CRH
                                </span>
                                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#94A3B8' }}>
                                    Ceylon Roots Holdings
                                </span>
                            </div>
                        </div>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#FF6B1A', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px', maxWidth: '300px' }}>
                            Rooting For You
                        </p>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748B', lineHeight: 1.6, marginBottom: '32px', maxWidth: '300px' }}>
                            We connect buyers, sellers and renters with premium properties across Sri Lanka, delivering exceptional service and trusted expertise.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        color: '#E2E8F0',
                                        minHeight: '40px',
                                        minWidth: '40px',
                                    }}
                                >
                                    <Icon size={17} />
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
                                { icon: Phone, text: '+94 777 855 554', href: 'tel:+94777855554', label: 'Call Us' },
                                { icon: Phone, text: '+94 717 555 572', href: 'tel:+94717555572', label: 'Call Us' },
                                { icon: Mail, text: 'ceylonrootsh@gmail.com', href: 'mailto:ceylonrootsh@gmail.com', label: 'Email Us' },
                                { icon: MapPin, text: '231/4, Rosegarden Road, Wattegedara Rd, Maharagama', label: 'Visit Us' },
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
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569' }}>
                        Managing Director: Suneth Dewanarayana (BBA Sri Lanka)
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
                @media (max-width: 768px) {
                    footer div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                    footer div[style*="padding: 80px 24px 0"] {
                        padding: 60px 16px 0 !important;
                    }
                }
            `}</style>
        </footer>
    )
}
