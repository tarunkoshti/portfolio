"use client"

import React, { useRef } from 'react';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { TicketShape } from '../ui/ticket-shape';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger for client-side use
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState(0);
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = React.useState('');

    useGSAP(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.offsetHeight);
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".contact-title", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .from(".contact-item", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.6");
    }, []);

    // Also update on resize
    React.useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                setHeight(contentRef.current.offsetHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formsubmit.co/ajax/tarunkoshti910@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success === "true") {
                setStatus('success');
                setStatusMessage("Message sent successfully!");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setStatusMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage("Failed to send message. Please try again later.");
        }
    };

    return (
        <div ref={sectionRef} className="relative w-full pointer-events-none" style={{ height: `${height}px` }}>
            <div
                ref={contentRef}
                className="fixed bottom-0 left-0 w-full bg-noise z-0 pointer-events-auto"
            >
                <section id="contact" className="w-full min-h-[50vh] flex flex-col pt-12 md:pt-48 pb-8 px-6 md:px-[16.66%]">

                    {/* Content Header */}
                    <div className="mb-6 md:mb-12 overflow-hidden">
                        <span className="contact-title inline-block font-caveat text-3xl md:text-4xl text-foreground/50 tracking-wider">
                            Let's Talk
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 mb-12 md:mb-24">
                        {/* Main CTA */}
                        <div className="contact-item flex flex-col justify-center">
                            <h2 className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight mb-4 md:mb-8">
                                Feel free to reach out to me for any inquiries.
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    {/* <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3 font-mono">
                                        Socials
                                    </p> */}
                                    <div className="flex gap-4">
                                        <a href="https://github.com/tarunkoshti" target="_blank" rel="noreferrer" className="text-sm font-mono underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors ">
                                            Github
                                        </a>
                                        <a href="https://linkedin.com/in/tarun-koshti" target="_blank" rel="noreferrer" className="text-sm font-mono underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors">
                                            LinkedIn
                                        </a>
                                        <a href="https://wa.me/918870407148" target="_blank" rel="noreferrer" className="text-sm font-mono underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors">
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-item flex flex-col justify-center">
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8 w-full">
                                <div className="space-y-1 contact-item">
                                    <label className="uppercase tracking-widest text-foreground/40 text-xs text-mono">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="your name"
                                        className="w-full bg-transparent border-b border-foreground/10 py-2 focus:outline-none focus:border-foreground/40 transition-colors text-sm placeholder:text-foreground/20"
                                    />
                                </div>
                                <div className="space-y-1 contact-item">
                                    <label className="uppercase tracking-widest text-foreground/40 text-xs text-mono">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="your email"
                                        className="w-full bg-transparent border-b border-foreground/10 py-2 focus:outline-none focus:border-foreground/40 transition-colors text-sm placeholder:text-foreground/20"
                                    />
                                </div>
                                <div className="space-y-1 contact-item">
                                    <label className="uppercase tracking-widest text-foreground/40 text-xs text-mono">
                                        Message
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="message"
                                        required
                                        placeholder="your message here..."
                                        className="w-full bg-transparent border-b border-foreground/10 py-2 focus:outline-none focus:border-foreground/40 transition-colors text-sm placeholder:text-foreground/20"
                                    />
                                </div>
                                {/* FormSubmit.co Hidden Fields */}
                                <input type="hidden" name="_subject" value="New Contact Form Submission" />
                                <input type="hidden" name="_captcha" value="false" />

                                <div className="pt-4 flex flex-col gap-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="contact-item cursor-pointer group flex items-center gap-2 text-2xl font-caveat text-foreground/60 hover:text-foreground transition-colors disabled:opacity-50"
                                    >
                                        <span className="border-b-[1.5px] border-foreground/10 group-hover:border-foreground/60 transition-colors">
                                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                        </span>
                                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>

                                    {statusMessage && (
                                        <p className={`text-sm font-mono tracking-tight ${status === 'success' ? 'text-green-500/80' : 'text-red-500/80'}`}>
                                            {statusMessage}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Footer Area */}
                    <div className="mt-auto pt-8 border-t-[1.5px] border-foreground/10 flex items-center justify-between">
                        <p className="text-xs font-mono text-foreground/40">
                            © {new Date().getFullYear()} Tarun Koshti
                        </p>
                    </div>

                </section>
            </div>
        </div>
    );
};

export default Contact;
