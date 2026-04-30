"use client"

import { Languages, Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "../components/language-provider"
import { useTheme } from "../components/theme-provider"
import { Button } from "../components/ui/button"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  const translations = {
    en: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    es: {
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
    },
  }

  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-4xl flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-black/[0.03] border border-border/50 dark:shadow-black/20"
            : "bg-transparent"
        }`}
      >
        {/* Left: Logo + name */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="relative block h-9 w-9 overflow-hidden rounded-full border border-border/60 hover:border-primary/40 transition-colors duration-300">
            <Image src="/Logo.png" alt="Matteo Daniele" fill sizes="36px" className="object-cover" />
          </Link>
          <span className="font-display font-semibold text-sm tracking-tight hidden sm:block">Matteo Daniele</span>
        </div>

        {/* Middle: Navigation links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: "/#about", label: t.about },
            { href: "/#projects", label: t.projects },
            { href: "/#skills", label: t.skills },
            { href: "/#contact", label: t.contact },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm px-3.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label="Toggle language"
            className="h-8 w-8 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-primary/5"
          >
            {language === "en" ? "EN" : "ES"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/5"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>
    </header>
  )
}
