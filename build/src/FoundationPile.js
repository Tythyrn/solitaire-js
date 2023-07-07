"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pile_1 = __importDefault(require("./Pile"));
class FoundationPile extends Pile_1.default {
    suit;
    constructor(suit) {
        super();
        this.suit = suit;
    }
    canAddCard(card) {
        if (this.isEmpty()) {
            return card.numericalValue === 1 && card.suit === this.suit;
        }
        const topCard = this.getTopCard();
        return topCard !== undefined && card.suit === this.suit && card.numericalValue === topCard.numericalValue + 1;
    }
}
exports.default = FoundationPile;
