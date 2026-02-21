import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Mail } from 'lucide-react'

export default async function RecentInquiries() {
    const inquiries = await prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-grey-light flex justify-between items-center">
                <h3 className="text-lg font-serif font-bold text-dark-blue">Recent Inquiries</h3>
                <Link href="/inquiries" className="text-brand-orange text-sm font-bold hover:underline">
                    View All →
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-off-white text-grey-dark text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Property</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-grey-light">
                        {inquiries.map((inquiry) => (
                            <tr key={inquiry.id} className="hover:bg-grey-light/30 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-dark-blue">{inquiry.fullName}</p>
                                    <p className="text-xs text-grey-mid">{inquiry.email}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-grey-dark">
                                    {inquiry.propertyTitle || 'General Inquiry'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${inquiry.status === 'Unread' ? 'bg-brand-orange/10 text-brand-orange' :
                                            inquiry.status === 'Read' ? 'bg-grey-mid/10 text-grey-mid' : 'bg-success-green/10 text-success-green'
                                        }`}>
                                        {inquiry.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-grey-mid">
                                    {new Date(inquiry.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-grey-mid">
                                    <Mail className="mx-auto mb-2 opacity-20" size={40} />
                                    No inquiries yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
