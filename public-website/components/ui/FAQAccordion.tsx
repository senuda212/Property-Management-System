'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
    question: string
    answer: string
}

const faqs: FAQItem[] = [
    {
        question: 'How do I list my property with Ceylon Roots Holdings?',
        answer: 'Simply contact us via phone, WhatsApp, or our online contact form. Our team will schedule a property assessment, provide a free valuation, and list your property on our platform within 48 hours.',
    },
    {
        question: 'What areas of Sri Lanka do you cover?',
        answer: 'We cover all major cities and districts across Sri Lanka including Colombo, Galle, Kandy, Negombo, Battaramulla, Nugegoda, Dehiwala, Moratuwa, Kurunegala, and surrounding areas. Our network spans the entire island.',
    },
    {
        question: 'How do I book a property viewing?',
        answer: 'You can book a viewing through our website by filling in the enquiry form on the property page, or by calling us directly at +94 11 234 5678. We offer flexible viewing times including weekends.',
    },
    {
        question: 'What documents do I need to buy a property in Sri Lanka?',
        answer: 'You will need your National Identity Card (NIC) or passport, proof of funds or bank pre-approval, and in some cases a clearance certificate. Our team will guide you through all documentation requirements specific to your transaction.',
    },
    {
        question: 'How long does a property transaction take in Sri Lanka?',
        answer: 'A typical property transaction in Sri Lanka takes between 30–90 days depending on the complexity. This includes title searches, legal due diligence, financing arrangements, and transfer registration. Our team works to streamline the process.',
    },
    {
        question: 'Do you offer property valuation services?',
        answer: 'Yes, we offer professional property valuation services conducted by certified valuers. Our valuations are accepted by all major banks in Sri Lanka and provide an accurate market value assessment for buying, selling or mortgage purposes.',
    },
]

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
                <div
                    key={i}
                    style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(11,31,58,0.06)', border: '1px solid #E8ECF0' }}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#0B1F3A' }}>{faq.question}</span>
                        <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={20} color="#FF6B1A" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ padding: '0 24px 20px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', lineHeight: 1.7, borderTop: '1px solid #E8ECF0', paddingTop: '16px' }}>
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
