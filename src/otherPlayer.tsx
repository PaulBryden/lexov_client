import * as THREE from "three"
import { useEffect, useRef,  } from "react"
import { useSphere,  } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"

export function OtherPlayer(props: JSX.IntrinsicElements['mesh']){
  let positionVector = props.position as Vector3;
  var test = positionVector.toArray();
  const [ref, api] = useSphere(() => ({ mass: 0, type: 'Dynamic', position: test}))

  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame((state) => {
    
  })
  return (
    <>
      <mesh ref={ref} position={props.position} >
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial  color="green" />
      </mesh>
    </>
  )
}
