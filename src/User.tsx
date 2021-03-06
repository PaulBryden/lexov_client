import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useSphere, BodyProps } from "@react-three/cannon"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Position } from "lexov_core"
import { Vector3 } from "three"
const SPEED = 5
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" }
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const speed = new THREE.Vector3()

export let positionReference: Position = {x:1, y:2, z:3};

const usePlayerControls = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false })
  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return movement
}

export function Player(props: JSX.IntrinsicElements['mesh']){
  const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', position: [0, 10, 0]}))
  const { forward, backward, left, right, jump } = usePlayerControls()
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame((state) => {
    //ref.current.getWorldPosition(new Vector3(position.x, position.y, position.z));
    ref.current.getWorldPosition(camera.position)
    positionReference=camera.position;
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1]) < 0.05) api.velocity.set(velocity.current[0], 10, velocity.current[2])
  })
  return (
    <>
      <mesh ref={ref} />
    </>
  )
}
