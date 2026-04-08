'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { blogPosts } from '@/lib/data/blog'

const categoryColors: Record<string, string> = {
    'Market News': '#FF6B1A',
    'Investment': '#0B1F3A',
    'Tips': '#39FF14',
}

export default function BlogPreview() {
    return (
        <section style={{ backgroundColor: '#F5F7FA', padding: '80px 0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <SectionHeading label="LATEST NEWS" title="Latest Property News" subtitle="Stay updated with Sri Lanka's property market" />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
                    {blogPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(11,31,58,0.07)', border: '1px solid #E8ECF0', transition: 'box-shadow 0.3s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(11,31,58,0.14)'}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(11,31,58,0.07)'}
                        >
                            {/* Image placeholder */}
                            <div style={{ height: '200px', background: 'linear-gradient(135deg, #0B1F3A, #1A3560)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                                <span style={{ fontSize: '48px' }}>{i === 0 ? '📈' : i === 1 ? '🏙️' : '🏡'}</span>
                                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                    <span style={{ display: 'inline-block', backgroundColor: categoryColors[post.category] || '#FF6B1A', color: 'white', padding: '4px 12px', borderRadius: '20px', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700 }}>
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9AA3AF' }}>{post.date}</span>
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9AA3AF' }}>{post.readTime}</span>
                                </div>
                                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 700, color: '#0B1F3A', marginBottom: '12px', lineHeight: 1.4 }}>{post.title}</h3>
                                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FF6B1A', textDecoration: 'none' }}>
                                    Read More →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link
                        href="/blog"
                        style={{ display: 'inline-block', padding: '14px 36px', border: '2px solid #0B1F3A', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0B1F3A', textDecoration: 'none', transition: 'all 0.3s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#0B1F3A'; (e.currentTarget as HTMLAnchorElement).style.color = 'white' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#0B1F3A' }}
                    >
                        Visit Our Blog
                    </Link>
                </div>
            </div>
        </section>
    )
}
