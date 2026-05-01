"use client"

import { useEffect, useRef, useState } from "react"

interface Blob {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  baseSize: number
  color: string
  speedFactor: number
  angle: number
  angleSpeed: number
}

export default function BlobCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const blobsRef = useRef<Blob[]>([])
  const animationRef = useRef<number>(0)
  const hasMovedRef = useRef(false)

  // Initialize blobs
  useEffect(() => {
    // Create an array of colors with varying opacity and hue
    const colors = [
      "hsla(175, 70%, 41%, 0.4)", // Primary color with opacity
      "hsla(185, 70%, 35%, 0.35)", // Slightly different hue
      "hsla(165, 70%, 45%, 0.3)", // Another variation
      "hsla(170, 75%, 40%, 0.25)", // Fourth variation
      "hsla(180, 65%, 38%, 0.35)", // Fifth variation
      "hsla(160, 60%, 42%, 0.3)", // Sixth variation
      "hsla(175, 80%, 36%, 0.4)", // Seventh variation
    ]

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Initialize blobs in the center
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    // Create 7 blobs with different properties
    blobsRef.current = Array(7)
      .fill(0)
      .map((_, i) => ({
        x: centerX,
        y: centerY,
        targetX: centerX,
        targetY: centerY,
        baseSize: 80 + i * 25, // Different base sizes for each blob
        size: 80 + i * 25, // Current size (will be animated)
        color: colors[i],
        // Create a wider range of speeds - some very slow, some faster
        speedFactor: 0.01 + (i % 3) * 0.03, // Varied speed factors (0.01, 0.04, 0.07, 0.01, 0.04, 0.07, 0.01)
        angle: Math.random() * Math.PI * 2, // Random initial angle
        angleSpeed: 0.0005 + Math.random() * 0.002, // Random angle speed
      }))

    // Handle resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      hasMovedRef.current = true
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Update target positions with varied offsets for each blob
      blobsRef.current.forEach((blob, index) => {
        // Create more varied offsets based on blob index
        const offsetX = Math.sin(index * 0.5) * 50
        const offsetY = Math.cos(index * 0.5) * 50

        blob.targetX = e.clientX + offsetX
        blob.targetY = e.clientY + offsetY
      })
    }

    // Handle touch for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        hasMovedRef.current = true
        const touch = e.touches[0]
        setMousePosition({ x: touch.clientX, y: touch.clientY })

        // Update target positions with varied offsets for each blob
        blobsRef.current.forEach((blob, index) => {
          const offsetX = Math.sin(index * 0.5) * 50
          const offsetY = Math.cos(index * 0.5) * 50

          blob.targetX = touch.clientX + offsetX
          blob.targetY = touch.clientY + offsetY
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // If mouse hasn't moved yet, create a gentle floating animation
      if (!hasMovedRef.current) {
        const centerX = dimensions.width / 2
        const centerY = dimensions.height / 2

        blobsRef.current.forEach((blob, index) => {
          // Update angle with different speeds
          blob.angle += blob.angleSpeed

          // Calculate position in a circular pattern with different radii
          const radius = 30 + index * 25
          blob.targetX = centerX + Math.cos(blob.angle + index * 0.5) * radius
          blob.targetY = centerY + Math.sin(blob.angle + index * 0.5) * radius * 0.6 // Elliptical path
        })
      }

      // Update and draw blobs
      blobsRef.current.forEach((blob, index) => {
        // Apply easing with individual speed factors
        blob.x += (blob.targetX - blob.x) * blob.speedFactor
        blob.y += (blob.targetY - blob.y) * blob.speedFactor

        // Pulse size effect with different phases
        const pulseFactor = Math.sin(Date.now() * 0.001 + index * 0.5) * 0.15 + 1
        blob.size = blob.baseSize * pulseFactor

        // Draw blob
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2)
        ctx.fillStyle = blob.color
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationRef.current)
  }, [dimensions])

  return (
    <>
      {/* SVG Filters for gooey effect - adjusted for more blobs */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Canvas with filter applied */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[-1]" style={{ filter: "url(#gooey)" }} />
    </>
  )
}
