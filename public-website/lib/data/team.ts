export interface TeamMember {
    id: number
    name: string
    role: string
    bio: string
    initials: string
    linkedin?: string
}

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Chamara Rathnayake",
        role: "Chief Executive Officer",
        bio: "With over 18 years in Sri Lankan real estate, Chamara founded Ceylon Roots Holdings with a vision to bring transparency and professionalism to the property market. He holds a MBA from University of Colombo.",
        initials: "CR",
        linkedin: "#",
    },
    {
        id: 2,
        name: "Dilrukshi Senanayake",
        role: "Senior Property Consultant",
        bio: "Dilrukshi specialises in luxury residential properties across Colombo and the Western Province. Her in-depth knowledge of the local market has helped over 300 families find their dream homes.",
        initials: "DS",
        linkedin: "#",
    },
    {
        id: 3,
        name: "Kasun Madhuranga",
        role: "Marketing Manager",
        bio: "Kasun leads our digital marketing strategy, ensuring Ceylon Roots Holdings properties reach the right buyers. He has a background in digital marketing and brings 8 years of experience to the team.",
        initials: "KM",
        linkedin: "#",
    },
    {
        id: 4,
        name: "Thilini Gunawardena",
        role: "Client Relations Officer",
        bio: "Thilini is the first point of contact for all our clients, ensuring every interaction is warm, professional and productive. She is passionate about delivering an exceptional client experience at every touchpoint.",
        initials: "TG",
        linkedin: "#",
    },
]
