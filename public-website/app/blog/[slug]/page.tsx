import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Tag, Share2, MessageCircle } from 'lucide-react'
import { blogPosts } from '@/lib/data/blog'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const post = blogPosts.find(p => p.slug === slug)
    if (!post) return { title: 'Not Found' }
    return {
        title: `${post.title} | Ceylon Roots Holdings Blog`,
        description: post.excerpt,
    }
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    'Market News': { bg: '#FFF7ED', text: '#EA580C' },
    'Investment':  { bg: '#EFF6FF', text: '#1D4ED8' },
    'Tips':        { bg: '#F0FDF4', text: '#16A34A' },
    'Legal':       { bg: '#FAF5FF', text: '#7C3AED' },
}

function getCategoryStyle(cat: string) {
    return CATEGORY_COLORS[cat] ?? { bg: '#F8FAFC', text: '#475569' }
}

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params
    const post = blogPosts.find(p => p.slug === slug)
    if (!post) notFound()

    const related = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)
    const whatsappUrl = `https://wa.me/94777855554?text=${encodeURIComponent(`I came across your blog post: "${post.title}" - ceylonrootsholdings.com/blog/${post.slug}`)}`

    return (
        <div style={{ paddingTop: '80px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            {/* Article Header */}
            <div style={{
                background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3560 100%)',
                padding: '64px 24px 80px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', bottom: '-40px', right: '-60px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Back link */}
                    <Link
                        href="/blog"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                            textDecoration: 'none', marginBottom: '32px', transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B1A'}
                        onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8'}
                    >
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>

                    {/* Category badge */}
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{
                            display: 'inline-block',
                            backgroundColor: getCategoryStyle(post.category).bg,
                            color: getCategoryStyle(post.category).text,
                            padding: '6px 16px', borderRadius: '30px',
                            fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700,
                        }}>
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        <span style={{ fontSize: '56px', lineHeight: 1, flexShrink: 0 }}>{post.emoji}</span>
                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(24px, 4vw, 40px)',
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.3,
                            margin: 0,
                        }}>
                            {post.title}
                        </h1>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '28px', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8' }}>
                            <Calendar size={14} /> {post.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8' }}>
                            <Clock size={14} /> {post.readTime}
                        </span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8' }}>
                            By {post.author}
                        </span>
                    </div>
                </div>
            </div>

            {/* Article body + sidebar wrapper */}
            <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) 300px',
                    gap: '40px',
                    paddingTop: '48px',
                    paddingBottom: '80px',
                    alignItems: 'start',
                }}>
                    {/* Main content */}
                    <article>
                        {/* Excerpt lead */}
                        <p style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '18px',
                            color: '#374151',
                            lineHeight: 1.7,
                            borderLeft: '4px solid #FF6B1A',
                            paddingLeft: '20px',
                            marginBottom: '36px',
                            fontStyle: 'italic',
                        }}>
                            {post.excerpt}
                        </p>

                        {/* Article HTML content */}
                        <div
                            style={{
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '16px',
                                color: '#374151',
                                lineHeight: 1.8,
                            }}
                            dangerouslySetInnerHTML={{ __html: post.content.replace(
                                /<h2>/g,
                                '<h2 style="font-family: Playfair Display, serif; font-size: 22px; font-weight: 700; color: #0B1F3A; margin: 36px 0 16px; padding-top: 8px;">'
                            ).replace(
                                /<ul>/g,
                                '<ul style="padding-left: 20px; margin: 12px 0;">'
                            ).replace(
                                /<li>/g,
                                '<li style="margin-bottom: 8px; color: #374151;">'
                            ).replace(
                                /<p>/g,
                                '<p style="margin: 0 0 20px;">'
                            ) }}
                        />

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #E2E8F0' }}>
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', fontWeight: 600, alignSelf: 'center', marginRight: '4px' }}>Tags:</span>
                            {post.tags.map(tag => (
                                <span key={tag} style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    padding: '5px 12px',
                                    backgroundColor: '#F1F5F9',
                                    borderRadius: '8px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569',
                                }}>
                                    <Tag size={11} /> {tag}
                                </span>
                            ))}
                        </div>

                        {/* Share */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Share:</span>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 20px',
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
                            >
                                <MessageCircle size={16} /> Share on WhatsApp
                            </a>
                            <button
                                onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 20px',
                                    backgroundColor: '#F1F5F9',
                                    color: '#374151',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '8px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E2E8F0'}
                                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F1F5F9'}
                            >
                                <Share2 size={16} /> Copy Link
                            </button>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* CTA card */}
                        <div style={{
                            backgroundColor: '#0B1F3A',
                            borderRadius: '16px',
                            padding: '28px',
                            color: 'white',
                        }}>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#FF6B1A', textTransform: 'uppercase', marginBottom: '12px' }}>
                                FREE CONSULTATION
                            </p>
                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px', lineHeight: 1.3 }}>
                                Ready to Invest in Sri Lanka?
                            </h3>
                            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
                                Our property advisors are here to help you find the right investment.
                            </p>
                            <a
                                href="https://wa.me/94777855554"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    borderRadius: '10px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700,
                                    textDecoration: 'none',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <MessageCircle size={16} /> Chat on WhatsApp
                            </a>
                            <Link
                                href="/properties"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'white',
                                    borderRadius: '10px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600,
                                    textDecoration: 'none',
                                    marginTop: '10px',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                }}
                            >
                                Browse Properties
                            </Link>
                        </div>

                        {/* Related posts */}
                        {related.length > 0 && (
                            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
                                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#0B1F3A', marginBottom: '16px' }}>
                                    Related Articles
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {related.map(r => (
                                        <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: 'none' }}>
                                            <div style={{
                                                display: 'flex', gap: '12px', alignItems: 'center',
                                                padding: '12px', borderRadius: '10px',
                                                transition: 'background 0.2s',
                                            }}
                                                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F8FAFC'}
                                                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'}
                                            >
                                                <span style={{ fontSize: '28px', flexShrink: 0 }}>{r.emoji}</span>
                                                <div>
                                                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: '#0B1F3A', lineHeight: 1.4, margin: '0 0 4px' }}>
                                                        {r.title}
                                                    </p>
                                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#94A3B8' }}>{r.readTime}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}
