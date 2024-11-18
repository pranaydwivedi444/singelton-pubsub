//game state
interface GameState {
    id:string;
    whitePlayerName:string;
    blackPlayerName:string;
    moves:String[];
}


class GameManager  {
    games: GameState[];
    private static instance : GameManager;
    private constructor() {
        this.games = [];
    }

    static getInstance() {
        if(GameManager.instance){
            return GameManager.instance;
        }

        GameManager.instance = new GameManager();
        return GameManager.instance;
    }
    addGame(gameId:string, WName:string, BName:string) {
        const game: GameState = {
            id: gameId,
            whitePlayerName: WName,
            blackPlayerName: BName,
            moves: []
        };
        this.games.push(game);
    }

    addMoves (gameId:string, moves:string){
       const currentGame =  this.games.find((game) => gameId == game.id);
       currentGame?.moves.push(moves)
       console.log('moved pushed succesfull')

    }

    currentGameState(gameId:string){
        return this.games.find((game) => gameId==game.id)
    }

    log(){
        return this.games;
    }
}


export  default GameManager;