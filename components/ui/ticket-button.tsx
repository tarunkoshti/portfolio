"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { TicketShape } from "@/components/ui/ticket-shape";

interface TicketButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: React.ReactNode;
}

export const TicketButton = ({
    text = "EXPLORE",
    icon,
    className = "",
    onClick,
    ...props
}: TicketButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`group flex items-stretch select-none cursor-pointer ${className}`}
            {...props}
        >
            {/* Left Part: Text */}
            <div className="relative">
                <TicketShape
                    as="div"
                    className="bg-transparent text-white px-6 py-3 flex items-center justify-center font-bold tracking-widest text-sm uppercase transition-all duration-500 group-hover:bg-white group-hover:text-black h-full ticket-border overflow-hidden"
                    cornerSize="6px"
                >
                    <div className="relative h-5 flex items-center justify-center">
                        {/* Original Text - slides up on hover, slides down from top on unhover */}
                        <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-[150%]">
                            {text}
                        </span>
                        {/* Hover Text - slides up from bottom on hover, slides down out on unhover */}
                        <span className="absolute inline-block transition-transform duration-500 ease-out translate-y-[150%] group-hover:translate-y-0">
                            {text}
                        </span>
                    </div>
                </TicketShape>
            </div>

            {/* Middle Divider: Dashed Line */}
            <div className="relative w-0 flex flex-col justify-center items-center">
                <div
                    className="absolute top-[12px] bottom-[12px] border-l border-dashed border-white/50 group-hover:border-black/50 transition-colors duration-500 z-10"
                    style={{ left: "-0.5px" }}
                />
            </div>

            {/* Right Part: Icon */}
            <div className="relative">
                <TicketShape
                    as="div"
                    className="bg-transparent text-white px-4 py-3 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black h-full ticket-border ml-1 overflow-hidden"
                    cornerSize="6px"
                >
                    <div className="relative h-5 w-5 flex items-center justify-center">
                        {/* Original Icon - slides down on hover, slides up from bottom on unhover */}
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:translate-y-[150%]">
                            {icon || <ArrowRight size={20} />}
                        </div>
                        {/* Hover Icon - slides down from top on hover, slides up out on unhover */}
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out -translate-y-[150%] group-hover:translate-y-0">
                            {icon || <ArrowRight size={20} />}
                        </div>
                    </div>
                </TicketShape>
            </div>
        </button>
    );
};
