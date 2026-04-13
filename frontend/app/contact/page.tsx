"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, getSiteHostname } from "@/config/site";
import { Header } from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { SERVER_URL } from "@/utils/api";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

export default function Contact() {
    const hostname = getSiteHostname();
    const supportEmail = `support@${hostname}`;

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [state, setState] = useState<FormState>({
        loading: false,
        success: false,
        error: null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { name, email, subject, message } = formData;
        if (!name || !email || !subject || !message) {
            setState({ loading: false, success: false, error: "All fields are required." });
            return;
        }

        setState({ loading: true, success: false, error: null });

        try {
            const res = await fetch(`${SERVER_URL}/images/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.detail || "Something went wrong. Please try again.");
            }

            setState({ loading: false, success: true, error: null });
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (err: unknown) {
            setState({
                loading: false,
                success: false,
                error: err instanceof Error ? err.message : "Something went wrong.",
            });
        }
    };

    return (
        <>
            <Header />

            {/* ── Hero Banner ── */}
            <section className="relative w-full bg-[#00bcd4] overflow-hidden">
                <span className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
                <span className="pointer-events-none absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-white/5" />
                <span className="pointer-events-none absolute top-10 right-1/4 w-32 h-32 rounded-full bg-white/5" />

                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 py-16 lg:py-24 relative z-10">
                    <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Contact</span>
                    </nav>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white uppercase tracking-tight leading-tight max-w-2xl">
                        Get In<br />Touch With Us
                    </h1>
                    <p className="mt-4 text-white/80 text-sm lg:text-base max-w-lg">
                        Thank you for your interest in {siteConfig.siteName}. Whether you have a question about our PNG images,
                        need help navigating the platform, or want to collaborate — our team is ready to help.
                    </p>
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="relative top-0 left-0 right-0 py-10 lg:py-20 w-full bg-[#FBFAFF]">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

                        {/* ── Left: Info Cards ── */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <InfoCard
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                                    </svg>
                                }
                                title="Email Us"
                                value={supportEmail}
                                sub="We reply within 24 hours"
                                href={`mailto:${supportEmail}`}
                            />
                            <InfoCard
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                title="Support Hours"
                                value="Mon – Fri, 9 AM – 6 PM"
                                sub="Weekend responses may be delayed"
                            />
                            <InfoCard
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                }
                                title="FAQ"
                                value="Browse our help center"
                                sub="Quick answers to common questions"
                                href="/faq/"
                            />

                            {/* Social Row */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Follow Us</p>
                                <div className="flex flex-row flex-wrap items-center gap-3">
                                    {[
                                        { href: "https://x.com/pngbay", label: "X" },
                                        { href: "https://www.facebook.com/pngbay", label: "Facebook" },
                                        { href: "https://www.pinterest.com/pngbay", label: "Pinterest" },
                                        { href: "https://www.instagram.com/pngba_y", label: "Instagram" },
                                    ].map((s) => (
                                        <Link
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            className="text-xs font-medium uppercase text-[#0077a2] border border-[#0077a2]/30 rounded-full px-3 py-1.5 hover:bg-[#0077a2] hover:text-white transition-all duration-200"
                                        >
                                            {s.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Form ── */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-10">
                                <h2 className="text-xl lg:text-2xl font-semibold uppercase text-gray-800 mb-1">Send a Message</h2>
                                <p className="text-sm text-gray-400 mb-8">We read every message and respond personally.</p>

                                {/* Success */}
                                {state.success && (
                                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-4">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-semibold text-green-700">Message sent successfully!</p>
                                            <p className="text-xs text-green-600 mt-0.5">Thanks for reaching out. We&apos;ll get back to you soon.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {state.error && (
                                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-4">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <p className="text-sm text-red-600">{state.error}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Field label="Your Name" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                                    <Field label="Email Address" id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                                    <div className="sm:col-span-2">
                                        <Field label="Subject" id="subject" placeholder="What's this about?" value={formData.subject} onChange={handleChange} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            placeholder="Write your message here..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 bg-[#FBFAFF] px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#0077a2] focus:ring-2 focus:ring-[#0077a2]/10 resize-none transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={state.loading}
                                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0077a2] hover:bg-[#005f82] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold uppercase text-sm tracking-wider px-10 py-3.5 rounded-xl transition-colors duration-200"
                                >
                                    {state.loading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

/* ── Sub-components ── */

function InfoCard({
    icon,
    title,
    value,
    sub,
    href,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    sub: string;
    href?: string;
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
            <span className="shrink-0 w-11 h-11 rounded-xl bg-[#0077a2]/10 text-[#0077a2] flex items-center justify-center">
                {icon}
            </span>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{title}</p>
                {href ? (
                    <Link href={href} className="text-sm font-semibold text-[#0077a2] hover:underline mt-0.5 block">
                        {value}
                    </Link>
                ) : (
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
        </div>
    );
}

function Field({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
}: {
    label: string;
    id: keyof FormData;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-200 bg-[#FBFAFF] px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#0077a2] focus:ring-2 focus:ring-[#0077a2]/10 transition-all duration-200"
            />
        </div>
    );
}