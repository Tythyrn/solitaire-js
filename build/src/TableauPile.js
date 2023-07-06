"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pile_1 = __importDefault(require("./Pile"));
class TableauPile extends Pile_1.default {
    getTopFaceUpCard() {
        const topCard = this.getTopCard();
        if (topCard && topCard.flipped) {
            return topCard;
        }
        return undefined;
    }
    flipTopCard() {
        const topCard = this.getTopCard();
        if (topCard && !topCard.flipped) {
            topCard.flip();
        }
    }
    canAddCard(card) {
        if (this.isEmpty()) {
            return card.numericalValue === 13; // Only accept King when the pile is empty
        }
        const topCard = this.getTopFaceUpCard();
        return topCard !== undefined && card.color !== topCard.color && card.numericalValue === topCard.numericalValue - 1;
    }
    canMoveSequence(cards) {
        if (cards.length === 0) {
            return false;
        }
        const topCard = this.getTopFaceUpCard();
        if (topCard === undefined) {
            return true;
        }
        const lastCard = cards[cards.length - 1];
        return lastCard.color !== topCard.color && lastCard.numericalValue === topCard.numericalValue - 1;
    }
    getCard(index) {
        return this.cards[index];
    }
}
exports.default = TableauPile;
