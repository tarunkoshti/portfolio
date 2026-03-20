"use client";

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Loader = () => {
    const [counter, setCounter] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 10) + 1;
            if (count >= 100) {
                count = 100;
                setCounter(100);
                clearInterval(interval);
                setTimeout(() => setIsComplete(true), 500);
            } else {
                setCounter(count);
            }
        }, 80);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        if (isComplete && containerRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    ScrollTrigger.refresh();
                    window.dispatchEvent(new Event('loaderFinished'));
                }
            });
            tl.to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.inOut"
            })
                .to(containerRef.current, {
                    y: "-100%",
                    duration: 1,
                    ease: "expo.inOut"
                }, "-=0.2");
        }
    }, { dependencies: [isComplete] });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-foreground flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
            <div className="relative overflow-hidden h-48 mb-4">
                <div ref={textRef} className="flex flex-col items-center">
                    <span className="font-caveat text-6xl md:text-8xl text-background mb-4">
                        loading
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold text-background leading-none select-none">
                            {counter}
                        </span>
                        <span className="text-2xl md:text-4xl text-background font-mono">%</span>
                    </div>
                </div>
            </div>

            {/* Minimal line that grows */}
            <div className="absolute bottom-0 left-0 h-1 bg-background transition-all duration-300 ease-out" style={{ width: `${counter}%` }} />
        </div>
    );
};

export default Loader;
