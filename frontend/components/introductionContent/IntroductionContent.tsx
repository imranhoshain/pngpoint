/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Info, CheckCircle, Shield } from "lucide-react";

interface IntroductionContentProps {
    categorySlug?: string;
}

export const IntroductionContent = ({ categorySlug }: IntroductionContentProps) => {
    // Animals content
    const animalsContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Animal PNG images help people save time when they need clean, ready-to-use visuals for design, learning, or business work. If you want transparent animal graphics that work on any background, this page solves that problem fast and clearly. At Pngpoint, we've used animal PNGs in web layouts, kids' projects, and branding work, and clean files always make the job easier.",
            "That's why this collection focuses on high-quality, transparent PNG files with clear usage terms you can trust. Explore the animal PNG library and pick the images that fit your project today."
        ],
        mainTitle: "Why Choose Our Animal PNG Collection",
        mainDescription: "Finding the right animal graphics should feel simple, not slow or confusing. This collection is built for creators who need clean, reusable Animal PNG images that work instantly across projects. Every file focuses on clarity, flexibility, and real-world use.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Wild animals, domestic pets, farm animals, jungle wildlife, zoo animals, aquatic life, and birds" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD PNG images, sharp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, branding, print designs, education materials, and kids' projects" },
                { label: "Clear licensing:", text: "Simple usage terms explained upfront, no confusion before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated animal PNG files",
                "Regular updates with new animals and styles",
                "Consistent licenses across the collection"
            ]
        }
    };

    // Buildings & Architecture content
    const buildingsContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Architecture PNG images help designers, architects, and builders work faster by providing clean, ready-to-use visuals that integrate seamlessly into any project. Whether you need transparent building graphics, architectural icons, or complete structure designs, this collection delivers professional-quality assets that save hours of preparation time.",
            "Our Architecture PNGs slip seamlessly into projects, saving hours of cleanup and preparation. Explore the architecture PNG library and find the perfect visuals for your next project."
        ],
        mainTitle: "Why Choose Our Architecture PNGs",
        mainDescription: "Designers, architects, and builders know that speed and precision are key. Our Architecture PNGs slip seamlessly into projects, saving hours of cleanup and preparation.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Versatile formats:", text: "transparent PNGs, silhouettes, icons, and vector-style PNGs" },
                { label: "Consistent color palettes", text: "and balanced visuals across collections" },
                { label: "Clear licensing", text: "for web, print, marketing, and internal use" },
                { label: "SEO-friendly assets", text: "with clean file names, alt text, and structured metadata" }
            ]
        },
        reliableSection: {
            title: "Trusted by professionals",
            items: [
                "Architects, developers, educators, and marketers worldwide rely on PNGPoint",
                "Deliver reliable, high-quality building and architecture visuals",
                "Perfect for any project scale, from presentations to full-scale marketing campaigns"
            ]
        }
    };

    const businessContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Business PNG images help professionals work faster when they need clean visuals for presentations, websites, or marketing materials. If you're looking for transparent business graphics that fit any background, this page gives you a clear solution without extra editing. At PNGPoint, we've used business PNGs in pitch decks, landing pages, and client proposals, and clean assets always save time. That's why this collection focuses on high-resolution, transparent PNG files with clear licenses you can trust. Browse the business PNG library and pick visuals that support your goals today."
        ],
        mainTitle: "Why Choose Our Business PNG Collection",
        mainDescription: "Creating business visuals should feel efficient, not frustrating.This collection is designed for marketers, designers, founders, and educators who need ready-to-use Business PNG images that fit real workflows. Because the files are clean and consistent, you spend less time fixing visuals and more time delivering results.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Corporate, finance, marketing, startup, office, and e-commerce visuals" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, sharp edges" },
                { label: "Flexible usage:", text: "Websites, presentations, branding, print, and education" },
                { label: "Clear licensing:", text: "Simple terms explained before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated business-focused PNG assets",
                "Regular updates with modern styles",
                "Consistent licensing across categories"
            ]
        }
    };

    // Culture & Religion content
    const cultureReligionContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Culture and Religion PNG images help creators communicate ideas that words alone often cannot. When you need clean visuals for beliefs, traditions, festivals, or cultural identity, transparent PNGs save time and reduce design friction.",
            "If you're working on educational content, editorial projects, branding, or presentations, this page gives you ready-to-use Culture and Religion graphics that fit naturally on any background. At PNGPoint, we've seen how culturally accurate visuals improve clarity and respect in real projects.",
            "That's why this collection focuses on high-quality, transparent PNG files with clear licensing. Explore the Culture and Religion PNG library and choose visuals that support your message with confidence."
        ],
        mainTitle: "Why Choose Our Culture and Religion PNG Collection",
        mainDescription: "Finding culturally respectful visuals should feel clear and reliable, not risky or confusing. This collection is built for designers, educators, and creators who need accurate Culture and Religion PNG images that work instantly across projects. Each file emphasizes clarity, symbolism, and practical use. As a result, you spend less time searching and more time creating meaningful content.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Broad coverage:", text: "Global cultures, religions, traditions, rituals, and festivals" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, clean cut-outs" },
                { label: "Flexible usage:", text: "Education, media, branding, print, web, and presentations" },
                { label: "Clear licensing:", text: "Royalty-free terms explained upfront for safe usage" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated visuals focused on cultural accuracy",
                "Regular updates with new themes and traditions",
                "Consistent licensing across the entire collection"
            ]
        }
    };

    // Drinks content
    const drinksContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Drinks PNG images save time for designers, marketers, and educators who need clean, ready-to-use visuals. From coffee cups to soda bottles, these transparent graphics work on any background. At PNGPoint, we've used drinks PNGs in websites, social media posts, and branding campaigns to ensure visual clarity and efficiency.",
            "This collection focuses on high-quality, transparent PNG files with clear usage terms you can trust. Explore the drinks PNG library and select images that fit your project today."
        ],
        mainTitle: "Why Choose Our Drinks PNG Collection",
        mainDescription: "Finding the perfect drink graphics should be easy and fast. This collection is curated for creators needing clean, reusable Drinks PNG images that integrate seamlessly into any project. Every file prioritizes clarity, flexibility, and practical usability. Spend less time editing and more time creating.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide variety:", text: "Coffee, tea, soda, juice, cocktails, wine, beer, milkshakes, energy drinks" },
                { label: "High-quality formats:", text: "Transparent PNG, HD images, sharp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, marketing, print designs, social media, presentations" },
                { label: "Clear licensing:", text: "Easy-to-understand usage terms, no confusion before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated Drinks PNG files",
                "Regular updates with new beverages and styles",
                "Consistent licensing across the collection"
            ]
        }
    };

    // Food content
    const foodContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Food PNG images save time when you need clean visuals for menus, marketing, or digital content. If you want transparent food graphics that blend smoothly into any background, this page gives you exactly that.",
            "Designers, educators, and content creators often struggle with messy backgrounds. Transparent food PNGs solve that problem fast. You can place them anywhere without extra editing.",
            "That's why this collection focuses on high-quality Food PNG files with clear licensing. Browse the food PNG library and choose images that fit your project with confidence."
        ],
        mainTitle: "Why Choose Our Food PNG Collection",
        mainDescription: "Finding usable food images should feel easy, not frustrating. This collection is built for people who want ready-to-use Food PNGs that work across real projects. Each file focuses on clarity, flexibility, and everyday usability. As a result, you spend less time editing and more time creating.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Fruits, vegetables, fast food, desserts, drinks, meals, and ingredients" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, clean cut-outs" },
                { label: "Flexible usage:", text: "Menus, ads, websites, print, education, and branding" },
                { label: "Clear licensing:", text: "Simple usage terms shown before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated Food PNG images",
                "Regular updates with new food items and styles",
                "Consistent licensing across categories"
            ]
        }
    };

    // Graphic Resources content
    const graphicResourcesContent = {
        subheading: "High-Quality Graphic Resources That Save Time",
        introText: [
            "Graphic resources help creators work faster by providing clean, ready-to-use visual assets. When you need icons, illustrations, vectors, or design elements that fit instantly into your project, this page removes the guesswork.",
            "At PNGPoint, graphic resources are regularly used in website layouts, marketing materials, presentations, and branding work. Clean files reduce editing time and improve visual consistency.",
            "That's why this collection focuses on high-quality formats with clear usage terms you can trust. Explore the graphic resources library and choose assets that match your creative goals."
        ],
        mainTitle: "Why Choose Our Graphic Resources Collection",
        mainDescription: "Finding reliable design assets should feel simple, not overwhelming. This collection is built for designers, educators, marketers, and developers who need flexible graphic resources that work across multiple platforms. Each asset emphasizes clarity, usability, and real-world application. As a result, you spend less time adjusting visuals and more time building great designs.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Icons, illustrations, vectors, UI elements, infographics, and templates" },
                { label: "High-quality formats:", text: "PNG, SVG, AI, PSD, and high-resolution raster files" },
                { label: "Flexible usage:", text: "Websites, branding, print materials, presentations, and apps" },
                { label: "Clear licensing:", text: "Straightforward terms with commercial use clearly stated" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated graphic assets",
                "Regular updates with modern styles",
                "Consistent licensing across categories"
            ]
        }
    };

    // Hobbies & Leisure content
    const hobbiesLeisureContent = {
        subheading: "High-quality, royalty-free, and easy to use",
        introText: [
            "Hobbies and Leisure graphic resources help people express interests, relax creatively, and communicate ideas visually. When you need clean, ready-to-use visuals for fun activities, personal projects, or creative work, this page solves that need quickly and clearly.",
            "These Hobbies and Leisure assets work well for digital design, educational content, social media, and branding. Because files come optimized and clearly licensed, you spend less time editing and more time enjoying the creative process. Explore the collection and choose visuals that match your passion today."
        ],
        mainTitle: "Why Choose Our Hobbies and Leisure Collection",
        mainDescription: "Creative resources should feel inspiring, not complicated. This collection supports creators, educators, and hobbyists who need flexible Hobbies and Leisure graphics that work across platforms. Every asset focuses on clarity, relevance, and real-life use cases. As a result, your projects stay consistent, clean, and engaging.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Arts, crafts, sports, music, travel, gaming, fitness, and relaxation" },
                { label: "High-quality formats:", text: "PNG, vector, illustrations, icons, and clipart" },
                { label: "Flexible usage:", text: "Personal projects, websites, print, education, and branding" },
                { label: "Clear licensing:", text: "Transparent usage terms explained upfront" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated Hobbies and Leisure graphic resources",
                "Regular updates with trending leisure themes",
                "Consistent licensing across categories"
            ]
        }
    };

    // Industry content
    const industryContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Industry PNG images save time when professionals need clean, ready-to-use visuals for business presentations, industrial projects, or marketing materials. These transparent graphics work on any background, making workflows faster and more efficient. At PNGPoint, we've used Industry PNGs in corporate slides, marketing campaigns, and product designs, proving that clean, high-quality files simplify professional work.",
            "This collection offers clear usage terms and consistently curated files you can trust. Explore the Industry PNG library and select images that perfectly fit your project today."
        ],
        mainTitle: "Why Choose Our Industry PNG Collection",
        mainDescription: "Finding the right industrial graphics should be straightforward. Our collection is designed for business professionals, marketers, and designers who need reusable, high-quality Industry PNGs. Each file emphasizes clarity, flexibility, and real-world utility, helping you save editing time and focus on creating.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Factories, machinery, office equipment, industrial tools, energy, logistics, technology, and production visuals" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, crisp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, presentations, branding, print materials, corporate reports" },
                { label: "Clear licensing:", text: "Easy-to-understand usage rights for hassle-free downloads" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated Industry PNG files",
                "Regular updates with modern industrial graphics",
                "Consistent licensing for all images"
            ]
        }
    };

    // Landscape content
    const landscapeContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Landscape PNG images help creators work faster when they need clean, natural visuals without background distractions. If you want transparent landscape graphics that blend easily into any design, this page solves that need clearly and efficiently.",
            "Designers, educators, and marketers often rely on landscape PNGs for websites, presentations, learning materials, and branding visuals. Because these images come with transparent backgrounds, they drop into layouts smoothly and save editing time.",
            "That's why this collection focuses on high-quality, transparent landscape PNG files with clear usage rights you can trust. Browse the landscape PNG library and choose visuals that fit your project with confidence."
        ],
        mainTitle: "Why Choose Our Landscape PNG Collection",
        mainDescription: "Finding the right landscape visuals should feel simple, not overwhelming. This collection supports creators who need reusable, clean Landscape PNG images that work instantly across digital and print projects. Every file focuses on clarity, flexibility, and practical use. As a result, you spend less time adjusting images and more time creating meaningful designs.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Mountains, forests, beaches, deserts, cityscapes, countryside, and nature scenes" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD landscape PNGs, sharp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, presentations, branding, print materials, and education projects" },
                { label: "Clear licensing:", text: "Royalty-free usage terms explained clearly before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated landscape PNG images with consistent quality",
                "Regular updates with new scenery styles and locations",
                "Clear and consistent licenses across the collection"
            ]
        }
    };

    // Lifestyle content
    const lifestyleContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Lifestyle PNG images save time for creators who need clean, ready-to-use visuals for web, social media, presentations, or branding. If you want transparent lifestyle graphics—fitness, travel, food, hobbies, or wellness—this page gives you exactly what you need. At PNGPoint, we've applied lifestyle PNGs in web design, social campaigns, and print projects, making creative workflows smoother.",
            "This collection focuses on high-quality, transparent PNG files with clear licensing. Browse the lifestyle PNG library and pick images that match your project instantly."
        ],
        mainTitle: "Why Choose Our Lifestyle PNG Collection",
        mainDescription: "Finding the right lifestyle graphics should be simple and fast. This collection is curated for creators needing reusable, clear, and versatile Lifestyle PNG images. Each file is ready to drop into projects with minimal editing, letting you spend more time creating and less time adjusting.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Fitness, wellness, travel, food & drinks, hobbies, leisure, fashion, home decor" },
                { label: "High-quality formats:", text: "Transparent PNG, HD resolution, sharp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, branding, social media, presentations, and print designs" },
                { label: "Clear licensing:", text: "Easy-to-understand usage terms upfront, no surprises" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated lifestyle PNG files",
                "Regular updates with fresh content and trending styles",
                "Consistent licenses across the collection"
            ]
        }
    };

    // People content
    const peopleContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "People PNG images save time for designers, educators, and content creators who need clean visuals. Transparent people graphics work on any background, making projects easier to execute. At PNGPoint, we've applied PNGs in web layouts, marketing campaigns, and educational presentations. Clean, high-resolution files simplify design work and increase productivity."
        ],
        mainTitle: "Why Choose Our People PNG Collection",
        mainDescription: "Finding the right people graphics should be fast and simple. Our collection offers curated PNGs that are reusable across projects, with a focus on clarity, flexibility, and real-world use. Spend less time editing and more time creating.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Male, female, children, professionals, casual, ethnic diversity, poses, and activities" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD images, crisp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, branding, social media, educational slides, marketing campaigns" },
                { label: "Clear licensing:", text: "Royalty-free, easy-to-understand usage terms" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated people PNGs",
                "Regular updates with new poses, styles, and themes",
                "Consistent, clear licensing"
            ]
        }
    };

    // Plants & Flowers content
    const plantsFlowersContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Plants & Flowers PNG images help you save time when you need clean, ready-to-use visuals for web design, learning materials, or creative projects. Transparent botanical graphics work seamlessly on any background, making your workflow smoother. At PNGPoint, we've used flower and plant PNGs in banners, web layouts, branding, and educational slides, and clean files always simplify the process.",
            "This collection focuses on high-quality, transparent PNG files with clear licensing. Explore the Plants & Flowers PNG library to find visuals perfectly suited for your projects today."
        ],
        mainTitle: "Why Choose Our Plants & Flowers PNG Collection",
        mainDescription: "Finding the right botanical graphics should be simple and fast. This collection is curated for creators who need reusable, high-quality Plants & Flowers PNGs that work instantly across all projects. Each file prioritizes clarity, flexibility, and practical application. Spend less time editing and more time creating.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Roses, tulips, lilies, wildflowers, trees, shrubs, tropical plants, and herbs" },
                { label: "High-quality formats:", text: "Transparent PNGs, HD images, crisp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, print materials, educational resources, social media, and branding" },
                { label: "Clear licensing:", text: "Simple usage terms, no confusion before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated plant and flower PNG files",
                "Regular updates with new botanical styles",
                "Consistent licensing across all files"
            ]
        }
    };

    // Social Issues content
    const socialIssuesContent = {
        subheading: "High-Resolution, Royalty-Free, and Ready to Use",
        introText: [
            "Social Issues PNG images help creators explain complex topics through clear visuals. When you need transparent graphics for education, advocacy, or digital campaigns, this collection offers a fast and simple solution.",
            "Instead of spending time editing backgrounds, you can use ready-to-place PNGs that work on any design. These visuals support storytelling, awareness, and understanding across platforms.",
            "That's why this library focuses on high-quality, transparent Social Issues PNGs with clear usage terms. Browse the collection and find images that support your message clearly and responsibly."
        ],
        mainTitle: "Why Choose Our Social Issues PNG Collection",
        mainDescription: "Finding meaningful visuals for social topics should feel simple and trustworthy. This collection is designed for educators, designers, NGOs, and content creators who need reliable Social Issues PNG images. Every file supports clarity, ethical use, and flexible design needs. As a result, you can focus more on impact and less on editing.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Poverty, education, healthcare, equality, environment, human rights, and more" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, clean cut-outs" },
                { label: "Flexible usage:", text: "Awareness campaigns, education materials, websites, print, and presentations" },
                { label: "Clear licensing:", text: "Simple, upfront usage terms with no hidden confusion" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated Social Issues PNG collection",
                "Regular updates with relevant global topics",
                "Consistent licenses across categories"
            ]
        }
    };

    // Science content
    const scienceContent = {
        subheading: "High-Resolution, Royalty-Free, and Ready to Use",
        introText: [
            "Science PNG images make complex ideas easier to explain. When you need clean visuals for learning, teaching, or presentations, transparent science graphics save time and effort.",
            "Instead of editing backgrounds, you can directly place these PNGs into slides, worksheets, websites, or apps. Clear visuals help students, teachers, and creators focus on concepts, not design problems.",
            "That's why this collection offers high-quality Science PNG files with transparent backgrounds and clear usage terms. Explore the library and choose visuals that support accurate and engaging learning."
        ],
        mainTitle: "Why Choose Our Science PNG Collection",
        mainDescription: "Finding reliable science graphics should be simple and stress-free. This collection is built for teachers, students, designers, researchers, and content creators. Every Science PNG focuses on accuracy, clarity, and flexibility across platforms. As a result, you spend less time fixing visuals and more time explaining ideas.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Physics, chemistry, biology, space, technology, and lab science" },
                { label: "High-quality formats:", text: "Transparent PNG, HD resolution, clean edges" },
                { label: "Flexible usage:", text: "Education, presentations, websites, print, and apps" },
                { label: "Clear licensing:", text: "Easy-to-understand usage terms before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated science-focused PNG library",
                "Regular updates with new topics and symbols",
                "Consistent licenses across categories"
            ]
        }
    };

    // Sports content
    const sportsContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Sports PNG images save time when you need clean, ready-to-use visuals for design, learning, or business projects. Transparent sports graphics work on any background, solving your design challenges quickly. At Pngpoint, we've used sports PNGs in web layouts, posters, branding work, and school projects, and clean files always make the workflow smoother.",
            "This collection highlights high-quality, transparent PNG files with clear usage terms you can trust. Explore our sports PNG library and pick the perfect visuals for your project today."
        ],
        mainTitle: "Why Choose Our Sports PNG Collection",
        mainDescription: "Finding the right sports graphics should feel fast and easy. This collection is built for creators who need clean, reusable sports PNGs that work instantly across projects. Each file focuses on clarity, flexibility, and real-world use, saving you editing time and letting you focus on creating.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Football, Basketball, Cricket, Tennis, Olympics, Extreme Sports, Winter Sports, Gym & Fitness" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD PNG images, sharp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, branding, print designs, educational materials, and kids' projects" },
                { label: "Clear licensing:", text: "Simple usage terms explained upfront, no confusion before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated sports PNG files",
                "Regular updates with new games and sports styles",
                "Consistent licenses across the collection"
            ]
        }
    };

    // States of Mind content
    const statesOfMindContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "States of Mind visuals help people communicate emotions, thoughts, and mental states clearly. Whether for presentations, educational projects, or creative designs, ready-to-use illustrations save time and effort. Our collection focuses on high-quality files with transparent backgrounds and clear usage rights. Explore the library and find images that match your project instantly."
        ],
        mainTitle: "Why Choose Our States of Mind Collection",
        mainDescription: "Finding the right visual representation of emotions and mental states should feel simple. This collection is designed for creators, educators, and designers who need expressive, reusable visuals for projects. Every file emphasizes clarity, usability, and real-world application, so you can focus on creating rather than editing.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Emotions, moods, mental states, cognitive concepts, mindfulness, stress, happiness, anxiety, motivation, creativity" },
                { label: "High-quality formats:", text: "Transparent PNGs, HD images, vector-ready illustrations" },
                { label: "Flexible usage:", text: "Websites, branding, presentations, educational materials, social campaigns" },
                { label: "Clear licensing:", text: "Simple terms, no confusion before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated States of Mind visuals",
                "Regular updates with new styles and concepts",
                "Consistent licenses across the collection"
            ]
        }
    };

    // Technology content
    const technologyContent = {
        subheading: "High-Resolution, Royalty-Free, and Ready to Use",
        introText: [
            "Technology PNG images help creators work faster with clean, ready-to-use visuals. When you need transparent tech graphics that blend smoothly into any background, this page gives you a clear and simple solution.",
            "From websites and mobile apps to presentations and learning materials, transparent Technology PNGs reduce editing time and improve visual clarity. Clean files matter when accuracy and speed are important.",
            "That's why this collection focuses on high-quality, transparent PNG images with clear usage rights. Explore the Technology PNG library and choose visuals that fit your digital projects today."
        ],
        mainTitle: "Why Choose Our Technology PNG Collection",
        mainDescription: "Finding reliable technology graphics should feel easy, not time-consuming. This collection is built for designers, developers, educators, and marketers who need flexible Technology PNG images that work instantly. Each file is curated for clarity, accuracy, and real-world use. Because of that, you spend less time fixing visuals and more time completing your projects.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Devices, software, AI, data, networking, cloud, and digital tools" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, sharp details" },
                { label: "Flexible usage:", text: "Websites, apps, presentations, branding, education" },
                { label: "Clear licensing:", text: "Royalty-free usage with simple terms" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated Technology PNG assets",
                "Regular updates with modern tech trends",
                "Consistent quality and licensing across files"
            ]
        }
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
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Subheading */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2]">
                            {content.subheading}
                        </h2>
                    </div>

                    {/* Introduction Text */}
                    <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-5xl mx-auto w-full">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                <Info className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                {content.introText.map((paragraph, index) => (
                                    <p 
                                        key={index} 
                                        className={`text-base lg:text-lg text-gray-700 leading-relaxed ${
                                            index < content.introText.length - 1 ? 'mb-4' : ''
                                        }`}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Section */}
                    <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-5xl mx-auto w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                            {content.mainTitle}
                        </h2>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
                            {content.mainDescription}
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                                    {content.keyBenefits.title}
                                </h3>
                            </div>
                            <ul className="space-y-3 ml-13">
                                {content.keyBenefits.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-base text-gray-700">
                                            <strong>{item.label}</strong> {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What Makes It Reliable / Trusted by professionals */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                                    {content.reliableSection.title}
                                </h3>
                            </div>
                            <ul className="space-y-3 ml-13">
                                {content.reliableSection.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-base text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};