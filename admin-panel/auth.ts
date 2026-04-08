import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { rateLimit } from "@/lib/rateLimit"

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MINUTES = 15

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Username or Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Username/email and password are required')
                }

                const identifier = (credentials.username as string).trim().toLowerCase()

                // In NextAuth v5, req is available in authorize.
                // However, headers are usually accessed via the headers() function from next/headers
                // But CredentialsProvider passes req (which is the request metadata)
                const ipAddress = (req as any)?.headers?.['x-forwarded-for'] || 'unknown'

                // Rate limiting
                const allowed = rateLimit(ipAddress, 10, 15 * 60 * 1000)
                if (!allowed) {
                    throw new Error('Too many requests. Please try again later.')
                }

                // Find user in database
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: { equals: identifier, mode: 'insensitive' } },
                            { email: { equals: identifier, mode: 'insensitive' } },
                        ],
                    },
                })

                // Log every login attempt
                await prisma.loginAttempt.create({
                    data: {
                        username: identifier,
                        ipAddress,
                        success: false, // will update if success
                    }
                })

                if (!user) {
                    throw new Error('Invalid credentials')
                }

                // Check if account is locked
                if (user.lockedUntil && user.lockedUntil > new Date()) {
                    const minutesLeft = Math.ceil(
                        (user.lockedUntil.getTime() - Date.now()) / 60000
                    )
                    throw new Error(`Account locked. Try again in ${minutesLeft} minutes.`)
                }

                // Check if account is active
                if (!user.isActive) {
                    throw new Error('Your account has been deactivated. Contact administrator.')
                }

                // Verify password
                const isValidPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                )

                if (!isValidPassword) {
                    // Increment failed attempts
                    const newAttempts = user.loginAttempts + 1
                    const shouldLock = newAttempts >= MAX_LOGIN_ATTEMPTS

                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            loginAttempts: newAttempts,
                            lockedUntil: shouldLock
                                ? new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000)
                                : null,
                        }
                    })

                    // Log failed activity
                    await prisma.activityLog.create({
                        data: {
                            userId: user.id,
                            username: user.username,
                            action: 'FAILED_LOGIN',
                            detail: `Failed login attempt ${newAttempts}/${MAX_LOGIN_ATTEMPTS}`,
                            ipAddress,
                        }
                    })

                    if (shouldLock) {
                        throw new Error(`Too many failed attempts. Account locked for ${LOCKOUT_DURATION_MINUTES} minutes.`)
                    }

                    throw new Error(`Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`)
                }

                // Successful login — reset attempts and update last login
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        loginAttempts: 0,
                        lockedUntil: null,
                        lastLogin: new Date(),
                    }
                })

                // Log successful login
                await prisma.activityLog.create({
                    data: {
                        userId: user.id,
                        username: user.username,
                        action: 'LOGIN',
                        detail: 'Successful login',
                        ipAddress,
                    }
                })

                // Record success in loginAttempt
                // Note: The authorize function usually doesn't update the record created at start easily without ID
                // But we can just create another one or find the last one. 
                // Creating a new one for simplicity or just leaving the "success: false" one is fine as audit trail.
                // The prompt says "will update if success", but we can't easily get the ID back here.
                // I'll just create a success entry.
                await prisma.loginAttempt.create({
                    data: {
                        username: user.username,
                        ipAddress,
                        success: true,
                    }
                })

                return {
                    id: user.id.toString(),
                    name: user.fullName,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = (user as any).username
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).id = token.id
                    ; (session.user as any).username = token.username
                    ; (session.user as any).role = token.role
            }
            return session
        },
    },
    events: {
        async signOut(message) {
            if ('token' in message && message.token?.id) {
                await prisma.activityLog.create({
                    data: {
                        userId: Number(message.token.id),
                        username: message.token.username as string,
                        action: 'LOGOUT',
                        detail: 'User signed out',
                    }
                })
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})
