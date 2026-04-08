'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface CompareProperty {
    id: number
    title: string
    type: string
    status: string
    price: number
    currency: string
    bedrooms?: number | null
    bathrooms?: number | null
    sqft?: number | null
    parking: boolean
    city: string
    district: string
    images: string[] | string
    features: string[] | string
}

interface ComparisonContextType {
    compareList: CompareProperty[]
    addToCompare: (property: CompareProperty) => void
    removeFromCompare: (id: number) => void
    clearCompare: () => void
    isCompared: (id: number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | null>(null)

const STORAGE_KEY = 'crh_compare'
const MAX_COMPARE = 3

export function ComparisonProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<CompareProperty[]>([])

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) setCompareList(JSON.parse(stored) as CompareProperty[])
        } catch {
            // ignore parse errors
        }
    }, [])

    // Persist to localStorage whenever list changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList))
        } catch {
            // ignore storage errors
        }
    }, [compareList])

    const addToCompare = useCallback((property: CompareProperty) => {
        setCompareList(prev => {
            if (prev.length >= MAX_COMPARE) return prev
            if (prev.some(p => p.id === property.id)) return prev
            return [...prev, property]
        })
    }, [])

    const removeFromCompare = useCallback((id: number) => {
        setCompareList(prev => prev.filter(p => p.id !== id))
    }, [])

    const clearCompare = useCallback(() => {
        setCompareList([])
    }, [])

    const isCompared = useCallback((id: number) => {
        return compareList.some(p => p.id === id)
    }, [compareList])

    return (
        <ComparisonContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isCompared }}>
            {children}
        </ComparisonContext.Provider>
    )
}

export function useComparison() {
    const ctx = useContext(ComparisonContext)
    if (!ctx) throw new Error('useComparison must be used inside ComparisonProvider')
    return ctx
}
