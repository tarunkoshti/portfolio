"use client";

import { Download } from "lucide-react";
import { TicketButton } from "@/components/ui/ticket-button";

const ResumeButton = () => {
    const handleOpenResume = () => {
        window.open("https://drive.google.com/file/d/1C56uVhl2ANf_WGjcceFVnt9ZiFOYkEbl/view?usp=drive_link", "_blank");
    };

    return (
        <div className="fixed bottom-4 right-6 md:bottom-8 md:right-8 z-50">
            <TicketButton
                className="cursor-pointer"
                text="RESUME"
                icon={<Download size={20} />}
                onClick={handleOpenResume}
            />
        </div>
    );
};

export default ResumeButton;
