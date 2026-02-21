interface SectionHeadingProps {
    label?: string
    title: string
    subtitle?: string
    centered?: boolean
    dark?: boolean
}

export default function SectionHeading({ label, title, subtitle, centered = true, dark = false }: SectionHeadingProps) {
    return (
        <div style={{ textAlign: centered ? 'center' : 'left', marginBottom: '48px' }}>
            {label && (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#F97316', marginBottom: '12px' }}>
                    {label}
                </p>
            )}
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: dark ? 'white' : '#0F172A', marginBottom: '16px', lineHeight: 1.2 }}>
                {title}
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #F97316, #FB923C)', borderRadius: '2px', margin: centered ? '0 auto' : '0', marginBottom: subtitle ? '24px' : '0' }} />
            {subtitle && (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: dark ? '#CBD5E1' : '#64748B', marginTop: '16px', maxWidth: '600px', margin: centered ? '16px auto 0' : '16px 0 0', lineHeight: 1.6 }}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}
