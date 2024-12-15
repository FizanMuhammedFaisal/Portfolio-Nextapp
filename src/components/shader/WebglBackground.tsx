'use client'

import React, { useEffect, useRef, useCallback, useState } from 'react'

interface WebGLBackgroundProps {
  mousePosition: { x: number; y: number }
}
type MousePosition = {
  x: number
  y: number
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  //smoothing
  const [smoothMousePosition, setSmoothMousePosition] = useState<MousePosition>(
    { x: 0, y: 0 }
  )
  const animationFrameId = useRef<number | null>(null)

  // Smooth out the mouse position
  useEffect(() => {
    const smoothMouseMovement = () => {
      setSmoothMousePosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.03,
        y: prev.y + (mousePosition.y - prev.y) * 0.03,
      }))
      animationFrameId.current = requestAnimationFrame(smoothMouseMovement)
    }

    animationFrameId.current = requestAnimationFrame(smoothMouseMovement)

    // Cleanup function to cancel animation frame when component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mousePosition])
  // Refs to store WebGL resources to prevent them from being garbage collected
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const positionBufferRef = useRef<WebGLBuffer | null>(null)

  const cleanup = useCallback(() => {
    // Cancel any ongoing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Clean up WebGL resources
    const gl = glRef.current
    const program = programRef.current
    const positionBuffer = positionBufferRef.current

    if (gl && program && positionBuffer) {
      gl.deleteProgram(program)
      gl.deleteBuffer(positionBuffer)

      // Reset refs
      glRef.current = null
      programRef.current = null
      positionBufferRef.current = null
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // Store gl context in ref
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
      varying vec2 v_texCoord;

      void main() {
        v_texCoord = a_position.xy * 0.5 + 0.5;
        gl_Position = a_position;
      }
    `

    const fragmentShaderSource = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Random function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(82.9898, 78.233))) * 3758.5453123);
}

// Noise function
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

// Particle simulation function
vec2 particleMotion(vec2 st, vec2 mouse, float time) {
  // Calculate distance from mouse
  float distanceToMouse = length(st - mouse);
  
  // Create a ripple effect
  float ripple = sin(distanceToMouse * 20.0 - time * 5.0);
  
  // Directional pull towards mouse
  vec2 mouseDirection = normalize(mouse - st);
  
  // Modify particle movement based on mouse proximity
  float mouseInfluence = smoothstep(0.1, 0.9, distanceToMouse) *0.1;
  
  // Add some noise-based randomness
  vec2 noiseOffset = vec2(
    noise(st * 10.0 + time),
    noise(st * 10.0 + time + 100.0)
  ) * 0.1;
  
  return st + mouseDirection * mouseInfluence * 0.2 + noiseOffset + ripple * 0.05;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution.xy;

  // Apply particle motion
  st = particleMotion(st, mouse, u_time);

  // Generate base pattern with particle movement
  float f = noise(st * 8.0 + u_time * 0.1);
  f = noise(st + f);
f = abs(f - 0.1) * 2.0;      
      
float finerNoise = noise(st * 16.0 + u_time * 0.2); 
f += finerNoise * 0.1; // Blend with base noise
  // Create color variation
  vec3 color1 = vec3(0.0, 0.02, 0.05);
  vec3 color2 = vec3(0.0, 0.4, 0.1);
  vec3 color = mix(color1, color2, f);

  // Add some dynamic highlighting
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

    // Store program in ref
    programRef.current = program

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // Store position buffer in ref
    positionBufferRef.current = positionBuffer

    const positions = [-1, -1, 1, -1, -1, 1, 1, 1]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')

    gl.useProgram(program)

    const render = (time: number) => {
      if (!glRef.current || !programRef.current) return

      time *= 0.0005 // Reduced speed to lower computational load

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

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Use the ref to schedule next frame
      animationFrameRef.current = requestAnimationFrame(render)
    }

    // Initial render
    animationFrameRef.current = requestAnimationFrame(render)

    // Cleanup function
    return () => {
      // Remove resize listener
      window.removeEventListener('resize', resizeCanvas)

      cleanup()
    }
  }, [smoothMousePosition, cleanup])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full  z-[-1]"
    />
  )
}

export default WebGLBackground
