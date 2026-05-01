"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function MigafinaProjectPage() {
  const { language } = useLanguage()
  
  const translations = {
    en: {
      backToProjects: "Back to projects",
      webDevelopment: "Web Development",
      subtitle: "Bakery website with responsive design",
      projectOverview: "Project Overview",
      overviewText: "Migafina.uy is a responsive website developed for a bakery in Uruguay. The application provides comprehensive information about the bakery, including their social media presence, product offerings, and physical locations. The website is fully responsive, ensuring a seamless experience across both mobile and desktop devices.",
      developmentProcess: "Development Process",
      processIntro: "The development process for Migafina involved several key phases:",
      process1: "Initial client consultation to understand the bakery's brand identity and requirements",
      process2: "Design phase with wireframing and mockups for both mobile and desktop layouts",
      process3: "Development using Next.js to create a fast, responsive website",
      process4: "Implementation of responsive design principles to ensure optimal viewing on all devices",
      process5: "Content integration including product information and location details",
      process6: "Testing across multiple devices and browsers",
      process7: "Deployment and client training",
      keyFeatures: "Key Features",
      responsiveDesign: "Responsive Design",
      responsiveDesc: "Optimized for both mobile and desktop viewing experiences",
      productShowcase: "Product Showcase",
      productDesc: "Beautiful display of bakery products with descriptions",
      locationInfo: "Location Information",
      locationDesc: "Details about physical store locations",
      socialMedia: "Social Media Integration",
      socialDesc: "Links to the bakery's social media profiles for increased engagement",
      challenges: "Challenges & Solutions",
      challenge1: "Challenge: Maintaining visual appeal across devices",
      challenge1Text: "Ensuring the bakery's products looked appetizing on both small mobile screens and large desktop displays.",
      solution: "Solution:",
      solution1Text: "Implemented responsive image techniques and art-directed different image crops for various screen sizes to maintain visual impact regardless of device.",
      projectDetails: "Project Details",
      client: "Client",
      timeline: "Timeline",
      role: "My Role",
      website: "Website",
      technologiesUsed: "Technologies Used",
      links: "Links",
      viewSource: "View Source Code",
      visitLive: "Visit Live Site",
      nextProject: "Next Project: Rent a Car",
    },
    es: {
      backToProjects: "Volver a proyectos",
      webDevelopment: "Desarrollo Web",
      subtitle: "Sitio web de panadería con diseño responsivo",
      projectOverview: "Resumen del Proyecto",
      overviewText: "Migafina.uy es un sitio web responsivo desarrollado para una panadería en Uruguay. La aplicación proporciona información completa sobre la panadería, incluyendo su presencia en redes sociales, ofertas de productos y ubicaciones físicas. El sitio web es completamente responsivo, garantizando una experiencia fluida tanto en dispositivos móviles como de escritorio.",
      developmentProcess: "Proceso de Desarrollo",
      processIntro: "El proceso de desarrollo para Migafina involucró varias fases clave:",
      process1: "Consulta inicial con el cliente para entender la identidad de marca de la panadería y los requisitos",
      process2: "Fase de diseño con wireframes y maquetas para diseños móviles y de escritorio",
      process3: "Desarrollo usando Next.js para crear un sitio web rápido y responsivo",
      process4: "Implementación de principios de diseño responsivo para garantizar una visualización óptima en todos los dispositivos",
      process5: "Integración de contenido incluyendo información de productos y detalles de ubicación",
      process6: "Pruebas en múltiples dispositivos y navegadores",
      process7: "Despliegue y capacitación del cliente",
      keyFeatures: "Características Clave",
      responsiveDesign: "Diseño Responsivo",
      responsiveDesc: "Optimizado para experiencias de visualización tanto móviles como de escritorio",
      productShowcase: "Exhibición de Productos",
      productDesc: "Hermosa exhibición de productos de panadería con descripciones",
      locationInfo: "Información de Ubicación",
      locationDesc: "Detalles sobre las ubicaciones físicas de las tiendas",
      socialMedia: "Integración de Redes Sociales",
      socialDesc: "Enlaces a los perfiles de redes sociales de la panadería para mayor participación",
      challenges: "Desafíos y Soluciones",
      challenge1: "Desafío: Mantener el atractivo visual en todos los dispositivos",
      challenge1Text: "Asegurar que los productos de la panadería se vieran apetitosos tanto en pantallas móviles pequeñas como en pantallas de escritorio grandes.",
      solution: "Solución:",
      solution1Text: "Se implementaron técnicas de imágenes responsivas y recortes de imágenes dirigidos artísticamente para varios tamaños de pantalla para mantener el impacto visual independientemente del dispositivo.",
      projectDetails: "Detalles del Proyecto",
      client: "Cliente",
      timeline: "Cronograma",
      role: "Mi Rol",
      website: "Sitio Web",
      technologiesUsed: "Tecnologías Utilizadas",
      links: "Enlaces",
      viewSource: "Ver Código Fuente",
      visitLive: "Visitar Sitio en Vivo",
      nextProject: "Siguiente Proyecto: Rent a Car",
    },
  }
  
  const t = translations[language]
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
              {t.webDevelopment}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Migafina</h1>
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
              {/* Desktop image (background) */}
              <motion.div
                className="bg-white/70 dark:bg-[#252525]/70 rounded-2xl overflow-hidden shadow-sm p-2 sm:p-4 backdrop-blur-md border-0"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)" }}
              >
                <motion.div
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/migafina-desktop.png"
                    alt="Migafina desktop view"
                    fill
                    className="object-contain rounded-lg transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Mobile image (overlay) */}
              <motion.div
                className="absolute -top-5 right-5 sm:-top-10 sm:right-10 w-[120px] sm:w-[180px] md:w-[220px] z-10"
                initial={{ y: 20, opacity: 0, rotate: 5 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -5, rotate: -2, transition: { duration: 0.2 } }}
              >
                <div className="bg-white/70 dark:bg-[#252525]/70 rounded-2xl overflow-hidden shadow-sm p-1 sm:p-2 backdrop-blur-md border-0">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/migafina-mobile.png"
                      alt="Migafina mobile view"
                      fill
                      className="object-contain rounded-lg"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Project details */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">{t.projectOverview}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.overviewText}
                </p>
              </section>

              <section>
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
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">{t.keyFeatures}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.responsiveDesign}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.responsiveDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.productShowcase}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.productDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.locationInfo}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.locationDesc}
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">{t.socialMedia}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.socialDesc}
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">{t.challenges}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{t.challenge1}</h3>
                    <p className="text-muted-foreground">
                      {t.challenge1Text}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">{t.solution}</h3>
                    <p className="text-muted-foreground">
                      {t.solution1Text}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-muted/30 p-6 rounded-xl backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4">{t.projectDetails}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.client}</h3>
                    <p>Migafina Bakery</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.timeline}</h3>
                    <p>{language === "en" ? "4 weeks" : "4 semanas"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.role}</h3>
                    <p>{language === "en" ? "Full-stack Developer" : "Desarrollador Full-stack"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t.website}</h3>
                    <a
                      href="https://migafina.uy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      migafina.uy
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t.technologiesUsed}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Next.js</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">React</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">JavaScript</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">CSS</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Responsive Design</Badge>
                  <Badge className="bg-secondary/40 hover:bg-secondary/60 border-0 text-muted-foreground">Vercel</Badge>
                </div>
              </section>

              <section>
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
                    <a href="https://migafina.uy" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t.visitLive}
                    </a>
                  </Button>
                </div>
              </section>
            </div>
          </div>

          {/* Next project navigation */}
          <div className="mt-20 pt-8 border-t border-border/20">
            <div className="flex justify-between items-center">
              <div></div>
              <Link
                href="/projects/rentacar"
                className="group inline-flex items-center text-primary font-medium hover:underline"
              >
                {t.nextProject}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
