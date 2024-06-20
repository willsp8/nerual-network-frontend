import { useEffect, useState, useRef, useMemo  } from 'react'

import '../App.css'
import axios from 'axios'
import Select from 'react-select'

import { NavBar } from '../NavBar'

import * as THREE from "three"
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber"
import {Points, PointMaterial, Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl, Html } from "@react-three/drei"
import { Effects } from '@react-three/drei'
import {  FilmPass, WaterPass, UnrealBloomPass, LUTPass, LUTCubeLoader } from 'three-stdlib'
import { AdditiveBlending, Vector3 } from 'three'
import * as random from 'maath/random/dist/maath-random.esm'
import { useNavigate } from "react-router-dom";

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass })



function About() {
    console.log("home")

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/network");
    }

    useEffect(() => {
       
    }, [])

    
    

    return (
      
      <div>
        <NavBar></NavBar>
        <div style={{ width: "100vw", height: "100vh" }}> 
            
            <Canvas linear flat legacy dpr={1} camera={{ fov: 100, position: [0, 0, 0] }}>
                <ambientLight intensity={0.01} />
                 <pointLight distance={60} intensity={4} color="lightblue" />
                <spotLight intensity={0.0} position={[0, 0, 2000]} penumbra={1} color="blue" />
                
                
                <Postpro /> 
                <Stars >
                    
                </Stars>
                
                            
                <Html position={[0, 0, -30]} zIndexRange={[0, 0]} fullscreen>
                    <div class="  w-screen h-screen bg-midnight bg-opacity-30 overflow-y-auto">
                    <div class="w-full  overflow-hidden bg-teal-500 bg-opacity-50 rounded-lg shadow-md ">
                        <div class="px-6 py-4 align-[30px] flex flex-col items-center" bg-midnight bg-opacity-30>
                            <div class="flex justify-center mx-auto bg-midnight bg-opacity-30" >
                                
                            </div>

                            <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200 ">Build your best ideas together, in Google Docs</h3>

                            <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Build Neural Network</p>


                            
                
                            <button onClick={handleRedirect} class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Go to Neural Network
                            </button>
                            
                        </div>

                        <div class="flex items-center justify-center py-4 text-center bg-teal-500 bg-opacity-50">
                            <span class="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                            <a href="#" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
                        </div>
                    </div>   

            
                    </div>
            

                </Html>
            </Canvas>
        </div>
    </div>
    )
}

function NeuralNetworkGraphic() {
    

    const groupRef = useRef()
    const particlesRef = useRef()
    const linesGeometryRef = useRef()

    const maxParticleCount = 1000
    const particleCount = 500
    const r = 10
    const rHalf = r / 2
    const maxConnections = 20
    const minDistance = 2.5
    let vertexpos = 0
    let colorpos = 0
    let numConnected = 0

    const segments = maxParticleCount * maxParticleCount
    const positions = useMemo(() => new Float32Array(segments * 3), [segments])
    const colors = useMemo(() => new Float32Array(segments * 3), [segments])

    const particlePositions = useMemo(() => new Float32Array(maxParticleCount * 3), [])

    const particlesData = useMemo(() => [], [])

    const v = useMemo(() => new Vector3(), [])

    useEffect(() => {
        for (let i = 0; i < maxParticleCount; i++) {
            const x = Math.random() * r - r / 2
            const y = Math.random() * r - r / 2
            const z = Math.random() * r - r / 2

            particlePositions[i * 3] = x
            particlePositions[i * 3 + 1] = y
            particlePositions[i * 3 + 2] = z

            const v = new Vector3(
                -1 + Math.random() * 2,
                -1 + Math.random() * 2,
                -1 + Math.random() * 2
            )
            particlesData.push({ velocity: v.normalize().divideScalar(50), numConnections: 0 })
        }

        particlesRef.current.setDrawRange(0, particleCount)
    })

    useFrame((_, delta) => {
        vertexpos = 0
        colorpos = 0
        numConnected = 0

        for (let i = 0; i < particleCount; i++) particlesData[i].numConnections = 0

        for (let i = 0; i < particleCount; i++) {
            const particleData = particlesData[i]

            v.set(
                particlePositions[i * 3],
                particlePositions[i * 3 + 1],
                particlePositions[i * 3 + 2]
            )
                .add(particleData.velocity)
                .setLength(10)
            particlePositions[i * 3] = v.x
            particlePositions[i * 3 + 1] = v.y
            particlePositions[i * 3 + 2] = v.z

            if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
                particleData.velocity.y = -particleData.velocity.y

            if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
                particleData.velocity.x = -particleData.velocity.x

            if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
                particleData.velocity.z = -particleData.velocity.z

            if (particleData.numConnections >= maxConnections) continue

            for (let j = i + 1; j < particleCount; j++) {
                const particleDataB = particlesData[j]
                if (particleDataB.numConnections >= maxConnections) continue

                const dx = particlePositions[i * 3] - particlePositions[j * 3]
                const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1]
                const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2]
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

                if (dist < minDistance) {
                    particleData.numConnections++
                    particleDataB.numConnections++

                    const alpha = 1.0 - dist / minDistance

                    positions[vertexpos++] = particlePositions[i * 3]
                    positions[vertexpos++] = particlePositions[i * 3 + 1]
                    positions[vertexpos++] = particlePositions[i * 3 + 2]

                    positions[vertexpos++] = particlePositions[j * 3]
                    positions[vertexpos++] = particlePositions[j * 3 + 1]
                    positions[vertexpos++] = particlePositions[j * 3 + 2]

                    colors[colorpos++] = alpha
                    colors[colorpos++] = alpha
                    colors[colorpos++] = alpha

                    colors[colorpos++] = alpha
                    colors[colorpos++] = alpha
                    colors[colorpos++] = alpha

                    numConnected++
                }
            }
        }

        linesGeometryRef.current.setDrawRange(0, numConnected * 2)
        linesGeometryRef.current.attributes.position.needsUpdate = true
        linesGeometryRef.current.attributes.color.needsUpdate = true

        particlesRef.current.attributes.position.needsUpdate = true

        groupRef.current.rotation.y += delta / 5
    })

    return (
        <group ref={groupRef} dispose={null}>
            <points>
                <bufferGeometry ref={particlesRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={particlePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color={'white'}
                    size={3}
                    blending={AdditiveBlending}
                    transparent={true}
                    sizeAttenuation={false}
                />
            </points>
            <lineSegments>
                <bufferGeometry ref={linesGeometryRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={colors.length / 3}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors={true}
                    blending={AdditiveBlending}
                    transparent={true}
                />
            </lineSegments>
        </group>
    )
}


  
function Postpro() {
const water = useRef()
const data = useLoader(LUTCubeLoader, '/cubicle.CUBE')
//useFrame((state) => (water.current.time = state.clock.elapsedTime * 4))
return (
    <Effects disableGamma>
    <waterPass ref={water} factor={1} />
    <unrealBloomPass args={[undefined, 1.25, 1, 0]} />
    <filmPass args={[0.2, 0.5, 1500, false]} />
    <lUTPass lut={data.texture} intensity={0.75} />
    </Effects>
)
}

function Stars(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    })
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  }

export default About