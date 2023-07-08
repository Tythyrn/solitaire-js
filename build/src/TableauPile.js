"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pile_1 = __importDefault(require("./Pile"));
class TableauPile extends Pile_1.default {
    flippedCardsIndices;
    constructor() {
        super();
        this.flippedCardsIndices = [];
    }
    addCard(card) {
        super.addCard(card);
        if (card && card.flipped) {
            this.flippedCardsIndices.push(this.cards.length - 1);
        }
    }
    addCards(cards) {
        if (cards !== undefined) {
            for (const card of cards) {
                this.addCard(card);
            }
        }
    }
    removeCard() {
        const removedCard = super.removeCard();
        this.flippedCardsIndices.pop();
        //if the top card is not flipped, flip it
        const nextCard = this.getTopCard();
        if (nextCard && !nextCard.flipped) {
            nextCard.flip();
            this.flippedCardsIndices.push(this.cards.length - 1);
        }
        return removedCard;
    }
    //remove cards from the tableau to be added to another tableau
    removeCards(startingIndex) {
        //remove the cards
        const removedCards = this.cards.splice(startingIndex);
        this.flippedCardsIndices.splice(this.flippedCardsIndices.indexOf(startingIndex));
        //if the top card is not flipped, flip it
        const nextCard = this.getTopCard();
        if (nextCard && !nextCard.flipped) {
            nextCard.flip();
            this.flippedCardsIndices.push(this.cards.length - 1);
        }
        return removedCards;
    }
    canAddCards(card) {
        if (this.isEmpty()) {
            return card.numericalValue === 13; //Check if it is a King
        }
        const topCard = this.getTopCard();
        return topCard !== undefined &&
            card.color !== topCard.color &&
            card.numericalValue === topCard.numericalValue - 1;
    }
    canRemoveCards(startingIndex) {
        //if index is not there it will return -1 which means you can't remove it
        return this.flippedCardsIndices.indexOf(startingIndex) !== -1;
    }
}
exports.default = TableauPile;
