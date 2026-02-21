'use client'

import { motion } from 'framer-motion'
import { Home, TrendingUp, Key, BarChart2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'

const services = [
    {
        icon: Home,
        title: 'Buy Property',
        desc: 'Browse hundreds of verified properties across Sri Lanka with full transparency and expert guidance at every step.',
        link: '/properties?status=For+Sale',
    },
    {
        icon: TrendingUp,
        title: 'Sell Property',
        desc: 'Get the best market value for your property with our expert valuation, marketing, and negotiation services.',
        link: '/contact',
    },
    {
        icon: Key,
        title: 'Rent Property',
        desc: 'Find the perfect rental home or list your property for rent with trusted, verified tenants across Sri Lanka.',
        link: '/properties?status=For+Rent',
    },
    {
        icon: BarChart2,
        title: 'Investment Consulting',
        desc: 'Make smart property investment decisions with our expert market analysis, ROI projections, and portfolio insights.',
        link: '/contact',
    },
]

export default function ServicesOverview() {
    return (
        <section style={{ backgroundColor: 'white', padding: '80px 0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <SectionHeading label="WHAT WE DO" title="What We Offer" subtitle="Complete real estate services tailored for Sri Lanka" />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    {services.map(({ icon: Icon, title, desc, link }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px 28px', boxShadow: '0 4px 20px rgba(11,31,58,0.07)', border: '1px solid #E8ECF0', transition: 'all 0.3s', cursor: 'default' }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.borderTopColor = '#FF6B1A'
                                    ; (e.currentTarget as HTMLDivElement).style.borderTopWidth = '3px'
                                    ; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(11,31,58,0.12)'
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.borderTopColor = '#E8ECF0'
                                    ; (e.currentTarget as HTMLDivElement).style.borderTopWidth = '1px'
                                    ; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(11,31,58,0.07)'
                            }}
                        >
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B1A, #FF9500)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                <Icon size={26} color="white" />
                            </div>
                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#0B1F3A', marginBottom: '12px' }}>{title}</h3>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', lineHeight: 1.7, marginBottom: '20px' }}>{desc}</p>
                            <Link href={link} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FF6B1A', textDecoration: 'none' }}>
                                Learn More →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
