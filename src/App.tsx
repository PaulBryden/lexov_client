import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "./Ground"
import { Player } from "./User"
import './App.css';
import {Position} from "lexov_core/ts";

let posStruct: Position = {x:2, y:3, z:4};

const App: React.FC = () => (
 <Canvas children
      shadows
      gl={{ alpha: false }}
      camera={{ fov: 45 }}
      raycaster={{
        computeOffsets: (e: any) => ({ offsetX: e.target.width / 2, offsetY: e.target.height / 2 }),
      }}>
      <Sky sunPosition={[95, 15, 95]} />
      <ambientLight intensity={0.1} />
      <pointLight castShadow intensity={0.8} position={[90, 90, 90]} />
      <Physics children gravity={[0, -28, 0]}>
        <Ground />
        <Player />
      </Physics>
      <PointerLockControls />
    </Canvas>
);

export default App;
