'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatCounterProps {
    end: number
    suffix?: string
    prefix?: string
    duration?: number
    label: string
    colorClass?: 'orange' | 'green'
}

export default function StatCounter({ end, suffix = '', prefix = '', duration = 2, label, colorClass = 'orange' }: StatCounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (!inView) return
        let startTime: number
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [inView, end, duration])

    const gradientStyle = colorClass === 'orange'
        ? { background: 'linear-gradient(90deg, #FF6B1A, #FF9500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
        : { background: 'linear-gradient(90deg, #39FF14, #00E676)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

    return (
        <div ref={ref} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '56px', fontWeight: 700, lineHeight: 1, ...gradientStyle }}>
                {prefix}{count}{suffix}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#E8ECF0', marginTop: '8px' }}>{label}</div>
        </div>
    )
}
