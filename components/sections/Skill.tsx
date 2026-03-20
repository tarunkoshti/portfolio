"use client"

import React, { useRef } from 'react';
import { TicketShape } from '../ui/ticket-shape';
import { Layout, Database, Wrench } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const skillsData = [
    {
        title: "Frontend",
        icon: <Layout className="w-8 h-8" />,
        skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "Redux Toolkit", "GSAP"],
        description: "Building responsive and interactive user interfaces."
    },
    {
        title: "Backend",
        icon: <Database className="w-8 h-8" />,
        skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Redis"],
        description: "Designing robust and scalable server-side systems."
    },
    {
        title: "Tools & Others",
        icon: <Wrench className="w-8 h-8" />,
        skills: ["Git", "GitHub", "Postman", "AWS S3", "Vercel", "Hostinger"],
        description: "Streamlining development and deployment workflows."
    }
];

const Skill = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Desktop Animation: Cards burst from the center at an angle
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".skill-title", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            const cards = gsap.utils.toArray<HTMLElement>(".skill-card");

            // Card 1 (Left - Frontend): Moves from center up to the left
            tl.from(cards[0], {
                x: "110%",
                y: 32, // Moves from Card 2's horizontal level if starting at center
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            }, "-=0.6");

            // Card 3 (Right - Tools): Moves from center down to the right
            tl.from(cards[2], {
                x: "-110%",
                y: -32,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            }, "<");

            // Card 2 (Middle - Backend): Scales and fades in place
            tl.from(cards[1], {
                y: 40,
                opacity: 0,
                scale: 0.9,
                duration: 1.5,
                ease: "power4.out"
            }, "<");
        });

        // Mobile Animation: Simple stagger fade up
        mm.add("(max-width: 767px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".skill-title", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            })
                .from(".skill-card", {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=0.6");
        });
    }, { scope: sectionRef });

    return (
        <section
            id="skill"
            ref={sectionRef}
            className="w-full py-24 px-6 md:px-[16.66%] flex flex-col justify-center overflow-hidden relative z-10 bg-black"
        >

            {/* Header */}
            <div className="mb-16 overflow-hidden">
                <span className="skill-title inline-block font-caveat text-3xl md:text-4xl text-foreground/50 tracking-wider">
                    Tech Stack
                </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-8'>
                {skillsData.map((category, index) => (
                    <div
                        key={index}
                        className={`skill-card group relative flex flex-col hover:z-10
                            ${index === 1 ? 'md:translate-y-8' : index === 2 ? 'md:translate-y-16' : ''}
                        `}
                    >
                        <TicketShape
                            cornerSize="16px"
                            className={`
                                relative p-6 h-full min-h-[420px] flex flex-col items-center justify-center gap-4
                                shadow-sm
                                transition-shadow duration-500
                                group-hover:shadow-2xl
                                ${index === 1 ? 'bg-white text-background' : 'bg-noise text-foreground'}
                            `}
                        >
                            {/* Decorative Corner Label */}
                            <div className={`absolute top-4 right-6 font-mono text-[10px] uppercase tracking-widest ${index === 1 ? 'text-background/50' : 'text-foreground/50'}`}>
                                SKL-0{index + 1}
                            </div>

                            <div className="w-full flex flex-col items-center">
                                {/* Icon Container */}
                                <div className={`mb-6 p-4 rounded-full transition-transform duration-500 group-hover:scale-110 ${index === 1 ? 'bg-background/5' : 'bg-foreground/5'}`}>
                                    <div className={index === 1 ? 'text-background' : 'text-foreground'}>
                                        {category.icon}
                                    </div>
                                </div>

                                <h2 className='text-2xl font-bold uppercase tracking-tight text-center mb-2 group-hover:tracking-wider transition-all duration-500'>
                                    {category.title}
                                </h2>

                                <p className={`text-center text-sm md:text-base font-light leading-relaxed mb-6 px-4 ${index === 1 ? 'opacity-70' : 'opacity-60'}`}>
                                    {category.description}
                                </p>

                                {/* Perforation Line */}
                                <div className={`w-full border-t border-dashed mt-4 mb-6 opacity-20 ${index === 1 ? 'border-background' : 'border-foreground'}`} />

                                <div className='flex flex-wrap justify-center gap-1.5 w-full'>
                                    {category.skills.map((skill, sIndex) => (
                                        <span
                                            key={sIndex}
                                            className={`
                                            px-3 py-1 text-xs font-mono tracking-tighter border
                                            transition-all duration-300
                                            ${index === 1
                                                    ? 'border-background/20 hover:bg-background hover:text-foreground'
                                                    : 'border-foreground/10 hover:bg-foreground hover:text-background'}
                                        `}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </TicketShape>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Skill;

