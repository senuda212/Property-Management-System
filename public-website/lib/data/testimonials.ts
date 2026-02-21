export interface Testimonial {
    id: number
    name: string
    location: string
    quote: string
    rating: number
    initials: string
    propertyType: string
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Nimal Perera",
        location: "Colombo 07",
        quote:
            "Ceylon Roots Holdings made our dream of owning a home in Colombo a reality. Their team was professional, transparent, and guided us through every step of the process. We couldn't be happier with our new home in Cinnamon Gardens.",
        rating: 5,
        initials: "NP",
        propertyType: "Apartment Buyer",
    },
    {
        id: 2,
        name: "Priya Jayawardena",
        location: "Galle Fort",
        quote:
            "We listed our ancestral property in Galle with Ceylon Roots Holdings and were amazed at how quickly they found the right buyer. They achieved a price well above our expectations and handled all the legal documentation seamlessly.",
        rating: 5,
        initials: "PJ",
        propertyType: "Property Seller",
    },
    {
        id: 3,
        name: "Rohana & Kamala Silva",
        location: "Kandy",
        quote:
            "As expats returning from Dubai, we needed a trustworthy agency to help us invest in property back home. Ceylon Roots Holdings provided excellent market insights and helped us find the perfect investment property in Kandy.",
        rating: 5,
        initials: "RS",
        propertyType: "Investment Buyers",
    },
    {
        id: 4,
        name: "Dr. Sunethra Fernando",
        location: "Nugegoda",
        quote:
            "I rented out my apartment in Nugegoda through Ceylon Roots Holdings and was impressed with how they screened tenants and managed the entire process. The team is highly professional and reliable. Highly recommended!",
        rating: 5,
        initials: "SF",
        propertyType: "Property Landlord",
    },
    {
        id: 5,
        name: "Ashan Dissanayake",
        location: "Battaramulla",
        quote:
            "I found my perfect family home in Battaramulla through Ceylon Roots Holdings. The property search process was smooth, the team was always available to answer my questions, and they negotiated a fantastic deal on my behalf.",
        rating: 5,
        initials: "AD",
        propertyType: "Home Buyer",
    },
    {
        id: 6,
        name: "Nalini Wickremasinghe",
        location: "Negombo",
        quote:
            "Ceylon Roots Holdings helped me invest in coastal property in Negombo. Their knowledge of the local market is unmatched. The ROI on my beachside villa has exceeded all projections. Truly exceptional service!",
        rating: 5,
        initials: "NW",
        propertyType: "Investment Buyer",
    },
]
