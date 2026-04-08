'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, ArrowRight, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/data/blog'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    'Market News': { bg: '#FFF7ED', text: '#EA580C' },
    'Investment':  { bg: '#EFF6FF', text: '#1D4ED8' },
    'Tips':        { bg: '#F0FDF4', text: '#16A34A' },
    'Legal':       { bg: '#FAF5FF', text: '#7C3AED' },
}

function getCategoryStyle(cat: string) {
    return CATEGORY_COLORS[cat] ?? { bg: '#F8FAFC', text: '#475569' }
}

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = blogPosts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory
        const matchesSearch =
            !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const [featured, ...rest] = filtered

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
            {/* Hero/Header */}
            <div style={{
                background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3560 100%)',
                padding: '64px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '3px', color: '#FF6B1A', textTransform: 'uppercase', marginBottom: '12px' }}>
                            PROPERTY INSIGHTS
                        </p>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: 'white', marginBottom: '16px', lineHeight: 1.2 }}>
                            The Ceylon Roots Blog
                        </h1>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: '#94A3B8', maxWidth: '560px', lineHeight: 1.6, marginBottom: '36px' }}>
                            Expert analysis, market insights, and practical guides for Sri Lanka&apos;s property market.
                        </p>

                        {/* Search */}
                        <div style={{ position: 'relative', maxWidth: '480px' }}>
                            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 46px',
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.16)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontSize: '15px',
                                    outline: 'none',
                                    backdropFilter: 'blur(8px)',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Category tabs */}
            <div style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: 'white', position: 'sticky', top: '64px', zIndex: 20 }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
                    {ALL_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '14px 20px',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '14px',
                                fontWeight: activeCategory === cat ? 700 : 500,
                                color: activeCategory === cat ? '#FF6B1A' : '#64748B',
                                borderBottom: activeCategory === cat ? '2px solid #FF6B1A' : '2px solid transparent',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 24px', color: '#94A3B8' }}>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px' }}>No articles found matching your search.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured post (first result) */}
                        {featured && (
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ marginBottom: '48px' }}
                            >
                                <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
                                        gap: '0',
                                        backgroundColor: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 24px rgba(11,31,58,0.08)',
                                        border: '1px solid #E2E8F0',
                                        transition: 'box-shadow 0.3s',
                                    }}
                                        className="featured-post-card"
                                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 48px rgba(11,31,58,0.14)'}
                                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(11,31,58,0.08)'}
                                    >
                                        {/* Image side */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, #0B1F3A, #1A3560)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '320px',
                                            position: 'relative',
                                        }}>
                                            <span style={{ fontSize: '72px' }}>{featured.emoji}</span>
                                            <div style={{
                                                position: 'absolute',
                                                top: '20px', left: '20px',
                                                display: 'flex', gap: '8px', flexWrap: 'wrap',
                                            }}>
                                                <span style={{
                                                    backgroundColor: '#FF6B1A', color: 'white',
                                                    padding: '4px 14px', borderRadius: '30px',
                                                    fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700,
                                                }}>
                                                    Featured
                                                </span>
                                                <span style={{
                                                    backgroundColor: getCategoryStyle(featured.category).bg,
                                                    color: getCategoryStyle(featured.category).text,
                                                    padding: '4px 14px', borderRadius: '30px',
                                                    fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700,
                                                }}>
                                                    {featured.category}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Content side */}
                                        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8' }}>{featured.date}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8' }}>
                                                    <Clock size={13} /> {featured.readTime}
                                                </span>
                                            </div>
                                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 700, color: '#0B1F3A', lineHeight: 1.3, margin: 0 }}>
                                                {featured.title}
                                            </h2>
                                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                                                {featured.excerpt}
                                            </p>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {featured.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} style={{
                                                        display: 'flex', alignItems: 'center', gap: '4px',
                                                        padding: '4px 10px',
                                                        backgroundColor: '#F1F5F9',
                                                        borderRadius: '6px',
                                                        fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748B',
                                                    }}>
                                                        <Tag size={10} /> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                color: '#FF6B1A', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700,
                                                marginTop: '4px',
                                            }}>
                                                Read Article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* Remaining posts grid */}
                        {rest.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '28px',
                            }}>
                                {rest.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 32 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.4 }}
                                    >
                                        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                                            <div style={{
                                                backgroundColor: 'white',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                boxShadow: '0 2px 16px rgba(11,31,58,0.07)',
                                                border: '1px solid #E2E8F0',
                                                transition: 'box-shadow 0.3s, transform 0.2s',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 36px rgba(11,31,58,0.14)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(11,31,58,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                                            >
                                                {/* Card image */}
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #0B1F3A, #1A3560)',
                                                    height: '180px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                }}>
                                                    <span style={{ fontSize: '52px' }}>{post.emoji}</span>
                                                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                                        <span style={{
                                                            backgroundColor: getCategoryStyle(post.category).bg,
                                                            color: getCategoryStyle(post.category).text,
                                                            padding: '4px 12px', borderRadius: '20px',
                                                            fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700,
                                                        }}>
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Card body */}
                                                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8' }}>{post.date}</span>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8' }}>
                                                            <Clock size={12} /> {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 700, color: '#0B1F3A', lineHeight: 1.4, margin: 0 }}>
                                                        {post.title}
                                                    </h3>
                                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748B', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                        {post.excerpt}
                                                    </p>
                                                    <span style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        color: '#FF6B1A', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, marginTop: 'auto',
                                                    }}>
                                                        Read More <ArrowRight size={14} />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
