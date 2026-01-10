import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
    "id": 1,
    "question": "What is a PNG image and why is it popular for free downloads?",
    "answer": "A PNG image is a high-quality image format that supports transparent backgrounds. It is popular for free downloads because designers can place it on any background without extra editing, and PNG files preserve sharp edges and clear details."
  },
  {
    "id": 2,
    "question": "Where can I legally download free PNG images?",
    "answer": "You can legally download free PNG images from trusted websites that clearly display license information. These platforms explain how images can be used, so always review the license before downloading."
  },
  {
    "id": 3,
    "question": "Do free PNGs come with transparent backgrounds?",
    "answer": "Many free PNGs include transparent backgrounds, but not all of them. Transparent PNGs are usually labeled clearly, so it's best to check the preview or file details."
  },
  {
    "id": 4,
    "question": "Are free PNGs safe to download?",
    "answer": "Yes, free PNGs are safe to download when sourced from reputable websites. Trusted sites scan files and provide clear usage terms. Avoid unknown or misleading download pages."
  },
  {
    "id": 5,
    "question": "Can I use free PNGs for commercial projects?",
    "answer": "Yes, many free PNGs allow commercial use depending on their license. This includes use in websites, advertisements, and products. Always confirm the license before using them commercially."
  },
  {
    "id": 6,
    "question": "Do I need to credit the creator when using a free PNG?",
    "answer": "Some free PNGs require attribution, while others do not. The requirement depends on the license, and if credit is needed, it is usually mentioned clearly."
  },
  {
    "id": 7,
    "question": "What resolution or size should I look for in a free PNG?",
    "answer": "You should choose a PNG with high resolution for better quality. Large images are ideal for print and detailed designs, while smaller PNGs are suitable for web use."
  },
  {
    "id": 8,
    "question": "Can I edit or modify free PNGs?",
    "answer": "In most cases, free PNGs can be edited. This includes resizing, cropping, and changing colors. Any restrictions on editing are listed in the license terms."
  },
  {
    "id": 9,
    "question": "How do I verify the license of a free PNG?",
    "answer": "You can verify the license by checking the image's download page. Look for a license section or usage notes to understand how the image can be used."
  },
  {
    "id": 10,
    "question": "Are there free PNG collections with icons and logos?",
    "answer": "Yes, many websites offer free PNG collections that include icons and logos. These are useful for apps, websites, and presentations, but branding and trademark rules should always be checked."
  },
  {
    "id": 11,
    "question": "Can I download multiple PNGs at once?",
    "answer": "Some platforms allow bulk or pack downloads, while others only offer single-image downloads. This depends on how the website organizes its image library."
  },
  {
    "id": 12,
    "question": "What about PNGs with backgrounds (non-transparent)?",
    "answer": "Not all PNG images are transparent. Some include solid or styled backgrounds, which work well for posters, banners, and social media graphics."
  },
  {
    "id": 13,
    "question": "How do PNGs compare to SVGs for web design?",
    "answer": "PNGs are image-based and easy to use across platforms, while SVGs are vector-based and scale without quality loss. PNGs are better for detailed visuals, whereas SVGs are ideal for icons and simple shapes."
  },
  {
    "id": 14,
    "question": "Can I use free PNGs in print projects?",
    "answer": "Yes, free PNGs can be used in print projects if the resolution is high enough. Always check the DPI, image size, and ensure the license allows print usage."
  },
  {
    "id": 15,
    "question": "What should I do if I can't find a suitable free PNG image?",
    "answer": "You can try different keywords, browse related categories, or combine multiple PNGs creatively. If needed, custom design tools can help you create the image you want."
  }
];

const renderAnswerWithLink = (answer: string, id: number) => {
  // Only apply link to FAQ #9
  if (id === 9) {
    const parts = answer.split(/(license)/gi);
    return parts.map((part, index) => {
      if (part.toLowerCase() === 'license') {
        return (
          <a
            key={index}
            href="https://pngpoint.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077a2] hover:text-[#005a7d] underline font-medium"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  }
  return answer;
};

export default function HomeFAQ() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-3 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-2xl">
                            Find answers to common questions about our PNG images, downloads, and usage
                        </p>
                    </div>

                    {/* FAQ Items - Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 w-full">
                        {faqData.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-fit"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full flex justify-between items-center p-4 md:p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                                    aria-expanded={openId === faq.id}
                                >
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 pr-4">
                                        {faq.question}
                                    </h3>
                                    <span className="flex-shrink-0 text-[#0077a2]">
                                        {openId === faq.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>
                                
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div className="p-4 md:p-5 pt-0 md:pt-0 border-t border-gray-100">
                                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {renderAnswerWithLink(faq.answer, faq.id)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}