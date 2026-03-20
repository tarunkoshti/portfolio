"use client";

import { Download } from "lucide-react";
import { TicketButton } from "@/components/ui/ticket-button";

const ResumeButton = () => {
    const handleOpenResume = () => {
        window.open("https://drive.google.com/file/d/1R-PlBbHnSGlv43ZfaaXFN6QH4ZQILHjk/view?usp=drivesdk", "_blank");
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
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
