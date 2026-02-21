'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { testimonials } from '@/lib/data/testimonials'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const [perPage, setPerPage] = useState(3)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        const updatePerPage = () => setPerPage(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)
        updatePerPage()
        window.addEventListener('resize', updatePerPage)
        return () => window.removeEventListener('resize', updatePerPage)
    }, [])

    const maxIndex = Math.max(0, testimonials.length - perPage)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1))
        }, 5000)
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [maxIndex])

    const visible = testimonials.slice(current, current + perPage)

    return (
        <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3560 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <SectionHeading label="CLIENT STORIES" title="What Our Clients Say" dark />
                </motion.div>

                <div style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'grid', gridTemplateColumns: `repeat(${perPage}, 1fr)`, gap: '24px' }}
                        >
                            {visible.map((t) => (
                                <div
                                    key={t.id}
                                    style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 8px 32px rgba(11,31,58,0.3)', borderLeft: '4px solid #FF6B1A', position: 'relative' }}
                                >
                                    {/* Stars */}
                                    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                                        {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="#FF6B1A" color="#FF6B1A" />)}
                                    </div>
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', fontStyle: 'italic', lineHeight: 1.75, marginBottom: '20px' }}>
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #0B1F3A, #1A3560)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FF6B1A' }}>{t.initials}</span>
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FF6B1A' }}>{t.name}</p>
                                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9AA3AF' }}>{t.propertyType} · {t.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
                        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <ChevronLeft size={18} />
                        </button>
                        {Array(maxIndex + 1).fill(0).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', border: 'none', background: i === current ? '#FF6B1A' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }}
                            />
                        ))}
                        <button onClick={() => setCurrent(c => Math.min(maxIndex, c + 1))} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
