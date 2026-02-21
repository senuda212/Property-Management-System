'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { parsePropertyArrayField } from '@/lib/parseProperty'

interface GalleryProps {
    images: string[] | string
    title: string
}

export default function PropertyGallery({ images, title }: GalleryProps) {
    const safeImages = parsePropertyArrayField(images)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!lightboxOpen) return
            if (e.key === 'ArrowRight') setCurrentIndex(i => (i + 1) % safeImages.length)
            if (e.key === 'ArrowLeft') setCurrentIndex(i => (i - 1 + safeImages.length) % safeImages.length)
            if (e.key === 'Escape') setLightboxOpen(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [lightboxOpen, safeImages.length])

    if (!safeImages.length) {
        return (
            <div className="property-gallery-placeholder" style={{ width: '100%', minHeight: '280px', background: 'linear-gradient(135deg, #1A3560, #0B1F3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                <span style={{ fontSize: '64px' }}>🏠</span>
            </div>
        )
    }

    return (
        <>
            <div className="property-gallery">
                {/* Desktop: main (60%, 450px) + 2 thumbnails (40%, 215px each) */}
                <div className="property-gallery-desktop">
                    <div
                        className="property-gallery-main"
                        onClick={() => { setCurrentIndex(0); setLightboxOpen(true) }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && (setCurrentIndex(0), setLightboxOpen(true))}
                    >
                        <Image src={safeImages[0]} alt={title} fill style={{ objectFit: 'cover' }} sizes="60vw" />
                    </div>
                    {safeImages.slice(1, 3).map((src, i) => (
                        <div
                            key={i}
                            className="property-gallery-thumb"
                            onClick={() => { setCurrentIndex(i + 1); setLightboxOpen(true) }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && (setCurrentIndex(i + 1), setLightboxOpen(true))}
                        >
                            <Image src={src} alt={`${title} ${i + 2}`} fill style={{ objectFit: 'cover' }} sizes="40vw" />
                            {i === 1 && safeImages.length > 3 && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,31,58,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                    <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '20px', fontWeight: 700 }}>+{safeImages.length - 3} more</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Mobile: single image 280px + dots */}
                <div className="property-gallery-mobile">
                    <div
                        className="property-gallery-mobile-main"
                        onClick={() => setLightboxOpen(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setLightboxOpen(true)}
                    >
                        <Image src={safeImages[currentIndex]} alt={title} fill style={{ objectFit: 'cover' }} sizes="100vw" />
                    </div>
                    <div className="property-gallery-dots">
                        {safeImages.slice(0, 3).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`View image ${i + 1}`}
                                className={currentIndex === i ? 'property-gallery-dot active' : 'property-gallery-dot'}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .property-gallery-placeholder { min-height: 280px; }
                .property-gallery { width: 100%; border-radius: 16px; overflow: hidden; }
                .property-gallery-desktop {
                    display: none;
                    grid-template-columns: 60% 40%;
                    grid-template-rows: 215px 215px;
                    gap: 8px;
                    height: 450px;
                    min-height: 450px;
                }
                .property-gallery-main {
                    grid-row: 1 / 3;
                    position: relative;
                    min-height: 450px;
                    height: 100%;
                    overflow: hidden;
                    cursor: pointer;
                }
                .property-gallery-thumb {
                    position: relative;
                    min-height: 215px;
                    height: 100%;
                    overflow: hidden;
                    cursor: pointer;
                }
                .property-gallery-mobile {
                    display: block;
                    width: 100%;
                }
                .property-gallery-mobile-main {
                    position: relative;
                    width: 100%;
                    height: 280px;
                    min-height: 280px;
                    overflow: hidden;
                    cursor: pointer;
                }
                .property-gallery-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px;
                }
                .property-gallery-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: none;
                    background: #cbd5e1;
                    cursor: pointer;
                    padding: 0;
                }
                .property-gallery-dot.active { background: #F97316; }
                @media (min-width: 768px) {
                    .property-gallery-desktop { display: grid; }
                    .property-gallery-mobile { display: none; }
                }
            `}</style>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <X size={22} />
                        </button>
                        <button onClick={() => setCurrentIndex(i => (i - 1 + safeImages.length) % safeImages.length)} style={{ position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <ChevronLeft size={24} />
                        </button>
                        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', width: '900px', aspectRatio: '16/9' }}>
                            <Image src={safeImages[currentIndex]} alt={title} fill style={{ objectFit: 'contain' }} />
                        </div>
                        <button onClick={() => setCurrentIndex(i => (i + 1) % safeImages.length)} style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <ChevronRight size={24} />
                        </button>
                        <div style={{ position: 'absolute', bottom: '20px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>
                            {currentIndex + 1} / {safeImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
