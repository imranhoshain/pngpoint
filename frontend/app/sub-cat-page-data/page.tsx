"use client";

import { useState } from "react";
import { SERVER_URL } from "@/utils/api";

interface FAQ {
    question: string;
    answer: string;
}

interface PageContentPayload {
    meta_title: string;
    meta_description: string;
    intro_heading: string;
    intro_paragraph_1: string;
    intro_paragraph_2: string;
    seo_heading: string;
    seo_paragraph_1: string;
    seo_paragraph_2: string;
    seo_paragraph_3: string;
    popular_uses_heading: string;
    popular_uses: string[];
    pagination_text_template: string;
    faq_heading: string;
    faqs: FAQ[];
}

export default function SubCategoryPageContentForm() {
    const [slug, setSlug] = useState("");
    const [method, setMethod] = useState<"POST" | "PUT">("POST");
    const [popularUses, setPopularUses] = useState<string[]>([]);
    const [usesInput, setUsesInput] = useState("");
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [status, setStatus] = useState<{ message: string; type: "success" | "error" | "loading" | "" }>({ message: "", type: "" });
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState<Omit<PageContentPayload, "popular_uses" | "faqs">>({
        meta_title: "",
        meta_description: "",
        intro_heading: "",
        intro_paragraph_1: "",
        intro_paragraph_2: "",
        seo_heading: "",
        seo_paragraph_1: "",
        seo_paragraph_2: "",
        seo_paragraph_3: "",
        popular_uses_heading: "",
        pagination_text_template: "",
        faq_heading: "",
    });

    const updateForm = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddUse = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const val = usesInput.trim();
            if (!val) return;
            setPopularUses((prev) => [...prev, val]);
            setUsesInput("");
        }
    };

    const removeUse = (idx: number) => {
        setPopularUses((prev) => prev.filter((_, i) => i !== idx));
    };

    const addFaq = () => {
        setFaqs((prev) => [...prev, { question: "", answer: "" }]);
    };

    const updateFaq = (idx: number, field: keyof FAQ, value: string) => {
        setFaqs((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
    };

    const removeFaq = (idx: number) => {
        setFaqs((prev) => prev.filter((_, i) => i !== idx));
    };

    const resetForm = () => {
        setSlug("");
        setMethod("POST");
        setPopularUses([]);
        setUsesInput("");
        setFaqs([]);
        setStatus({ message: "", type: "" });
        setForm({
            meta_title: "",
            meta_description: "",
            intro_heading: "",
            intro_paragraph_1: "",
            intro_paragraph_2: "",
            seo_heading: "",
            seo_paragraph_1: "",
            seo_paragraph_2: "",
            seo_paragraph_3: "",
            popular_uses_heading: "",
            pagination_text_template: "",
            faq_heading: "",
        });
    };

    const submitForm = async () => {
        if (!slug.trim()) {
            setStatus({ message: "Please enter a sub category slug.", type: "error" });
            return;
        }

        const payload: PageContentPayload = {
            ...form,
            popular_uses: popularUses,
            faqs: faqs.filter((f) => f.question || f.answer),
        };

        setSubmitting(true);
        setStatus({ message: "Submitting...", type: "loading" });

        try {
            const res = await fetch(`${SERVER_URL}/images/sub-categories/${slug.trim()}/page_data`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({
                    message: method === "POST" ? "Page content created successfully." : "Page content updated successfully.",
                    type: "success",
                });
            } else {
                setStatus({
                    message: `Error: ${data.detail || JSON.stringify(data)}`,
                    type: "error",
                });
            }
        } catch (err: unknown) {
            setStatus({
                message: `Network error: ${err instanceof Error ? err.message : "Unknown error"}`,
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Sub Category Page Content</h1>
                <p className="text-sm text-gray-500 mt-1">Create or update SEO content, meta tags, and FAQ for a sub category page.</p>
            </div>

            {/* Slug + Method */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-sm font-medium text-gray-500 whitespace-nowrap">Sub category slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. aquatic-animals-png"
                        className="flex-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-gray-400"
                    />
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden text-sm font-medium shrink-0">
                        <button
                            onClick={() => setMethod("POST")}
                            className={`px-4 py-2 transition-colors ${method === "POST" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                        >
                            POST
                        </button>
                        <button
                            onClick={() => setMethod("PUT")}
                            className={`px-4 py-2 transition-colors ${method === "PUT" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                        >
                            PUT
                        </button>
                    </div>
                </div>
            </div>

            {/* Meta Tags */}
            <SectionCard title="Meta Tags" dotColor="bg-violet-500">
                <div className="flex flex-col gap-3">
                    <Field label={`Meta title (${form.meta_title.length} / 255)`}>
                        <input
                            type="text"
                            value={form.meta_title}
                            onChange={(e) => updateForm("meta_title", e.target.value)}
                            maxLength={255}
                            placeholder="Aquatic Animals PNG Images – Free Transparent Download | PNGPoint"
                            className="input"
                        />
                    </Field>
                    <Field label={`Meta description (${form.meta_description.length} / 320)`}>
                        <textarea
                            value={form.meta_description}
                            onChange={(e) => updateForm("meta_description", e.target.value)}
                            maxLength={320}
                            rows={3}
                            placeholder="Download aquatic animals PNG images with transparent background..."
                            className="input resize-none"
                        />
                    </Field>
                </div>
            </SectionCard>

            {/* Top Intro */}
            <SectionCard title="Top Intro" dotColor="bg-emerald-500">
                <div className="flex flex-col gap-3">
                    <Field label="H1 heading">
                        <input
                            type="text"
                            value={form.intro_heading}
                            onChange={(e) => updateForm("intro_heading", e.target.value)}
                            placeholder="Aquatic Animals PNG Images (Transparent Background)"
                            className="input"
                        />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Intro paragraph 1">
                            <textarea
                                value={form.intro_paragraph_1}
                                onChange={(e) => updateForm("intro_paragraph_1", e.target.value)}
                                rows={4}
                                placeholder="Explore a wide collection of high-quality aquatic animals PNG images..."
                                className="input resize-none"
                            />
                        </Field>
                        <Field label="Intro paragraph 2">
                            <textarea
                                value={form.intro_paragraph_2}
                                onChange={(e) => updateForm("intro_paragraph_2", e.target.value)}
                                rows={4}
                                placeholder="Our aquatic animals PNG images are carefully selected..."
                                className="input resize-none"
                            />
                        </Field>
                    </div>
                </div>
            </SectionCard>

            {/* Bottom SEO Content */}
            <SectionCard title="Bottom SEO Content" dotColor="bg-blue-500">
                <div className="flex flex-col gap-3">
                    <Field label="H2 heading">
                        <input
                            type="text"
                            value={form.seo_heading}
                            onChange={(e) => updateForm("seo_heading", e.target.value)}
                            placeholder="About Aquatic Animals PNG Collection"
                            className="input"
                        />
                    </Field>
                    <Field label="SEO paragraph 1">
                        <textarea
                            value={form.seo_paragraph_1}
                            onChange={(e) => updateForm("seo_paragraph_1", e.target.value)}
                            rows={3}
                            placeholder="Aquatic animals are creatures that live in water environments..."
                            className="input resize-none"
                        />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="SEO paragraph 2">
                            <textarea
                                value={form.seo_paragraph_2}
                                onChange={(e) => updateForm("seo_paragraph_2", e.target.value)}
                                rows={4}
                                placeholder="All images on this page come with transparent backgrounds..."
                                className="input resize-none"
                            />
                        </Field>
                        <Field label="SEO paragraph 3">
                            <textarea
                                value={form.seo_paragraph_3}
                                onChange={(e) => updateForm("seo_paragraph_3", e.target.value)}
                                rows={4}
                                placeholder="Our library is regularly updated with new images..."
                                className="input resize-none"
                            />
                        </Field>
                    </div>
                    <Field label="H3 heading (popular uses)">
                        <input
                            type="text"
                            value={form.popular_uses_heading}
                            onChange={(e) => updateForm("popular_uses_heading", e.target.value)}
                            placeholder="Popular Uses of Aquatic Animals PNG Images"
                            className="input"
                        />
                    </Field>
                    <Field label="Popular uses (press Enter to add)">
                        <div
                            className="flex flex-wrap gap-2 border border-gray-200 rounded-lg px-3 py-2 min-h-[44px] bg-gray-50 cursor-text focus-within:border-gray-400"
                            onClick={() => document.getElementById("uses-input")?.focus()}
                        >
                            {popularUses.map((use, i) => (
                                <span key={i} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700">
                                    {use}
                                    <button onClick={() => removeUse(i)} className="text-gray-400 hover:text-red-500 text-sm leading-none ml-1">×</button>
                                </span>
                            ))}
                            <input
                                id="uses-input"
                                value={usesInput}
                                onChange={(e) => setUsesInput(e.target.value)}
                                onKeyDown={handleAddUse}
                                placeholder={popularUses.length === 0 ? "Type a use case and press Enter..." : ""}
                                className="bg-transparent outline-none text-sm text-gray-700 min-w-[180px] flex-1"
                            />
                        </div>
                    </Field>
                </div>
            </SectionCard>

            {/* Pagination Text */}
            <SectionCard title="Pagination Text" dotColor="bg-gray-400">
                <Field label="Pagination template — use {page} and {name} as placeholders">
                    <textarea
                        value={form.pagination_text_template}
                        onChange={(e) => updateForm("pagination_text_template", e.target.value)}
                        rows={2}
                        placeholder="You're browsing page {page} of our {name} PNG collection. Explore more pages to discover additional high-quality transparent images."
                        className="input resize-none"
                    />
                </Field>
            </SectionCard>

            {/* FAQ Section */}
            <SectionCard title="FAQ Section" dotColor="bg-orange-500">
                <div className="flex flex-col gap-3">
                    <Field label="FAQ section heading">
                        <input
                            type="text"
                            value={form.faq_heading}
                            onChange={(e) => updateForm("faq_heading", e.target.value)}
                            placeholder="Frequently Asked Questions (FAQ)"
                            className="input"
                        />
                    </Field>
                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="relative border border-gray-200 rounded-xl p-4 bg-gray-50">
                                <button
                                    onClick={() => removeFaq(idx)}
                                    className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-lg leading-none"
                                >×</button>
                                <div className="flex flex-col gap-2 pr-6">
                                    <Field label={`Question ${idx + 1}`}>
                                        <input
                                            type="text"
                                            value={faq.question}
                                            onChange={(e) => updateFaq(idx, "question", e.target.value)}
                                            placeholder="Are these images free to download?"
                                            className="input"
                                        />
                                    </Field>
                                    <Field label="Answer">
                                        <textarea
                                            value={faq.answer}
                                            onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                                            rows={2}
                                            placeholder="Yes, all images are available for free download..."
                                            className="input resize-none"
                                        />
                                    </Field>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addFaq}
                        className="w-full py-2.5 text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        + Add FAQ item
                    </button>
                </div>
            </SectionCard>

            {/* Status */}
            {status.message && (
                <div className={`px-4 py-3 rounded-xl text-sm mb-4 ${
                    status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" :
                    status.type === "error" ? "bg-red-50 text-red-700 border border-red-200" :
                    "bg-gray-50 text-gray-600 border border-gray-200"
                }`}>
                    {status.message}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={resetForm}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Reset
                </button>
                <button
                    onClick={submitForm}
                    disabled={submitting}
                    className="flex-1 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {submitting ? "Submitting..." : method === "POST" ? "Create page content" : "Update page content"}
                </button>
            </div>
        </div>
    );
}

function SectionCard({ title, dotColor, children }: { title: string; dotColor: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</span>
            </div>
            {children}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">{label}</label>
            {children}
        </div>
    );
}