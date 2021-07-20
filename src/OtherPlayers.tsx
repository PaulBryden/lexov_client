import * as THREE from "three"
import { Component } from "react"
import {  PlayerList} from "lexov_core"
import {  Vector3 } from "three"
import { OtherPlayer} from "./OtherPlayer"
import {PlayersDataSingleton} from "./PlayersDataSingleton"
const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const speed = new THREE.Vector3()
type propsTest = {
}

type mystate = {
  playersList: PlayerList;
}

export class OtherPlayers extends Component<propsTest, mystate>
{

  updatePlayers(players:PlayerList)
  {
    this.setState({playersList: players});
  }

  componentDidMount() {
    PlayersDataSingleton.getInstance().registerUpdateCallback((players:PlayerList)=>{this.updatePlayers(players)});
  }
  constructor(props:propsTest)
  {
    super(props);
    this.state = {
      playersList: {players:[{uuid:0, position:{x:1.0, y:1.0, z:1.0}}]},
    }
  }
  render()
  { 
    var rows = [];
    this.state.playersList.players.forEach((player)=>( rows.push(< OtherPlayer key={player.position.x} position={new Vector3(player.position.x, player.position.y, player.position.z)} />)));
    return (
    <>
    {rows}
       </>
  );

  }
}