import { prisma } from '@/lib/prisma'

export const DEFAULT_PUBLIC_CONTACT_SETTINGS = {
    companyName: 'Ceylon Roots Holdings',
    tagline: 'Rooting For You',
    officeAddress: '231/4, Rosegarden Road, Wattegedara Rd, Maharagama',
    phonePrimary: '+94 777 855 554',
    phoneSecondary: '+94 717 555 572',
    email: 'ceylonrootsh@gmail.com',
    whatsappNumber: '+94777855554',
    ikmanProfileUrl: 'https://ikman.lk/en/shops/ceylon-roots-holdings',
    facebookUrl: 'https://facebook.com/ceylonrootsholdings',
    instagramUrl: 'https://instagram.com/ceylonrootsholdings',
    linkedinUrl: 'https://linkedin.com/company/ceylonrootsholdings',
    youtubeUrl: 'https://youtube.com/@ceylonrootsholdings',
    managingDirectorName: 'Suneth Dewanarayana',
    managingDirectorCredential: 'BBA Sri Lanka',
}

export type PublicContactSettings = typeof DEFAULT_PUBLIC_CONTACT_SETTINGS
export type PublicContactSettingKey = keyof PublicContactSettings

const PUBLIC_CONTACT_SETTING_KEYS = Object.keys(DEFAULT_PUBLIC_CONTACT_SETTINGS) as PublicContactSettingKey[]

async function ensureSiteSettingsTable() {
    await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "SiteSetting" (
            "key" TEXT PRIMARY KEY,
            "value" TEXT NOT NULL,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `)
}

export async function getPublicContactSettings() {
    await ensureSiteSettingsTable()

    const rows = await prisma.$queryRaw<Array<{ key: string; value: string }>>`
        SELECT "key", "value"
        FROM "SiteSetting"
        WHERE "key" = ANY(${PUBLIC_CONTACT_SETTING_KEYS})
    `

    const settings: Record<string, string> = { ...DEFAULT_PUBLIC_CONTACT_SETTINGS }

    for (const row of rows) {
        if (row.key in settings && typeof row.value === 'string' && row.value.trim()) {
            settings[row.key] = row.value.trim()
        }
    }

    return settings as PublicContactSettings
}

