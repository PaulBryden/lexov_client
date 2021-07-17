import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from "@react-three/fiber"
import { usePlane} from "@react-three/cannon"

export function Ground(props: JSX.IntrinsicElements['mesh']){
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2,  0, 0] }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial  color="grey" />
    </mesh>
  )
}
