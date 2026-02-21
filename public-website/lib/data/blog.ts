export interface BlogPost {
    id: number
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    slug: string
    image: string
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Sri Lanka Real Estate Market Outlook 2025: Key Trends to Watch",
        excerpt:
            "After a challenging economic period, Sri Lanka's property market is showing strong signs of recovery. We analyse the key trends shaping the market in 2025 and where the best investment opportunities lie.",
        category: "Market News",
        date: "February 15, 2025",
        readTime: "5 min read",
        slug: "sri-lanka-real-estate-outlook-2025",
        image: "/images/blog-market.jpg",
    },
    {
        id: 2,
        title: "Top 5 Neighbourhoods in Colombo for Property Investment in 2025",
        excerpt:
            "From the leafy streets of Colombo 07 to the booming suburb of Battaramulla, discover which areas offer the best rental yields and capital appreciation for savvy investors looking at the capital city.",
        category: "Investment",
        date: "February 10, 2025",
        readTime: "7 min read",
        slug: "top-colombo-neighbourhoods-investment-2025",
        image: "/images/blog-investment.jpg",
    },
    {
        id: 3,
        title: "First-Time Home Buyer's Guide to Purchasing Property in Sri Lanka",
        excerpt:
            "Buying your first home in Sri Lanka can be overwhelming. From understanding land deeds and title certificates to navigating the legal process, our comprehensive guide walks you through every step.",
        category: "Tips",
        date: "February 5, 2025",
        readTime: "10 min read",
        slug: "first-time-home-buyer-guide-sri-lanka",
        image: "/images/blog-tips.jpg",
    },
]
