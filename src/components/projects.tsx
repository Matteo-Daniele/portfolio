"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "DevConnect",
    subtitle: "Social platform for developers to share and collaborate",
    description:
      "A comprehensive platform where developers can share projects, ask questions, and find collaborators for their next big idea.",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["React.js", "Node.js", "MongoDB", "Express"],
    caseStudyUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "TaskFlow",
    subtitle: "Kanban-style task management with drag-and-drop",
    description:
      "Intuitive task management application with customizable workflows, real-time updates, and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    caseStudyUrl: "#",
    featured: false,
  },
  {
    id: 3,
    title: "CryptoTracker",
    subtitle: "Real-time cryptocurrency dashboard with portfolio management",
    description:
      "Track cryptocurrency prices, manage your portfolio, and receive price alerts for your favorite coins.",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["React.js", "Chart.js", "API Integration", "CSS"],
    caseStudyUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "WeatherNow",
    subtitle: "Weather forecast with location detection and interactive maps",
    description:
      "Get accurate weather forecasts with beautiful visualizations, location-based recommendations, and severe weather alerts.",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["JavaScript", "HTML", "CSS", "API Integration"],
    caseStudyUrl: "#",
    featured: false,
  },
]

// Filter categories
const categories = ["All", "Featured", "Web App", "Mobile", "Design"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")

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
        <div className="space-y-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Project details - left side */}
              <div className="space-y-6">
                {/* Logo and title */}
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white dark:bg-[#252525] rounded-lg flex items-center justify-center shadow-sm">
                    <Image
                      src={project.logo || "/placeholder.svg"}
                      alt={`${project.title} logo`}
                      width={32}
                      height={32}
                      className="rounded"
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
                  Read case study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Project image - right side */}
              <div className="bg-white dark:bg-[#252525] rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects button */}
        <div className="flex justify-center mt-16">
          <Link
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
