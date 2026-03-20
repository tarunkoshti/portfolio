"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { TicketShape } from '../ui/ticket-shape';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger for client-side use
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Work = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects = [
        {
            title: "Medorn Ventures",
            description: "Medorn.com is the official website of Medorn Ventures, showcasing its digital products, services, and company information in a structured and professional online presence.",
            image: "/images/medorn-ventures.png",
            link: "https://medorn.com/",
            code: "PRJ-01"
        },
        {
            title: "Welloxa Pharma",
            description: "Developed a business website for a pharmaceutical brand to present products, company details, and establish a strong and professional online presence for users for better reach. ",
            image: "/images/welloxa.png",
            link: "https://welloxapharma.com/",
            code: "PRJ-02"
        },
        {
            title: "Medorn Software",
            description: "Worked on a B2B SaaS ERP reporting software for Medorn Ventures, designed for pharmaceutical companies to manage reporting, data, and operational workflows efficiently.",
            image: "/images/medorn.png",
            link: "https://app.medorn.com/",
            code: "PRJ-03"
        },
        {
            title: "Hirer",
            description: "Hirer is a job portal platform built to connect job seekers with employers, enabling job postings, applications, and streamlined hiring processes in a simple interface.",
            image: "/images/hirer.png",
            link: "https://job-app-hirer.vercel.app/",
            code: "PRJ-04"
        },
        {
            title: "Urban Oasis",
            description: "Urban Oasis is a UAE-based real estate property management platform designed to help users explore properties, view listings, and connect with agents across different locations easily.",
            image: "/images/urban-oasis.png",
            link: "https://urbanoasis.ae/",
            code: "PRJ-05"
        },
        {
            title: "Evexia",
            description: "Evexia is a fitness and wellness platform offering programs across yoga, boxing, swimming and medical condition and more, helping users access different fitness services in one place.",
            image: "/images/evexia.png",
            link: "https://evexialifestyles.ae/",
            code: "PRJ-06"
        },
        {
            title: "DigitallyTall",
            description: "DigitallyTall is a digital marketing agency website presenting services such as web development, advertising, and SEO, designed to showcase offerings and company information effectively.",
            image: "/images/digitallytall.png",
            link: "https://digitallytall.com/",
            code: "PRJ-07"
        },
        {
            title: "NexusBees",
            description: "NexusBees is a digital agency website showcasing services like web development, advertising, UX/UI design, and SEO, helping businesses understand their service offerings clearly.",
            image: "/images/nexusbees.png",
            link: "https://nexusbees.ae/",
            code: "PRJ-08"
        },
        {
            title: "Biztravex",
            description: "BizTravex is a concierge service platform designed for business travelers, providing information about airport services, assistance, and travel-related support in a structured format.",
            image: "/images/biztravex.png",
            link: "https://biztravex.com/",
            code: "PRJ-09"
        },
    ]

    // Separate projects into rows of 3
    const projectRows = [];
    for (let i = 0; i < projects.length; i += 3) {
        projectRows.push(projects.slice(i, i + 3));
    }

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            projects.forEach((_, i) => {
                const rowIndex = Math.floor(i / 3);
                const isHoveredRow = hoveredIndex !== null && Math.floor(hoveredIndex / 3) === rowIndex;
                const defaultIndexInRow = 2 - (rowIndex % 3);
                const isExpanded = isHoveredRow
                    ? hoveredIndex === i
                    : (i % 3) === defaultIndexInRow;

                gsap.to(cardsRef.current[i], {
                    flex: isExpanded ? "2 2 0%" : "1 1 0%",
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            });
        });

        mm.add("(max-width: 767px)", () => {
            projects.forEach((_, i) => {
                gsap.set(cardsRef.current[i], { clearProps: "flex" });
            });
        });
    }, { dependencies: [hoveredIndex], scope: containerRef });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".work-title", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
        .from(".project-card", {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            stagger: {
                amount: 0.8,
                from: "start"
            },
            ease: "power3.out"
        }, "-=0.6");
    }, { scope: containerRef });

    return (
        <section 
            id="work" 
            ref={containerRef}
            className="w-full py-24 px-6 md:px-[16.66%] flex flex-col justify-center overflow-hidden relative z-10 bg-black"
        >

            {/* Header */}
            <div className="mb-12 overflow-hidden">
                <span className="work-title inline-block font-caveat text-3xl md:text-4xl text-foreground/50 tracking-wider">
                    Featured Work
                </span>
            </div>

            <div
                className='flex flex-col gap-12'
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {projectRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="project-row flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-8 min-h-[420px]">
                        {row.map((project, itemIndex) => {
                            const globalIndex = rowIndex * 3 + itemIndex;
                            const isHoveredRow = hoveredIndex !== null && Math.floor(hoveredIndex / 3) === rowIndex;

                            // Expansion logic: middle card by default unless a card in this row is hovered
                            const defaultIndexInRow = 2 - (rowIndex % 3);
                            // Expansion logic: staggered by row unless a card in this row is hovered
                            const isExpanded = isHoveredRow
                                ? hoveredIndex === globalIndex
                                : (globalIndex % 3) === defaultIndexInRow;

                            const flexClass = isExpanded ? 'md:flex-[2]' : 'md:flex-1';
                            const bgClass = isExpanded ? 'bg-white' : 'bg-noise';

                            const labelColor = isExpanded ? 'text-background/50' : 'text-foreground/50';
                            const titleColor = isExpanded ? 'text-background' : 'text-foreground';

                            return (
                                <Link
                                    key={globalIndex}
                                    ref={(el) => { cardsRef.current[globalIndex] = el; }}
                                    href={project.link}
                                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                                    className={`project-card relative flex flex-col ${flexClass} w-full group`}
                                >
                                    <TicketShape
                                        cornerSize="16px"
                                        className={`ticket relative p-8 h-full min-h-[520px] flex flex-col items-start justify-between gap-8 shadow-sm transition-shadow duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-2xl ${bgClass} ${titleColor}`}
                                    >
                                        <div className="flex flex-col items-start gap-8 w-full">
                                            {/* Project Image Container */}
                                            <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden shadow-inner group-hover:shadow-lg transition-all duration-500">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className={`w-full h-full object-cover transition-all duration-700 ${isExpanded ? 'grayscale-0 opacity-100' : 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
                                                        }`}
                                                />
                                                {/* Overlay Pattern */}
                                                <div className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                                            </div>

                                            {/* Decorative Corner Label */}
                                            <div className={`absolute top-4 right-6 font-mono text-[10px] uppercase tracking-widest ${labelColor}`}>
                                                {project.code}
                                            </div>

                                            <div className="flex flex-col items-start text-left gap-3 z-10 w-full">
                                                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none group-hover:tracking-wider transition-all duration-500">
                                                    {project.title}
                                                </h2>
                                                <p className={`text-sm md:text-base opacity-70 leading-relaxed line-clamp-4`}>
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`cursor-pointer group flex items-center gap-2 text-2xl font-caveat transition-colors mb-2 ${isExpanded ? 'text-background/60 group-hover:text-background' : 'text-foreground/60 group-hover:text-foreground'
                                            }`}>
                                            <span className={`border-b-[1.5px] transition-colors ${isExpanded ? 'border-background/10 group-hover:border-background/60' : 'border-foreground/10 group-hover:border-foreground/60'
                                                }`}>
                                                View Project
                                            </span>
                                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>

                                        {/* Subtle Overlay Pattern for the Ticket background */}
                                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:opacity-[0.07] transition-opacity duration-500" />
                                    </TicketShape>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Work;
