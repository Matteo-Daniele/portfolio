"use client"

import { ArrowRight, Download, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../components/language-provider"
import { Button } from "../components/ui/button"
import BlobCanvas from "./blob-canvas"

export default function Hero() {
  const { language } = useLanguage()
  const cvPath = language === "en" 
    ? "/Matteo-Daniele-Resume-English.pdf" 
    : "/Matteo-Daniele-CV-Español (1).pdf"
  
  const translations = {
    en: {
      label: "Full-Stack Developer",
      title: "Turning ideas into",
      titleHighlight: "digital reality",
      subtitle1: "I build exceptional and accessible digital experiences",
      subtitle2: "for the web and mobile applications.",
      viewProjects: "View Projects",
      githubProfile: "GitHub Profile",
      downloadCV: "Download CV",
    },
    es: {
      label: "Desarrollador Full-Stack",
      title: "Convirtiendo ideas en",
      titleHighlight: "realidad digital",
      subtitle1: "Construyo experiencias digitales excepcionales y accesibles",
      subtitle2: "para aplicaciones web y móviles.",
      viewProjects: "Ver Proyectos",
      githubProfile: "Perfil de GitHub",
      downloadCV: "Descargar CV",
    },
  }
  
  const t = translations[language]
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] sm:min-h-[85vh] md:min-h-[80vh] px-4 py-20 text-center overflow-hidden">
      {/* Blob Canvas Background */}
      <BlobCanvas />
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[#ffffffa0] bg-[radial-gradient(#00000020_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#00000020] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)]" 
        style={{
          backdropFilter: 'blur(90px)',
          // maskImage: 'linear-gradient(0deg, #000000aa 0%, #000 50%, #000000aa 100%)'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:mt-8 md:mt-0">
        {/* Label */}
        <div className="inline-block rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium text-primary">
          {t.label}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {t.title} <span className="text-primary">{t.titleHighlight}</span>
        </h1>

        {/* Two-row subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto p-2">
          {t.subtitle1}
          <br className="hidden sm:block" />
          &nbsp;{t.subtitle2}
        </p>

        {/* Two or three buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="#projects">
            <Button size="lg" className="gap-2">
              {t.viewProjects}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="https://github.com/Matteo-Daniele" target="_blank">
            <Button size="lg" variant="outline" className="gap-2 bg-background/80">
              <Github className="h-4 w-4" />
              {t.githubProfile}
            </Button>
          </a>
          <a href={cvPath} download target="_blank" className="sm:hidden">
            <Button size="lg" variant="outline" className="gap-2 bg-background/80">
              <Download className="h-4 w-4" />
              {t.downloadCV}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
