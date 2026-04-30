"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"


export default function ProjectsPage() {
  const { language } = useLanguage()
  
  const translations = {
    en: {
      backToHome: "Back to home",
      myProjects: "My Projects",
      description: "A collection of my work across web development, design, and software engineering",
      viewProjectDetails: "View project details",
      interested: "Interested in working together?",
      openToDiscuss: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      getInTouch: "Get in Touch",
    },
    es: {
      backToHome: "Volver al inicio",
      myProjects: "Mis Proyectos",
      description: "Una colección de mi trabajo en desarrollo web, diseño e ingeniería de software",
      viewProjectDetails: "Ver detalles del proyecto",
      interested: "¿Interesado en trabajar juntos?",
      openToDiscuss: "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.",
      getInTouch: "Ponerse en Contacto",
    },
  }
  
  const t = translations[language]
  
  // Project data with translations
  const projectsData = [
    {
      id: "migafina",
      title: "Migafina",
      subtitle: language === "en" ? "Bakery website with responsive design" : "Sitio web de panadería con diseño responsivo",
      description: language === "en"
        ? "migafina.uy - Application for a bakery, developed with Next.js. It provides information about the bakery, including social media, products, and locations. It is accessible on both mobile and desktop devices."
        : "migafina.uy - Aplicación para una panadería, desarrollada con Next.js. Proporciona información sobre la panadería, incluyendo redes sociales, productos y ubicaciones. Es accesible tanto en dispositivos móviles como de escritorio.",
      image: "/images/migafina-desktop.png",
      mobileImage: "/images/migafina-mobile.png",
      tags: ["Next.js", "Responsive Design", "UI/UX", "CSS"],
      caseStudyUrl: "/projects/migafina",
    },
    {
      id: "rentacar",
      title: "Rent a Car",
      subtitle: language === "en" ? "Car rental administration system" : "Sistema de administración de alquiler de autos",
      description: language === "en"
        ? "Administration application for a car rental company, allowing users to register and log in, make reservations, and view cars with filters for dates, time, mileage, color, and more. Mobile and desktop application. Working side by side with a multidisciplinary team including a product manager and other developers."
        : "Aplicación de administración para una empresa de alquiler de autos, que permite a los usuarios registrarse e iniciar sesión, hacer reservas y ver autos con filtros para fechas, hora, kilometraje, color y más. Aplicación móvil y de escritorio. Trabajando junto con un equipo multidisciplinario que incluye un gerente de producto y otros desarrolladores.",
      image: "/images/rentacar-desktop1.png",
      tags: ["React.js", "Tailwind CSS", "Node.js", "Docker", "MongoDB", "Cloudinary"],
      caseStudyUrl: "/projects/rentacar",
    },
  ]
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Link>
          </motion.div>

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold">{t.myProjects}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 mb-16">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={project.caseStudyUrl}
                  className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40 hover:border-primary/25 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 block"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-5 sm:p-7 space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="font-normal rounded-full bg-primary/8 text-primary/80 border-0">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="font-normal rounded-full border-border/50">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-2xl font-display font-bold group-hover:text-primary transition-colors duration-300">{project.title}</h2>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="pt-2 flex items-center text-primary font-medium text-sm">
                      {t.viewProjectDetails}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-14 text-center"
          >
            {/* Warm gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[hsl(15,75%,55%,0.06)] to-primary/5 pointer-events-none" />
            <div className="absolute inset-0 border border-primary/10 rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{t.interested}</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                {t.openToDiscuss}
              </p>
              <a
                href="mailto:matteodaniele222@gmail.com"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-[#EA7B30] text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                {t.getInTouch}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
