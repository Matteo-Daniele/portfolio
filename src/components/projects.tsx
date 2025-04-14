"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useInView } from "react-intersection-observer"

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "Migafina",
    subtitle: "Bakery website with responsive design",
    description:
      "Migafina.uy is a responsive website developed for a bakery in Uruguay. The application provides comprehensive information about the bakery, including their social media presence, product offerings, and physical locations. The website is fully responsive, ensuring a seamless experience across both mobile and desktop devices.",
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
    subtitle: "Car rental administration system",
    description:
      "Rent a Car is a comprehensive administration application for a car rental company. The system allows users to register and log in, make reservations, and view available cars with advanced filtering options for dates, time, mileage, color, and more. The application is fully responsive, working seamlessly on both mobile and desktop devices.",
    image: "/images/rentacar-desktop1.png",
    logo: "/images/Car-icon.png",
    tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Docker", "Cloudinary"],
    caseStudyUrl: "/projects/rentacar",
    featured: true,
    category: "Web App",
  }
]

// Filter categories
const categories = ["All", "Featured", "Web App", "Mobile", "Design"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
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
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return project.featured;
    if (activeCategory === "Mobile" || activeCategory === "Design") return false;
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 bg-[#f8f8f8] dark:bg-[#1c1c1c] overflow-x-hidden">
      <div className="container px-4 md:px-6 mx-auto overflow-hidden">
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

        {/* Debug info - remove in production */}
        <div className="text-center text-sm mb-4 text-muted-foreground">
          Active Category: {activeCategory} | Projects: {filteredProjects.length}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center text-lg text-muted-foreground my-16 min-h-[200px] flex items-center justify-center">
            No projects found for the selected category.
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
                      Read case study
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
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
