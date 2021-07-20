import React from 'react';
import { Sky, PointerLockControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import { Ground } from "./Ground"
import { Player, positionReference } from "./User"
import './App.css';
import { PlayerList} from "lexov_core";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PlayersDataSingleton } from './PlayersDataSingleton';
import { OtherPlayers } from './OtherPlayers';

const client = new W3CWebSocket('ws://127.0.0.1:9001');

function sendClientPosition()
{
  var pos = positionReference;client.send(JSON.stringify({x:pos.x, y:pos.y, z:pos.z}));
  
}

export default function App() {
  client.onopen = () => {
    sendClientPosition();
  };
  client.onmessage = (message) => {
    try
    {
      const players: PlayerList = JSON.parse(message.data);
      PlayersDataSingleton.getInstance().updatePlayerList(players);
    }
    catch(e)
    {
      console.log(e)
    }
    setTimeout(()=>{sendClientPosition();}, 25);
  };
  return ( <Canvas 
    shadows
    gl={{ alpha: false }}
    camera={{ fov: 45 }}
    raycaster={{
      computeOffsets: (e: any) => ({ offsetX: e.target.width / 2, offsetY: e.target.height / 2 }),
    }}>
    <Sky sunPosition={[95, 15, 95]} />
    <ambientLight intensity={0.1} />
    <pointLight castShadow intensity={0.8} position={[90, 90, 90]} />
    <Physics  gravity={[0, -28, 0]}>
      <Ground />
      <Player />
      < OtherPlayers/>
    </Physics>
    <PointerLockControls />
  </Canvas>
  );
}

