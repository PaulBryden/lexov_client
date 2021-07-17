import React from 'react';
import { Sky, PointerLockControls } from "@react-three/drei"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import { Ground } from "./Ground"
import { Player, positionReference } from "./User"
import { OtherPlayer,updatePosition} from "./otherPlayer"
import './App.css';
import {Position, PlayerList} from "lexov_core";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9001');
let position: Position = {x:1, y:2, z:3};
function UpdatePos(pos:Position)
{
  updatePosition(pos);
  console.log("Inside UpdatePos");
}
let posStruct: Position = {x:2, y:3, z:4};
export default function App() {
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  client.onmessage = (message) => {
    try
    {
      const position: Position = JSON.parse(message.data);
      console.log("Before update Pos");
      UpdatePos(position);
      console.log("After update Pos");
      
    }
    catch
    {
    }
    try
    {
      const players: PlayerList = JSON.parse(message.data);
      console.log("Before update Pos");
      UpdatePos(players.players[0].position);
      console.log("After update Pos");
      
    }
    catch
    {
    }
    console.log(message);
  };
  setInterval(()=>{ var pos = positionReference;client.send(JSON.stringify({x:pos.x, y:pos.y, z:pos.z}));}, 1000);
  return ( <Canvas children
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
      < OtherPlayer/>
    </Physics>
    <PointerLockControls />
  </Canvas>
  );
}

