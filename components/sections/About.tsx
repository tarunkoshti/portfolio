"use client"

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".about-title", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .from(".about-column", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.6");
    }, { scope: sectionRef });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="w-full py-24 px-6 md:px-[16.66%] flex flex-col justify-center overflow-hidden relative z-10 bg-black"
        >

            {/* Header */}
            <div className="mb-12 overflow-hidden">
                <span className="about-title inline-block font-caveat text-3xl md:text-4xl text-foreground/50 tracking-wider">
                    About Me
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {/* Tagline */}
                <div className="about-column flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
                        Full-stack developer who thinks in systems and builds in code.
                    </h2>
                </div>

                {/* Brief */}
                <div className="about-column flex flex-col justify-center">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/70">
                        I love taking complicated problems and turning them into simple, clean solutions. I build systems — both the parts users see and the behind-the-scenes systems that make everything run smoothly. I am skilled in JavaScript, React, and Node.js. I also pick up new skills fast.
                    </p>
                </div>
            </div>

        </section>
    );
};

export default About;
