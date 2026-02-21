import PropertyForm from '@/components/properties/PropertyForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const property = await prisma.property.findUnique({
        where: { id: parseInt(id) }
    })

    if (!property) notFound()

    // Parse JSON strings back to arrays
    const formattedData = {
        ...property,
        images: JSON.parse(property.images || '[]'),
        features: JSON.parse(property.features || '[]'),
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">Edit Property</h1>
                    <p className="text-grey-mid text-sm">Update property details for "{property.title}"</p>
                </div>
            </div>

            <PropertyForm initialData={formattedData} id={id} />
        </div>
    )
}
