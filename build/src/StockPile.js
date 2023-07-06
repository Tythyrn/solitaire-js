"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pile_1 = __importDefault(require("./Pile"));
class StockPile extends Pile_1.default {
    wastePile;
    constructor(wastePile) {
        super();
        this.wastePile = wastePile;
    }
    drawCard() {
        const card = this.removeCard();
        if (card) {
            card.flip();
            this.wastePile.addCard(card);
        }
        return card;
    }
    refillFromWaste() {
        while (!this.wastePile.isEmpty()) {
            const card = this.wastePile.removeCard();
            if (card) {
                card.flip();
                this.addCard(card);
            }
        }
    }
}
exports.default = StockPile;
