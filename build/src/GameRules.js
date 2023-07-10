"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameRules {
    game;
    previousStates;
    constructor(game) {
        this.game = game;
        this.previousStates = new Set();
    }
    solve() {
        this.makeMove();
    }
    async makeMove() {
        const moveTypes = [
            this.moveCardsFromStockToFoundation,
            this.moveCardsfromTableauToFoundation,
            this.moveCardsBetweenTableaus,
            this.moveCardsFromStockToTableaus,
            this.moveCardsFromFoundationToTableau,
        ];
        for (const moveType of moveTypes) {
            const currentState = this.game.getCurrentState();
            const moveMade = moveType.call(this);
            if (moveMade) {
                const newState = this.game.getCurrentState();
                if (this.previousStates.has(newState)) {
                    console.log("found previous state. No more moves possible");
                    break;
                }
                else {
                    if (this.game.checkForWin()) {
                        console.log("Game Won!");
                        break;
                    }
                    this.previousStates.add(newState);
                    await new Promise((resolve) => setTimeout(resolve, 250));
                    await this.makeMove();
                }
            }
        }
    }
    moveCardsFromStockToFoundation() {
        this.game.stockPile.refillFromWaste();
        //Check if any cards can be moved from stock to foundation
        while (!this.game.stockPile.isEmpty()) {
            const drawnCard = this.game.stockPile.drawCard();
            if (drawnCard) {
                for (const foundationPile of this.game.foundationPiles) {
                    if (foundationPile.canAddCard(drawnCard)) {
                        this.game.wastePile.removeCard();
                        foundationPile.addCard(drawnCard);
                        this.game.displayGameState();
                        return true;
                    }
                }
            }
        }
        this.game.stockPile.refillFromWaste();
        return false;
    }
    moveCardsfromTableauToFoundation() {
        for (let i = this.game.tableauPiles.length - 1; i >= 0; i--) {
            const currentTableau = this.game.tableauPiles[i];
            //check if user can move the top card from tableau pile to foundation
            const card = currentTableau.getTopCard();
            if (card) {
                for (const foundationPile of this.game.foundationPiles) {
                    if (foundationPile.canAddCard(card)) {
                        foundationPile.addCard(this.game.tableauPiles[i].removeCard());
                        this.game.displayGameState();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    moveCardsBetweenTableaus() {
        for (let i = this.game.tableauPiles.length - 1; i >= 0; i--) {
            const currentTableau = this.game.tableauPiles[i];
            //Check if I can move any cards from one tableau to another
            const flippedCardsIndices = this.game.tableauPiles[i].flippedCardsIndices;
            for (const flippedCardIndex of flippedCardsIndices) {
                for (let j = 0; j < this.game.tableauPiles.length; j++) {
                    if (i === j)
                        continue;
                    if (this.game.tableauPiles[j].canAddCards(currentTableau.cards[flippedCardIndex])) {
                        const removedCards = currentTableau.removeCards(flippedCardIndex);
                        this.game.tableauPiles[j].addCards(removedCards);
                        this.game.displayGameState();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    moveCardsFromStockToTableaus() {
        this.game.stockPile.refillFromWaste();
        //Check if any card can be moved from the stock to the tableaus
        while (!this.game.stockPile.isEmpty()) {
            const drawnCard = this.game.stockPile.drawCard();
            if (drawnCard) {
                for (const tableauPile of this.game.tableauPiles) {
                    if (tableauPile.canAddCards(drawnCard)) {
                        this.game.wastePile.removeCard();
                        tableauPile.addCard(drawnCard);
                        this.game.displayGameState();
                        return true;
                    }
                }
            }
        }
        this.game.stockPile.refillFromWaste();
        return false;
    }
    moveCardsFromFoundationToTableau() {
        for (const foundationPile of this.game.foundationPiles) {
            const topCard = foundationPile.getTopCard();
            if (topCard) {
                for (const tableauPile of this.game.tableauPiles) {
                    if (tableauPile.canAddCards(topCard)) {
                        const removedCard = foundationPile.removeCard();
                        tableauPile.addCard(removedCard);
                        this.game.displayGameState();
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
exports.default = GameRules;
