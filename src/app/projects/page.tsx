"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
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
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToHome}
          </Link>

          {/* Page header */}
          <div className="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold">{t.myProjects}</h1>
            <p className="text-xl text-muted-foreground">
              {t.description}
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 mb-16">
            {projectsData.map((project) => (
              <Link
                key={project.id}
                href={project.caseStudyUrl}
                className="group bg-muted/30 rounded-xl overflow-hidden border-0 hover:border-primary/30 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="font-normal">
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h2>
                  <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                  <div className="pt-2 flex items-center text-primary font-medium">
                    {t.viewProjectDetails}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="bg-muted p-8 md:p-12 rounded-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.interested}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.openToDiscuss}
            </p>
            <a
              href="mailto:matteodaniele222@gmail.com"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {t.getInTouch}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
