import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

async function seedAdmin() {
    const adminUsername = process.env.ADMIN_USERNAME ?? 'admin123'
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ceylonrootsholdings.lk'
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123'
    const passwordHash = await bcrypt.hash(adminPassword, 12)

    const existing = await prisma.user.findFirst({
        where: {
            OR: [
                { username: adminUsername },
                { email: adminEmail },
            ],
        },
    })

    if (!existing) {
        await prisma.user.create({
            data: {
                fullName: 'Super Administrator',
                email: adminEmail,
                username: adminUsername,
                passwordHash,
                role: 'admin',
                isActive: true,
                loginAttempts: 0,
                lockedUntil: null,
            },
        })
        console.log(`✅ Admin user created: ${adminUsername} (${adminEmail})`)
        return
    }

    await prisma.user.update({
        where: { id: existing.id },
        data: {
            passwordHash,
            role: 'admin',
            isActive: true,
            loginAttempts: 0,
            lockedUntil: null,
        },
    })

    console.log(`✅ Admin credentials refreshed for existing user: ${existing.username}`)
}

seedAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
