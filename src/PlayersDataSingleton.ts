import { PlayerList } from "lexov_core";

export class PlayersDataSingleton {
    private static instance: PlayersDataSingleton;
    private playerList: PlayerList;
    private notifyPlayerUpdateCallback: (players: PlayerList) => void;
    
    private constructor() { 
        this.playerList = {players:[]}
    }

    public static getInstance(): PlayersDataSingleton {
        if (!PlayersDataSingleton.instance) {
            PlayersDataSingleton.instance = new PlayersDataSingleton();
        }

        return PlayersDataSingleton.instance;
    }

    public updatePlayerList(players: PlayerList)
    {
        this.playerList=players;
        if(this.notifyPlayerUpdateCallback)
        {
            this.notifyPlayerUpdateCallback(this.playerList);
        }
    }

    public registerUpdateCallback(callback: (players: PlayerList) => void) {
        this.notifyPlayerUpdateCallback = callback;
    }
}