'use client'

import { motion } from 'framer-motion'
import StatCounter from '@/components/ui/StatCounter'

const stats = [
    { end: 500, suffix: '+', label: 'Properties Listed', color: 'orange' as const },
    { end: 1200, suffix: '+', label: 'Happy Clients', color: 'green' as const },
    { end: 10, suffix: ' Years', label: 'Experience', color: 'orange' as const },
    { end: 25, suffix: '+', label: 'Locations Covered', color: 'green' as const },
]

export default function StatsBanner() {
    return (
        <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3560 50%, #0B1F3A 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,107,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,26,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0', alignItems: 'center' }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            style={{
                                padding: '40px 20px',
                                borderRight: i < stats.length - 1 ? '1px solid rgba(255,107,26,0.2)' : 'none',
                            }}
                        >
                            <StatCounter end={stat.end} suffix={stat.suffix} label={stat.label} colorClass={stat.color} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
