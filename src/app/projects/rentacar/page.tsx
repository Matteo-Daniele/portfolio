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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
            Back to projects
          </Link>

          {/* Project header */}
          <div className="flex flex-col gap-4 mb-12">
            <Badge className="w-fit" variant="outline">
              Web Application
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Rent a Car</h1>
            <p className="text-xl text-muted-foreground">Car rental administration system</p>
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
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Rent a Car is a comprehensive administration application for a car rental company. The system allows
                  users to register and log in, make reservations, and view available cars with advanced filtering
                  options for dates, time, mileage, color, and more. The application is fully responsive, working
                  seamlessly on both mobile and desktop devices.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">Development Process</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This project was developed as part of a multidisciplinary team, working closely with a product manager
                  and other developers. The development process included:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Requirements gathering and system architecture planning</li>
                  <li>Database schema design for vehicle inventory and reservation management</li>
                  <li>Frontend development with React.js and Tailwind CSS</li>
                  <li>Backend API development with Node.js</li>
                  <li>Integration with MongoDB for data storage</li>
                  <li>Implementation of Cloudinary for vehicle image management</li>
                  <li>Containerization with Docker for consistent deployment</li>
                  <li>Extensive testing and quality assurance</li>
                  <li>Deployment and monitoring</li>
                </ol>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">User Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure registration and login system for customers and administrators
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">Advanced Filtering</h3>
                    <p className="text-sm text-muted-foreground">
                      Search vehicles by date, time, mileage, color, and other specifications
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">Reservation Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Create, view, modify, and cancel reservations with real-time availability
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">Vehicle Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Add, edit, and manage vehicle inventory with detailed specifications
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">Branch Location Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Support for multiple rental locations with different vehicle availability
                    </p>
                  </li>
                  <li className="bg-muted/40 p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-medium mb-2">Responsive Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimized user experience on both mobile and desktop devices
                    </p>
                  </li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Challenge: Complex reservation system</h3>
                    <p className="text-muted-foreground">
                      Implementing a reservation system that could handle overlapping bookings, different pickup/return
                      locations, and varying pricing models.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Solution:</h3>
                    <p className="text-muted-foreground">
                      Developed a sophisticated availability algorithm that checks vehicle status across multiple
                      parameters and locations, with a flexible pricing engine that supports dynamic rates based on
                      duration, season, and vehicle type.
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">Challenge: Team collaboration</h3>
                    <p className="text-muted-foreground">
                      Coordinating development efforts across a multidisciplinary team with different areas of
                      expertise.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Solution:</h3>
                    <p className="text-muted-foreground">
                      Implemented an agile development methodology with regular sprint planning, daily standups, and
                      retrospectives. Used Git for version control with a structured branching strategy and pull request
                      reviews.
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
                <h2 className="text-xl font-bold mb-4">Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                    <p>Premium Car Rentals</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                    <p>3 months</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">My Role</h3>
                    <p>Full-stack Developer</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Team Size</h3>
                    <p>3 members</p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-4">Technologies Used</h2>
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
                <h2 className="text-xl font-bold mb-4">Links</h2>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start border-0 bg-muted/20 hover:bg-muted/40"
                  >
                    <a href="https://github.com/Matteo-Daniele" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary border-0"
                  >
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Demo
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
                Previous Project: Migafina
              </Link>
              <Link
                href="/#projects"
                className="group inline-flex items-center text-primary font-medium hover:underline"
              >
                Back to All Projects
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
