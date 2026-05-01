"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "../components/language-provider"

// Sample project data - replace with your actual projects
// Note: Subtitles will be translated dynamically based on language

export default function Projects() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("All")
  
  const categories = {
    en: ["All", "Featured", "Web App", "Mobile", "Design"],
    es: ["Todos", "Destacados", "Aplicación Web", "Móvil", "Diseño"]
  }
  
  const categoryList = categories[language]
  
  const translations = {
    en: {
      myWork: "My Work",
      featuredProjects: "Featured Projects",
      description: "Here are some of the projects I've worked on. Each one has presented unique challenges and opportunities for growth.",
      readCaseStudy: "Read case study",
      viewAllProjects: "View All Projects",
      noProjects: "No projects found for the selected category.",
    },
    es: {
      myWork: "Mi Trabajo",
      featuredProjects: "Proyectos Destacados",
      description: "Aquí hay algunos de los proyectos en los que he trabajado. Cada uno ha presentado desafíos únicos y oportunidades de crecimiento.",
      readCaseStudy: "Leer estudio de caso",
      viewAllProjects: "Ver Todos los Proyectos",
      noProjects: "No se encontraron proyectos para la categoría seleccionada.",
    },
  }
  
  const t = translations[language]
  
  // Project data with translations
  const projectsData = [
    {
      id: 1,
      title: "Migafina",
      subtitle: language === "en" ? "Bakery website with responsive design" : "Sitio web de panadería con diseño responsivo",
      description: language === "en"
        ? "Migafina.uy is a responsive website developed for a bakery in Uruguay. The application provides comprehensive information about the bakery, including their social media presence, product offerings, and physical locations. The website is fully responsive, ensuring a seamless experience across both mobile and desktop devices."
        : "Migafina.uy es un sitio web responsivo desarrollado para una panadería en Uruguay. La aplicación proporciona información completa sobre la panadería, incluyendo su presencia en redes sociales, ofertas de productos y ubicaciones físicas. El sitio web es completamente responsivo, garantizando una experiencia fluida tanto en dispositivos móviles como de escritorio.",
      image: "/images/migafina-desktop.png",
      logo: "/images/migafina-mobile.png",
      tags: ["Next.js", "React", "JavaScript", "CSS", "Responsive Design", "Vercel"],
      caseStudyUrl: "/projects/migafina",
      featured: true,
      category: "Web App",
    },
    {
      id: 2,
      title: "Rent a Car",
      subtitle: language === "en" ? "Car rental administration system" : "Sistema de administración de alquiler de autos",
      description: language === "en"
        ? "Rent a Car is a comprehensive administration application for a car rental company. The system allows users to register and log in, make reservations, and view available cars with advanced filtering options for dates, time, mileage, color, and more. The application is fully responsive, working seamlessly on both mobile and desktop devices."
        : "Rent a Car es una aplicación integral de administración para una empresa de alquiler de autos. El sistema permite a los usuarios registrarse e iniciar sesión, hacer reservas y ver autos disponibles con opciones avanzadas de filtrado para fechas, hora, kilometraje, color y más. La aplicación es completamente responsiva, funcionando perfectamente tanto en dispositivos móviles como de escritorio.",
      image: "/images/rentacar-desktop1.png",
      logo: "/images/Car-icon.png",
      tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Docker", "Cloudinary"],
      caseStudyUrl: "/projects/rentacar",
      featured: true,
      category: "Web App",
    }
  ]
  
  // Create refs array for all possible projects
  const projectRefs = projectsData.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
  }));

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Filter projects based on active category
  const filteredProjects = projectsData.filter((project) => {
    const allCategories = { en: "All", es: "Todos" }
    const featuredCategories = { en: "Featured", es: "Destacados" }
    const webAppCategories = { en: "Web App", es: "Aplicación Web" }
    
    if (activeCategory === allCategories[language] || activeCategory === "All") return true;
    if (activeCategory === featuredCategories[language] || activeCategory === "Featured") return project.featured;
    if (activeCategory === "Mobile" || activeCategory === "Móvil" || activeCategory === "Design" || activeCategory === "Diseño") return false;
    if (activeCategory === webAppCategories[language] || activeCategory === "Web App") return project.category === "Web App";
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 bg-[#f8f8f8] dark:bg-[#1c1c1c] overflow-x-hidden">
      <div className="container px-4 md:px-6 mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {t.myWork}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t.featuredProjects}</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            {t.description}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryList.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center text-lg text-muted-foreground my-16 min-h-[200px] flex items-center justify-center">
            {t.noProjects}
          </div>
        ) : (
          <div className="space-y-16">
            {filteredProjects.map((project, index) => {
              // Find the original index of the project in the projectsData array
              const originalIndex = projectsData.findIndex(p => p.id === project.id);
              const [ref, inView] = projectRefs[originalIndex];
              
              return (
                <motion.div
                  key={project.id}
                  ref={ref}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -30 : 30 
                  }}
                  animate={inView ? { 
                    opacity: 1, 
                    x: 0 
                  } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1,
                    ease: [0.25, 0.1, 0.25, 1] 
                  }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center overflow-hidden`}
                >
                  {/* Project details - always on left side for mobile, alternating on desktop */}
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    {/* Logo and title */}
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white dark:bg-[#252525] rounded-lg flex items-center justify-center shadow-sm">
                        <Image
                          src={project.logo || "/placeholder.svg"}
                          alt={`${project.title} logo`}
                          width={32}
                          height={32}
                          className="rounded object-contain"
                          style={{ 
                            opacity: 0,
                            transition: 'opacity 0.5s ease-in-out'
                          }}
                          onLoadingComplete={(image) => {
                            image.style.opacity = "1";
                          }}
                          priority={index < 2}
                        />
                      </div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-xl text-muted-foreground">{project.subtitle}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="font-normal px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Case study link */}
                    <Link
                      href={project.caseStudyUrl}
                      className="inline-flex items-center text-primary font-medium hover:underline mt-4"
                    >
                      {t.readCaseStudy}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>

                  {/* Project image - alternating side on desktop */}
                  <div className={`bg-white dark:bg-[#252525] rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="relative aspect-[4/3] w-full">
                      <Image 
                        src={project.image || "/placeholder.svg"} 
                        alt={project.title} 
                        fill 
                        className="object-contain p-2" 
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* View all projects button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
          >
            {t.viewAllProjects}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
