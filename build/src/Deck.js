"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./Card"));
class Deck {
    cards;
    numberOfCards;
    constructor() {
        this.cards = [];
        this.numberOfCards = 0;
        this.initializeDeck();
        this.shuffle();
    }
    initializeDeck() {
        const suits = ['H', 'D', 'C', 'S'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                const suit = suits[i];
                const rank = ranks[j];
                const numericalValue = j + 1;
                const card = new Card_1.default(suit, rank, numericalValue);
                this.cards.push(card);
                this.numberOfCards++;
            }
        }
    }
    //Fisher-Yates shuffle that decrements down the length of the deck and swaps two cards every time
    shuffle() {
        let randomIndex;
        let temp;
        for (let i = this.numberOfCards - 1; i >= 0; i--) {
            randomIndex = Math.floor(Math.random() * i);
            temp = this.cards[i];
            this.cards[i] = this.cards[randomIndex];
            this.cards[randomIndex] = temp;
        }
    }
    moveRemainingCards() {
        const temp = this.cards;
        this.cards = [];
        this.numberOfCards = 0;
        return temp;
    }
    dealCard() {
        this.numberOfCards--;
        return this.cards.pop();
    }
    reset() {
        this.cards = [];
        this.numberOfCards = 0;
        this.initializeDeck();
        this.shuffle();
    }
}
exports.default = Deck;
