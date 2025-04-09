"use client"

import { useEffect, useRef, useState } from "react"

// Define all skills
const skills = [
  // Languages
  { name: "C", category: "language", size: 1.0 },
  { name: "Java", category: "language", size: 1.1 },
  { name: "HTML", category: "language", size: 1.2 },
  { name: "CSS", category: "language", size: 1.1 },
  { name: "JavaScript", category: "language", size: 1.3 },
  { name: "TypeScript", category: "language", size: 1.2 },
  { name: "SQL", category: "language", size: 1.0 },

  // Frameworks & Libraries
  { name: "React.js", category: "framework", size: 1.4 },
  { name: "Next.js", category: "framework", size: 1.3 },
  { name: "Angular", category: "framework", size: 1.1 },
  { name: "Tailwind CSS", category: "framework", size: 1.2 },
  { name: "Node.js", category: "framework", size: 1.0, learning: true },

  // Tools & Platforms
  { name: "Git", category: "tool", size: 1.1 },
  { name: "Jira", category: "tool", size: 1.0 },
  { name: "MySQL", category: "tool", size: 1.1 },
  { name: "MongoDB", category: "tool", size: 1.0 },
  { name: "Docker", category: "tool", size: 0.9, learning: true },
  { name: "Postman", category: "tool", size: 1.0 },
  { name: "API Integration", category: "tool", size: 1.2 },
]

// Define colors for different categories
const categoryColors = {
  language: {
    bg: "rgba(16, 185, 129, 1)",
    border: "rgba(10, 148, 103, 1)",
    text: "rgba(255, 255, 255, 1)",
  },
  framework: {
    bg: "rgba(79, 70, 229, 1)",
    border: "rgba(67, 56, 202, 1)",
    text: "rgba(255, 255, 255, 1)",
  },
  tool: {
    bg: "rgba(245, 158, 11, 1)",
    border: "rgba(217, 119, 6, 1)",
    text: "rgba(255, 255, 255, 1)",
  },
}

// Circle class for skills
class SkillCircle {
  x: number
  y: number
  vx = 0
  vy = 0
  radius: number
  skill: (typeof skills)[0]
  alpha: number
  targetAlpha: number
  isDragging: boolean
  shadowOffsetY: number
  shadowBlur: number
  shadowAlpha: number
  initialX: number
  initialY: number
  lastX: number
  lastY: number
  mass: number

  constructor(canvas: HTMLCanvasElement, skill: (typeof skills)[0], index: number) {
    this.skill = skill
    this.radius = 40 * skill.size
    this.mass = this.radius * this.radius // Mass proportional to area

    // Distribute circles randomly around the canvas, avoiding the center
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const centerRadius = 200 // Radius to avoid in the center

    let x, y, distanceFromCenter

    do {
      // Random position within canvas bounds
      x = this.radius + Math.random() * (canvas.width - 2 * this.radius)
      y = this.radius + Math.random() * (canvas.height - 2 * this.radius)

      // Calculate distance from center
      const dx = x - centerX
      const dy = y - centerY
      distanceFromCenter = Math.sqrt(dx * dx + dy * dy)
    } while (distanceFromCenter < centerRadius) // Keep trying until we're outside the center area

    this.x = x
    this.y = y
    this.initialX = x
    this.initialY = y
    this.lastX = x
    this.lastY = y

    this.alpha = 0
    this.targetAlpha = 1
    this.isDragging = false
    this.shadowOffsetY = 0
    this.shadowBlur = 10
    this.shadowAlpha = 0
  }

  update(canvas: HTMLCanvasElement, circles: SkillCircle[]) {
    // Fade in animation
    this.alpha += (this.targetAlpha - this.alpha) * 0.05

    // Update shadow when dragging
    if (this.isDragging) {
      this.shadowOffsetY += (5 - this.shadowOffsetY) * 0.2
      this.shadowAlpha += (0.3 - this.shadowAlpha) * 0.2

      // Calculate velocity from last position (for when dragging ends)
      this.vx = (this.x - this.lastX) * 0.3
      this.vy = (this.y - this.lastY) * 0.3
    } else {
      this.shadowOffsetY += (0 - this.shadowOffsetY) * 0.2
      this.shadowAlpha += (0 - this.shadowAlpha) * 0.2

      // Apply physics if not dragging
      this.x += this.vx
      this.y += this.vy

      // Apply friction
      this.vx *= 0.95
      this.vy *= 0.95

      // Boundary collision (keep circles inside canvas)
      if (this.x - this.radius < 0) {
        this.x = this.radius
        this.vx = Math.abs(this.vx) * 0.5 // Bounce with energy loss
      } else if (this.x + this.radius > canvas.width) {
        this.x = canvas.width - this.radius
        this.vx = -Math.abs(this.vx) * 0.5 // Bounce with energy loss
      }

      if (this.y - this.radius < 0) {
        this.y = this.radius
        this.vy = Math.abs(this.vy) * 0.5 // Bounce with energy loss
      } else if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius
        this.vy = -Math.abs(this.vy) * 0.5 // Bounce with energy loss
      }
    }

    // Check for collisions with other circles
    this.handleCollisions(circles)

    // Store last position for velocity calculation
    this.lastX = this.x
    this.lastY = this.y
  }

  handleCollisions(circles: SkillCircle[]) {
    for (const other of circles) {
      // Skip self
      if (other === this) continue

      // Calculate distance between circles
      const dx = other.x - this.x
      const dy = other.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const minDistance = this.radius + other.radius

      // Check if circles are overlapping
      if (distance < minDistance) {
        // Calculate collision normal
        const nx = dx / distance
        const ny = dy / distance

        // Calculate overlap
        const overlap = minDistance - distance

        // Move circles apart based on their mass
        const totalMass = this.mass + other.mass
        const thisRatio = other.mass / totalMass
        const otherRatio = this.mass / totalMass

        // If either circle is being dragged, it should push the other circle more
        const pushFactor = this.isDragging ? 0.1 : other.isDragging ? 0.9 : thisRatio

        // Apply position correction
        if (!this.isDragging) {
          this.x -= overlap * nx * pushFactor
          this.y -= overlap * ny * pushFactor
        }

        if (!other.isDragging) {
          other.x += overlap * nx * (1 - pushFactor)
          other.y += overlap * ny * (1 - pushFactor)
        }

        // If neither is being dragged, apply impulse (bounce effect)
        if (!this.isDragging && !other.isDragging) {
          // Calculate relative velocity
          const rvx = other.vx - this.vx
          const rvy = other.vy - this.vy

          // Calculate relative velocity in terms of the normal direction
          const velAlongNormal = rvx * nx + rvy * ny

          // Do not resolve if velocities are separating
          if (velAlongNormal > 0) continue

          // Calculate restitution (bounciness)
          const restitution = 0.3

          // Calculate impulse scalar
          let impulse = -(1 + restitution) * velAlongNormal
          impulse /= 1 / this.mass + 1 / other.mass

          // Apply impulse
          const impulseX = impulse * nx
          const impulseY = impulse * ny

          this.vx -= impulseX / this.mass
          this.vy -= impulseY / this.mass
          other.vx += impulseX / other.mass
          other.vy += impulseY / other.mass
        }
      }
    }
  }
  draw(ctx: CanvasRenderingContext2D, isDarkMode: boolean) {
    const category = this.skill.category as keyof typeof categoryColors;
    const colors = categoryColors[category];

    ctx.save()
    ctx.globalAlpha = this.alpha

    // Draw shadow if dragging
    if (this.shadowAlpha > 0.01) {
      ctx.beginPath()
      ctx.arc(this.x, this.y + this.shadowOffsetY, this.radius, 0, Math.PI * 2)
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
      ctx.shadowBlur = this.shadowBlur
      ctx.shadowOffsetY = this.shadowOffsetY
      ctx.fillStyle = "rgba(0, 0, 0, " + this.shadowAlpha + ")"
      ctx.fill()

      // Reset shadow for the main circle
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0
    }

    // Draw filled circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = colors.bg
    ctx.fill()
    ctx.strokeStyle = colors.border
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw text with responsive font size
    const fontSize = Math.max(10, Math.min(14, this.radius / 3))
    
    ctx.fillStyle = colors.text
    ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(this.skill.name, this.x, this.y)

    // Add learning badge if applicable
    if (this.skill.learning) {
      const badgeRadius = Math.max(3, Math.min(5, this.radius / 8))
      const badgeX = this.x + this.radius - badgeRadius
      const badgeY = this.y - this.radius + badgeRadius

      ctx.beginPath()
      ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(239, 68, 68, 1)"
      ctx.fill()
    }

    ctx.restore()
  }

  // Check if a point is inside this circle
  containsPoint(x: number, y: number) {
    const dx = this.x - x
    const dy = this.y - y
    return dx * dx + dy * dy <= this.radius * this.radius
  }
}

// Simple animation circle class for mobile version
class MobileSkillShape {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  skill: (typeof skills)[0]
  alpha: number
  rotation: number
  rotationSpeed: number

  constructor(canvas: HTMLCanvasElement, skill: (typeof skills)[0]) {
    this.skill = skill
    this.size = 18 * skill.size // Smaller size for mobile circles
    
    // Random position within canvas
    this.x = this.size + Math.random() * (canvas.width - 2 * this.size)
    this.y = this.size + Math.random() * (canvas.height - 2 * this.size)
    
    // Random velocity
    this.vx = (Math.random() - 0.5) * 0.8
    this.vy = (Math.random() - 0.5) * 0.8
    
    // Rotation for visual effect
    this.rotation = 0
    this.rotationSpeed = 0
    
    this.alpha = 0
  }

  update(canvas: HTMLCanvasElement) {
    // Fade in animation
    this.alpha += (1 - this.alpha) * 0.05
    
    // Move circle
    this.x += this.vx
    this.y += this.vy
    
    // Bounce off walls
    if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
      this.vx *= -1
    }
    
    if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
      this.vy *= -1
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, isDarkMode: boolean) {
    const category = this.skill.category as keyof typeof categoryColors
    const colors = categoryColors[category]
    
    ctx.save()
    ctx.globalAlpha = this.alpha
    
    // Draw filled circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = colors.bg
    ctx.fill()
    ctx.strokeStyle = colors.border
    ctx.lineWidth = 1.5
    ctx.stroke()
    
    // Draw text
    const fontSize = Math.max(7, Math.min(10, this.size / 1.5))
    ctx.fillStyle = colors.text
    ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(this.skill.name, this.x, this.y)
    
    // Add learning badge if applicable
    if (this.skill.learning) {
      const badgeRadius = Math.max(2, Math.min(3, this.size / 8))
      const badgeX = this.x + this.size - badgeRadius
      const badgeY = this.y - this.size + badgeRadius
      
      ctx.beginPath()
      ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(239, 68, 68, 1)"
      ctx.fill()
    }
    
    ctx.restore()
  }
}

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null)
  const circlesRef = useRef<SkillCircle[]>([])
  const mobileCirclesRef = useRef<MobileSkillShape[]>([])
  const animationRef = useRef<number>(0)
  const mobileAnimationRef = useRef<number>(0)
  const [draggedCircle, setDraggedCircle] = useState<SkillCircle | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const mobileCanvasSizeRef = useRef({ width: 0, height: 0 })
  const isInitializedRef = useRef(false)
  const isMobileInitializedRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if on mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Main interactive canvas (desktop)
  useEffect(() => {
    if (isMobile) return // Skip if on mobile
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      // Only update if size has changed
      if (width !== canvasSizeRef.current.width || height !== canvasSizeRef.current.height) {
        canvas.width = width
        canvas.height = height
        canvasSizeRef.current = { width, height }

        // Initialize circles if they don't exist yet or if canvas size has changed significantly
        if (!isInitializedRef.current || circlesRef.current.length === 0) {
          circlesRef.current = skills.map((skill, index) => new SkillCircle(canvas, skill, index))
          isInitializedRef.current = true
        }
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // If dragging, update the position of the dragged circle
      if (isDragging && draggedCircle) {
        draggedCircle.x = x
        draggedCircle.y = y
      }
    }

    // Mouse down handler
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if any circle was clicked
      for (let i = circlesRef.current.length - 1; i >= 0; i--) {
        const circle = circlesRef.current[i]
        if (circle.containsPoint(x, y)) {
          // Move this circle to the end of the array so it's drawn on top
          circlesRef.current.splice(i, 1)
          circlesRef.current.push(circle)

          circle.isDragging = true
          circle.vx = 0
          circle.vy = 0
          setDraggedCircle(circle)
          setIsDragging(true)
          break
        }
      }
    }

    // Mouse up handler
    const handleMouseUp = () => {
      if (draggedCircle) {
        draggedCircle.isDragging = false
      }
      setDraggedCircle(null)
      setIsDragging(false)
    }

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top

        // Check if any circle was touched
        for (let i = circlesRef.current.length - 1; i >= 0; i--) {
          const circle = circlesRef.current[i]
          if (circle.containsPoint(x, y)) {
            // Move this circle to the end of the array so it's drawn on top
            circlesRef.current.splice(i, 1)
            circlesRef.current.push(circle)

            circle.isDragging = true
            circle.vx = 0
            circle.vy = 0
            setDraggedCircle(circle)
            setIsDragging(true)
            break
          }
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && isDragging && draggedCircle) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top

        draggedCircle.x = x
        draggedCircle.y = y
      }
    }

    const handleTouchEnd = () => {
      if (draggedCircle) {
        draggedCircle.isDragging = false
      }
      setDraggedCircle(null)
      setIsDragging(false)
    }

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with whiteboard background
      ctx.fillStyle = document.documentElement.classList.contains("dark") ? "#1c1c1c" : "#f8f8f8"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid pattern
      const gridSize = Math.max(10, Math.min(20, canvas.width / 40))
      ctx.strokeStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(0, 0, 0, 0.03)"
      ctx.lineWidth = 1

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Check if dark mode is enabled
      const isDarkMode = document.documentElement.classList.contains("dark")

      // Update and draw circles FIRST (so they appear behind text)
      circlesRef.current.forEach((circle) => {
        circle.update(canvas, circlesRef.current)
        circle.draw(ctx, isDarkMode)
      })

      // Calculate responsive font sizes based on canvas width
      const labelFontSize = Math.max(10, Math.min(14, canvas.width / 60))
      const titleFontSize = Math.max(16, Math.min(24, canvas.width / 30))
      const subtitleFontSize = Math.max(12, Math.min(16, canvas.width / 45))

      // Draw center text
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Remove the semi-transparent background ellipse and use text shadow instead

      // Draw label
      ctx.font = `bold ${labelFontSize}px Inter, system-ui, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(16, 185, 129, 1)"
        : "rgba(16, 185, 129, 1)"
      ctx.shadowColor = document.documentElement.classList.contains("dark") 
        ? "rgba(0, 0, 0, 0.8)" 
        : "rgba(0, 0, 0, 0.3)"
      ctx.shadowBlur = 5
      ctx.fillText("PROPER FULLSTACK", centerX, centerY - (canvas.height / 12))

      // Draw title
      ctx.font = `bold ${titleFontSize}px Inter, system-ui, sans-serif`
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 1)"
        : "rgba(0, 0, 0, 1)"
      ctx.shadowColor = document.documentElement.classList.contains("dark") 
        ? "rgba(0, 0, 0, 0.8)" 
        : "rgba(0, 0, 0, 0.4)"
      ctx.shadowBlur = 8
      ctx.fillText("My favorite technologies and skills", centerX, centerY)

      // Draw subtitle
      ctx.font = `${subtitleFontSize}px Inter, system-ui, sans-serif`
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.8)"
      ctx.shadowColor = document.documentElement.classList.contains("dark") 
        ? "rgba(0, 0, 0, 0.6)" 
        : "rgba(0, 0, 0, 0.3)"
      ctx.shadowBlur = 4
      ctx.fillText("These are some of the tools I've used to build my projects", centerX, centerY + (canvas.height / 20))
      
      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, draggedCircle, isMobile])
  
  // Mobile canvas with auto-moving shapes
  useEffect(() => {
    if (!isMobile) return // Skip if not on mobile
    
    const canvas = mobileCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      
      if (width !== mobileCanvasSizeRef.current.width || height !== mobileCanvasSizeRef.current.height) {
        canvas.width = width
        canvas.height = height
        mobileCanvasSizeRef.current = { width, height }
        
        // Initialize mobile shapes
        if (!isMobileInitializedRef.current || mobileCirclesRef.current.length === 0) {
          mobileCirclesRef.current = skills.map(skill => new MobileSkillShape(canvas, skill))
          isMobileInitializedRef.current = true
        }
      }
    }
    
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    
    // Animation loop for mobile
    const animateMobile = () => {
      if (!ctx || !canvas) return
      
      // Clear canvas
      ctx.fillStyle = document.documentElement.classList.contains("dark") ? "#1c1c1c" : "#f8f8f8"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw subtle grid pattern
      const gridSize = Math.max(10, Math.min(15, canvas.width / 30))
      ctx.strokeStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(0, 0, 0, 0.03)"
      ctx.lineWidth = 1
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      
      // Check if dark mode is enabled
      const isDarkMode = document.documentElement.classList.contains("dark")
      
      // Update and draw mobile shapes FIRST (so they appear behind text)
      mobileCirclesRef.current.forEach((shape) => {
        shape.update(canvas)
        shape.draw(ctx, isDarkMode)
      })
      
      // Calculate responsive font sizes
      const labelFontSize = Math.max(8, Math.min(12, canvas.width / 60))
      const titleFontSize = Math.max(14, Math.min(20, canvas.width / 30))
      const subtitleFontSize = Math.max(10, Math.min(14, canvas.width / 45))
      
      // Draw center text
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // Remove the semi-transparent background ellipse and use text shadow instead
      
      // Draw label
      ctx.font = `bold ${labelFontSize}px Inter, system-ui, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(16, 185, 129, 1)"
        : "rgba(16, 185, 129, 1)"
      ctx.shadowColor = document.documentElement.classList.contains("dark") 
        ? "rgba(0, 0, 0, 0.8)" 
        : "rgba(0, 0, 0, 0.3)"
      ctx.shadowBlur = 4
      ctx.fillText("PROPER FULLSTACK", centerX, centerY - (canvas.height / 10))
      
      // Draw title
      ctx.font = `bold ${titleFontSize}px Inter, system-ui, sans-serif`
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 1)"
        : "rgba(0, 0, 0, 1)"
      ctx.shadowColor = document.documentElement.classList.contains("dark") 
        ? "rgba(0, 0, 0, 0.8)" 
        : "rgba(0, 0, 0, 0.4)"
      ctx.shadowBlur = 6
      ctx.fillText("My favorite technologies and skills", centerX, centerY)
      
      // Draw subtitle
      ctx.font = `${subtitleFontSize}px Inter, system-ui, sans-serif`
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.8)"
      ctx.shadowColor = document.documentElement.classList.contains("dark") 
        ? "rgba(0, 0, 0, 0.6)" 
        : "rgba(0, 0, 0, 0.3)"
      ctx.shadowBlur = 3
      ctx.fillText("These are some of the tools I've used to build my projects", centerX, centerY + (canvas.height / 15))
      
      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      
      mobileAnimationRef.current = requestAnimationFrame(animateMobile)
    }
    
    animateMobile()
    
    return () => {
      cancelAnimationFrame(mobileAnimationRef.current)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [isMobile])

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Responsive canvas selection */}
      <div className="flex justify-center items-center w-full">
        {!isMobile ? (
          <canvas
            ref={canvasRef}
            className="w-[90%] h-[600px] md:h-[700px] cursor-grab active:cursor-grabbing rounded-lg shadow-md"
          />
        ) : (
          <canvas
            ref={mobileCanvasRef}
            className="w-[90%] h-[400px] rounded-lg shadow-md"
          />
        )}
      </div>

      {/* Legend */}
      <div className="container px-4 md:px-6 mx-auto mt-6 sm:mt-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" style={{ backgroundColor: categoryColors.language.bg }}></div>
            <span className="text-xs sm:text-sm">Languages</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" style={{ backgroundColor: categoryColors.framework.bg }}></div>
            <span className="text-xs sm:text-sm">Frameworks & Libraries</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" style={{ backgroundColor: categoryColors.tool.bg }}></div>
            <span className="text-xs sm:text-sm">Tools & Platforms</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" style={{ backgroundColor: "rgba(239, 68, 68, 1)" }}></div>
            <span className="text-xs sm:text-sm">Currently Learning</span>
          </div>
        </div>

        {/* Instruction - different for mobile and desktop */}
        <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
          {!isMobile ? (
            <p>Drag the circles to rearrange your skills • Watch them collide and interact with each other</p>
          ) : (
            <p>Watch the skills bubbles float around and interact with each other</p>
          )}
        </div>
      </div>
    </section>
  )
}
