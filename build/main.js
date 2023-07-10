"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./src/Game"));
const GameRules_1 = __importDefault(require("./src/GameRules"));
const game = new Game_1.default();
const gameRules = new GameRules_1.default(game);
game.displayGameState();
gameRules.solve();
