'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTABanner() {
    return (
        <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px', background: 'linear-gradient(135deg, #FF6B1A 0%, #FF9500 100%)' }}>
            {/* Diagonal pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 12px)' }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.2 }}>
                    Ready to Find Your Perfect Property?
                </h2>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '36px', lineHeight: 1.6 }}>
                    Browse our exclusive listings or speak with our expert team today
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/properties"
                        style={{ background: 'white', color: '#0B1F3A', padding: '14px 32px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#F5F7FA'}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'white'}
                    >
                        Browse Properties
                    </Link>
                    <Link
                        href="/contact"
                        style={{ background: 'transparent', color: 'white', padding: '14px 32px', borderRadius: '8px', border: '2px solid white', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'white'; (e.currentTarget as HTMLAnchorElement).style.color = '#0B1F3A' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'white' }}
                    >
                        Contact Us
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
