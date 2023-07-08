"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./src/Game"));
const game = new Game_1.default();
let testRun = 0;
while (testRun <= 10) {
    game.displayGameState();
    //check if user can move the top card from tableau pile to foundation
    for (const tableauPile of game.tableauPiles) {
        const card = tableauPile.getTopCard();
        if (card) {
            for (const foundationPile of game.foundationPiles) {
                if (foundationPile.canAddCard(card)) {
                    foundationPile.addCard(tableauPile.removeCard());
                    break;
                }
            }
        }
    }
    // for(const tableauPile of game.tableauPiles) {
    //     for(const card of tableauPile.cards) {
    //         if(card.flipped) console.log(card)
    //     }
    // }
    testRun++;
}
game.displayGameState();
