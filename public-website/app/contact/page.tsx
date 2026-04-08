'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Home, ChevronRight, Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { DEFAULT_PUBLIC_CONTACT_SETTINGS } from '@/lib/siteSettings'

interface ContactForm {
    fullName: string
    email: string
    phone: string
    subject: string
    message: string
}

export default function ContactPage() {
    const [settings, setSettings] = useState(DEFAULT_PUBLIC_CONTACT_SETTINGS)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>()

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
                // Keep fallback value on fetch failure
            }
        }

        loadSettings()
    }, [])

    const contactCards = [
        { icon: Phone, label: 'Phone (WhatsApp)', value: settings.phonePrimary, href: `tel:${settings.phonePrimary.replace(/\s+/g, '')}` },
        { icon: Phone, label: 'Phone', value: settings.phoneSecondary, href: `tel:${settings.phoneSecondary.replace(/\s+/g, '')}` },
        { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
        { icon: MapPin, label: 'Address', value: settings.officeAddress, href: undefined },
        { icon: Clock, label: 'Hours', value: 'Mon–Fri: 9AM–6PM | Sat: 9AM–3PM | Sun: Closed', href: undefined },
    ]

    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(settings.officeAddress)}&z=15&output=embed`
    const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`

    const socialLinks = [
        { icon: Facebook, href: settings.facebookUrl, label: 'Facebook' },
        { icon: Instagram, href: settings.instagramUrl, label: 'Instagram' },
        { icon: Linkedin, href: settings.linkedinUrl, label: 'LinkedIn' },
        { icon: Youtube, href: settings.youtubeUrl, label: 'YouTube' },
    ]

    const onSubmit = async (data: ContactForm) => {
        setSubmitting(true); setError(false)
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data }),
            })
            if (!res.ok) throw new Error()
            setSuccess(true); reset()
        } catch { setError(true) } finally { setSubmitting(false) }
    }

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '13px 16px', border: '1px solid #E8ECF0', borderRadius: '8px',
        fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#0B1F3A', outline: 'none',
        boxSizing: 'border-box', transition: 'border-color 0.2s',
    }

    return (
        <div>
            {/* Hero */}
            <section className="contact-hero" style={{ height: '360px', paddingTop: '80px', background: 'linear-gradient(135deg, #0F172A, #1E293B)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}><Home size={14} /> Home</Link>
                        <ChevronRight size={14} color="#F97316" />
                        <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>Contact Us</span>
                    </div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Get In Touch</h1>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8' }}>We&apos;d love to help you find your perfect property</p>
                </div>
            </section>

            {/* Contact Layout */}
            <section className="contact-section" style={{ backgroundColor: '#F5F7FA', padding: '64px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }} className="contact-layout">
                    {/* Left — Form */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '36px', boxShadow: '0 8px 40px rgba(11,31,58,0.1)', borderTop: '4px solid #FF6B1A' }}>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 700, color: '#0B1F3A', marginBottom: '24px' }}>Send Us a Message</h2>
                            {success ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', fontWeight: 700, color: '#0B1F3A', marginBottom: '8px' }}>Message Sent!</p>
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568' }}>We&apos;ll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {[
                                            { name: 'fullName' as const, label: 'Full Name', placeholder: 'Nimal Perera', type: 'text', required: true },
                                            { name: 'email' as const, label: 'Email Address', placeholder: 'nimal@example.com', type: 'email', required: true },
                                            { name: 'phone' as const, label: 'Phone Number', placeholder: '+94 77 123 4567', type: 'tel', required: true },
                                            { name: 'subject' as const, label: 'Subject', placeholder: 'I am interested in...', type: 'text', required: false },
                                        ].map(({ name, label, placeholder, type, required }) => (
                                            <div key={name}>
                                                <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>{label} {required && '*'}</label>
                                                <input
                                                    type={type}
                                                    placeholder={placeholder}
                                                    {...register(name, required ? { required: `${label} is required` } : {})}
                                                    style={{ ...inputStyle, borderColor: errors[name] ? '#FF6B1A' : '#E8ECF0' }}
                                                />
                                                {errors[name] && <span style={{ color: '#FF6B1A', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>{errors[name]?.message}</span>}
                                            </div>
                                        ))}
                                        <div>
                                            <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>Message *</label>
                                            <textarea
                                                rows={5}
                                                placeholder="Tell us how we can help you..."
                                                {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Message must be at least 20 characters' } })}
                                                style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#FF6B1A' : '#E8ECF0' }}
                                            />
                                            {errors.message && <span style={{ color: '#FF6B1A', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>{errors.message.message}</span>}
                                        </div>

                                        {error && <p style={{ color: '#DC2626', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', textAlign: 'center' }}>Failed to send. Please try again.</p>}

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            type="submit"
                                            disabled={submitting}
                                            style={{ background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', color: 'white', border: 'none', borderRadius: '8px', padding: '15px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: submitting ? 0.7 : 1 }}
                                        >
                                            <Send size={16} /> {submitting ? 'Sending...' : 'Send Message'}
                                        </motion.button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Right — Contact Info */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* WhatsApp card */}
                            <div style={{ backgroundColor: '#0B1F3A', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }} className="contact-card">
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <MessageCircle size={22} color="white" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9AA3AF', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>WhatsApp</p>
                                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#25D366', fontWeight: 700, textDecoration: 'none', wordBreak: 'break-word' }}>
                                        Click to Chat on WhatsApp →
                                    </a>
                                </div>
                            </div>

                            {contactCards.map(({ icon: Icon, label, value, href }) => (
                                <div key={label} style={{ backgroundColor: '#0B1F3A', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }} className="contact-card">
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,107,26,0.2), rgba(255,107,26,0.1))', border: '1px solid rgba(255,107,26,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon size={20} color="#FF6B1A" />
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9AA3AF', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>{label}</p>
                                        {href ? (
                                            <a href={href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', textDecoration: 'none', wordBreak: 'break-word' }}>{value}</a>
                                        ) : (
                                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'white', wordBreak: 'break-word' }}>{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Social icons */}
                            <div style={{ backgroundColor: '#0B1F3A', borderRadius: '16px', padding: '20px 24px' }} className="contact-card">
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9AA3AF', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>Follow Us</p>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {socialLinks.map(({ icon: Icon, href, label }) => (
                                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', textDecoration: 'none' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
                                        >
                                            <Icon size={18} color="white" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map */}
            <section className="contact-map-section">
                <iframe
                    src={mapSrc}
                    width="100%"
                    height="400"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    title="Ceylon Roots Holdings Location"
                />
            </section>

            {/* FAQ */}
            <section className="contact-faq-section" style={{ backgroundColor: '#F5F7FA', padding: '80px 24px' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <SectionHeading label="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know about working with us" />
                    <FAQAccordion />
                </div>
            </section>
            <style jsx>{`
                @media (max-width: 768px) {
                    .contact-layout {
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                    .contact-section {
                        padding: 48px 16px !important;
                    }
                    .contact-hero {
                        height: auto !important;
                        min-height: 300px !important;
                        padding-top: 72px !important;
                        padding-bottom: 44px !important;
                    }
                    .contact-hero > div:last-child {
                        padding: 0 16px !important;
                    }
                    .contact-card {
                        padding: 18px 16px !important;
                    }
                    .contact-card a,
                    .contact-card p {
                        overflow-wrap: anywhere;
                    }
                    .contact-map-section iframe {
                        height: 250px !important;
                    }
                    .contact-faq-section {
                        padding: 60px 16px !important;
                    }
                }
            `}</style>
        </div>
    )
}
