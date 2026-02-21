import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

async function seedAdmin() {
    const existing = await prisma.user.findUnique({
        where: { username: 'admin123' }
    })

    if (!existing) {
        const passwordHash = await bcrypt.hash('admin123', 12)
        await prisma.user.create({
            data: {
                fullName: 'Super Administrator',
                email: 'admin@ceylonrootsholdings.lk',
                username: 'admin123',
                passwordHash,
                role: 'admin',
                isActive: true,
            }
        })
        console.log('✅ Admin user seeded successfully')
    } else {
        console.log('ℹ️ Admin user already exists')
    }
}

seedAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
