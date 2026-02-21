import Sidebar from '@/components/layout/Sidebar'
import TopHeader from '@/components/layout/TopHeader'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex bg-off-white">
            <Sidebar />
            <main className="flex-1 transition-all duration-300 ml-60">
                <TopHeader />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
