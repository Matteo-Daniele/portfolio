"use client"

import { Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function About() {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const carouselWords = ["learner", "team player", "problem solver", "curious", "self-driven"]
  const dateOfBirth = new Date("2003-12-12T08:00:00")
  const [age, setAge] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Age calculation
  useEffect(() => {
    const calculateAge = () => {
      const now = new Date()
      
      // Calculate the difference in years
      let years = now.getFullYear() - dateOfBirth.getFullYear()
      
      // Adjust for months, days
      let tempDate = new Date(dateOfBirth)
      tempDate.setFullYear(tempDate.getFullYear() + years)
      
      if (now < tempDate) {
        years--
        tempDate = new Date(dateOfBirth)
        tempDate.setFullYear(tempDate.getFullYear() + years)
      }
      
      // Calculate months
      let months = now.getMonth() - dateOfBirth.getMonth()
      if (months < 0) {
        months += 12
      }
      
      // Calculate days
      let days = now.getDate() - dateOfBirth.getDate()
      if (days < 0) {
        const lastMonthDate = new Date(now)
        lastMonthDate.setDate(0)
        days += lastMonthDate.getDate()
        months--
        if (months < 0) {
          months += 12
          years--
        }
      }
      
      // Calculate time components
      const hours = Math.abs(now.getHours() - dateOfBirth.getHours())
      const minutes = now.getMinutes() - dateOfBirth.getMinutes()
      const seconds = now.getSeconds() - dateOfBirth.getSeconds()
      
      setAge({ years, months, days, hours, minutes, seconds })
    }
    
    calculateAge()
    const interval = setInterval(calculateAge, 1000)
    
    return () => clearInterval(interval)
  }, [])

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
      // Get current UTC time
      const now = new Date();
      
      // Create a date object for Argentina time (UTC-3)
      // Using proper timezone offset calculation
      const argentinaTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
      
      // Format in 12-hour format
      const hours = argentinaTime.getHours();
      const minutes = argentinaTime.getMinutes();
      const seconds = argentinaTime.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    // Update immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-[#f8f8f8] dark:bg-[#1c1c1c]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 flex items-center justify-center flex-wrap">
            <span>I&apos;m a&nbsp;</span>
            <span className="text-primary relative inline-block" style={{ minWidth: "auto" }}>
              {carouselWords.map((word, index) => (
                <span
                  key={index}
                  className="absolute left-0 whitespace-nowrap font-bold"
                  style={{
                    opacity: currentWord === index ? 1 : 0,
                    transform: currentWord === index 
                      ? "translateY(0) scale(1)" 
                      : "translateY(0) scale(0.85)",
                    transformOrigin: "left center",
                    transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)",
                    textShadow: currentWord === index ? "0 0 8px rgba(var(--primary), 0.3)" : "none",
                    letterSpacing: currentWord === index ? "0.02em" : "-0.05em",
                  }}
                >
                  {word.split("").map((char, charIndex) => (
                    <span
                      key={charIndex}
                      style={{
                        display: "inline-block",
                        transition: `opacity 100ms ease ${charIndex * 40}ms, transform 400ms ease ${charIndex * 40}ms`,
                        opacity: currentWord === index ? 1 : 0,
                        transform: currentWord === index 
                          ? "translateY(0)"
                          : index < currentWord || (currentWord === 0 && index === carouselWords.length - 1)
                            ? "translateY(-15px)"
                            : "translateY(15px)",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              ))}
              <span className="invisible" style={{ display: "inline-block" }}>
                {carouselWords[currentWord]}
              </span>
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Item 1: Location (spans 2 cols on md+) */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-4 sm:p-6 shadow-sm md:col-span-2 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:bg-white/80 dark:hover:bg-[#252525]/80">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10 group-hover:blur-[15px]"></div>
            <h3 className="text-base sm:text-lg font-medium mb-2 text-primary relative z-10">Based in</h3>
            <div className="flex justify-between items-start relative z-10">
              <p className="text-xl sm:text-2xl font-bold transition-all duration-300 group-hover:translate-x-1">
                Mar del Plata, Argentina
              </p>
              <div className="flex items-center gap-2 bg-primary/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 group-hover:bg-primary/20">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium">{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Item 2: Age */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-4 sm:p-6 shadow-sm flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10 group-hover:blur-[12px]"></div>
            <h3 className="text-base sm:text-lg font-medium mb-2 text-primary relative z-10">Age</h3>
            <p className="text-lg sm:text-xl font-bold relative z-10 transition-all duration-300 group-hover:translate-x-1">
              {age.years} years {age.months} months {age.days} days
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 relative z-10">
              {age.hours} hours {age.minutes} minutes {age.seconds} seconds
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 relative z-10">12/12/2003</p>
          </div>

          {/* Item 3: Education */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-4 sm:p-6 shadow-sm flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10 group-hover:blur-[12px]"></div>
            <h3 className="text-base sm:text-lg font-medium mb-2 text-primary relative z-10">Education</h3>
            <p className="text-lg sm:text-2xl font-bold relative z-10 transition-all duration-300 group-hover:translate-x-1">
              Graduated from UTN
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 relative z-10">2025</p>
          </div>

          {/* Item 4: Bio (spans 2 cols) */}
          <div className="bg-white dark:bg-[#252525] rounded-xl p-4 sm:p-6 shadow-sm md:col-span-2 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-md">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10 group-hover:blur-[20px]"></div>
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10 group-hover:blur-[20px]"></div>

            <h3 className="text-base sm:text-lg font-medium mb-2 text-primary relative z-10">About me</h3>
            <p className="text-base sm:text-lg leading-relaxed relative z-10 transition-all duration-300 group-hover:translate-x-1">
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
