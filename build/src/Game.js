"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = __importDefault(require("./Deck"));
const FoundationPile_1 = __importDefault(require("./FoundationPile"));
const TableauPile_1 = __importDefault(require("./TableauPile"));
const StockPile_1 = __importDefault(require("./StockPile"));
const WastePile_1 = __importDefault(require("./WastePile"));
const GameRenderer_1 = __importDefault(require("./GameRenderer"));
class Game {
    deck;
    tableauPiles;
    foundationPiles;
    stockPile;
    wastePile;
    constructor() {
        this.deck = new Deck_1.default();
        this.wastePile = new WastePile_1.default();
        this.stockPile = new StockPile_1.default(this.wastePile);
        this.tableauPiles = [];
        this.foundationPiles = [];
        this.initializeGame();
    }
    initializeGame() {
        this.initializeTableauPiles();
        this.initializeFoundationPiles();
        this.dealCards();
        this.initializeStockPile();
    }
    initializeTableauPiles() {
        for (let i = 0; i < 7; i++) {
            const tableauPile = new TableauPile_1.default();
            this.tableauPiles.push(tableauPile);
        }
    }
    initializeFoundationPiles() {
        for (let i = 0; i < 4; i++) {
            const suits = ['H', 'D', 'C', 'S'];
            const foundationPile = new FoundationPile_1.default(suits[i]);
            this.foundationPiles.push(foundationPile);
        }
    }
    initializeStockPile() {
        const remainingCards = this.deck.moveRemainingCards();
        for (let i = 0; i < remainingCards.length; i++) {
            this.stockPile.addCard(remainingCards[i]);
        }
    }
    dealCards() {
        const tableauPileCount = this.tableauPiles.length;
        //deal a card to each pile, making sure to flip the first card
        for (let i = 0; i < tableauPileCount; i++) {
            for (let j = i; j < tableauPileCount; j++) {
                const card = this.deck.dealCard();
                if (card) {
                    if (i === j) {
                        card.flip();
                    }
                    this.tableauPiles[j].addCard(card);
                }
            }
        }
    }
    moveCardsFromWasteToStock() {
        if (this.stockPile.isEmpty()) {
            this.stockPile.refillFromWaste();
        }
    }
    displayGameState() {
        GameRenderer_1.default.renderGameState(this.tableauPiles, this.foundationPiles, this.stockPile, this.wastePile);
    }
}
exports.default = Game;
