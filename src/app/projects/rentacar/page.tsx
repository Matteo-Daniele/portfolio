"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"

// Project images data
const projectImages = [
  {
    src: "/images/rentacar-desktop1.png",
    alt: "Rent a Car vehicle listing",
  },
  {
    src: "/images/rentacar-desktop2.png",
    alt: "Rent a Car reservation details",
  },
  {
    src: "/images/rentacar-desktop3.png",
    alt: "Rent a Car vehicle confirmation",
  },
]

export default function RentacarProjectPage() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const translations = {
    en: {
      backToProjects: "Back to projects",
      webApplication: "Web Application",
      subtitle: "Car rental administration system",
      projectOverview: "Project Overview",
      overviewText: "Rent a Car is a comprehensive administration application for a car rental company. The system allows users to register and log in, make reservations, and view available cars with advanced filtering options for dates, time, mileage, color, and more. The application is fully responsive, working seamlessly on both mobile and desktop devices.",
      developmentProcess: "Development Process",
      processIntro: "This project was developed as part of a multidisciplinary team, working closely with a product manager and other developers. The development process included:",
      process1: "Requirements gathering and system architecture planning",
      process2: "Database schema design for vehicle inventory and reservation management",
      process3: "Frontend development with React.js and Tailwind CSS",
      process4: "Backend API development with Node.js",
      process5: "Integration with MongoDB for data storage",
      process6: "Implementation of Cloudinary for vehicle image management",
      process7: "Containerization with Docker for consistent deployment",
      process8: "Extensive testing and quality assurance",
      process9: "Deployment and monitoring",
      keyFeatures: "Key Features",
      userAuth: "User Authentication",
      userAuthDesc: "Secure registration and login system for customers and administrators",
      advancedFiltering: "Advanced Filtering",
      advancedFilteringDesc: "Search vehicles by date, time, mileage, color, and other specifications",
      reservationManagement: "Reservation Management",
      reservationManagementDesc: "Create, view, modify, and cancel reservations with real-time availability",
      vehicleManagement: "Vehicle Management",
      vehicleManagementDesc: "Add, edit, and manage vehicle inventory with detailed specifications",
      branchManagement: "Branch Location Management",
      branchManagementDesc: "Support for multiple rental locations with different vehicle availability",
      responsiveDesign: "Responsive Design",
      responsiveDesignDesc: "Optimized user experience on both mobile and desktop devices",
      challenges: "Challenges & Solutions",
      challenge1: "Challenge: Complex reservation system",
      challenge1Text: "Implementing a reservation system that could handle overlapping bookings, different pickup/return locations, and varying pricing models.",
      solution1: "Solution:",
      solution1Text: "Developed a sophisticated availability algorithm that checks vehicle status across multiple parameters and locations, with a flexible pricing engine that supports dynamic rates based on duration, season, and vehicle type.",
      challenge2: "Challenge: Team collaboration",
      challenge2Text: "Coordinating development efforts across a multidisciplinary team with different areas of expertise.",
      solution2: "Solution:",
      solution2Text: "Implemented an agile development methodology with regular sprint planning, daily standups, and retrospectives. Used Git for version control with a structured branching strategy and pull request reviews.",
      projectDetails: "Project Details",
      client: "Client",
      timeline: "Timeline",
      role: "My Role",
      teamSize: "Team Size",
      technologiesUsed: "Technologies Used",
      links: "Links",
      viewSource: "View Source Code",
      viewDemo: "View Demo",
      previousProject: "Previous Project: Migafina",
      backToAllProjects: "Back to All Projects",
    },
    es: {
      backToProjects: "Volver a proyectos",
      webApplication: "Aplicación Web",
      subtitle: "Sistema de administración de alquiler de autos",
      projectOverview: "Resumen del Proyecto",
      overviewText: "Rent a Car es una aplicación integral de administración para una empresa de alquiler de autos. El sistema permite a los usuarios registrarse e iniciar sesión, hacer reservas y ver autos disponibles con opciones avanzadas de filtrado para fechas, hora, kilometraje, color y más. La aplicación es completamente responsiva, funcionando perfectamente tanto en dispositivos móviles como de escritorio.",
      developmentProcess: "Proceso de Desarrollo",
      processIntro: "Este proyecto fue desarrollado como parte de un equipo multidisciplinario, trabajando en estrecha colaboración con un gerente de producto y otros desarrolladores. El proceso de desarrollo incluyó:",
      process1: "Recopilación de requisitos y planificación de arquitectura del sistema",
      process2: "Diseño de esquema de base de datos para inventario de vehículos y gestión de reservas",
      process3: "Desarrollo frontend con React.js y Tailwind CSS",
      process4: "Desarrollo de API backend con Node.js",
      process5: "Integración con MongoDB para almacenamiento de datos",
      process6: "Implementación de Cloudinary para gestión de imágenes de vehículos",
      process7: "Containerización con Docker para despliegue consistente",
      process8: "Pruebas exhaustivas y aseguramiento de calidad",
      process9: "Despliegue y monitoreo",
      keyFeatures: "Características Clave",
      userAuth: "Autenticación de Usuario",
      userAuthDesc: "Sistema seguro de registro e inicio de sesión para clientes y administradores",
      advancedFiltering: "Filtrado Avanzado",
      advancedFilteringDesc: "Buscar vehículos por fecha, hora, kilometraje, color y otras especificaciones",
      reservationManagement: "Gestión de Reservas",
      reservationManagementDesc: "Crear, ver, modificar y cancelar reservas con disponibilidad en tiempo real",
      vehicleManagement: "Gestión de Vehículos",
      vehicleManagementDesc: "Agregar, editar y gestionar inventario de vehículos con especificaciones detalladas",
      branchManagement: "Gestión de Ubicaciones de Sucursales",
      branchManagementDesc: "Soporte para múltiples ubicaciones de alquiler con diferente disponibilidad de vehículos",
      responsiveDesign: "Diseño Responsivo",
      responsiveDesignDesc: "Experiencia de usuario optimizada tanto en dispositivos móviles como de escritorio",
      challenges: "Desafíos y Soluciones",
      challenge1: "Desafío: Sistema de reservas complejo",
      challenge1Text: "Implementar un sistema de reservas que pudiera manejar reservas superpuestas, diferentes ubicaciones de recogida/devolución y modelos de precios variables.",
      solution1: "Solución:",
      solution1Text: "Se desarrolló un algoritmo sofisticado de disponibilidad que verifica el estado de los vehículos en múltiples parámetros y ubicaciones, con un motor de precios flexible que admite tarifas dinámicas basadas en duración, temporada y tipo de vehículo.",
      challenge2: "Desafío: Colaboración en equipo",
      challenge2Text: "Coordinar los esfuerzos de desarrollo en un equipo multidisciplinario con diferentes áreas de experiencia.",
      solution2: "Solución:",
      solution2Text: "Se implementó una metodología de desarrollo ágil con planificación regular de sprints, reuniones diarias y retrospectivas. Se usó Git para control de versiones con una estrategia de ramificación estructurada y revisiones de pull requests.",
      projectDetails: "Detalles del Proyecto",
      client: "Cliente",
      timeline: "Cronograma",
      role: "Mi Rol",
      teamSize: "Tamaño del Equipo",
      technologiesUsed: "Tecnologías Utilizadas",
      links: "Enlaces",
      viewSource: "Ver Código Fuente",
      viewDemo: "Ver Demo",
      previousProject: "Proyecto Anterior: Migafina",
      backToAllProjects: "Volver a Todos los Proyectos",
    },
  }
  
  const t = translations[language]

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectImages.length) % projectImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-play for carousel
  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Reset interval when manually navigating
  const handleManualNavigation = (direction: "next" | "prev") => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (direction === "next") goToNext()
    else goToPrev()
    intervalRef.current = setInterval(goToNext, 5000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-background to-background/95">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToProjects}
          </Link>

          {/* Project header */}
          <div className="flex flex-col gap-4 mb-12">
            <Badge className="w-fit" variant="outline">
              {t.webApplication}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Rent a Car</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Project images showcase */}
          <motion.div
            className="mb-12 md:mb-16 bg-muted/30 p-4 sm:p-6 rounded-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Desktop images with custom carousel */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-md p-2 sm:p-4 backdrop-blur-md border-0"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)" }}
              >
                <div className="relative w-full overflow-hidden rounded-lg">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="relative aspect-[16/9] w-full"
                    >
                      <Image
                        src={projectImages[currentIndex].src || "/placeholder.svg"}
                        alt={projectImages[currentIndex].alt}
                        fill
                        className="object-contain rounded-lg"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <button
                    onClick={() => handleManualNavigation("prev")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 rounded-full p-1.5 text-primary shadow-md backdrop-blur-sm z-10 opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                    disabled={isAnimating}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleManualNavigation("next")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 rounded-full p-1.5 text-primary shadow-md backdrop-blur-sm z-10 opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                    disabled={isAnimating}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (intervalRef.current) clearInterval(intervalRef.current)
                          setCurrentIndex(index)
                          intervalRef.current = setInterval(goToNext, 5000)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentIndex === index
                            ? "bg-primary w-4"
                            : "bg-white/50 dark:bg-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-600/80"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Project details */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="md:col-span-2 space-y-8">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">{t.projectOverview}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.overviewText}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">{t.developmentProcess}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.processIntro}
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t.process1}</li>
                  <li>{t.process2}</li>
                  <li>{t.process3}</li>
                  <li>{t.process4}</li>
                  <li>{t.process5}</li>
                  <li>{t.process6}</li>
                  <li>{t.process7}</li>
                  <li>{t.process8}</li>
                  <li>{t.process9}</li>
                </ol>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">{t.keyFeatures}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.userAuth}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.userAuthDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.advancedFiltering}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.advancedFilteringDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.reservationManagement}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.reservationManagementDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.vehicleManagement}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.vehicleManagementDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.branchManagement}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.branchManagementDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.responsiveDesign}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.responsiveDesignDesc}
                    </p>
                  </li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4">{t.challenges}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{t.challenge1}</h3>
                    <p className="text-muted-foreground">
                      {t.challenge1Text}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">{t.solution1}</h3>
                    <p className="text-muted-foreground">
                      {t.solution1Text}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">{t.challenge2}</h3>
                    <p className="text-muted-foreground">
                      {t.challenge2Text}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">{t.solution2}</h3>
                    <p className="text-muted-foreground">
                      {t.solution2Text}
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>

            <div className="space-y-8">
              <motion.section
                className="bg-muted/30 p-6 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-4">{t.projectDetails}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.client}</h3>
                    <p>Martinez Rent a Car</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.timeline}</h3>
                    <p>{language === "en" ? "3 months" : "3 meses"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.role}</h3>
                    <p>{language === "en" ? "Full-stack Developer" : "Desarrollador Full-stack"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.teamSize}</h3>
                    <p>{language === "en" ? "3 members" : "3 miembros"}</p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-4">{t.technologiesUsed}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">React.js</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Tailwind CSS</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Node.js</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">MongoDB</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Docker</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Cloudinary</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Express</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">JWT Authentication</Badge>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h2 className="text-xl font-bold mb-4">{t.links}</h2>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start border-0 bg-muted/20 hover:bg-muted/40"
                  >
                    <a href="https://github.com/Matteo-Daniele" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t.viewSource}
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary border-0"
                  >
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t.viewDemo}
                    </a>
                  </Button>
                </div>
              </motion.section>
            </div>
          </div>

          {/* Next project navigation */}
          <motion.div
            className="mt-20 pt-8 border-t border-border/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex justify-between items-center">
              <Link
                href="/projects/migafina"
                className="group inline-flex items-center text-primary font-medium hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {t.previousProject}
              </Link>
              <Link
                href="/#projects"
                className="group inline-flex items-center text-primary font-medium hover:underline"
              >
                {t.backToAllProjects}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
