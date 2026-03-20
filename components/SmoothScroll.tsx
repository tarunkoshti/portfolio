"use client";
import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Integrate with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    useLayoutEffect(() => {

        // Initialize Lenis with optimal settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Synchronize Lenis and ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const ticker = (time: number) => {
            lenis.raf(time * 1000);
        };

        // Add Lenis's requestAnimationFrame to GSAP's ticker for better performance
        gsap.ticker.add(ticker);

        // Disable GSAP's native lag smoothing to prevent stuttering
        gsap.ticker.lagSmoothing(0);

        // Handle anchor scroll
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        lenis.scrollTo(targetElement as HTMLElement, {
                            offset: 0,
                            duration: 1.5,
                            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        });

                        // Update URL hash without jumping
                        window.history.pushState(null, '', href);
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            // Cleanup
            gsap.ticker.remove(ticker);
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return null;
}
