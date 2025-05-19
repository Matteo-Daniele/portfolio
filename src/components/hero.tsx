import { ArrowRight, Download, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import BlobCanvas from "./blob-canvas"

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] sm:min-h-[85vh] md:min-h-[80vh] px-4 py-20 text-center overflow-hidden">
      {/* Blob Canvas Background */}
      <BlobCanvas />
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[#ffffffa0] bg-[radial-gradient(#00000020_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#00000020] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)]" 
        style={{
          backdropFilter: 'blur(90px)',
          // maskImage: 'linear-gradient(0deg, #000000aa 0%, #000 50%, #000000aa 100%)'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:mt-8 md:mt-0">
        {/* Label */}
        <div className="inline-block rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium text-primary">
          Full-Stack Developer
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Turning ideas into <span className="text-primary">digital reality</span>
        </h1>

        {/* Two-row subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto p-2">
          I build exceptional and accessible digital experiences  
          <br className="hidden sm:block" />
          &nbsp;for the web and mobile applications.
        </p>

        {/* Two or three buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="#projects">
            <Button size="lg" className="gap-2">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="https://github.com/Matteo-Daniele" target="_blank">
            <Button size="lg" variant="outline" className="gap-2 bg-background/80">
              <Github className="h-4 w-4" />
              GitHub Profile
            </Button>
          </a>
          <a href="/matteo-daniele-cv.pdf" download target="_blank" className="sm:hidden">
            <Button size="lg" variant="outline" className="gap-2 bg-background/80">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
