'use client'

import React, { useEffect, useRef, useCallback, useState } from 'react'

interface WebGLBackgroundProps {
  children?: React.ReactNode
  mousePosition?: { x: number; y: number }
  isVisible?: boolean
  baseColor1?: [number, number, number]
  baseColor2?: [number, number, number]
  noiseScale?: number
  particleInfluence?: number
}
type MousePosition = {
  x: number
  y: number
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({
  mousePosition,
  children,
  isVisible = true,
  baseColor1 = [0.0, 0.02, 0.05],
  baseColor2 = [0.0, 0.4, 0.1],
  noiseScale = 8.0,
  particleInfluence = 0.1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [smoothMousePosition, setSmoothMousePosition] = useState<MousePosition>(
    {
      x: window?.innerWidth / 2,
      y: window?.innerHeight / 2,
    }
  )
  const animationFrameId = useRef<number | null>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const positionBufferRef = useRef<WebGLBuffer | null>(null)
  const startTime = useRef<number>(Date.now())
  const lastDirectionChange = useRef<number>(Date.now())
  const pathParams = useRef({
    radiusX: 0,
    radiusY: 0,
    speed: 0,
    noiseScale: 0.003,
    directionMultiplier: 1,
  })
  useEffect(() => {
    if (mousePosition) {
      // Follow the provided mouse position
      const smoothMouseMovement = () => {
        setSmoothMousePosition((prev) => ({
          x: prev.x + (mousePosition.x - prev.x) * 0.025,
          y: prev.y + (mousePosition.y - prev.y) * 0.025,
        }))
        animationFrameId.current = requestAnimationFrame(smoothMouseMovement)
      }

      animationFrameId.current = requestAnimationFrame(smoothMouseMovement)

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
        }
      }
    } else {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const maxRadius = Math.min(centerX, centerY) * 0.7 // Larger movement area

      pathParams.current = {
        radiusX: maxRadius * (0.5 + Math.random() * 0.5),
        radiusY: maxRadius * (0.5 + Math.random() * 0.5),
        speed: 0.0002 + Math.random() * 0.0001,
        noiseScale: 0.003,
        directionMultiplier: 1,
      }

      const autonomousMovement = (time: number) => {
        const elapsedTime = Date.now() - startTime.current
        const timeSinceDirectionChange =
          Date.now() - lastDirectionChange.current

        // Occasionally change direction and path parameters (every 10-15 seconds)
        if (timeSinceDirectionChange > 10000 + Math.random() * 5000) {
          pathParams.current = {
            radiusX: maxRadius * (0.3 + Math.random() * 0.7),
            radiusY: maxRadius * (0.3 + Math.random() * 0.7),
            speed: 0.00001 + Math.random() * 0.00001,
            noiseScale: 0.001 + Math.random() * 0.005,
            directionMultiplier: Math.random() > 0.5 ? 1 : -1,
          }
          lastDirectionChange.current = Date.now()
        }

        // Base movement (elliptical path)
        const baseX =
          centerX +
          Math.cos(
            elapsedTime *
              pathParams.current.speed *
              pathParams.current.directionMultiplier
          ) *
            pathParams.current.radiusX
        const baseY =
          centerY +
          Math.sin(
            elapsedTime *
              pathParams.current.speed *
              0.7 *
              pathParams.current.directionMultiplier
          ) *
            pathParams.current.radiusY

        // Add noise layer (using a simple sine wave as "noise")
        const noiseX =
          Math.sin(elapsedTime * pathParams.current.noiseScale * 1.7) *
          maxRadius *
          0.15
        const noiseY =
          Math.sin(elapsedTime * pathParams.current.noiseScale * 2.3) *
          maxRadius *
          0.15

        // Occasional slight pause (slow down movement briefly)
        const slowdownFactor = Math.sin(elapsedTime * 0.0003) > 0.7 ? 0.2 : 1

        // Apply smooth movement
        setSmoothMousePosition((prev) => ({
          x: prev.x + (baseX + noiseX - prev.x) * 0.02 * slowdownFactor,
          y: prev.y + (baseY + noiseY - prev.y) * 0.02 * slowdownFactor,
        }))

        animationFrameId.current = requestAnimationFrame(autonomousMovement)
      }

      animationFrameId.current = requestAnimationFrame(autonomousMovement)

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
        }
      }
    }
  }, [mousePosition])

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    const gl = glRef.current
    const program = programRef.current
    const positionBuffer = positionBufferRef.current

    if (gl && program && positionBuffer) {
      gl.deleteProgram(program)
      gl.deleteBuffer(positionBuffer)

      glRef.current = null
      programRef.current = null
      positionBufferRef.current = null
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    glRef.current = gl

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const vertexShaderSource = `
     attribute vec4 a_position;
    uniform float u_time;
    uniform vec2 u_resolution;
    varying vec2 v_texCoord;
    void main() {
    vec3 normalizedPosition = a_position.xyz;
    float wave = sin(normalizedPosition.x * 10.0 + u_time) * 0.2;
    normalizedPosition.z += wave;
    v_texCoord = normalizedPosition.xy * 0.5 + 0.5;
    gl_Position = vec4(normalizedPosition, 1.0);
}
    `

    const fragmentShaderSource = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_noiseScale;
uniform float u_particleInfluence;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(82.9898, 78.233))) * 3758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec2 particleMotion(vec2 st, vec2 mouse, float time, float influence) {
  float distanceToMouse = length(st - mouse);
  float ripple = sin(distanceToMouse * 35.0 - time * 5.0);
  vec2 mouseDirection = normalize(mouse - st);
  float mouseInfluence = smoothstep(0.1, 0.9, distanceToMouse) * influence;
  vec2 noiseOffset = vec2(
    noise(st * 10.0 + time),
    noise(st * 10.0 + time + 100.0)
  ) * 0.1;
  return st + mouseDirection * mouseInfluence * 0.2 + noiseOffset + ripple * 0.05;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution.xy;

  st = particleMotion(st, mouse, u_time, u_particleInfluence);

  float f = noise(st * u_noiseScale + u_time * 0.1);
  f = noise(st + f);
  f = abs(f - 0.1) * 2.0;
  float finerNoise = noise(st * u_noiseScale * 2.0 + u_time * 0.2);
  f += finerNoise * 0.1;
  vec3 color = mix(u_color1, u_color2, f);
  float highlight = smoothstep(0.3, 1.0, f);
  color += highlight * vec3(0.1, 0.3, 0.2);

  gl_FragColor = vec4(color, 1.0);
}
    `

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    )

    if (!vertexShader || !fragmentShader) {
      console.error('Failed to compile shaders')
      return
    }

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    programRef.current = program

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getShaderInfoLog(program))
      return
    }

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    positionBufferRef.current = positionBuffer
    const positions = [-1, -1, 1, -1, -1, 1, 1, 1]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    const color1Location = gl.getUniformLocation(program, 'u_color1')
    const color2Location = gl.getUniformLocation(program, 'u_color2')
    const noiseScaleLocation = gl.getUniformLocation(program, 'u_noiseScale')
    const particleInfluenceLocation = gl.getUniformLocation(
      program,
      'u_particleInfluence'
    )

    gl.useProgram(program)

    const render = (time: number) => {
      if (!glRef.current || !programRef.current || !isVisible) return

      time *= 0.0005

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, time)
      gl.uniform2f(
        mouseLocation,
        smoothMousePosition.x,
        canvas.height - smoothMousePosition.y
      )
      gl.uniform3f(color1Location, ...baseColor1)
      gl.uniform3f(color2Location, ...baseColor2)
      gl.uniform1f(noiseScaleLocation, noiseScale)
      gl.uniform1f(particleInfluenceLocation, particleInfluence)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cleanup()
    }
  }, [
    smoothMousePosition,
    cleanup,
    isVisible,
    baseColor1,
    baseColor2,
    noiseScale,
    particleInfluence,
  ])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default WebGLBackground
