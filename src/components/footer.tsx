"use client"

import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "../components/language-provider"

export default function Footer() {
  const { language } = useLanguage()
  
  const translations = {
    en: {
      bio: "Full-stack developer passionate about creating exceptional digital experiences with modern technologies.",
      navigation: "Navigation",
      contact: "Contact",
      connect: "Connect",
      downloadCV: "Download CV",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      allRightsReserved: "All rights reserved.",
    },
    es: {
      bio: "Desarrollador full-stack apasionado por crear experiencias digitales excepcionales con tecnologías modernas.",
      navigation: "Navegación",
      contact: "Contacto",
      connect: "Conectar",
      downloadCV: "Descargar CV",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      allRightsReserved: "Todos los derechos reservados.",
    },
  }
  
  const t = translations[language]
  const cvPath = language === "en" 
    ? "/Matteo-Daniele-Resume-English.pdf" 
    : "/Matteo-Daniele-CV-Español (1).pdf"
  
  return (
    <footer className="bg-[#f8f8f8] dark:bg-[#1c1c1c] border-t border-border/40">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and bio */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
                <Image src="/Logo.png" alt="Matte Daniele" fill className="object-cover" />
              </div>
              <span className="font-medium">Matteo Daniele</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.bio}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">{t.navigation}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm hover:text-primary transition-colors">
                  {language === "en" ? "About" : "Sobre mí"}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-sm hover:text-primary transition-colors">
                  {language === "en" ? "Projects" : "Proyectos"}
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-sm hover:text-primary transition-colors">
                  {language === "en" ? "Skills" : "Habilidades"}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm hover:text-primary transition-colors">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">{t.contact}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:matteodaniele222@gmail.com"
                  className="text-sm flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  matteodaniele222@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+542235919553"
                  className="text-sm flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +54 (223)-5919553
                </a>
              </li>
              <li>
                <a href={cvPath} download>
                <Button variant="outline" size="sm" className="gap-1 hidden sm:flex">
                    <Download className="h-4 w-4" />
                    <span>{t.downloadCV}</span>
                </Button>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">{t.connect}</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com/Matteo-Daniele"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 hover:text-primary transition-colors group"
              >
                <div className="bg-background p-1.5 rounded-md">
                  <Github className="h-4 w-4" />
                </div>
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 opacity-0 -ml-1 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href="https://www.linkedin.com/in/matteo-daniele-a39b88250/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 hover:text-primary transition-colors group"
              >
                <div className="bg-background p-1.5 rounded-md">
                  <Linkedin className="h-4 w-4" />
                </div>
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 opacity-0 -ml-1 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href="https://www.instagram.com/danielematteo_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 hover:text-primary transition-colors group"
              >
                <div className="bg-background p-1.5 rounded-md">
                  <Instagram className="h-4 w-4" />
                </div>
                <span>Instagram</span>
                <ExternalLink className="h-3 w-3 opacity-0 -ml-1 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Matteo Daniele. {t.allRightsReserved}
          </p>

          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.privacyPolicy}
            </div>
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.termsOfService}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
