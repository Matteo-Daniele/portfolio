"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { useLanguage } from "../components/language-provider"

export default function Projects() {
  const { language } = useLanguage()

  const translations = {
    en: {
      myWork: "Selected Work",
      featuredProjects: "Projects that\ndefine my craft",
      description: "Each project is a story of solving real problems with code, design, and intention.",
      viewAllProjects: "View all projects",
    },
    es: {
      myWork: "Trabajo Seleccionado",
      featuredProjects: "Proyectos que\ndefinen mi oficio",
      description: "Cada proyecto es una historia de resolver problemas reales con código, diseño e intención.",
      viewAllProjects: "Ver todos los proyectos",
    },
  }

  const t = translations[language]

  const projectsData = [
    {
      id: 1,
      title: "Migafina",
      subtitle: language === "en"
        ? "Bakery website with responsive design"
        : "Sitio web de panadería con diseño responsivo",
      image: "/images/migafina-desktop.png",
      tags: ["Next.js", "React", "CSS"],
      caseStudyUrl: "/projects/migafina",
      year: "2025",
    },
    {
      id: 2,
      title: "Rent a Car",
      subtitle: language === "en"
        ? "Full-stack vehicle reservation platform"
        : "Plataforma full-stack de reservas de vehículos",
      image: "/images/rentacar-desktop1.png",
      tags: ["React.js", "Node.js", "MongoDB"],
      caseStudyUrl: "/projects/rentacar",
      year: "2024",
    },
  ]

  return (
    <section id="projects" className="relative py-32 md:py-44 overflow-hidden
                                       bg-[#1C1917] text-white">
      {/* Warm dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917] via-[#211E1B] to-[#1C1917] pointer-events-none" />
      
      {/* Subtle warm ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(245,158,11,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="container px-6 md:px-8 mx-auto mb-20 md:mb-28">
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-amber-400 font-medium tracking-[0.2em] uppercase text-xs mb-8"
            >
              {t.myWork}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight leading-[1.05] whitespace-pre-line"
            >
              {t.featuredProjects}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/40 text-lg md:text-xl max-w-lg mt-8 leading-relaxed"
            >
              {t.description}
            </motion.p>
          </div>
        </div>

        {/* Project List */}
        <div className="container px-6 md:px-8 mx-auto">
          {/* Top border */}
          <div className="h-px bg-white/10" />
          
          {projectsData.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="container px-6 md:px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mt-28 md:mt-36"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
                         bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm
                         hover:scale-[1.03] active:scale-[0.98]
                         transition-all duration-300
                         shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
            >
              {t.viewAllProjects}
              <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


function ProjectRow({
  project,
  index,
}: {
  project: {
    id: number
    title: string
    subtitle: string
    image: string
    tags: string[]
    caseStudyUrl: string
    year: string
  }
  index: number
}) {
  const rowRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position with spring physics for smooth following
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    // Position image relative to the row, offset to the right and above cursor
    mouseX.set(e.clientX - rect.left + 20)
    mouseY.set(e.clientY - rect.top - 160)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        ref={rowRef}
        href={project.caseStudyUrl}
        className="group relative block py-8 md:py-10 border-b border-white/10 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover background glow */}
        <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/[0.03] via-orange-500/[0.02] to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Row content */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Left side: number + title + subtitle */}
          <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
            <span className="text-white/15 text-sm md:text-base font-mono tracking-widest flex-shrink-0 w-8">
              {String(index + 1).padStart(2, '0')}
            </span>
            
            <div className="min-w-0">
              <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight transition-all duration-500 ${isHovered ? 'text-amber-400' : 'text-white'}`}>
                {project.title}
              </h3>
              <p className={`text-sm md:text-base mt-1 transition-all duration-500 truncate ${isHovered ? 'text-white/50' : 'text-white/25'}`}>
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Right side: tags + year + arrow */}
          <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
            {/* Tags — hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-white/20 text-xs border border-white/10 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* Year */}
            <span className="text-white/20 text-sm font-mono hidden sm:block">
              {project.year}
            </span>

            {/* Arrow */}
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
              isHovered 
                ? 'border-amber-500/50 bg-amber-500/10' 
                : 'border-white/10 bg-transparent'
            }`}>
              <ArrowUpRight className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-500 ${
                isHovered 
                  ? 'text-amber-400 -translate-y-0.5 translate-x-0.5' 
                  : 'text-white/30'
              }`} />
            </div>
          </div>
        </div>

        {/* Floating preview image — follows cursor */}
        <motion.div
          className="absolute z-30 pointer-events-none hidden md:block"
          style={{
            left: springX,
            top: springY,
          }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.85,
              rotate: isHovered ? -2 : -5,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[320px] h-[200px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="320px"
              priority={index < 2}
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
