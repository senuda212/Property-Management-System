export default function SkeletonCard() {
    return (
        <div style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 4px 20px rgba(11,31,58,0.08)' }}>
            <div style={{ height: '240px', backgroundColor: '#E8ECF0', animation: 'pulse 2s infinite' }} />
            <div style={{ padding: '20px' }}>
                <div style={{ height: '20px', backgroundColor: '#E8ECF0', borderRadius: '4px', marginBottom: '10px', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '14px', backgroundColor: '#E8ECF0', borderRadius: '4px', width: '60%', marginBottom: '16px', animation: 'pulse 2s infinite' }} />
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ height: '12px', backgroundColor: '#E8ECF0', borderRadius: '4px', flex: 1, animation: 'pulse 2s infinite' }} />
                    ))}
                </div>
                <div style={{ height: '40px', backgroundColor: '#E8ECF0', borderRadius: '8px', animation: 'pulse 2s infinite' }} />
            </div>
        </div>
    )
}
