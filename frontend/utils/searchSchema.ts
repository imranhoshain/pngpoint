export interface SearchSchema {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    potentialAction: {
        "@type": string;
        target: string;
        "query-input": string;
    };
    creator: {
        "@type": string;
        name: string;
    };
    acquireLicensePage: string;
    copyrightNotice: string;
}

export const getSearchSchema = (title: string): SearchSchema => {
    const encodedTitle = encodeURIComponent(title ?? "");
    return {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: title
            ? `Search Results for ${title} PNG Images`
            : "Search Results for PNG Images",
        description: title
            ? `Find high-quality transparent PNG images of ${title} in various categories. Browse search results for free PNG downloads.`
            : "Find high-quality transparent PNG images in various categories. Browse search results for free PNG downloads.",
        url: `https://www.pngpoint.com/?title=${encodedTitle}`,
        potentialAction: {
            "@type": "SearchAction",
            target: `https://www.pngpoint.com/?title=${encodedTitle}`,
            "query-input": `${encodedTitle}`,
        },
        creator: {
            "@type": "Organization",
            name: "pngpoint.com",
        },
        acquireLicensePage: "https://pngpoint.com/license",
        copyrightNotice: "© 2025 pngpoint.com. All rights reserved.",
    };
};
