import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
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
              Full-stack developer passionate about creating exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-sm hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-sm hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:matteo.daniele@example.com"
                  className="text-sm flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  matteodaniele222@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+123456789"
                  className="text-sm flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +54 (223)-5919553
                </a>
              </li>
              <li>
                <a href="/matteo-daniele-cv.pdf" download>
                <Button variant="outline" size="sm" className="gap-1 hidden sm:flex">
                    <Download className="h-4 w-4" />
                    <span>Download CV</span>
                </Button>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">Connect</h3>
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
            © {new Date().getFullYear()} Matteo Daniele. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </div>
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
