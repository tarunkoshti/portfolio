"use client"

import React, { useRef } from 'react';
import { TicketShape } from '@/components/ui/ticket-shape';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Education = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".edu-title", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .from(".edu-item", {
                x: -30,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out"
            }, "-=0.6");
    }, { scope: sectionRef });

    const educationData = [
        {
            year: "2018 — 2022",
            degree: "Bachelor of Technology",
            university: "Sagar Institute of Research, Technology & Science",
            location: "Bhopal, MP, India",
            grade: "CGPA: 7.72",
            description: "Studied programming, algorithms, databases, operating systems, and computer networks over four years of computer science."
        },
        {
            year: "2016 — 2018",
            degree: "Higher Secondary",
            university: "Saraswati Higher Secondary School",
            location: "Gadarwara, MP, India",
            grade: "Percentage: 86%",
            description: "Studied math and physics — the basics that built my logical thinking and got me ready for a career in tech."
        }
    ];

    return (
        <section
            id="education"
            ref={sectionRef}
            className="w-full py-24 px-6 md:px-[16.66%] flex flex-col justify-center overflow-hidden relative z-10 bg-black"
        >

            {/* Header */}
            <div className="mb-12 overflow-hidden">
                <span className="edu-title inline-block font-caveat text-3xl md:text-4xl text-foreground/50 tracking-wider">
                    Education
                </span>
            </div>

            <div className="flex flex-col gap-12 md:gap-24 border-l-[2px] border-foreground/40 pl-8 ml-4">
                {educationData.map((item, index) => (
                    <div key={index} className="edu-item relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 group">
                        {/* Dot on the timeline */}
                        <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full border-2 border-foreground/40 bg-background flex items-center justify-center transition-colors duration-300 group-hover:border-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 transition-colors duration-300 group-hover:bg-foreground scale-0 group-hover:scale-100" />
                        </div>
                        {/* Degree & University */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-6">
                                <TicketShape
                                    cornerSize="6px"
                                    className="inline-block px-4 py-1.5 text-xs md:text-sm font-mono ticket-border bg-transparent text-foreground/70 group-hover:text-foreground transition-colors duration-300"
                                >
                                    {item.year}
                                </TicketShape>
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight group-hover:text-foreground/90 transition-colors">
                                {item.degree}
                            </h3>
                            <p className="text-xl md:text-2xl font-caveat text-foreground/60 mt-2 transition-colors duration-300 group-hover:text-foreground/80">
                                @ {item.university}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col justify-center gap-3">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-1">
                                <div className="flex items-center gap-2 text-foreground/50 text-sm md:text-base font-mono">
                                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-foreground text-sm md:text-base font-mono font-bold">
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    {item.grade}
                                </div>
                            </div>
                            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/70 group-hover:text-foreground/90 transition-colors">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Education;

