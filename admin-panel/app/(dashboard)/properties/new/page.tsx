import PropertyForm from '@/components/properties/PropertyForm'

export default function NewPropertyPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">Add New Property</h1>
                    <p className="text-grey-mid text-sm">Create a new property listing for Premier Estates</p>
                </div>
            </div>

            <PropertyForm />
        </div>
    )
}
