"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark")

    useEffect(() => {
        // Initial check on mount
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        const initialTheme = savedTheme || "dark"

        setTheme(initialTheme)
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="hidden fixed top-8 right-96 z-50 px-4 py-2 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md hover:bg-foreground/5 transition-all text-[10px] uppercase font-bold tracking-[0.2em] text-foreground"
        >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    )
}
