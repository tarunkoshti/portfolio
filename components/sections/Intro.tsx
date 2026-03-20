"use client"

import React from 'react';
import Link from "next/link";
import { Github, Linkedin, MessageCircle } from "lucide-react";
import { TicketShape } from "@/components/ui/ticket-shape";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger for client-side use
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Intro = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lineRefH = React.useRef<(HTMLDivElement | null)[]>([]);
    const lineRefV = React.useRef<(HTMLDivElement | null)[]>([]);
    const textLinesRef = React.useRef<(HTMLSpanElement | null)[]>([]);
    const socialRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ScrollTrigger pinning
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
        });

        // Entrance animation
        const tl = gsap.timeline({ paused: true });

        tl.from(lineRefV.current, {
            scaleY: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: "expo.out",
            transformOrigin: "top"
        })
            .from(lineRefH.current[0], {
                scaleX: 0,
                duration: 1.5,
                ease: "expo.out",
                transformOrigin: "left"
            }, "-=1.2")
            .from(lineRefH.current[1], {
                scaleX: 0,
                duration: 1.5,
                ease: "expo.out",
                transformOrigin: "right"
            }, "-=1.2")
            .from(textLinesRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            }, "-=1")
            .from(socialRef.current?.children || [], {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.5");

        const startAnimation = () => tl.play();
        window.addEventListener('loaderFinished', startAnimation);
        return () => window.removeEventListener('loaderFinished', startAnimation);

    }, { scope: containerRef });

    return (
        <section id="home" ref={containerRef} className="bg-noise relative min-h-screen w-full overflow-hidden z-10">

            {/* horizontal lines */}
            <div ref={(el) => { lineRefH.current[0] = el; }} className="absolute top-[12%] md:top-1/6 left-0 w-full h-[1.5px] bg-foreground/10 z-10" />
            <div ref={(el) => { lineRefH.current[1] = el; }} className="absolute top-1/2 left-0 w-full h-[1.5px] bg-foreground/10 z-10" />

            {/* vertical lines */}
            <div ref={(el) => { lineRefV.current[0] = el; }} className="absolute top-0 left-6 md:left-1/6 w-[1.5px] h-full bg-foreground/10 z-10" />
            <div ref={(el) => { lineRefV.current[1] = el; }} className="absolute top-0 right-6 md:right-1/6 w-[1.5px] h-full bg-foreground/10 z-10" />

            {/* corner social links */}
            <div ref={socialRef} className="absolute top-1/2 left-0 w-full md:left-5/6 md:w-1/6 h-1/6 z-40 flex items-start justify-center gap-12 md:block" >
                <div className="relative md:absolute md:left-1/4 w-[1.5px] h-1/3 md:h-4/5 bg-foreground/10 z-10 flex flex-col items-center">
                    <TicketShape
                        as={Link}
                        href="https://github.com/tarunkoshti"
                        target="_blank"
                        cornerSize="5px"
                        style={{ "--ticket-border-color": "var(--foreground)" } as any}
                        className="absolute -bottom-8 p-1.5 md:p-2 ticket-border bg-transparent text-foreground transition-all duration-300 -rotate-12 hover:rotate-0 flex items-center justify-center hover:bg-foreground hover:text-background"
                    >
                        <Github className="w-4 h-4 md:w-5 md:h-5" />
                    </TicketShape>
                </div>
                <div className="relative md:absolute flex md:left-1/2 w-[1.5px] h-1/5 md:h-2/3 bg-foreground/10 z-10 flex-col items-center">
                    <TicketShape
                        as={Link}
                        href="https://wa.me/918827407148"
                        target="_blank"
                        cornerSize="5px"
                        style={{ "--ticket-border-color": "var(--foreground)" } as any}
                        className="absolute -bottom-8 p-1.5 md:p-2 ticket-border bg-transparent text-foreground transition-all duration-300 rotate-6 hover:rotate-0 flex items-center justify-center hover:bg-foreground hover:text-background"
                    >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    </TicketShape>
                </div>
                <div className="relative md:absolute flex md:left-3/4 w-[1.5px] h-1/3 md:h-4/5 bg-foreground/10 z-10 flex flex-col items-center">
                    <TicketShape
                        as={Link}
                        href="https://linkedin.com/in/tarun-koshti"
                        target="_blank"
                        cornerSize="5px"
                        style={{ "--ticket-border-color": "var(--foreground)" } as any}
                        className="absolute -bottom-8 p-1.5 md:p-2 ticket-border bg-transparent text-foreground transition-all duration-300 rotate-12 hover:rotate-0 flex items-center justify-center hover:bg-foreground hover:text-background"
                    >
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                    </TicketShape>
                </div>
            </div>

            {/* headline */}
            <div className="absolute top-32 md:top-44 left-0 md:left-1/6 w-full md:w-4/6 h-1/3 z-20 flex justify-center items-center px-8 md:px-0">
                <h2 className="text-4xl sm:text-5xl md:text-7xl text-center overflow-hidden">
                    <span ref={(el) => { textLinesRef.current[0] = el; }} className="text-base md:text-xl block mb-4 md:mb-6 text-foreground/50 normal-case">
                        Hello! I'm
                    </span>
                    <span ref={(el) => { textLinesRef.current[1] = el; }} className="font-caveat tracking-wider block ">Tarun Koshti</span>
                    <span ref={(el) => { textLinesRef.current[2] = el; }} className=" tracking-wider block uppercase font-bold text-3xl sm:text-4xl md:text-7xl">a web developer</span>
                </h2>
            </div>

            {/* about me */}
            <div className="absolute top-1/2 pt-10 md:pt-0 left-0 md:left-1/6 w-full md:w-4/6 h-1/3 z-20 flex justify-center items-center text-foreground/50 overflow-hidden px-8 md:px-0">
                <p ref={(el) => { textLinesRef.current[3] = el; }} className="px-4 sm:px-8 md:px-16 text-sm text-center sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground/70">
                    A web developer with experience in building scalable web applications,
                    with modern user interfaces and user experiences.
                </p>
            </div>

        </section>
    );
};

export default Intro;
