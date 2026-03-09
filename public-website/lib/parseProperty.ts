export function parsePropertyArrayField(field: unknown): string[] {
  if (Array.isArray(field)) return field
  if (typeof field === 'string') {
    try {
      return JSON.parse(field)
    } catch {
      return []
    }
  }
  return []
}

interface RawProperty {
  images?: unknown
  features?: unknown
  [key: string]: unknown
}

export function parseProperty(property: RawProperty | null) {
  if (!property) return null
  return {
    ...property,
    images: parsePropertyArrayField(property.images),
    features: parsePropertyArrayField(property.features),
  }
}

export function parseProperties(properties: RawProperty[]) {
  return properties.map(parseProperty)
}
