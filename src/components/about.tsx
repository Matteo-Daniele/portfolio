"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "../components/language-provider"

export default function About() {
  const { language } = useLanguage()
  const [currentWord, setCurrentWord] = useState(0)
  const [currentTime, setCurrentTime] = useState("")

  const carouselWords = {
    en: ["learner", "team player", "problem solver", "curious", "self-driven"],
    es: ["aprendiz", "trabajador en equipo", "solucionador de problemas", "curioso", "autodidacta"]
  }

  const words = carouselWords[language]

  const translations = {
    en: {
      sectionLabel: "Get to know me",
      title: "I'm a",
      basedIn: "Based in",
      age: "Age",
      years: "years",
      months: "months",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      education: "Education",
      graduatedFrom: "Graduated from UTN",
      aboutMe: "About me",
      bio: "I'm a fullstack developer looking to find my first job in the software industry. Eager to learn and collaborate with talented people, I'm confident I can make a significant positive impact at the work environment. Available for remote and on-site jobs.",
    },
    es: {
      sectionLabel: "Conóceme",
      title: "Soy un",
      basedIn: "Ubicado en",
      age: "Edad",
      years: "años",
      months: "meses",
      days: "días",
      hours: "horas",
      minutes: "minutos",
      seconds: "segundos",
      education: "Educación",
      graduatedFrom: "Graduado de UTN",
      aboutMe: "Sobre mí",
      bio: "Soy un desarrollador fullstack buscando encontrar mi primer trabajo en la industria del software. Ansioso por aprender y colaborar con personas talentosas, estoy seguro de que puedo generar un impacto positivo significativo en el entorno laboral. Disponible para trabajos remotos y presenciales.",
    },
  }

  const t = translations[language]
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
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.1 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section id="about" className="py-28 md:py-36 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(35,30%,95%)] to-background dark:via-[hsl(25,12%,10%)] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-16 w-full"
        >
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-6">
            {t.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 flex items-center justify-center flex-wrap max-w-full px-4">
            <span>{t.title}&nbsp;</span>
            <span className="text-primary relative inline-block" style={{ minWidth: "auto", maxWidth: "calc(100vw - 2rem)" }}>
              {words.map((word, index) => (
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
                    textShadow: currentWord === index ? "0 0 20px rgba(245, 158, 11, 0.15)" : "none",
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
                          : index < currentWord || (currentWord === 0 && index === words.length - 1)
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
                {words[currentWord]}
              </span>
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {/* Item 1: Location (spans 2 cols on md+) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:col-span-2 flex flex-col h-full relative overflow-hidden group transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 border border-border/40 hover:border-primary/20"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/8 group-hover:blur-[20px]"></div>
            <h3 className="text-sm font-medium mb-2 text-primary tracking-wide uppercase relative z-10">{t.basedIn}</h3>
            <div className="flex justify-between items-start relative z-10">
              <p className="text-xl sm:text-2xl font-display font-bold transition-all duration-300 group-hover:translate-x-1">
                Mar del Plata, Argentina
              </p>
              <div className="flex items-center gap-2 bg-primary/8 px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-primary/15">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs sm:text-sm font-medium">{currentTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Item 2: Age */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 sm:p-7 flex flex-col h-full relative overflow-hidden group transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 border border-border/40 hover:border-primary/20"
          >
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/8 group-hover:blur-[15px]"></div>
            <h3 className="text-sm font-medium mb-2 text-primary tracking-wide uppercase relative z-10">{t.age}</h3>
            <p className="text-lg sm:text-xl font-display font-bold relative z-10 transition-all duration-300 group-hover:translate-x-1">
              {age.years} {t.years} {age.months} {t.months} {age.days} {t.days}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 relative z-10">
              {age.hours} {t.hours} {age.minutes} {t.minutes} {age.seconds} {t.seconds}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 relative z-10">12/12/2003</p>
          </motion.div>

          {/* Item 3: Education */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 sm:p-7 flex flex-col h-full relative overflow-hidden group transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 border border-border/40 hover:border-primary/20"
          >
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/8 group-hover:blur-[15px]"></div>
            <h3 className="text-sm font-medium mb-2 text-primary tracking-wide uppercase relative z-10">{t.education}</h3>
            <p className="text-lg sm:text-2xl font-display font-bold relative z-10 transition-all duration-300 group-hover:translate-x-1">
              {t.graduatedFrom}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 relative z-10">2025</p>
          </motion.div>

          {/* Item 4: Bio (spans 2 cols) */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:col-span-2 flex flex-col h-full relative overflow-hidden group transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 border border-border/40 hover:border-primary/20"
          >
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/5 group-hover:blur-[25px]"></div>
            <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-transparent rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/5 group-hover:blur-[25px]"></div>

            <h3 className="text-sm font-medium mb-3 text-primary tracking-wide uppercase relative z-10">{t.aboutMe}</h3>
            <p className="text-base sm:text-lg leading-relaxed relative z-10 transition-all duration-300 group-hover:translate-x-1">
              {t.bio}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
