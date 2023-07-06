"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    suit;
    value;
    _color;
    _numericalValue;
    _flipped;
    constructor(suit, value, numericalValue) {
        this.suit = suit;
        this.value = value;
        this._color = suit === 'H' || suit === 'D' ? 'red' : 'black';
        this._numericalValue = numericalValue;
        this._flipped = false;
    }
    get flipped() {
        return this._flipped;
    }
    get color() {
        return this._color;
    }
    get numericalValue() {
        return this._numericalValue;
    }
    flip() {
        this._flipped = !this._flipped;
    }
    //adds the ANSI color to the card. The last value is the reset color value
    displayCard() {
        if (this.flipped) {
            return `${this._color === 'red' ? '\x1b[38;5;196m' : '\x1b[38;5;7m'}${this.value.length !== 2 ? this.value + ' ' : this.value}${this.suit}\x1b[0m`;
        }
        return `\x1b[38;5;25m* *\x1b[0m`;
    }
}
exports.default = Card;
