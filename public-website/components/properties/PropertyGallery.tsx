'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryProps {
    images: string[]
    title: string
}

export default function PropertyGallery({ images, title }: GalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!lightboxOpen) return
            if (e.key === 'ArrowRight') setCurrentIndex(i => (i + 1) % images.length)
            if (e.key === 'ArrowLeft') setCurrentIndex(i => (i - 1 + images.length) % images.length)
            if (e.key === 'Escape') setLightboxOpen(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [lightboxOpen, images.length])

    if (!images || images.length === 0) {
        return (
            <div style={{ width: '100%', height: '400px', background: 'linear-gradient(135deg, #1A3560, #0B1F3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                <span style={{ fontSize: '64px' }}>🏠</span>
            </div>
        )
    }

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gridTemplateRows: '1fr 1fr', gap: '8px', maxHeight: '480px', borderRadius: '16px', overflow: 'hidden' }}>
                {/* Main large image */}
                <div style={{ gridRow: '1 / 3', position: 'relative', cursor: 'pointer' }} onClick={() => { setCurrentIndex(0); setLightboxOpen(true) }}>
                    <Image src={images[0]} alt={title} fill style={{ objectFit: 'cover' }} />
                </div>
                {/* Thumbnails */}
                {images.slice(1, 3).map((src, i) => (
                    <div key={i} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => { setCurrentIndex(i + 1); setLightboxOpen(true) }}>
                        <Image src={src} alt={`${title} ${i + 2}`} fill style={{ objectFit: 'cover' }} />
                        {i === 1 && images.length > 3 && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,31,58,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '20px', fontWeight: 700 }}>+{images.length - 3} more</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

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
                        <button onClick={() => setCurrentIndex(i => (i - 1 + images.length) % images.length)} style={{ position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <ChevronLeft size={24} />
                        </button>
                        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', width: '900px', aspectRatio: '16/9' }}>
                            <Image src={images[currentIndex]} alt={title} fill style={{ objectFit: 'contain' }} />
                        </div>
                        <button onClick={() => setCurrentIndex(i => (i + 1) % images.length)} style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                            <ChevronRight size={24} />
                        </button>
                        <div style={{ position: 'absolute', bottom: '20px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
