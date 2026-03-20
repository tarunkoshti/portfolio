"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, ChevronDown, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { TicketShape } from "@/components/ui/ticket-shape";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Refs for animation
    const contentRef = useRef<HTMLDivElement>(null); // Now points to the static profile ticket
    const menuRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle Menu
    const toggleMenu = () => {
        if (!isOpen) { // If menu is about to open
            setIsDetailsOpen(false); // Close details
        }
        setIsOpen(!isOpen);
    };

    // Toggle Details
    const toggleDetails = () => {
        if (!isDetailsOpen) { // If details is about to open
            setIsOpen(false); // Close menu
        }
        setIsDetailsOpen(!isDetailsOpen);
    };

    // Menu Animation
    useGSAP(() => {
        if (menuRef.current) {
            if (isOpen) {
                gsap.to(menuRef.current, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                gsap.to(menuRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                });
            }
        }
    }, { dependencies: [isOpen], scope: containerRef });

    // Details Animation
    useGSAP(() => {
        if (detailsRef.current) {
            if (isDetailsOpen) {
                gsap.to(detailsRef.current, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                gsap.to(detailsRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                });
            }
        }
    }, { dependencies: [isDetailsOpen], scope: containerRef });

    return (
        <header ref={containerRef} className="fixed top-4 right-8 z-50 flex items-start">

            {/* LEFT SIDE: Content Switcher */}
            <div className="relative flex items-stretch">

                <div className="flex flex-col w-[300px]">

                    {/* ---------------- PROFILE INFO TICKET (Always Visible) ---------------- */}
                    <div ref={contentRef} className="relative z-40 bg-transparent">
                        <TicketShape
                            className="bg-white ticket-border w-full h-24 flex flex-col justify-between text-black"
                            style={{
                                "--ticket-border-color": "black",
                                "--corner-size": "6px"
                            } as any}
                            cornerSize="6px"
                        >
                            <div className="flex flex-row h-full">
                                {/* Thumbnail / Title Area */}
                                <div className="flex-1 p-4 flex items-center gap-4">
                                    {/* <div className="w-10 h-10 rounded overflow-hidden border border-black/10 shrink-0">
                                        <img src="/images/profile.jpeg" alt="tk" className="w-full h-full object-cover" />
                                    </div> */}
                                    <div className="flex flex-col leading-none">
                                        <span className="font-bold text-lg uppercase tracking-tight">TARUN KOSHTI</span>
                                        <span className="text-[10px] text-black/50 uppercase tracking-widest mt-1">Web Developer</span>
                                    </div>
                                    <button
                                        onClick={toggleDetails}
                                        className={`ml-auto w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition-transform duration-300 ${isDetailsOpen ? "rotate-180" : ""}`}
                                    >
                                        <ChevronDown size={16} className="text-black/40 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </TicketShape>
                    </div>

                    {/* ---------------- DROPDOWN CONTAINER ---------------- */}
                    <div className="grid grid-cols-1 grid-rows-1 relative z-30">

                        {/* MENU DROPDOWN */}
                        <div ref={menuRef} className="col-start-1 row-start-1 overflow-hidden h-0 opacity-0">
                            <TicketShape
                                className="bg-white ticket-border w-full flex flex-col text-black mt-[-1px] pt-[6px]"
                                style={{
                                    "--ticket-border-color": "black",
                                    "--corner-size": "6px"
                                } as any}
                                cornerSize="6px"
                            >
                                {/* Top Section */}
                                <div className="p-8 pb-4 flex-1">
                                    <nav className="flex flex-col gap-4">
                                        {["HOME", "ABOUT", "PROJECTS", "CONTACT"].map((item, index) => {
                                            const sectionId = item === "HOME" ? "home" : item === "PROJECTS" ? "work" : item.toLowerCase();
                                            return (
                                                <Link
                                                    key={item}
                                                    href={`#${sectionId}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="group flex items-center gap-4 text-4xl font-bold uppercase tracking-wider hover:opacity-50 transition-opacity"
                                                >
                                                    <span className="text-xs font-normal text-black/50 group-hover:translate-x-1 transition-transform">
                                                        0{index + 1}
                                                    </span>
                                                    {item}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>

                                {/* Middle Links */}
                                <div className="border-t border-dashed border-black/30 px-8 py-4 flex gap-6 text-[10px] uppercase tracking-widest text-black/60">
                                    <Link href="#experience" onClick={() => setIsOpen(false)} className="hover:text-black">Experience</Link>
                                    <Link href="#skill" onClick={() => setIsOpen(false)} className="hover:text-black">Skills</Link>
                                    <Link href="#education" onClick={() => setIsOpen(false)} className="hover:text-black">Education</Link>
                                </div>

                                {/* Bottom Socials */}
                                <div className="border-t border-dashed border-black/30 px-8 py-4 flex justify-between items-center bg-black/5">
                                    <div className="flex gap-4">
                                        <Link href="#" className="hover:opacity-50 transition-opacity"><Instagram size={16} /></Link>
                                        <Link href="#" className="hover:opacity-50 transition-opacity"><Linkedin size={16} /></Link>
                                        <Link href="#" className="hover:opacity-50 transition-opacity"><Github size={16} /></Link>
                                    </div>
                                    <span className="text-[10px] text-black/40 uppercase tracking-widest">
                                        ©2026
                                    </span>
                                </div>
                            </TicketShape>
                        </div>

                        {/* DETAILS DROPDOWN */}
                        <div ref={detailsRef} className="col-start-1 row-start-1 overflow-hidden h-0 opacity-0">
                            <TicketShape
                                className="bg-white ticket-border w-full flex flex-col text-black mt-[-1px] pt-[6px]"
                                style={{
                                    "--ticket-border-color": "black",
                                    "--corner-size": "6px"
                                } as any}
                                cornerSize="6px"
                            >
                                <div className="p-6 flex flex-col gap-4 text-xs font-medium text-black/70">
                                    <div className="flex items-center gap-3">
                                        <Phone size={14} className="text-black/40" />
                                        <span>+91 8827407148</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail size={14} className="text-black/40" />
                                        <span>tarunkoshti910@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar size={14} className="text-black/40" />
                                        <span>Oct 09, 2002</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin size={14} className="text-black/40" />
                                        <span>Ayodhya Bypass Road, Bhopal, Madhya Pradesh, India</span>
                                    </div>
                                </div>
                            </TicketShape>
                        </div>
                    </div>
                </div>

                {/* VISUAL DASHED SEPARATOR */}
                <div className="w-[1px] relative z-10 mx-[-0.5px]">
                    <div className="absolute top-[10px] bottom-[10px] left-0 border-l border-dashed border-black/30"></div>
                </div>

            </div>

            {/* RIGHT SIDE: Toggle Button */}
            <TicketShape
                as="button"
                onClick={toggleMenu}
                className="w-24 h-24 bg-white text-black ticket-border flex flex-col items-center justify-center transition-colors relative z-20 -ml-[1px] cursor-pointer"
                style={{
                    "--ticket-border-color": "black",
                    "--corner-size": "6px"
                } as any}
                cornerSize="6px"
            >
                <div className="flex flex-col gap-1.5 w-8 items-center justify-center">
                    <span
                        className={`block w-full h-[2px] bg-black transition-all duration-300 ease-in-out origin-center ${isOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`block w-full h-[2px] bg-black transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-x-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-full h-[2px] bg-black transition-all duration-300 ease-in-out origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </div>
            </TicketShape>

        </header>
    );
};

export default Header;
