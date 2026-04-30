"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../components/language-provider"
import { Button } from "../components/ui/button"
import BlobCanvas from "./blob-canvas"

export default function Hero() {
  const { language } = useLanguage()
  const cvPath = language === "en" 
    ? "/Resume-MatteoDaniele.pdf" 
    : "/CV-MatteoDaniele-Español.pdf"
  
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
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-28 text-center overflow-hidden">
      {/* Blob Canvas Background */}
      <BlobCanvas />

      {/* Warm dot-grid overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 
                   bg-[#FAF8F5a0] bg-[radial-gradient(hsl(25_10%_70%/0.15)_1px,transparent_1px)] [background-size:20px_20px]
                   dark:bg-[#1C1917a0] dark:bg-[radial-gradient(hsl(35_20%_40%/0.12)_1px,transparent_1px)]" 
        style={{
          backdropFilter: 'blur(90px)',
        }}
      />

      {/* Warm radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,hsl(28_92%_55%/0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 sm:mt-8 md:mt-0">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block rounded-full bg-primary/10 border border-primary/20 px-5 py-2 text-sm font-medium text-primary"
        >
          {t.label}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.05]"
        >
          {t.title}{" "}
          <span className="gradient-warm-text">{t.titleHighlight}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {t.subtitle1}
          <br className="hidden sm:block" />
          &nbsp;{t.subtitle2}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link href="#projects">
            <Button 
              size="lg" 
              className="gap-2 rounded-full px-8 bg-gradient-to-r from-primary to-[#EA7B30] hover:opacity-90 text-white border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              {t.viewProjects}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="https://github.com/Matteo-Daniele" target="_blank">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 rounded-full px-8 bg-background/60 backdrop-blur-sm border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <Github className="h-4 w-4" />
              {t.githubProfile}
            </Button>
          </a>
          <a href={cvPath} download target="_blank" className="sm:hidden">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 rounded-full px-8 bg-background/60 backdrop-blur-sm border-border/50"
            >
              <Download className="h-4 w-4" />
              {t.downloadCV}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
