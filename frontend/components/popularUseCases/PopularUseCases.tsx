/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Palette, GraduationCap, Globe, Building2, Presentation, Users, Briefcase, TrendingUp, FileText, Coffee, UtensilsCrossed, Layers } from "lucide-react";

interface PopularUseCasesProps {
    categorySlug?: string;
}

export const PopularUseCases = ({ categorySlug }: PopularUseCasesProps) => {
    // Animals content
    const animalsContent = {
        title: "Popular Use Cases",
        description: "Over the years, we've noticed one common problem—people spend too much time fixing images instead of using them. That's where clean animal PNGs make life easier. When the background is already transparent, you can focus on your work, not editing.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "If you design banners, posters, or brand visuals, animal PNGs save hours. We've used them in print layouts and logos where sharp edges and clean transparency really matter. They drop straight into the design and just work."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and parents often need visuals that kids understand fast. Animal PNGs help explain lessons, create worksheets, and build learning slides without confusion. Simple images keep students focused on learning, not clutter."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "For websites, blogs, and campaigns, animal PNGs add personality without slowing pages down. We've seen them boost engagement when used in headers, thumbnails, and featured sections."
            },
            {
                icon: Building2,
                title: "Industry-Specific",
                description: "Pet bloggers, vet clinics, animal NGOs, zoos, and aquariums use these images to communicate clearly and emotionally. The right visual helps tell the story better than words alone."
            }
        ]
    };

    // Buildings & Architecture content
    const buildingsContent = {
        title: "Popular Use Cases",
        description: "Architecture PNGs solve a real problem: finding clean, professional building visuals that work immediately. Whether you're pitching a design, building a presentation, or creating marketing materials, transparent backgrounds and high-resolution quality save hours of editing time.",
        useCases: [
            {
                icon: Presentation,
                title: "For Architects & Designers",
                description: "Architects and interior designers use building PNGs in presentations, mood boards, and client proposals. Clean visuals with transparent backgrounds integrate seamlessly into design software, helping communicate concepts clearly without distracting elements."
            },
            {
                icon: TrendingUp,
                title: "For Real Estate & Marketing",
                description: "Real estate agencies, property developers, and marketing teams rely on architecture PNGs for brochures, websites, and social media campaigns. Professional building visuals enhance credibility and help properties stand out in competitive markets."
            },
            {
                icon: GraduationCap,
                title: "For Education & Training",
                description: "Educational institutions and training programs use architecture PNGs in course materials, textbooks, and e-learning platforms. Clear building illustrations help students understand architectural concepts, urban planning, and construction principles effectively."
            },
            {
                icon: Briefcase,
                title: "For Business & Development",
                description: "Construction companies, urban planners, and business consultants leverage building PNGs for reports, feasibility studies, and project documentation. High-quality architectural visuals add professionalism to business communications and development proposals."
            }
        ]
    };

    const businessContent = {
        title: "Popular Use Cases",
        description: "One thing I've learned over time—business teams lose hours fixing visuals. Clean PNGs remove that problem. When assets are transparent and consistent, work moves faster.",
        useCases: [
            {
                icon: Presentation,
                title: "For Designers & Marketers",
                description: "Business PNGs work perfectly for ads, landing pages, and social creatives. I've used them in campaigns where speed and clarity mattered most."
            },
            {
                icon: TrendingUp,
                title: "For Presentations & Reports",
                description: "Consultants and teams use these PNGs in pitch decks and reports to explain ideas clearly without clutter."
            },
            {
                icon: GraduationCap,
                title: "For Web & Digital Media",
                description: "Business PNGs improve UI sections, blog visuals, and feature blocks without slowing down pages."
            },
            {
                icon: Briefcase,
                title: "Industry-Specific",
                description: "Startups, agencies, SaaS companies, educators, and corporate teams rely on these visuals to communicate ideas clearly and professionally."
            }
        ]
    };

    // Culture & Religion content
    const cultureReligionContent = {
        title: "Popular Use Cases",
        description: "One common challenge appears again and again—explaining cultural or religious topics clearly without visual confusion. Clean PNG images solve that problem by removing background noise and focusing attention on meaning.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers & Creators",
                description: "Designers use Culture and Religion PNGs in posters, campaigns, and digital artwork. Transparent backgrounds help visuals blend smoothly into layouts without extra editing."
            },
            {
                icon: GraduationCap,
                title: "For Education & Learning",
                description: "Teachers and institutions rely on clear visuals to explain beliefs, traditions, and history. These PNGs support lessons, slides, worksheets, and e-learning materials with visual clarity."
            },
            {
                icon: FileText,
                title: "For Media & Editorial",
                description: "Journalists, bloggers, and publishers use these assets to add context to articles about faith, traditions, and cultural events without misrepresentation."
            },
            {
                icon: Users,
                title: "Industry-Specific",
                description: "NGOs, cultural organizations, museums, religious institutions, and community platforms use these PNGs to communicate respectfully and consistently across media."
            }
        ]
    };

    // Drinks content
    const drinksContent = {
        title: "Popular Use Cases",
        description: "Clean Drinks PNGs save hours that would otherwise be spent on editing. Perfect for designers, marketers, and content creators.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Use drinks PNGs for banners, posters, packaging, or social media visuals. Drop them straight into your design software for immediate use."
            },
            {
                icon: TrendingUp,
                title: "For Marketing & Social Media",
                description: "Create ads, Instagram posts, and campaign visuals quickly with high-quality beverage graphics."
            },
            {
                icon: GraduationCap,
                title: "For Education & Presentations",
                description: "Teachers and presenters can visually illustrate topics like nutrition, health, or beverage culture using these PNGs."
            },
            {
                icon: Coffee,
                title: "Industry-Specific",
                description: "Cafes, restaurants, bars, beverage brands, and bloggers use these visuals to communicate clearly and professionally."
            }
        ]
    };

    // Food content
    const foodContent = {
        title: "Popular Use Cases",
        description: "People often lose time fixing food images instead of using them. Transparent Food PNGs remove that hassle. When the background is already clean, work becomes easier.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Menu designs, posters, ads, and packaging need clean visuals. Food PNGs drop straight into layouts and keep designs sharp and professional."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and students use food PNGs for lessons, charts, and presentations. Simple visuals help explain nutrition, meals, and food groups clearly."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Food bloggers, recipe sites, and marketers use PNGs in headers, thumbnails, and social posts. Clean images improve clarity and engagement."
            },
            {
                icon: UtensilsCrossed,
                title: "Industry-Specific",
                description: "Restaurants, cafes, food brands, delivery apps, and nutrition platforms use food PNGs to communicate faster and connect visually."
            }
        ]
    };

    // Graphic Resources content
    const graphicResourcesContent = {
        title: "Popular Use Cases",
        description: "Many creators lose time fixing design assets instead of using them. Clean graphic resources eliminate that problem by offering ready-to-use visuals that fit seamlessly into projects.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Graphic resources streamline banner design, branding, and layout work. Clean vectors and icons drop directly into tools like Figma, Illustrator, or Photoshop with minimal adjustment."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Educators rely on clear visuals to explain ideas quickly. Graphic resources help build worksheets, presentations, and learning materials without visual clutter."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Websites, blogs, and digital campaigns benefit from lightweight, consistent graphics. Well-designed visuals improve engagement without slowing performance."
            },
            {
                icon: Layers,
                title: "Industry-Specific",
                description: "Startups, agencies, SaaS products, marketers, and content creators use graphic resources to communicate clearly and professionally across platforms."
            }
        ]
    };

    // Hobbies & Leisure content
    const hobbiesLeisureContent = {
        title: "Popular Use Cases",
        description: "Many people struggle with visuals that don't fit their creative ideas. Clean Hobbies and Leisure graphics remove that problem. When assets are ready to use, projects move faster and feel more enjoyable.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Designers use leisure graphics for posters, banners, and lifestyle branding. Clean icons and illustrations drop directly into layouts and stay consistent across designs."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and students use hobby visuals to explain activities, projects, and interests. Simple graphics support understanding without distraction."
            },
            {
                icon: Globe,
                title: "For Web & Social Media",
                description: "Blogs, websites, and social platforms use Hobbies and Leisure visuals to connect emotionally. These graphics improve engagement without slowing performance."
            },
            {
                icon: Users,
                title: "Community & Niche Use",
                description: "Fitness trainers, travel bloggers, gamers, artists, and hobby groups use these assets to communicate clearly and build identity."
            }
        ]
    };

    // Industry content
    const industryContent = {
        title: "Popular Use Cases",
        description: "Industry PNGs reduce editing time, letting professionals focus on meaningful work. Transparent images drop directly into corporate presentations, marketing campaigns, or industrial reports, saving hours of preparation.",
        useCases: [
            {
                icon: TrendingUp,
                title: "For Marketers",
                description: "Use in social media campaigns, product promotions, and digital ads. PNGs ensure visuals are crisp, clear, and professional."
            },
            {
                icon: Presentation,
                title: "For Corporate Presentations",
                description: "Industry PNGs enhance slides, reports, and pitch decks with consistent, clean graphics that communicate effectively."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Add industrial visuals to websites, blogs, or newsletters to increase engagement without slowing page load."
            },
            {
                icon: Building2,
                title: "Sector-Specific",
                description: "Engineering firms, factories, logistics companies, energy providers, and tech startups use these visuals to communicate complex concepts clearly and professionally."
            }
        ]
    };

    // Landscape content
    const landscapeContent = {
        title: "Popular Use Cases",
        description: "Many creators lose time fixing backgrounds instead of building ideas. Clean landscape PNGs remove that friction. Because the background is already transparent, your focus stays on design, storytelling, and communication.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Landscape PNGs fit perfectly into banners, posters, website headers, and social media visuals. Clean edges and high resolution ensure professional results without extra editing steps."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and students use landscape PNG images in geography lessons, presentations, worksheets, and digital learning tools. Clear visuals help explain concepts faster and keep attention focused."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Blogs, landing pages, and campaigns use landscape PNGs to add atmosphere without slowing performance. Lightweight files improve page experience while maintaining visual quality."
            },
            {
                icon: Building2,
                title: "Industry-Specific",
                description: "Travel blogs, tourism brands, real estate websites, environmental NGOs, and media publishers rely on landscape PNG visuals to communicate place, mood, and context clearly."
            }
        ]
    };

    // Lifestyle content
    const lifestyleContent = {
        title: "Popular Use Cases",
        description: "Lifestyle PNGs save time and effort when creating content. With clean, transparent backgrounds, designers, educators, and creators can focus on storytelling instead of editing.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Use lifestyle PNGs in social media posts, banners, branding visuals, and presentation slides. Sharp edges and ready-to-use files make workflow seamless."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers, instructors, and e-learning creators can enhance lessons, slides, and worksheets using lifestyle visuals that are easy to understand and distraction-free."
            },
            {
                icon: Globe,
                title: "For Web & Social Media",
                description: "Lifestyle PNGs add visual appeal to blogs, social campaigns, or websites without slowing page load. Perfect for headers, thumbnails, or featured content."
            },
            {
                icon: TrendingUp,
                title: "Industry-Specific",
                description: "Marketing agencies, wellness coaches, travel bloggers, food brands, and lifestyle influencers use these graphics to communicate ideas quickly and effectively."
            }
        ]
    };

    // People content
    const peopleContent = {
        title: "Popular Use Cases",
        description: "Clean people PNGs reduce editing time and make designs, presentations, and campaigns faster and more efficient.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "People PNGs fit banners, posters, and website headers instantly, maintaining sharpness and transparency."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers can use people PNGs in lessons, worksheets, or interactive slides for better engagement."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Websites, blogs, and social campaigns gain personality and relatability with clean people graphics."
            },
            {
                icon: Building2,
                title: "Industry-Specific",
                description: "Marketing agencies, schools, NGOs, HR platforms, and e-learning apps use these PNGs for clear communication and visual storytelling."
            }
        ]
    };

    // Plants & Flowers content
    const plantsFlowersContent = {
        title: "Popular Use Cases",
        description: "Clean, transparent plant PNGs save you hours. When the background is already transparent, you can focus on creating instead of editing.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Plant PNGs drop seamlessly into banners, posters, logos, and web layouts, making design faster and more professional."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers, parents, and educators use these PNGs in worksheets, slides, and interactive lessons. Clear visuals help students focus on learning."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Use plant PNGs on websites, blogs, and campaigns to add visual appeal without slowing down pages."
            },
            {
                icon: Layers,
                title: "Industry-Specific",
                description: "Botanical bloggers, garden centers, nurseries, landscape designers, and environmental NGOs use these PNGs to communicate clearly and visually."
            }
        ]
    };

    // Social Issues content
    const socialIssuesContent = {
        title: "Popular Use Cases",
        description: "Many creators struggle to explain serious topics visually. Clean PNGs reduce that challenge and support better communication.",
        useCases: [
            {
                icon: GraduationCap,
                title: "For Education & Learning",
                description: "Teachers and educators use Social Issues PNGs in slides, worksheets, and digital lessons. Simple visuals help students grasp complex ideas faster."
            },
            {
                icon: Users,
                title: "For Awareness Campaigns",
                description: "Nonprofits and activists rely on transparent PNGs for posters, banners, and social media. Clear visuals strengthen messages and improve engagement."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Blogs, news platforms, and awareness websites use these PNGs to add clarity without slowing page speed. Transparent images blend naturally into layouts."
            },
            {
                icon: Building2,
                title: "Industry-Specific Use",
                description: "NGOs, policy groups, research platforms, and community organizations use these visuals to explain data, highlight concerns, and support advocacy."
            }
        ]
    };

    // Science content
    const scienceContent = {
        title: "Popular Use Cases",
        description: "Science visuals play a key role in learning and communication. Clean PNGs help reduce confusion and improve understanding.",
        useCases: [
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and students use Science PNGs in slides, textbooks, worksheets, and online classes. Simple visuals help explain theories, experiments, and processes clearly."
            },
            {
                icon: Presentation,
                title: "For Presentations & Research",
                description: "Researchers and professionals use PNGs in reports, charts, and academic presentations. Transparent images keep layouts clean and professional."
            },
            {
                icon: Globe,
                title: "For Web & Apps",
                description: "Science blogs, learning platforms, and mobile apps use PNGs to explain ideas visually without slowing page speed."
            },
            {
                icon: Building2,
                title: "Industry-Specific Use",
                description: "EdTech companies, science museums, publishers, and healthcare platforms rely on accurate science visuals to support trust and clarity."
            }
        ]
    };

    // Sports content
    const sportsContent = {
        title: "Popular Use Cases",
        description: "Clean sports PNGs save hours of editing time. With a transparent background, you can focus on work, not fixing images.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Designers can use sports PNGs for banners, posters, social media, and branding visuals. Sharp edges and clean transparency make them drop-ready."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and parents use sports PNGs to create worksheets, presentations, and learning slides. Simple visuals help students focus without distraction."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Websites, blogs, and campaigns use sports PNGs to add dynamic visuals. They enhance headers, thumbnails, and featured sections efficiently."
            },
            {
                icon: Users,
                title: "Industry-Specific",
                description: "Sports organizations, gyms, clubs, and media channels rely on these images for professional, clear, and emotional communication."
            }
        ]
    };

    // States of Mind content
    const statesOfMindContent = {
        title: "Popular Use Cases",
        description: "Using ready-made States of Mind visuals saves hours in design and education. Whether for presentations, mental health campaigns, social media content, or classroom activities, expressive visuals help communicate complex emotions quickly and clearly.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "Visuals save time on creative projects such as posters, digital campaigns, infographics, and branding. Pre-made transparent images drop straight into your layout without extra editing."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers, psychologists, and content creators use these visuals to explain mental health concepts, learning strategies, or social-emotional lessons. Clear graphics keep students engaged and focused."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "Websites, blogs, or social campaigns can communicate feelings, moods, and mental health awareness effectively using these visuals."
            },
            {
                icon: Users,
                title: "Industry-Specific",
                description: "Psychologists, wellness apps, mental health campaigns, social projects, and educators use these images to visually convey complex concepts to their audiences."
            }
        ]
    };

    // Technology content
    const technologyContent = {
        title: "Popular Use Cases",
        description: "Many creators lose time fixing images instead of using them. Clean Technology PNGs remove that friction. With transparent backgrounds, visuals drop straight into your layout.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers & Creators",
                description: "Technology PNGs fit perfectly into banners, dashboards, and marketing visuals. Sharp edges and consistent styles help designs look modern and professional."
            },
            {
                icon: GraduationCap,
                title: "For Education & Learning",
                description: "Teachers and students use Technology PNGs in STEM lessons, slides, and worksheets. Clear visuals help explain abstract tech concepts without confusion."
            },
            {
                icon: Globe,
                title: "For Web & App Development",
                description: "Websites and apps benefit from lightweight PNGs that load fast and stay crisp. Technology icons and UI graphics improve usability and visual flow."
            },
            {
                icon: Building2,
                title: "Industry-Specific Use",
                description: "Startups, SaaS platforms, IT firms, tech blogs, and training centers use Technology PNGs to explain ideas clearly. The right visual often communicates faster than text."
            }
        ]
    };

    const availableCat: Record<string, typeof animalsContent> = {
        animals: animalsContent,
        "buildings-and-architecture": buildingsContent,
        business: businessContent,
        "culture-and-religion": cultureReligionContent,
        drinks: drinksContent,
        food: foodContent,
        "graphic-resources": graphicResourcesContent,
        "hobbies-and-leisure": hobbiesLeisureContent,
        industry: industryContent,
        landscapes: landscapeContent,
        lifestyle: lifestyleContent,
        people: peopleContent,
        "plants-and-flowers": plantsFlowersContent,
        "social-issues": socialIssuesContent,
        science: scienceContent,
        sports: sportsContent,
        "states-of-mind": statesOfMindContent,
        technology: technologyContent,
    };

    // Fallback to animalsContent if categorySlug is not found
    const content = categorySlug && availableCat[categorySlug] ? availableCat[categorySlug] : animalsContent;

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            {content.title}
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            {content.description}
                        </p>
                    </div>

                    {/* Use Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                        {content.useCases.map((useCase, index) => {
                            const IconComponent = useCase.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-tight pt-3">
                                            {useCase.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                        {useCase.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};