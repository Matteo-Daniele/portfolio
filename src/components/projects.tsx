"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "DevConnect",
    description: "A social platform for developers to share projects, ask questions, and collaborate.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "TaskFlow",
    description: "A Kanban-style task management application with drag-and-drop functionality.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 3,
    title: "CryptoTracker",
    description: "Real-time cryptocurrency tracking dashboard with price alerts and portfolio management.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React.js", "Chart.js", "API Integration", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "WeatherNow",
    description: "Weather forecast application with location detection and interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "HTML", "CSS", "API Integration"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    description: "Full-featured online store with product catalog, cart, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "MongoDB", "Stripe API", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills (this website).",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

// Filter categories
const categories = ["All", "Featured", "Web App", "Mobile", "Design"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // Filter projects based on active category
  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "All") return true
    if (activeCategory === "Featured") return project.featured
    // Add more filters as needed
    return true
  })

  return (
    <section id="projects" className="py-20 bg-[#f8f8f8] dark:bg-[#1c1c1c]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Here are some of the projects I&apos;ve worked on. Each one has presented unique challenges and
            opportunities for growth.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: project.id * 0.1 }}
              className="group relative bg-white dark:bg-[#252525] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm" asChild>
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Project details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="font-normal">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects button */}
        <div className="flex justify-center mt-12">
          <Button size="lg" variant="outline" className="group">
            View All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}
