import Deck from "./Deck";
import FoundationPile from "./FoundationPile";
import TableauPile from "./TableauPile";
import StockPile from "./StockPile";
import WastePile from "./WastePile";
import Card from "./Card";
import GameRenderer from "./GameRenderer";

export default class Game {
    private deck: Deck;
    public tableauPiles: Array<TableauPile>
    public foundationPiles: Array<FoundationPile>
    readonly stockPile: StockPile;
    public wastePile: WastePile;

    constructor() {
        this.deck = new Deck();
        this.wastePile = new WastePile();
        this.stockPile = new StockPile(this.wastePile);
        this.tableauPiles = [];
        this.foundationPiles = [];
        this.initializeGame();
    }

    private initializeGame() {
        this.initializeTableauPiles();
        this.initializeFoundationPiles();
        this.dealCards();
        this.initializeStockPile();
    }

    private initializeTableauPiles() {
        for (let i = 0; i < 7; i++) {

            const tableauPile = new TableauPile()
            this.tableauPiles.push(tableauPile);
        }
    }

    private initializeFoundationPiles() {
        for (let i = 0; i < 4; i++) {
            const suits = ['H', 'D', 'C', 'S'];

            const foundationPile = new FoundationPile(suits[i])
            this.foundationPiles.push(foundationPile);
        }
    }

    private initializeStockPile() {
        const remainingCards = this.deck.moveRemainingCards();

        for(let i = 0; i < remainingCards.length; i++) {
            this.stockPile.addCard(remainingCards[i]);
        }
    }

    private dealCards() {
        const tableauPileCount = this.tableauPiles.length;

        //deal a card to each pile, making sure to flip the first card
        for(let i = 0; i < tableauPileCount; i++) {

            for(let j = i; j < tableauPileCount; j++) {
                const card = this.deck.dealCard();

                if(card) {
                    if(i === j){
                        card.flip();
                    }

                    this.tableauPiles[j].addCard(card);
                }
            }
        }
    }

    public checkForWin(): boolean {
        for(const tableauPile of this.tableauPiles) {
            if (tableauPile.cards.length !== 0) return false
        }

        if(this.stockPile.cards.length !== 0) return false;

        if(this.wastePile.cards.length !== 0) return false;

        for(const foundationPile of this.foundationPiles) {
            if(foundationPile.cards.length !== 13) return false;

            for(let i = 0; i < foundationPile.cards.length; i++) {
                if (foundationPile.cards[0].numericalValue !== i + 1) return false;
            }
        }

        return true;
    }

    public displayGameState(): void {
        GameRenderer.renderGameState(this.tableauPiles, this.foundationPiles, this.stockPile, this.wastePile);
    }

    getGameState(): any {
        // Retrieve the current state of the game
        const foundationStates = this.foundationPiles.map((foundationPile) =>
          foundationPile.cards
        );
        const stockState = this.stockPile.cards;
        const tableauStates = this.tableauPiles.map((tableauPile) =>
          tableauPile.cards
        );
        const wasteState = this.wastePile.cards;
    
        return {
          foundationPiles: foundationStates,
          stockPile: stockState,
          tableauPiles: tableauStates,
          wastePile: wasteState,
        };
      }

}
