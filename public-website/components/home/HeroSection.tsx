'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SearchBar from '@/components/home/SearchBar'
import { ChevronDown, MapPin, TrendingUp, Award } from 'lucide-react'

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
    }
}

export default function HeroSection() {
    return (
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '72px' }}>
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-hero)' }} />

            {/* Grid pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            {/* Noise texture */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

            {/* Radial Glows */}
            <div style={{ position: 'absolute', top: '20%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%' }} />

            {/* Floating stat badges */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, ...floatingAnimation }}
                transition={{ delay: 1, duration: 0.6 }}
                style={{ position: 'absolute', left: '8%', top: '35%', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px 24px', backdropFilter: 'blur(12px)', display: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                className="stat-badge"
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <div style={{ background: 'rgba(249, 115, 22, 0.2)', padding: '8px', borderRadius: '50%', color: '#F97316' }}><TrendingUp size={20} /></div>
                    <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: 'white', lineHeight: 1 }}>500+</div>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Properties</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0, ...floatingAnimation }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{ position: 'absolute', right: '8%', top: '25%', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px 24px', backdropFilter: 'blur(12px)', display: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                className="stat-badge alternate-float"
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '8px', borderRadius: '50%', color: '#22C55E' }}><Award size={20} /></div>
                    <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: 'white', lineHeight: 1 }}>10+</div>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Exp.</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
                transition={{ delay: 1.4, duration: 0.6, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                style={{ position: 'absolute', right: '12%', top: '60%', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px 24px', backdropFilter: 'blur(12px)', display: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                className="stat-badge"
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '8px', borderRadius: '50%', color: '#38BDF8' }}><MapPin size={20} /></div>
                    <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: 'white', lineHeight: 1 }}>25+</div>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Cities</div>
                    </div>
                </div>
            </motion.div>

            {/* Main content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}
            >
                <motion.div variants={fadeUp}>
                    <span style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', color: '#F8FAFC', padding: '8px 20px', borderRadius: '30px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        ✨ Premium Real Estate in Sri Lanka
                    </span>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(42px, 6vw, 84px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '24px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                >
                    Find Your <span className="gradient-text-orange">Sanctuary</span> in <br /> The Pearl of the Ocean
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', color: '#CBD5E1', marginBottom: '48px', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 48px' }}
                >
                    Discover exclusive properties across Colombo, Galle, Kandy, and beyond. Trusted by thousands to find their perfect home in paradise.
                </motion.p>

                <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
                    <SearchBar />
                </motion.div>

                <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/properties"
                        className="btn-orange"
                        style={{ padding: '16px 36px', fontSize: '16px', textDecoration: 'none' }}
                    >
                        Browse Collections
                    </Link>
                    <Link
                        href="/contact"
                        className="btn-outline-white"
                        style={{ padding: '16px 36px', fontSize: '16px', textDecoration: 'none' }}
                    >
                        Book Consultation
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll arrow */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, opacity: 0.7 }}
            >
                <ChevronDown size={32} color="white" />
            </motion.div>

            <style>{`
        @media (min-width: 1024px) {
          .stat-badge { display: block !important; }
        }
        .alternate-float {
            animation: float-alt 6s ease-in-out infinite;
        }
        @keyframes float-alt {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        @media (max-width: 640px) {
          section[style*="minHeight: '100vh'"] {
            min-height: 90vh !important;
            padding-top: 60px !important;
          }
          div[style*="padding: '80px 24px'"] {
            padding: 40px 16px !important;
          }
          h1[style*="fontSize: 'clamp"] {
            font-size: 36px !important;
            line-height: 1.2 !important;
          }
          div[style*="display: 'flex', gap: '16px'"] {
            flex-direction: column !important;
            width: 100% !important;
          }
          .btn-orange, .btn-outline-white {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
        </section>
    )
}
