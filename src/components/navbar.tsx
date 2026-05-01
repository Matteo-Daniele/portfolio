"use client"

import { Download, Languages, Moon, Sun } from "lucide-react"
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
      downloadCV: "Download CV",
    },
    es: {
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
      downloadCV: "Descargar CV",
    },
  }
  
  const t = translations[language]
  const cvPath = language === "en" 
    ? "/Matteo-Daniele-Resume-English.pdf" 
    : "/Matteo-Daniele-CV-Español (1).pdf"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
      <nav
        className={`w-full max-w-5xl flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        {/* Left: Profile pic + name */}
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
            <Link href="/">
            <Image src="/Logo.png" alt="Matte Daniele" fill className="object-cover" />
            </Link>
          </div>
          <span className="font-medium">Matteo Daniele</span>
        </div>

        {/* Middle: Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/#about" className="text-sm hover:text-primary transition-colors">
            {t.about}
          </Link>
          <Link href="/#projects" className="text-sm hover:text-primary transition-colors">
            {t.projects}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label="Toggle language"
            className="h-8 w-8"
          >
            <Languages className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Link href="/#skills" className="text-sm hover:text-primary transition-colors">
            {t.skills}
          </Link>
          <Link href="/#contact" className="text-sm hover:text-primary transition-colors">
            {t.contact}
          </Link>
        </div>

        {/* Right: CTA and theme toggle */}
        <div className="flex items-center gap-2">
          <a href={cvPath} download>
          <Button variant="outline" size="sm" className="gap-1 hidden sm:flex">
            <Download className="h-4 w-4" />
            <span>{t.downloadCV}</span>
          </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label="Toggle language"
            className="md:hidden h-8 w-8"
          >
            <Languages className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>
    </header>
  )
}
