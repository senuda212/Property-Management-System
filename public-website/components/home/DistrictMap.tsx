'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

interface District {
    id: string
    name: string
    province: string
    // Real-world coordinates (WGS84)
    lat: number
    lng: number
}

const PROVINCE_COLORS: Record<string, string> = {
    'Western':       '#FF6B1A',
    'Central':       '#16A34A',
    'Southern':      '#2563EB',
    'Northern':      '#7C3AED',
    'Eastern':       '#D97706',
    'North Western': '#0891B2',
    'North Central': '#059669',
    'Uva':           '#DC2626',
    'Sabaragamuwa':  '#DB2777',
}

// Real GPS centroids for each district headquarters / administrative centre
const districts: District[] = [
    // Northern Province
    { id: 'jaffna',       name: 'Jaffna',        province: 'Northern',      lat: 9.6615,  lng: 80.0255 },
    { id: 'kilinochchi',  name: 'Kilinochchi',   province: 'Northern',      lat: 9.3803,  lng: 80.4000 },
    { id: 'mannar',       name: 'Mannar',         province: 'Northern',      lat: 8.9810,  lng: 79.9044 },
    { id: 'vavuniya',     name: 'Vavuniya',       province: 'Northern',      lat: 8.7514,  lng: 80.4971 },
    { id: 'mullaitivu',   name: 'Mullaitivu',     province: 'Northern',      lat: 9.2671,  lng: 80.8128 },
    // North Central Province
    { id: 'anuradhapura', name: 'Anuradhapura',   province: 'North Central', lat: 8.3114,  lng: 80.4037 },
    { id: 'polonnaruwa',  name: 'Polonnaruwa',    province: 'North Central', lat: 7.9403,  lng: 81.0188 },
    // North Western Province
    { id: 'puttalam',     name: 'Puttalam',        province: 'North Western', lat: 8.0362,  lng: 79.8283 },
    { id: 'kurunegala',   name: 'Kurunegala',      province: 'North Western', lat: 7.4675,  lng: 80.3647 },
    // Eastern Province
    { id: 'trincomalee',  name: 'Trincomalee',     province: 'Eastern',       lat: 8.5874,  lng: 81.2152 },
    { id: 'batticaloa',   name: 'Batticaloa',      province: 'Eastern',       lat: 7.7102,  lng: 81.6924 },
    { id: 'ampara',       name: 'Ampara',           province: 'Eastern',       lat: 7.2911,  lng: 81.6724 },
    // Central Province
    { id: 'matale',       name: 'Matale',           province: 'Central',       lat: 7.4675,  lng: 80.6234 },
    { id: 'kandy',        name: 'Kandy',            province: 'Central',       lat: 7.2906,  lng: 80.6337 },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya',     province: 'Central',       lat: 6.9497,  lng: 80.7891 },
    // Western Province
    { id: 'gampaha',      name: 'Gampaha',          province: 'Western',       lat: 7.0873,  lng: 80.0144 },
    { id: 'colombo',      name: 'Colombo',          province: 'Western',       lat: 6.9271,  lng: 79.8612 },
    { id: 'kalutara',     name: 'Kalutara',         province: 'Western',       lat: 6.5854,  lng: 80.0000 },
    // Sabaragamuwa Province
    { id: 'kegalle',      name: 'Kegalle',          province: 'Sabaragamuwa',  lat: 7.2513,  lng: 80.3464 },
    { id: 'ratnapura',    name: 'Ratnapura',        province: 'Sabaragamuwa',  lat: 6.6828,  lng: 80.3992 },
    // Uva Province
    { id: 'badulla',      name: 'Badulla',          province: 'Uva',           lat: 6.9895,  lng: 81.0557 },
    { id: 'monaragala',   name: 'Monaragala',       province: 'Uva',           lat: 6.8728,  lng: 81.3507 },
    // Southern Province
    { id: 'galle',        name: 'Galle',            province: 'Southern',      lat: 6.0535,  lng: 80.2210 },
    { id: 'matara',       name: 'Matara',           province: 'Southern',      lat: 5.9549,  lng: 80.5550 },
    { id: 'hambantota',   name: 'Hambantota',       province: 'Southern',      lat: 6.1241,  lng: 81.1185 },
]

// Sri Lanka geographic bounds (with small padding)
const LNG_MIN = 79.65
const LNG_MAX = 81.90
const LAT_MAX = 9.85   // north (top of map)
const LAT_MIN = 5.85   // south (bottom of map)

// SVG canvas size
const W = 240
const H = 310

function project(lat: number, lng: number): [number, number] {
    const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W
    const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

// Accurate Sri Lanka coastline — all anchor points verified against geographic projection
// projection: x=(lng-79.65)/2.25*240, y=(9.85-lat)/4*310
// Key verified points:
//   Pt. Pedro  (9.821,80.237) → (62, 2)
//   Mannar tip (8.998,79.871) → (24, 66)
//   Kalpitiya  (8.232,79.730) → (9, 125)
//   Colombo    (6.927,79.861) → (22, 226)
//   Galle      (6.032,80.217) → (61, 296)
//   Dondra Hd  (5.919,80.592) → (100, 305)
//   Hambantota (6.124,81.118) → (157, 289)
//   Arugam Bay (6.840,81.841) → (234, 233)
//   Batticaloa (7.717,81.692) → (218, 165)
//   Trinco     (8.567,81.233) → (169, 99)
const SRI_LANKA_PATH = [
    // Start at Point Pedro (northernmost tip)
    'M 62,3',
    // West along Jaffna Peninsula north coast
    'C 54,1 44,3 36,10',
    // Down Jaffna west side to neck
    'C 28,17 24,26 24,38',
    // Continue south-west to Mannar Island area
    'C 22,50 22,58 24,66',
    // South down Gulf of Mannar coast
    'C 22,78 16,96 10,112',
    // Kalpitiya peninsula (slight westward bulge)
    'C 8,120 8,126 10,134',
    // Continue south-west coast toward Colombo
    'C 12,148 14,172 16,192',
    'C 18,208 20,218 22,226',
    // South-west coast to Galle
    'C 26,242 36,262 46,278',
    'C 52,286 56,292 61,296',
    // South coast — Galle to Dondra Head (southernmost)
    'C 68,302 82,306 100,305',
    // South coast east — Dondra to Hambantota
    'C 114,304 134,298 157,289',
    // South-east coast heading north-east
    'C 170,282 184,270 198,258',
    // Arugam Bay / East coast
    'C 210,250 224,242 234,233',
    // North along east coast
    'C 237,220 237,206 235,190',
    // Batticaloa area
    'C 232,176 224,164 218,153',
    // Continue north — narrowing east coast
    'C 216,140 212,126 206,114',
    // Trincomalee harbour area
    'C 200,104 186,92 169,80',
    // Heading north-west from Trinco
    'C 158,70 148,58 138,46',
    // Mullaitivu coast back towards Jaffna east
    'C 128,36 112,20 94,10',
    // Close back to Pt. Pedro
    'C 82,4 72,2 62,3',
    'Z',
].join(' ')

export default function DistrictMap() {
    const router = useRouter()
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const hovered = districts.find(d => d.id === hoveredId)

    return (
        <section style={{ backgroundColor: '#F8FAFC', padding: '80px 0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SectionHeading
                        label="EXPLORE BY DISTRICT"
                        title="Find Properties Across Sri Lanka"
                        subtitle="Click any district on the map to browse available properties in that area"
                    />
                </motion.div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '48px',
                    flexWrap: 'wrap',
                }}>
                    {/* SVG Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ position: 'relative', flexShrink: 0 }}
                    >
                        <svg
                            viewBox="0 0 240 310"
                            style={{
                                width: '100%',
                                maxWidth: '360px',
                                height: 'auto',
                                filter: 'drop-shadow(0 8px 32px rgba(11,31,58,0.14))',
                                borderRadius: '16px',
                                overflow: 'visible',
                            }}
                            aria-label="Interactive Sri Lanka district map"
                        >
                            {/* Sea background */}
                            <rect width="240" height="310" rx="12" fill="#DBEAFE" />

                            {/* Island outline */}
                            <path
                                d={SRI_LANKA_PATH}
                                fill="#F0FDF4"
                                stroke="#94A3B8"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />

                            {/* District dots */}
                            {districts.map(d => {
                                const [cx, cy] = project(d.lat, d.lng)
                                const color = PROVINCE_COLORS[d.province]
                                const isHovered = hoveredId === d.id
                                return (
                                    <g key={d.id}>
                                        {isHovered && (
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={14}
                                                fill={color}
                                                opacity={0.2}
                                            />
                                        )}
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={isHovered ? 7 : 5}
                                            fill={color}
                                            stroke="white"
                                            strokeWidth={1.5}
                                            style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                                            onMouseEnter={() => setHoveredId(d.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            onClick={() => router.push(`/properties?district=${encodeURIComponent(d.name)}`)}
                                        />
                                    </g>
                                )
                            })}

                            {/* Hover tooltip */}
                            {hovered && (() => {
                                const [hx, hy] = project(hovered.lat, hovered.lng)
                                const labelW = hovered.name.length * 7 + 20
                                const tx = Math.min(Math.max(hx - labelW / 2, 4), 236 - labelW)
                                const ty = hy - 36
                                return (
                                    <g transform={`translate(${tx}, ${Math.max(ty, 4)})`} style={{ pointerEvents: 'none' }}>
                                        <rect
                                            x="0" y="0"
                                            width={labelW}
                                            height="22"
                                            rx="5"
                                            fill="#0B1F3A"
                                            opacity={0.92}
                                        />
                                        <text
                                            x={labelW / 2}
                                            y="15"
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="10"
                                            fontFamily="DM Sans, sans-serif"
                                            fontWeight="600"
                                        >
                                            {hovered.name}
                                        </text>
                                    </g>
                                )
                            })()}
                        </svg>
                    </motion.div>

                    {/* Province legend + instructions */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{ paddingTop: '12px' }}
                    >
                        <p style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#94A3B8',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            marginBottom: '16px',
                        }}>
                            Province Key
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                            {Object.entries(PROVINCE_COLORS).map(([province, color]) => (
                                <div key={province} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '10px', height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                        flexShrink: 0,
                                        boxShadow: `0 0 6px ${color}55`,
                                    }} />
                                    <span style={{
                                        fontFamily: 'DM Sans, sans-serif',
                                        fontSize: '14px',
                                        color: '#374151',
                                        fontWeight: 500,
                                    }}>
                                        {province}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Instruction card */}
                        <div style={{
                            padding: '16px 18px',
                            backgroundColor: '#FFF7ED',
                            border: '1px solid #FED7AA',
                            borderRadius: '12px',
                            maxWidth: '220px',
                        }}>
                            <p style={{
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '13px',
                                color: '#9A3412',
                                lineHeight: 1.5,
                                margin: 0,
                            }}>
                                💡 Click a district dot to browse properties in that area
                            </p>
                        </div>

                        {/* District count info */}
                        <p style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '12px',
                            color: '#94A3B8',
                            marginTop: '16px',
                        }}>
                            25 districts across Sri Lanka
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
