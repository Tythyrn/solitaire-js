"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pile_1 = __importDefault(require("./Pile"));
class TableauPile extends Pile_1.default {
    flippedCards;
    constructor() {
        super();
        this.flippedCards = [];
    }
    addCard(card) {
        super.addCard(card);
        if (card && card.flipped) {
            this.flippedCards.push(card);
        }
    }
    getTopFaceUpCard() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].flipped) {
                return this.cards[i];
            }
        }
        return undefined;
    }
    removeCard() {
        const removedCard = super.removeCard();
        const nextCard = this.getTopCard();
        if (nextCard) {
            nextCard.flip();
            this.flippedCards.push(nextCard);
        }
        return removedCard;
    }
    canMoveSequence(cards) {
        if (cards.length === 0) {
            return false;
        }
        const leadingCard = cards[0];
        const topCard = this.getTopCard();
        if (topCard === undefined) {
            if (leadingCard.numericalValue === 13)
                return true;
            return false;
        }
        return leadingCard.color !== topCard.color && leadingCard.numericalValue === topCard.numericalValue - 1;
    }
    moveSequence(cards) {
        if (!this.canMoveSequence(cards)) {
            return false;
        }
        for (const card of cards) {
            this.cards.push(card);
            this.flippedCards.push(card);
        }
        return true;
    }
    getCard(index) {
        return this.cards[index];
    }
}
exports.default = TableauPile;
