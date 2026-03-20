"use client"

import React, { useRef } from 'react';
import { TicketShape } from '../ui/ticket-shape';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".exp-title", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .from(".exp-date", {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.6")
            .from(".exp-content", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.4");
    }, { scope: sectionRef });

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="w-full py-24 px-6 md:px-[16.66%] flex flex-col justify-center overflow-hidden relative z-10 bg-black"
        >

            {/* Header */}
            <div className="mb-12 overflow-hidden">
                <span className="exp-title inline-block font-caveat text-3xl md:text-4xl text-foreground/50 tracking-wider">
                    Work Experience
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {/* Role & Company */}
                <div className="flex flex-col justify-center">
                    <div className="exp-date mb-6">
                        <TicketShape
                            cornerSize="6px"
                            className="inline-block px-4 py-1.5 text-xs md:text-sm font-mono ticket-border bg-transparent text-foreground/70"
                        >
                            June 2024 — Present
                        </TicketShape>
                    </div>
                    <h3 className="exp-content text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
                        MERN Stack Developer
                    </h3>
                    <p className="exp-content text-xl md:text-2xl font-caveat text-foreground/60 mt-2">
                        @ Medorn Ventures Pvt. Ltd.
                    </p>
                </div>

                {/* Brief */}
                <div className="exp-content flex flex-col justify-center">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/70">
                        Building and maintaining production-grade web apps, with a focus on backend features, API development, database optimization, and system security. Consistently improved code quality, reduced bugs, and delivered features that made a real difference in performance and reliability.
                    </p>
                </div>
            </div>

        </section>
    );
};

export default Experience;

