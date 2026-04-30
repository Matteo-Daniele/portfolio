"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../components/language-provider"

// Define all skills with categories
const skills = [
  // Technologies
  { name: "C", category: "technology" },
  { name: "Java", category: "technology" },
  { name: "HTML", category: "technology" },
  { name: "CSS", category: "technology" },
  { name: "JavaScript", category: "technology" },
  { name: "TypeScript", category: "technology" },
  { name: "SQL", category: "technology" },

  // Frameworks & Libraries
  { name: "React.js", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "Angular", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "Nest.js", category: "framework" },

  // Tools & Platforms
  { name: "Git", category: "tool" },
  { name: "Jira", category: "tool" },
  { name: "MySQL", category: "tool" },
  { name: "MongoDB", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Postman", category: "tool" },
  { name: "API Integration", category: "tool" },
  { name: "AWS", category: "tool", learning: true },
  { name: "n8n", category: "tool" },
]

// Warm category colors
const categoryStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  technology: {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    border: "border-amber-500/20 dark:border-amber-500/25",
    text: "text-amber-700 dark:text-amber-400",
    glow: "hover:shadow-amber-500/20",
  },
  framework: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    border: "border-orange-500/20 dark:border-orange-500/25",
    text: "text-orange-700 dark:text-orange-400",
    glow: "hover:shadow-orange-500/20",
  },
  tool: {
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    border: "border-rose-500/20 dark:border-rose-500/25",
    text: "text-rose-700 dark:text-rose-400",
    glow: "hover:shadow-rose-500/20",
  },
}

// Split skills into rows for the marquee
const row1 = skills.filter((_, i) => i % 3 === 0)
const row2 = skills.filter((_, i) => i % 3 === 1)
const row3 = skills.filter((_, i) => i % 3 === 2)

function SkillPill({ skill }: { skill: typeof skills[0] }) {
  const style = categoryStyles[skill.category]
  
  return (
    <div
      className={`
        relative flex items-center gap-2 px-5 py-2.5 rounded-full border
        ${style.bg} ${style.border} ${style.text}
        hover:shadow-lg ${style.glow}
        transition-all duration-300 cursor-default select-none
        whitespace-nowrap text-sm font-medium
        hover:scale-105 hover:-translate-y-0.5
      `}
    >
      {skill.name}
      {(skill as any).learning && (
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
      )}
    </div>
  )
}

function MarqueeRow({ 
  skillsList, 
  direction = "left", 
  speed = 30,
}: { 
  skillsList: typeof skills
  direction?: "left" | "right"
  speed?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate items enough times to fill the screen seamlessly
  const items = [...skillsList, ...skillsList, ...skillsList, ...skillsList]
  
  return (
    <div 
      className="relative overflow-hidden py-2 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <motion.div
        className="flex gap-3 w-max"
        animate={{
          x: direction === "left" 
            ? ["0%", "-25%"] 
            : ["-25%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {items.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const { language } = useLanguage()
  
  const translations = {
    en: {
      label: "TECH STACK",
      title: "Technologies & tools",
      subtitle: "The technologies I use to bring ideas to life",
      technologies: "Technologies",
      frameworks: "Frameworks & Libraries",
      tools: "Tools & Platforms",
      learning: "Currently Learning",
    },
    es: {
      label: "STACK TÉCNICO",
      title: "Tecnologías y herramientas",
      subtitle: "Las tecnologías que uso para dar vida a las ideas",
      technologies: "Tecnologías",
      frameworks: "Frameworks y Librerías",
      tools: "Herramientas y Plataformas",
      learning: "Aprendiendo Actualmente",
    },
  }

  const t = translations[language]

  return (
    <section id="skills" className="py-28 md:py-36 relative overflow-hidden">
      {/* Subtle warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(35,30%,95%)] to-background dark:via-[hsl(25,12%,10%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="container px-6 md:px-8 mx-auto mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-6"
          >
            {t.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight"
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-lg mt-6 leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none dark:from-[hsl(25,15%,8%)]" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none dark:from-[hsl(25,15%,8%)]" />

          <div className="space-y-3 md:space-y-4 py-4">
            <MarqueeRow skillsList={row1} direction="left" speed={35} />
            <MarqueeRow skillsList={row2} direction="right" speed={28} />
            <MarqueeRow skillsList={row3} direction="left" speed={40} />
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="container px-6 md:px-8 mx-auto mt-14 md:mt-16"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-muted-foreground">{t.technologies}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-muted-foreground">{t.frameworks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-sm text-muted-foreground">{t.tools}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">{t.learning}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
