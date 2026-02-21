'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ChevronRight, Shield, Eye, Star, Zap, Linkedin } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import CTABanner from '@/components/home/CTABanner'
import { teamMembers } from '@/lib/data/team'

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
    { icon: '🏆', title: 'Best Property Agency', year: '2024', org: 'Sri Lanka Property Awards' },
    { icon: '⭐', title: 'Customer Excellence', year: '2023', org: 'Real Estate Institute SL' },
    { icon: '🌟', title: 'Most Trusted Brand', year: '2022', org: 'Business Review LK' },
    { icon: '🎖️', title: 'Digital Innovation', year: '2021', org: 'PropTech Sri Lanka' },
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
            <section style={{ backgroundColor: 'white', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '64px', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div style={{ borderLeft: '4px solid #FF6B1A', paddingLeft: '24px' }}>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#FF6B1A', marginBottom: '12px' }}>OUR STORY</p>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: '#0B1F3A', marginBottom: '20px', lineHeight: 1.2 }}>Building Trust in Sri Lankan Real Estate</h2>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#4A5568', lineHeight: 1.8, marginBottom: '16px' }}>
                                Founded in 2014 by a team of passionate real estate professionals, Ceylon Roots Holdings was born with a single mission — to bring transparency, professionalism, and integrity to the Sri Lankan property market. What started as a small office in Colombo 03 has grown into one of the island&apos;s most trusted property agencies.
                            </p>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#4A5568', lineHeight: 1.8, marginBottom: '16px' }}>
                                Over the past decade, we have helped over 1,200 families and investors find their perfect properties — from luxurious beachfront villas in Galle to smart urban apartments in Colombo and peaceful landed properties in Kandy. Our dedication to client satisfaction has built relationships that last well beyond the transaction.
                            </p>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#4A5568', lineHeight: 1.8, marginBottom: '28px' }}>
                                Today, Ceylon Roots Holdings operates across all major districts in Sri Lanka, with a team of dedicated professionals who live and breathe real estate every single day. We are not just property agents — we are your trusted partners in one of life&apos;s most significant decisions.
                            </p>
                            <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                                Learn More About Us →
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-16px', left: '-16px', width: '100%', height: '100%', background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', borderRadius: '16px', opacity: 0.3 }} />
                        <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0B1F3A, #1A3560)', borderRadius: '16px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏢</div>
                                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: 'white', fontWeight: 700 }}>Ceylon Roots Holdings</p>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#9AA3AF', marginTop: '8px' }}>Est. 2014 · Colombo, Sri Lanka</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
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

            {/* Team */}
            <section style={{ backgroundColor: 'white', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <SectionHeading label="THE TEAM" title="Meet Our Team" subtitle="The experts behind Ceylon Roots Holdings" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ backgroundColor: '#F5F7FA', borderRadius: '16px', padding: '28px', textAlign: 'center', border: '1px solid #E8ECF0', transition: 'all 0.3s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(11,31,58,0.12)'}
                                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
                            >
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0B1F3A, #1A3560)', border: '3px solid #FF6B1A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '24px', fontWeight: 700, color: '#FF6B1A' }}>{member.initials}</span>
                                </div>
                                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: '#0B1F3A', marginBottom: '6px' }}>{member.name}</h3>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#FF6B1A', fontWeight: 600, marginBottom: '12px' }}>{member.role}</p>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4A5568', lineHeight: 1.65, marginBottom: '16px' }}>{member.bio}</p>
                                {member.linkedin && (
                                    <a href={member.linkedin} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9AA3AF', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', transition: 'color 0.2s' }}
                                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B1A'}
                                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9AA3AF'}
                                    >
                                        <Linkedin size={15} /> LinkedIn
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section style={{ backgroundColor: '#F5F7FA', padding: '64px 24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <SectionHeading label="RECOGNITION" title="Awards & Recognition" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                        {awards.map((award, i) => (
                            <motion.div
                                key={award.title}
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '1px solid #E8ECF0', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}
                            >
                                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{award.icon}</div>
                                <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0B1F3A', marginBottom: '6px' }}>{award.title}</h4>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#9AA3AF', marginBottom: '4px' }}>{award.org}</p>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#FF6B1A', fontWeight: 700 }}>{award.year}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner />
        </div>
    )
}
