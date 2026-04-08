'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ChevronRight, Shield, Eye, Star, Zap, Building2, Trophy } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import CTABanner from '@/components/home/CTABanner'

const values = [
    { icon: Shield, title: 'Integrity', desc: 'We operate with complete honesty and transparency in every transaction, building trust that lasts a lifetime.' },
    { icon: Eye, title: 'Transparency', desc: 'No hidden fees, no surprises. We keep clients fully informed at every single stage of the process.' },
    { icon: Star, title: 'Excellence', desc: 'We hold ourselves to the highest standards, delivering premium service that exceeds client expectations.' },
    { icon: Zap, title: 'Innovation', desc: 'Embracing modern technology and fresh ideas to make property transactions faster, smarter, and simpler.' },
]

const timeline = [
    { year: '2014', event: 'Company Founded', desc: 'Started with 5 properties in Colombo with a vision to bring transparency to Sri Lankan real estate.' },
    { year: '2016', event: 'Expanded to Galle & Kandy', desc: 'Opened offices in the Southern and Central provinces, growing our reach across Sri Lanka.' },
    { year: '2018', event: '500 Properties Milestone', desc: 'Achieved 500 active property listings across all major cities in Sri Lanka.' },
    { year: '2020', event: 'Digital Transformation', desc: 'Launched our full online platform enabling seamless property search across devices.' },
    { year: '2022', event: '1,000 Happy Clients', desc: 'Celebrated serving 1,000 satisfied clients — buyers, sellers, and investors.' },
    { year: '2024', event: 'National Recognition', desc: 'Awarded Best Property Agency Sri Lanka, recognising our commitment to excellence.' },
]

const awards = [
    { title: 'Best Property Agency', subtitle: 'Western Province 2023' },
    { title: 'Customer Excellence Award', subtitle: '2022' },
    { title: 'Top Real Estate Platform', subtitle: 'Sri Lanka 2024' },
    { title: '5 Star Service Rating', subtitle: '2023' },
]
export default function AboutPage() {
    return (
        <div>
            {/* Hero Banner */}
            <section style={{ height: '430px', paddingTop: '80px', background: 'linear-gradient(135deg, #0F172A, #1E293B)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}><Home size={14} /> Home</Link>
                        <ChevronRight size={14} color="#F97316" />
                        <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>About Us</span>
                    </div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'white', marginBottom: '16px' }}>About Ceylon Roots Holdings</h1>
                    <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #F97316, #FB923C)', borderRadius: '2px', margin: '0 auto 20px' }} />
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#94A3B8' }}>Trusted real estate experts since 2014</p>
                </div>
            </section>

            {/* Our Story */}
            <section style={{ backgroundColor: 'white', padding: '76px 24px' }}>
                <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
                    <div className="about-story-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '44px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#FF6B1A', marginBottom: '12px' }}>
                                OUR STORY
                            </p>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 3vw, 48px)', fontWeight: 700, color: '#0B1F3A', lineHeight: 1.15, marginBottom: '16px' }}>
                                Building Trust in Sri Lankan Real Estate
                            </h2>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: '#334155', lineHeight: 1.75, marginBottom: '26px', maxWidth: '620px' }}>
                                Founded in 2014 in Colombo, Ceylon Roots Holdings brings transparency and integrity to Sri Lanka&apos;s property market. We help families and investors find the right home or investment across the island.
                            </p>
                            <Link
                                href="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none',
                                    background: 'linear-gradient(135deg, #FF6B1A 0%, #FF9500 100%)',
                                    color: 'white',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    borderRadius: '999px',
                                    padding: '12px 24px',
                                    boxShadow: '0 10px 24px rgba(249, 115, 22, 0.28)',
                                }}
                            >
                                Learn More About Us
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <div style={{ background: 'linear-gradient(140deg, #0B1F3A 0%, #102B4E 100%)', borderRadius: '22px', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px', boxShadow: '0 12px 30px rgba(11,31,58,0.2)' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Building2 size={64} color="white" strokeWidth={1.5} style={{ margin: '0 auto 14px' }} />
                                    <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '38px', fontWeight: 700, color: 'white', marginBottom: '8px', lineHeight: 1.05 }}>
                                        Ceylon Roots Holdings
                                    </p>
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: '#94A3B8' }}>
                                        Est. 2014 · Colombo, Sri Lanka
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <style>{`
                    @media (max-width: 1024px) {
                        .about-story-grid {
                            grid-template-columns: 1fr !important;
                            gap: 28px !important;
                        }
                    }
                `}</style>
            </section>

            {/* Values */}
            <section style={{ backgroundColor: '#F5F7FA', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <SectionHeading label="OUR PRINCIPLES" title="What We Stand For" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        {values.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(11,31,58,0.07)', border: '1px solid #E8ECF0', borderTop: '3px solid transparent', transition: 'all 0.3s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = '#FF6B1A'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                            >
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B1A, #FF9500)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    <Icon size={26} color="white" />
                                </div>
                                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#0B1F3A', marginBottom: '12px' }}>{title}</h3>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', lineHeight: 1.7 }}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ background: 'linear-gradient(135deg, #0B1F3A, #1A3560)', padding: '80px 24px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <SectionHeading label="OUR HISTORY" title="Our Journey" dark />
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #FF6B1A, #FF9500)', transform: 'translateX(-50%)' }} className="timeline-line" />
                        {timeline.map((item, i) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '32px', position: 'relative' }}
                                className="timeline-item"
                            >
                                {/* Year circle */}
                                <div style={{ position: 'absolute', left: '50%', top: '20px', transform: 'translateX(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B1A, #FF9500)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }} className="timeline-dot">
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.2 }}>{item.year}</span>
                                </div>
                                <div style={{ width: '42%', backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }} className="timeline-card">
                                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#0B1F3A', marginBottom: '8px' }}>{item.event}</h4>
                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4A5568', lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <style>{`
          @media (max-width: 640px) {
            .timeline-line { left: 24px !important; }
            .timeline-item { justify-content: flex-end !important; }
            .timeline-dot { left: 24px !important; transform: translateX(-50%) !important; }
            .timeline-card { width: calc(100% - 64px) !important; }
          }
        `}</style>
            </section>

            {/* Awards & Recognition */}
            <section style={{ backgroundColor: '#F5F7FA', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <SectionHeading label="RECOGNITION" title="Awards & Recognition" />
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        {awards.map(({ title, subtitle }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(11,31,58,0.07)', border: '1px solid #E8ECF0', borderTop: '3px solid transparent', transition: 'all 0.3s', textAlign: 'center' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = '#FF6B1A'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                            >
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B1A, #FF9500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <Trophy size={26} color="white" />
                                </div>
                                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 700, color: '#0B1F3A', marginBottom: '8px', lineHeight: 1.3 }}>{title}</h4>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: '#FF6B1A' }}>{subtitle}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner />
        </div>
    )
}
