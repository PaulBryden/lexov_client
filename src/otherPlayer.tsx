import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useSphere, BodyProps } from "@react-three/cannon"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Position } from "lexov_core/ts"
import { SphereGeometry, Vector3 } from "three"
const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const speed = new THREE.Vector3()

let position = new Vector3(0,3,0)

export function updatePosition(pos:Position)
{
  
  position.x=pos.x;
  position.y=pos.y;
  position.z=pos.z;
}

export function OtherPlayer(props: JSX.IntrinsicElements['mesh']){
  const [ref, api] = useSphere(() => ({ mass: 0, type: 'Dynamic', position: [4, 3, 0]}))

  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame((state) => {
    api.position.set(position.x, position.y, position.z);
    //ref.current.getWorldPosition(camera.position)
    console.log(position);
  })
  return (
    <>
      <mesh ref={ref} position={position} >
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial  color="green" />
      </mesh>
    </>
  )
}
