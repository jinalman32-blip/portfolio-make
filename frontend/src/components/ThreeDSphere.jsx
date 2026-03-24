import { useEffect, useRef } from 'react'

export default function ThreeDSphere({ size = 340 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const W = size
    const H = size
    canvas.width = W
    canvas.height = H

    const RADIUS = size * 0.38
    const NUM = 220
    const FOCAL = size * 1.2

    // Generate particles using Fibonacci sphere distribution
    const pts = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < NUM; i++) {
      const y = 1 - (i / (NUM - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      pts.push({
        ox: r * Math.cos(theta) * RADIUS,
        oy: y * RADIUS,
        oz: r * Math.sin(theta) * RADIUS,
      })
    }

    let rotY = 0
    let rotX = 0.3
    let mouseX = 0
    let mouseY = 0
    let isDragging = false
    let lastMX = 0
    let lastMY = 0
    let velX = 0.004
    let velY = 0

    const onMouseDown = (e) => {
      isDragging = true
      lastMX = e.clientX
      lastMY = e.clientY
    }
    const onMouseUp = () => { isDragging = false }
    const onMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - lastMX
        const dy = e.clientY - lastMY
        velY = dx * 0.005
        velX = dy * 0.005
        lastMX = e.clientX
        lastMY = e.clientY
      } else {
        const rect = canvas.getBoundingClientRect()
        mouseX = (e.clientX - rect.left - W / 2) / W
        mouseY = (e.clientY - rect.top - H / 2) / H
      }
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mousemove', onMouseMove)

    function project(x, y, z) {
      const sc = FOCAL / (FOCAL + z + RADIUS)
      return { px: x * sc + W / 2, py: y * sc + H / 2, sc }
    }

    function rotYaw(x, z, a) {
      return { x: x * Math.cos(a) - z * Math.sin(a), z: x * Math.sin(a) + z * Math.cos(a) }
    }

    function rotPitch(y, z, a) {
      return { y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) }
    }

    let animId
    let frame = 0

    function draw() {
      frame++
      ctx.clearRect(0, 0, W, H)

      // Auto rotate
      if (!isDragging) {
        velY += (0.004 - velY) * 0.02
        velX += (0 - velX) * 0.02
      }
      rotY += velY
      rotX += velX

      // Mouse influence (subtle)
      const targetRX = mouseY * 0.4
      rotX += (targetRX - rotX) * 0.015

      // Project all points
      const projected = pts.map((p) => {
        let { ox: x, oy: y, oz: z } = p
        const ry = rotYaw(x, z, rotY)
        x = ry.x; z = ry.z
        const rp = rotPitch(y, z, rotX)
        y = rp.y; z = rp.z
        const { px, py, sc } = project(x, y, z)
        return { px, py, sc, z }
      })

      // Draw connections
      const MAX_DIST = size * 0.18
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dx = a.px - b.px
          const dy = a.py - b.py
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const t = 1 - dist / MAX_DIST
            const alpha = t * 0.55 * Math.min(a.sc, b.sc) * 1.8
            const brightness = ((a.z + b.z) / 2 + RADIUS) / (2 * RADIUS)
            const r = Math.round(34 + brightness * 105)
            const g = Math.round(100 + brightness * 111)
            const bl = Math.round(200 + brightness * 55)
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.px, a.py)
            ctx.lineTo(b.px, b.py)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      projected.forEach((p) => {
        const bright = (p.z + RADIUS) / (2 * RADIUS)
        const r2 = p.sc * 2.8
        const alpha = 0.35 + bright * 0.65

        // Color: cyan → violet based on depth
        const cr = Math.round(22 + bright * 120)
        const cg = Math.round(180 + bright * 30)
        const cb = Math.round(238)

        // Glow
        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r2 * 2.2)
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha})`)
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.px, p.py, r2 * 2.2, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha + 0.2})`
        ctx.beginPath()
        ctx.arc(p.px, p.py, r2 * 0.55, 0, Math.PI * 2)
        ctx.fill()
      })

      // Central holographic ring glow
      if (frame % 3 === 0) {
        const pulse = 0.55 + 0.45 * Math.sin(frame * 0.04)
        const ringGrad = ctx.createRadialGradient(W / 2, H / 2, RADIUS * 0.7, W / 2, H / 2, RADIUS * 1.15)
        ringGrad.addColorStop(0, `rgba(34,211,238,0)`)
        ringGrad.addColorStop(0.6, `rgba(34,211,238,${0.04 * pulse})`)
        ringGrad.addColorStop(1, `rgba(99,102,241,0)`)
        ctx.fillStyle = ringGrad
        ctx.beginPath()
        ctx.arc(W / 2, H / 2, RADIUS * 1.15, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        cursor: 'grab',
        borderRadius: '50%',
      }}
    />
  )
}
