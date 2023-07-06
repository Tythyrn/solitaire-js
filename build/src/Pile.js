"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pile {
    _cards;
    constructor() {
        this._cards = [];
    }
    get cards() {
        return this._cards;
    }
    addCard(card) {
        if (card !== undefined) {
            this._cards.push(card);
        }
    }
    removeCard() {
        return this._cards.length > 0 ? this._cards.pop() : undefined;
    }
    getTopCard() {
        return this._cards.length > 0 ? this._cards[this._cards.length - 1] : undefined;
    }
    isEmpty() {
        return this._cards.length === 0;
    }
}
exports.default = Pile;
