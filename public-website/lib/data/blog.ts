export interface BlogPost {
    id: number
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    slug: string
    image: string
    emoji: string
    author: string
    tags: string[]
    content: string
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
        emoji: "📈",
        author: "Ceylon Roots Holdings",
        tags: ["Market Trends", "Investment", "Sri Lanka", "2025"],
        content: `
<p>After a turbulent few years defined by economic volatility and currency depreciation, Sri Lanka's real estate market is demonstrating remarkable resilience heading into 2025. Property transactions have increased significantly, foreign interest is returning, and key urban markets such as Colombo, Negombo, and Galle are recording consistent price appreciation.</p>

<h2>1. Urban Property Demand Rebounds</h2>
<p>Demand for mid-range apartments and houses in Colombo's suburbs — particularly Battaramulla, Nugegoda, and Rajagiriya — continues to outpace supply. Young professionals and first-time buyers are actively seeking properties in the LKR 15–30 million range, driving robust activity in these corridors.</p>
<p>Negombo, benefitting from proximity to Bandaranaike International Airport and a thriving beach tourism economy, has attracted significant interest from both local and diaspora buyers. Rental yields here average 6–8% annually, making it a compelling buy-to-let market.</p>

<h2>2. Diaspora Investment on the Rise</h2>
<p>Sri Lankan expatriates living in the UK, Australia, Canada, and the Middle East are actively repatriating capital into property. The favourable LKR exchange rates have made property in Sri Lanka comparatively affordable in foreign currency terms. We are seeing a notable uptick in remote property purchases facilitated by virtual viewings and legal representation services.</p>

<h2>3. Southern Coast Premium Surge</h2>
<p>Galle, Unawatuna, and Mirissa continue to attract premium valuations driven by the tourism hospitality sector. Villa properties suitable for short-term rental on platforms such as Airbnb are fetching prices 20–35% higher than 2023 levels. Landowners in these areas are seeing their assets appreciate rapidly.</p>

<h2>4. Infrastructure-Driven Growth Corridors</h2>
<p>The Colombo Port City development, elevated highway extensions, and planned expressway connections to Kandy and Kurunegala are reshaping Sri Lanka's property geography. Districts along these corridors — particularly Gampaha along the Colombo-Kandy corridor — are early beneficiaries of infrastructure-driven appreciation.</p>

<h2>5. Interest Rate Environment</h2>
<p>With the Central Bank of Sri Lanka gradually relaxing monetary policy from its crisis-era highs, mortgage rates are beginning to trend downward. This is expected to unlock a wave of deferred purchasing decisions from middle-class buyers who had postponed property acquisition during the tight-credit period of 2022–2023.</p>

<h2>Our Outlook</h2>
<p>We believe 2025 will be a year of meaningful recovery and selective appreciation. Buyers who act decisively in established corridors — particularly in Colombo's suburbs, the southern coastal belt, and emerging satellite towns — stand to benefit most. Rental yields remain attractive across the board, making Sri Lankan property a compelling long-term investment proposition.</p>
        `.trim(),
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
        emoji: "🏙️",
        author: "Ceylon Roots Holdings",
        tags: ["Colombo", "Investment", "Rental Yield", "Capital Appreciation"],
        content: `
<p>Colombo remains the unrivalled epicentre of Sri Lanka's property market, but not all neighbourhoods are created equal. Whether you're a seasoned investor chasing yield or a first-time buyer seeking long-term capital growth, knowing which pockets of the capital to target is critical. Here are the five areas we consistently recommend to our clients.</p>

<h2>1. Battaramulla — The Suburban Powerhouse</h2>
<p>Battaramulla has transformed from a quiet suburb into one of Colombo's most sought-after addresses. The presence of government ministries, international NGOs, corporate headquarters, and the proximity to Parliament has created sustained demand for both purchase and rental. Three-bedroom houses in gated compounds are readily absorbed at LKR 2–4 million per month in rent, while purchase prices for quality homes range from LKR 40–80 million.</p>
<p><strong>Best for:</strong> Long-term capital appreciation and stable rental income.</p>

<h2>2. Nugegoda — The Urban Upgrade Zone</h2>
<p>Nugegoda offers a compelling mix of established infrastructure, educational institutions (numerous leading schools and tutories), and increasingly modern apartment developments. Apartments between 1,200–1,800 sq ft are in high demand from young professionals, and the ongoing densification of the area is pushing prices steadily upward. Prices range from LKR 18–35 million for apartments.</p>
<p><strong>Best for:</strong> Mid-range investment with solid rental demand.</p>

<h2>3. Rajagiriya — The Digital Corridor</h2>
<p>The stretch from Rajagiriya to Malabe has emerged as Sri Lanka's answer to a tech corridor, anchored by numerous IT companies, Orion City, and the ITUM campus. Young IT professionals form the primary rental demographic, and this is reflected in strong demand for compact 2-bedroom apartments priced at LKR 20–30 million. Rental yields here average 7–9%.</p>
<p><strong>Best for:</strong> High rental yield buy-to-let investment.</p>

<h2>4. Colombo 07 (Cinnamon Gardens) — The Prestige Address</h2>
<p>Colombo 07 remains Sri Lanka's most prestigious residential address. Tree-lined streets, proximity to the Viharamahadevi Park, leading schools, and a concentration of diplomatic missions maintain its allure. While entry prices are high (LKR 100 million+ for prime properties), capital preservation is virtually guaranteed, and the ultra-prime rental market on this strip is robust.</p>
<p><strong>Best for:</strong> Capital preservation and prestige asset holding.</p>

<h2>5. Dehiwala — The Coastal Value Play</h2>
<p>Dehiwala sits on the southern stretch of the Colombo metropolitan coast, offering sea proximity at prices significantly below the premium of Colombo 03. The upcoming urban regeneration of the Mount Lavinia beach strip is expected to pull values northward. Properties within 500 metres of the beach priced at LKR 25–50 million represent compelling value relative to the medium-term appreciation potential.</p>
<p><strong>Best for:</strong> Value appreciation over a 5–7 year investment horizon.</p>

<h2>Our Recommendation</h2>
<p>For the investor who wants both yield and growth, Battaramulla and Rajagiriya offer the best balanced proposition in today's market. For those prioritising long-term wealth preservation, Colombo 07 remains the gold standard. Contact our team for a personalised investment assessment.</p>
        `.trim(),
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
        emoji: "🏡",
        author: "Ceylon Roots Holdings",
        tags: ["First-Time Buyer", "Legal Guide", "Property Purchase", "Tips"],
        content: `
<p>Purchasing your first home is one of life's most significant financial decisions, and in Sri Lanka the process has some unique characteristics that first-time buyers should understand before signing anything. This guide covers every stage, from property searching to registration at the Land Registry.</p>

<h2>Step 1: Define Your Budget Clearly</h2>
<p>Before viewing a single property, establish a firm budget. Include not just the purchase price but the additional costs:</p>
<ul>
  <li><strong>Stamp duty:</strong> Currently 3% on residential property under LKR 25 million, with higher rates above this threshold.</li>
  <li><strong>Legal fees:</strong> Notary and lawyer charges are typically 1–2% of transaction value.</li>
  <li><strong>Registration charges:</strong> Approximately 0.5% of the declared value.</li>
  <li><strong>Agent commission:</strong> Usually 1.5–2% paid by the buyer.</li>
</ul>
<p>Total transaction costs typically add 5–7% on top of the agreed purchase price. Budget for these from the outset.</p>

<h2>Step 2: Understand Property Ownership Types</h2>
<p>Sri Lanka has several types of property ownership documentation:</p>
<ul>
  <li><strong>Title in Fee Simple:</strong> Full freehold ownership — the gold standard. The title deed clearly names the owner with no encumbrances.</li>
  <li><strong>Undivided Shares:</strong> Common in older properties where multiple heirs have fractional ownership. Ensure all parties agree to sell before proceeding.</li>
  <li><strong>Condominium Certificate of Conformity:</strong> Issued by the Condominium Management Authority for apartment units. Always verify this exists before purchasing an apartment.</li>
  <li><strong>Land Grant / Permit Land:</strong> Specific conditions restrict sale. Always check if any grant conditions apply.</li>
</ul>

<h2>Step 3: Conduct a Survey Report</h2>
<p>Always commission a Licensed Surveyor to produce a detailed survey plan of the land. This confirms the exact extent, boundaries, and that the physical land matches the deed description. The Assessor's Survey Report is essential documentation for your lawyer and will be required by any bank providing a mortgage.</p>

<h2>Step 4: Title Verification — The Most Critical Step</h2>
<p>Engage a qualified Notary or Attorney-at-Law to conduct a title search at the relevant Land Registry covering a minimum of 30 years of title history (we recommend 60 years). This search will reveal:</p>
<ul>
  <li>Whether the seller has a clear, marketable title</li>
  <li>Any mortgages, charges, or encumbrances registered against the property</li>
  <li>Any caveats or court orders affecting the land</li>
  <li>Easements or rights of way that burden the land</li>
</ul>
<p>Do not proceed with any payment until title verification is complete and satisfactory.</p>

<h2>Step 5: Mortgage Pre-Approval</h2>
<p>If financing your purchase, obtain a Letter of Intent from your bank before tying up funds. Sri Lankan banks typically lend up to 70–80% of the forced sale value (not the market price) for residential properties. Commonly required documents include 6 months of bank statements, salary certificates/business accounts, and the survey plan.</p>

<h2>Step 6: Execute the Transfer Deed</h2>
<p>Once title is verified and financing arranged, a Transfer Deed (Deed of Conveyance) is prepared by a licensed Notary. Both buyer and seller must be present (or represented by Power of Attorney). The deed is attested and executed before the Notary, and original signed copies are prepared for registration.</p>

<h2>Step 7: Register at the Land Registry</h2>
<p>The Transfer Deed must be registered at the relevant Land District Registry within three months of execution to be legally effective against third parties. Registration completes the transfer and the title officially becomes yours.</p>

<h2>Common Pitfalls to Avoid</h2>
<ul>
  <li>Never pay significant amounts before title verification is complete</li>
  <li>Always verify building plan approvals for any structures on the property</li>
  <li>Check for unpaid assessments rates or local taxes on the property</li>
  <li>Ensure the property is not in a flood-prone zone or within a reservation</li>
</ul>

<p>Our team at Ceylon Roots Holdings can guide you through every stage and connect you with trusted legal professionals. Contact us today to begin your home-buying journey with confidence.</p>
        `.trim(),
    },
    {
        id: 4,
        title: "Western Province Property Investment Guide: Which Areas to Watch in 2025",
        excerpt:
            "The Western Province accounts for over 60% of Sri Lanka's GDP and remains the powerhouse of its property market. We break down the micro-markets, emerging corridors, and districts offering the best investment returns.",
        category: "Investment",
        date: "January 28, 2025",
        readTime: "6 min read",
        slug: "western-province-investment-guide-2025",
        image: "/images/blog-western.jpg",
        emoji: "🌆",
        author: "Ceylon Roots Holdings",
        tags: ["Western Province", "Colombo", "Gampaha", "Investment"],
        content: `
<p>The Western Province — comprising Colombo, Gampaha, and Kalutara districts — is the engine of Sri Lanka's economy and its most dynamic property market. Despite its relatively small landmass, it accounts for a disproportionate share of property transactions, rental demand, and price appreciation nationally.</p>

<h2>Colombo District: The Tier System</h2>
<p>Colombo's property market operates in clearly defined tiers:</p>
<ul>
  <li><strong>Premium Tier (Colombo 1–7):</strong> Prices from LKR 60–500+ million. Low yields but unmatched capital preservation.</li>
  <li><strong>Mid-Market Tier (Colombo 10–15, Dehiwala, Mount Lavinia):</strong> Prices LKR 20–60 million. Good buy-to-let yields of 6–8% in emerging sub-areas.</li>
  <li><strong>Suburban Tier (Battaramulla, Nugegoda, Rajagiriya, Kottawa):</strong> The current sweet spot for value + yield + growth. Prices LKR 15–50 million.</li>
</ul>

<h2>Gampaha District: The Hidden Gem</h2>
<p>Gampaha is chronically undervalued relative to its fundamentals. The district benefits from excellent highway access (E01 Southern Expressway passes through), the international airport (BIA), and a rapidly expanding industrial sector. Key areas to watch:</p>
<p><strong>Ja-Ela & Seeduwa:</strong> Proximity to BIA and Free Trade Zone creates steady rental demand from airline staff and factory workers. Residential yields can reach 8–10% for the right product.</p>
<p><strong>Wattala:</strong> Hybrid residential-commercial zone with strong transport connectivity east into Colombo and west toward the coast. Apartment development is picking up pace.</p>
<p><strong>Negombo:</strong> A perennial favourite for diaspora buyers - the coastal tourism economy drives resilient rental and sale demand from foreign buyers, returning Sri Lankans, and the hospitality workforce.</p>

<h2>Kalutara District: The Southern Escape</h2>
<p>Kalutara offers the lifestyle of coastal living within commuter distance of Colombo via the Southern Expressway. Towns like Panadura and Kalutara North are popular with professionals seeking larger land extents affordable below LKR 25 million. The district's attractive beaches and slower pace of life make it a preferred retirement and second-home destination.</p>

<h2>Investment Strategy Recommendations</h2>
<p>For capital allocation in 2025, we recommend:</p>
<ul>
  <li><strong>Short-term rental income:</strong> Focus on Negombo beach properties or Colombo apartment units near IT hubs.</li>
  <li><strong>Long-term capital appreciation:</strong> Target Battaramulla, Malabe, and Wattala for 5–10 year holds.</li>
  <li><strong>Land banking:</strong> Agricultural land in Kalutara's outskirts or along proposed highway corridors in Gampaha offers speculative long-term value.</li>
</ul>
        `.trim(),
    },
    {
        id: 5,
        title: "Understanding Property Law in Sri Lanka: A Guide for Buyers",
        excerpt:
            "Navigating Sri Lanka's land laws can be complex, especially for overseas buyers and first-time investors. From the Registration of Documents Ordinance to condominium law, we explain what you need to know before signing.",
        category: "Legal",
        date: "January 20, 2025",
        readTime: "8 min read",
        slug: "understanding-property-law-sri-lanka",
        image: "/images/blog-legal.jpg",
        emoji: "⚖️",
        author: "Ceylon Roots Holdings",
        tags: ["Property Law", "Legal Guide", "Deeds", "Foreign Buyers"],
        content: `
<p>Sri Lanka's property law framework draws from a complex mix of Roman-Dutch law, English common law, and local statutes that have evolved over centuries. Understanding the key legal instruments and registration requirements is essential before committing to any property transaction.</p>

<h2>The Registration of Documents Ordinance</h2>
<p>Sri Lanka operates a <strong>deeds-based registration system</strong> rather than a Torrens (title) system. This means the Land Registry records deeds (instruments of transfer), not absolute title. The buyer bears the responsibility of tracing a satisfactory chain of title dating back at least 30 years through a search of registered deeds.</p>
<p>A properly registered deed (duly executed before a Notary Public and registered at the Land Registry) provides the strongest evidence of ownership, but it is not an absolute guarantee of title. This is why a thorough title search by a qualified attorney is non-negotiable.</p>

<h2>Key Legal Instruments</h2>
<ul>
  <li><strong>Deed of Conveyance / Transfer:</strong> The primary document used to transfer freehold ownership between parties.</li>
  <li><strong>Deed of Gift:</strong> Used when property is transferred without monetary consideration (common in estate transfers between family members).</li>
  <li><strong>Mortgage Deed:</strong> Secures a loan against real property. Always verify that any mortgages appearing in the title search have been formally discharged.</li>
  <li><strong>Deed of Declaration:</strong> Used to formalise boundaries, extent, and ownership when title is unclear.</li>
  <li><strong>Power of Attorney:</strong> Authorises another person to act on the owner's behalf in property transactions — commonly used by overseas buyers.</li>
</ul>

<h2>The Condominium (Apartment Ownership) Law</h2>
<p>Apartment units, townhouses within developments, and strata-titled properties in Sri Lanka are governed primarily by the <strong>Apartment Ownership Law No. 11 of 1973</strong> (as amended). Key points:</p>
<ul>
  <li>Each unit receives a separate title deed (Condominium Certificate of Conformity)</li>
  <li>The Condominium Management Authority (CMA) registers all condominium development plans</li>
  <li>Buyers should verify that the developer holds a valid CMA Certificate before purchase</li>
  <li>Maintenance contributions and management corporation rules apply to all unit owners</li>
</ul>

<h2>Foreign Ownership Restrictions</html>
<p>Sri Lanka generally does not permit non-citizens to purchase freehold land. However, foreign nationals may:</p>
<ul>
  <li>Purchase condominium units above the 4th floor (condominiums are not classified as "land")</li>
  <li>Hold property through a Sri Lankan company (a company in which foreigners hold up to 100% of shares may acquire land, subject to tax)</li>
  <li>Obtain long-term leases of up to 99 years</li>
</ul>
<p>The rules on foreign ownership have evolved and continue to be subject to policy changes. We strongly recommend seeking current legal advice if you are a non-citizen looking to invest.</p>

<h2>Stamp Duty and Transfer Taxes</h2>
<p>Stamp duty in Sri Lanka is payable on deeds as follows:</p>
<ul>
  <li>First LKR 25 million: 3% of value</li>
  <li>LKR 25–50 million: 4%</li>
  <li>Above LKR 50 million: 5%</li>
</ul>
<p>In addition, the 2022 economic crisis reforms introduced a <strong>Capital Gains Tax (CGT)</strong> of 10% on the gain from property disposed of within 3 years of acquisition. Understanding your CGT exposure is essential for short-term property investment planning.</p>

<h2>Protecting Yourself: Due Diligence Checklist</h2>
<ul>
  <li>Obtain a title search (30–60 years back) from a qualified Attorney-at-Law</li>
  <li>Commission a Licensed Surveyor's survey report</li>
  <li>Verify planning approvals for all buildings on the land</li>
  <li>Check for any environmental reservations, road widening lines, or utility easements</li>
  <li>Confirm that rates, taxes, and municipal dues are all paid up to date</li>
  <li>For apartments: verify the CMA Certificate and inspect building management accounts</li>
</ul>
        `.trim(),
    },
    {
        id: 6,
        title: "Rental Yield Analysis: Best Areas in Sri Lanka for Buy-to-Let Investment",
        excerpt:
            "With rental demand rising across Sri Lanka's key cities, savvy investors are turning to buy-to-let as a reliable income strategy. Our 2025 analysis reveals which locations deliver the strongest yields.",
        category: "Investment",
        date: "January 12, 2025",
        readTime: "5 min read",
        slug: "rental-yield-analysis-sri-lanka-2025",
        image: "/images/blog-rental.jpg",
        emoji: "💰",
        author: "Ceylon Roots Holdings",
        tags: ["Rental Yield", "Buy-to-Let", "Investment", "Passive Income"],
        content: `
<p>Buy-to-let investment has re-emerged as a compelling strategy for Sri Lankan property investors in 2025. With mortgage rates still elevated (though declining), the case for cash buyers is particularly strong. Here we present our up-to-date rental yield analysis across Sri Lanka's key markets.</p>

<h2>Understanding Gross vs Net Yield</h2>
<p>Gross rental yield = (Annual Rent / Purchase Price) × 100. Net yield deducts management fees (typically 8–12% of rent), maintenance costs (budget 1–2% of property value annually), insurance, and periods of vacancy. In practice, expect net yields to run 1.5–2.5% below gross yields. Our analysis below uses gross yield figures as a benchmark for comparison.</p>

<h2>Colombo City Hubs (Gross Yield: 5–9%)</h2>
<p>The highest yielding areas within the Colombo metro are the tech corridors of Rajagiriya, Malabe, and Orion Boulevard — where furnished 2-bedroom apartments targeting IT professionals can achieve LKR 120,000–200,000/month in rent. These areas' gross yields of 7–9% rank among the strongest in the country for the residential market.</p>
<p>Colombo 3 and 5 (Colpetty, Havelock) apartments targeting expats and senior professionals can hit LKR 250,000–500,000/month, but with higher entry prices the gross yields are typically lower at 5–7%.</p>

<h2>Negombo (Gross Yield: 7–12% for Short-Term Rentals)</h2>
<p>Negombo is arguably the best performing market for short-term (Airbnb-style) rentals given its beach tourism and reliable flow of airport transit visitors. Villa properties sleeping 6–10 guests regularly achieve occupancy of 65–80% and can generate LKR 5–10 million annually in gross rental income. However, management requirements are more intensive than long-term rentals.</p>

<h2>Kandy (Gross Yield: 5–7%)</h2>
<p>The hill-capital offers a steadier, more predictable buy-to-let market driven by students at the University of Peradeniya and Kandy medical faculty, plus the tourism sector. 3-bedroom houses within 5km of the city centre achieve LKR 80,000–150,000/month in rent. Land and house prices in Kandy remain more affordable than Colombo, making entry accessible for investors with LKR 15–25 million budgets.</p>

<h2>Galle (Gross Yield: 6–10%)</h2>
<p>The Southern Province's tourism heartland delivers excellent yields for furnished beach properties and boutique villa rentals. Properties within 1km of Unawatuna and Hikkaduwa beaches are in persistent demand from both domestic and international tourists. For those willing to manage short-term rental operations, Galle can deliver gross yields of 8–10%, though season dependency is a risk factor.</p>

<h2>Jaffna (Gross Yield: 6–8%) — The Emerging Market</h2>
<p>Jaffna is one of the most compelling emerging buy-to-let markets in the country. The Northern Province capital is undergoing rapid infrastructure development, and diaspora returnees and government workers driving rental demand have pushed residential rents to levels that yield 6–8% on current property prices — which remain modest by Colombo standards. Investors with a 5–7 year horizon and tolerance for frontier-market risk should take note.</p>

<h2>Portfolio Strategy</h2>
<p>For a balanced buy-to-let portfolio, we recommend blending a stable long-term rental in Colombo suburbs (yield 6–7%, low management intensity) with a short-term rental in a tourism hotspot such as Negombo or Galle (yield 8–12%, higher management intensity). This combination delivers both income stability and the higher-yield upside of the tourism-driven market.</p>
        `.trim(),
    },
]

