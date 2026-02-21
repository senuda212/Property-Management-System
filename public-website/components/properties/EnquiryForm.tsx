'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Phone, Mail, User } from 'lucide-react'

interface EnquiryFormProps {
    propertyId?: number
    propertyTitle?: string
}

interface FormData {
    fullName: string
    email: string
    phone: string
    viewingDate: string
    message: string
}

export default function EnquiryForm({ propertyId, propertyTitle }: EnquiryFormProps) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        setSubmitting(true)
        setError(false)
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, propertyId, propertyTitle, subject: `Property Enquiry: ${propertyTitle || 'General'}` }),
            })
            if (!res.ok) throw new Error()
            setSuccess(true)
            reset()
        } catch {
            setError(true)
        } finally {
            setSubmitting(false)
        }
    }

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '12px 16px', border: '1px solid #E8ECF0', borderRadius: '8px',
        fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#0B1F3A', outline: 'none', transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    }

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 40px rgba(11,31,58,0.12)', borderTop: '4px solid #FF6B1A', padding: '28px', position: 'sticky', top: '100px' }} className="enquiry-form">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#0B1F3A', marginBottom: '20px' }}>Book a Viewing</h3>

            {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#39FF14', fontWeight: 700, marginBottom: '8px' }}>Enquiry Sent Successfully!</p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4A5568' }}>We&apos;ll contact you shortly to confirm your viewing.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>Full Name *</label>
                            <input
                                {...register('fullName', { required: 'Full name is required' })}
                                placeholder="Nimal Perera"
                                style={{ ...inputStyle, borderColor: errors.fullName ? '#FF6B1A' : '#E8ECF0' }}
                            />
                            {errors.fullName && <span style={{ color: '#FF6B1A', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>{errors.fullName.message}</span>}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>Email Address *</label>
                            <input
                                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                                placeholder="nimal@example.com"
                                style={{ ...inputStyle, borderColor: errors.email ? '#FF6B1A' : '#E8ECF0' }}
                            />
                            {errors.email && <span style={{ color: '#FF6B1A', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>{errors.email.message}</span>}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>Phone Number *</label>
                            <input
                                {...register('phone', { required: 'Phone is required' })}
                                placeholder="+94 77 123 4567"
                                style={{ ...inputStyle, borderColor: errors.phone ? '#FF6B1A' : '#E8ECF0' }}
                            />
                            {errors.phone && <span style={{ color: '#FF6B1A', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>{errors.phone.message}</span>}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>Preferred Viewing Date</label>
                            <input type="date" {...register('viewingDate')} style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4A5568', marginBottom: '6px' }}>Message</label>
                            <textarea {...register('message')} rows={3} placeholder="Any specific requirements..." style={{ ...inputStyle, resize: 'vertical', fontFamily: 'DM Sans, sans-serif' }} />
                        </div>

                        {error && <p style={{ color: '#DC2626', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={submitting}
                            style={{ width: '100%', background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: submitting ? 0.7 : 1 }}
                        >
                            <Send size={16} />
                            {submitting ? 'Sending...' : 'Send Enquiry'}
                        </motion.button>
                    </div>
                </form>
            )}

            <div style={{ borderTop: '1px solid #E8ECF0', paddingTop: '20px', marginTop: '20px' }}>
                <a
                    href={`https://wa.me/94777855554?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(propertyTitle || 'a property')}`}
                    target="_blank"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, textDecoration: 'none', marginBottom: '16px', minHeight: '44px' }}
                >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                </a>

                <div style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '16px' }}>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9AA3AF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Contact Us</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0B1F3A, #1A3560)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <User size={22} color="#FF6B1A" />
                        </div>
                        <div>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0B1F3A' }}>Ceylon Roots Holdings</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                                <a href="tel:+94777855554" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4A5568', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={11} color="#FF6B1A" /> +94 777 855 554</a>
                                <a href="mailto:ceylonrootsh@gmail.com" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4A5568', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={11} color="#FF6B1A" /> ceylonrootsh@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (max-width: 900px) {
                    .enquiry-form {
                        position: static !important;
                        margin-top: 32px;
                    }
                }
            `}</style>
        </div>
    )
}
