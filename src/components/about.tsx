"use client"

import { Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function About() {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const carouselWords = ["learner", "team player", "problem solver", "curious", "self-driven"]

  // Text carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % carouselWords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Local time in Mar del Plata
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Argentina is UTC-3
      const marDelPlataTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000 - 3 * 60 * 60000)

      // Format in 12-hour format
      const hours = marDelPlataTime.getHours()
      const minutes = marDelPlataTime.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`)
    }

    // Update immediately and then every second
    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-20 bg-[#f8f8f8] dark:bg-[#1c1c1c]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center flex items-center gap-2 flex-wrap justify-center">
            I&apos;m a
            <div className="relative inline-block h-[1.5em] overflow-y-hidden">
              {carouselWords.map((word, index) => (
                <span
                  key={index}
                  className="absolute inset-0 flex items-center justify-center text-primary font-bold transition-opacity duration-500 whitespace-nowrap"
                  style={{
                    opacity: currentWord === index ? 1 : 0,
                    transform: currentWord === index ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 500ms, transform 500ms",
                    width: "100%"
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Item 1: Location (spans 2 cols on md+) */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-6 shadow-sm md:col-span-2 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:bg-white/80 dark:hover:bg-[#252525]/80">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-primary/10"></div>
            <h3 className="text-lg font-medium mb-2 text-primary relative z-10">Based in</h3>
            <div className="flex justify-between items-start relative z-10">
              <p className="text-2xl font-bold transition-all duration-300 group-hover:translate-x-1">
                Mar del Plata, Argentina
              </p>
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-primary/20">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Item 2: Age */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-6 shadow-sm flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-primary/5 rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-primary/10"></div>
            <h3 className="text-lg font-medium mb-2 text-primary relative z-10">Age</h3>
            <p className="text-2xl font-bold relative z-10 transition-all duration-300 group-hover:translate-x-1">
              21 years old
            </p>
            <p className="text-muted-foreground mt-1 relative z-10">12/12/2003</p>
          </div>

          {/* Item 3: Education */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-6 shadow-sm flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-primary/5 rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-primary/10"></div>
            <h3 className="text-lg font-medium mb-2 text-primary relative z-10">Education</h3>
            <p className="text-2xl font-bold relative z-10 transition-all duration-300 group-hover:translate-x-1">
              Graduated from UTN
            </p>
            <p className="text-muted-foreground mt-1 relative z-10">2025</p>
          </div>

          {/* Item 4: Bio (spans 2 cols) */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-6 shadow-sm md:col-span-2 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-transform duration-700 group-hover:scale-150"></div>
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-primary/5 rounded-full transition-transform duration-700 group-hover:scale-150"></div>

            <h3 className="text-lg font-medium mb-2 text-primary relative z-10">About me</h3>
            <p className="text-lg leading-relaxed relative z-10 transition-all duration-300 group-hover:translate-x-1">
              I&apos;m a fullstack developer looking to find my first job in the software industry. Eager to learn and
              collaborate with talented people, I&apos;m confident I can make a significant positive impact at the work
              environment. Available for remote and on-site jobs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
