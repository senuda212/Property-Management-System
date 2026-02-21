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

export function parseProperty(property: any) {
  if (!property) return null
  return {
    ...property,
    images: parsePropertyArrayField(property.images),
    features: parsePropertyArrayField(property.features),
  }
}

export function parseProperties(properties: any[]) {
  return properties.map(parseProperty)
}
