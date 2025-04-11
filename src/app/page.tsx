import Footer from "@/components/footer"
import About from "../components/about"
import Hero from "../components/hero"
import Navbar from "../components/navbar"
import Projects from "../components/projects"
import Skills from "../components/skills"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer/>
      {/* Add more sections as needed */}
    </main>
  )
}
