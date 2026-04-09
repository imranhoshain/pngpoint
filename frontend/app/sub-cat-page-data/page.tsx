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

interface ParsedContent {
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
    faq_heading: string;
    faqs: FAQ[];
}

function parseContentBlock(raw: string): ParsedContent {
    const result: ParsedContent = {
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
        popular_uses: [],
        faq_heading: "",
        faqs: [],
    };

    const strip = (html: string) =>
        html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

    // Meta title: <title>...</title>
    const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/i);
    if (titleMatch) result.meta_title = strip(titleMatch[1]);

    // Meta description: content="..."
    const descMatch = raw.match(/name=["']description["'][^>]*content=["']([\s\S]*?)["']/i)
        || raw.match(/content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
    if (descMatch) result.meta_description = strip(descMatch[1]);

    // H1
    const h1Match = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) {
        result.intro_heading = strip(h1Match[1]);
    }

    // All <p> tags in order
    const allParas: string[] = [];
    const paraRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pm;
    while ((pm = paraRegex.exec(raw)) !== null) {
        const text = strip(pm[1]);
        if (text) allParas.push(text);
    }

    // Determine split point: paragraphs before first <h2> are "intro", after are "seo"
    const h2FirstIdx = raw.search(/<h2[^>]*>/i);
    const introParas: string[] = [];
    const seoParas: string[] = [];

    const allParaMatches: { text: string; index: number }[] = [];
    const paraRegex2 = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pm2;
    while ((pm2 = paraRegex2.exec(raw)) !== null) {
        const text = strip(pm2[1]);
        if (text) allParaMatches.push({ text, index: pm2.index });
    }

    for (const p of allParaMatches) {
        if (h2FirstIdx === -1 || p.index < h2FirstIdx) {
            introParas.push(p.text);
        } else {
            seoParas.push(p.text);
        }
    }

    result.intro_paragraph_1 = introParas[0] || "";
    result.intro_paragraph_2 = introParas[1] || "";
    result.seo_paragraph_1 = seoParas[0] || "";
    result.seo_paragraph_2 = seoParas[1] || "";
    result.seo_paragraph_3 = seoParas[2] || "";

    // H2 tags — first h2 = seo_heading, second h2 = faq_heading
    const h2Matches: string[] = [];
    const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    let h2m;
    while ((h2m = h2Regex.exec(raw)) !== null) {
        h2Matches.push(strip(h2m[1]));
    }
    result.seo_heading = h2Matches[0] || "";
    result.faq_heading = h2Matches[1] || "Frequently Asked Questions";

    // H3 = popular_uses_heading
    const h3Match = raw.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    if (h3Match) result.popular_uses_heading = strip(h3Match[1]);

    // <ul><li> items = popular_uses
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let lim;
    while ((lim = liRegex.exec(raw)) !== null) {
        const text = strip(lim[1]);
        if (text) result.popular_uses.push(text);
    }

    // FAQs: <h4>question</h4><p>answer</p> pairs
    const faqRegex = /<h4[^>]*>([\s\S]*?)<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let faqm;
    while ((faqm = faqRegex.exec(raw)) !== null) {
        result.faqs.push({
            question: strip(faqm[1]),
            answer: strip(faqm[2]),
        });
    }

    return result;
}

export default function SubCategoryPageContentForm() {
    const [slug, setSlug] = useState("");
    const [rawContent, setRawContent] = useState("");
    const [method, setMethod] = useState<"POST" | "PUT">("POST");
    const [parsed, setParsed] = useState<ParsedContent | null>(null);
    const [parseError, setParseError] = useState("");
    const [paginationTemplate, setPaginationTemplate] = useState("");
    const [status, setStatus] = useState<{ message: string; type: "success" | "error" | "loading" | "" }>({ message: "", type: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleParse = () => {
        if (!rawContent.trim()) {
            setParseError("Please paste the content first.");
            return;
        }
        try {
            const result = parseContentBlock(rawContent);
            setParsed(result);
            setParseError("");
        } catch {
            setParseError("Failed to parse content. Please check the format.");
        }
    };

    const resetForm = () => {
        setSlug("");
        setRawContent("");
        setParsed(null);
        setParseError("");
        setPaginationTemplate("");
        setStatus({ message: "", type: "" });
        setMethod("POST");
    };

    const submitForm = async () => {
        if (!slug.trim()) {
            setStatus({ message: "Please enter a sub category slug.", type: "error" });
            return;
        }
        if (!parsed) {
            setStatus({ message: "Please parse the content first.", type: "error" });
            return;
        }

        const payload: PageContentPayload = {
            ...parsed,
            pagination_text_template: paginationTemplate,
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
                <p className="text-sm text-gray-500 mt-1">Paste the raw content block — it will be parsed automatically into all required fields.</p>
            </div>

            {/* Slug + Method */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-sm font-medium text-gray-500 whitespace-nowrap">Sub category slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. houses-homes-png"
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

            {/* Raw Content Input */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Raw Content</span>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-medium text-gray-500">
                        Paste the full content block (meta title, meta description, H1, paragraphs, H2, H3, FAQs, etc.)
                    </label>
                    <textarea
                        value={rawContent}
                        onChange={(e) => { setRawContent(e.target.value); setParsed(null); setParseError(""); }}
                        rows={14}
                        placeholder={`🔹 Meta Title\n<title>Houses & Homes PNG – Free Transparent House, Home, Cottage PNG Images</title>\n🔹 Meta Description\n<meta name="description" content="...">\n<!-- 🔼 TOP INTRO -->\n<h1>Houses & Homes PNG Images (Transparent Background)</h1>\n<p>Intro paragraph 1...</p>\n...`}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 font-mono focus:outline-none focus:border-gray-400 resize-y"
                    />
                    {parseError && (
                        <p className="text-xs text-red-500">{parseError}</p>
                    )}
                    <button
                        onClick={handleParse}
                        className="self-start px-5 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
                    >
                        Parse Content
                    </button>
                </div>
            </div>

            {/* Parsed Preview */}
            {parsed && (
                <>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-emerald-700 font-medium">Content parsed successfully — review below before submitting.</span>
                    </div>

                    {/* Meta Tags Preview */}
                    <SectionCard title="Meta Tags" dotColor="bg-violet-500">
                        <PreviewField label="Meta title" value={parsed.meta_title} />
                        <PreviewField label="Meta description" value={parsed.meta_description} />
                    </SectionCard>

                    {/* Top Intro Preview */}
                    <SectionCard title="Top Intro" dotColor="bg-emerald-500">
                        <PreviewField label="H1 heading" value={parsed.intro_heading} />
                        <PreviewField label="Intro paragraph 1" value={parsed.intro_paragraph_1} />
                        <PreviewField label="Intro paragraph 2" value={parsed.intro_paragraph_2} />
                    </SectionCard>

                    {/* Bottom SEO Preview */}
                    <SectionCard title="Bottom SEO Content" dotColor="bg-blue-500">
                        <PreviewField label="H2 heading" value={parsed.seo_heading} />
                        <PreviewField label="SEO paragraph 1" value={parsed.seo_paragraph_1} />
                        <PreviewField label="SEO paragraph 2" value={parsed.seo_paragraph_2} />
                        <PreviewField label="SEO paragraph 3" value={parsed.seo_paragraph_3} />
                        <PreviewField label="Popular uses heading (H3)" value={parsed.popular_uses_heading} />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">Popular uses ({parsed.popular_uses.length} items)</label>
                            <div className="flex flex-wrap gap-2">
                                {parsed.popular_uses.length > 0 ? parsed.popular_uses.map((u, i) => (
                                    <span key={i} className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700">{u}</span>
                                )) : <span className="text-xs text-gray-400 italic">None found</span>}
                            </div>
                        </div>
                    </SectionCard>

                    {/* Pagination Text */}
                    <SectionCard title="Pagination Text" dotColor="bg-gray-400">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500">Pagination template — use {"{page}"} and {"{name}"} as placeholders</label>
                            <textarea
                                value={paginationTemplate}
                                onChange={(e) => setPaginationTemplate(e.target.value)}
                                rows={2}
                                placeholder="You're browsing page {page} of our {name} PNG collection. Explore more pages to discover additional high-quality transparent images."
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-gray-400 resize-none"
                            />
                        </div>
                    </SectionCard>

                    {/* FAQ Preview */}
                    <SectionCard title="FAQ Section" dotColor="bg-orange-500">
                        <PreviewField label="FAQ heading" value={parsed.faq_heading} />
                        <div className="flex flex-col gap-2 mt-1">
                            {parsed.faqs.length > 0 ? parsed.faqs.map((faq, i) => (
                                <div key={i} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                                    <p className="text-xs font-semibold text-gray-600 mb-1">Q{i + 1}: {faq.question}</p>
                                    <p className="text-xs text-gray-500">{faq.answer}</p>
                                </div>
                            )) : <span className="text-xs text-gray-400 italic">No FAQs found</span>}
                        </div>
                    </SectionCard>
                </>
            )}

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
                    disabled={submitting || !parsed}
                    className="flex-1 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
            <div className="flex flex-col gap-3">{children}</div>
        </div>
    );
}

function PreviewField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">{label}</label>
            <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 min-h-[38px] whitespace-pre-wrap">
                {value || <span className="text-gray-300 italic">Not found</span>}
            </div>
        </div>
    );
}