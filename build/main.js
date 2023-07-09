"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./src/Game"));
const game = new Game_1.default();
let testRun = 0;
game.displayGameState();
const moveCards = () => {
    while (testRun <= 50) {
        //Check if any cards can be moved from stock to foundation
        while (!game.stockPile.isEmpty()) {
            const drawnCard = game.stockPile.drawCard();
            if (drawnCard) {
                for (const foundationPile of game.foundationPiles) {
                    if (foundationPile.canAddCard(drawnCard)) {
                        game.wastePile.removeCard();
                        foundationPile.addCard(drawnCard);
                        break;
                    }
                }
            }
        }
        game.stockPile.refillFromWaste();
        //Check Tableaus for moves
        for (let i = 0; i < game.tableauPiles.length; i++) {
            const currentTableau = game.tableauPiles[i];
            //check if user can move the top card from tableau pile to foundation
            const card = currentTableau.getTopCard();
            if (card) {
                for (const foundationPile of game.foundationPiles) {
                    if (foundationPile.canAddCard(card)) {
                        foundationPile.addCard(game.tableauPiles[i].removeCard());
                        break;
                    }
                }
            }
            //Check if I can move any cards from one tableau to another
            const flippedCardsIndices = game.tableauPiles[i].flippedCardsIndices;
            for (const flippedCardIndex of flippedCardsIndices) {
                for (let j = 0; j < game.tableauPiles.length; j++) {
                    if (i === j)
                        continue;
                    if (game.tableauPiles[j].canAddCards(currentTableau.cards[flippedCardIndex])) {
                        const removedCards = currentTableau.removeCards(flippedCardIndex);
                        game.tableauPiles[j].addCards(removedCards);
                        break;
                    }
                }
            }
        }
        //Check if any card can be moved from the stock to the tableaus
        while (!game.stockPile.isEmpty()) {
            const drawnCard = game.stockPile.drawCard();
            if (drawnCard) {
                for (const tableauPile of game.tableauPiles) {
                    if (tableauPile.canAddCards(drawnCard)) {
                        game.wastePile.removeCard();
                        tableauPile.addCard(drawnCard);
                        break;
                    }
                }
            }
        }
        game.stockPile.refillFromWaste();
        testRun++;
        game.displayGameState();
    }
};
moveCards();
