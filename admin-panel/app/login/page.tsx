'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                username: data.username,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                toast.error('Invalid username or password')
            } else {
                toast.success('Welcome back, Admin!')
                router.push('/dashboard')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#0B1F3A_0%,#1A3560_50%,#0B1F3A_100%)] flex items-center justify-center p-4">
            {/* Background Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-10 relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-dark-blue">
                        CRH<span className="text-brand-orange">.</span>
                    </h1>
                    <p className="text-grey-mid text-xs mt-1">Ceylon Roots Holdings</p>
                    <p className="text-grey-mid text-sm uppercase tracking-widest mt-1">Admin Panel</p>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto mt-4" />
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-serif font-bold text-dark-blue">Welcome Back</h2>
                    <p className="text-grey-mid text-sm">Sign in to manage your properties</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-dark-blue mb-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={18} />
                            <input
                                {...register('username')}
                                type="text"
                                placeholder="Enter username"
                                className={`w-full bg-off-white border ${errors.username ? 'border-danger-red' : 'border-grey-light'} rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-dark-blue transition-all`}
                            />
                        </div>
                        {errors.username && <p className="text-danger-red text-xs mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-blue mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-mid" size={18} />
                            <input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                className={`w-full bg-off-white border ${errors.password ? 'border-danger-red' : 'border-grey-light'} rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-dark-blue transition-all`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-mid hover:text-dark-blue"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-danger-red text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[linear-gradient(90deg,#FF6B1A_0%,#FF8C42_100%)] text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="text-center text-grey-mid text-xs mt-10">
                    Ceylon Roots Holdings © 2025
                </p>
            </motion.div>
        </div>
    )
}
