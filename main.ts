import Game from "./src/Game";
import GameRules from "./src/GameRules";

const game = new Game();
const gameRules = new GameRules(game);

game.displayGameState();

gameRules.solve();