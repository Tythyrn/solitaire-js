import Card from "./Card";

export default class Deck {
    private cards: Array<Card>;

    constructor() {
        this.cards = [];
        this.initializeDeck();
        this.shuffle();
    }

    private initializeDeck(): void {
        const suits = ['H', 'D', 'C', 'S'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                const suit = suits[i];
                const rank = ranks[j];
                const numericalValue = j + 1;

                const card = new Card(suit, rank, numericalValue);
                this.cards.push(card);
            }
        }
    } 

    //Fisher-Yates shuffle that decrements down the length of the deck and swaps two cards every time
    public shuffle(): void {
        let randomIndex: number;
        let temp: Card;

        for(let i = this.cards.length - 1; i >= 0; i--) {
            randomIndex = Math.floor(Math.random() * i);

            temp = this.cards[i];
            this.cards[i] = this.cards[randomIndex];
            this.cards[randomIndex] = temp;
        }
    }

    public moveRemainingCards() {
        const temp = this.cards;
        this.cards = [];
        return temp;
    }

    public dealCard(): Card | undefined {
        return this.cards.pop();
    }

    public reset(): void {
        this.cards = [];
        this.initializeDeck();
        this.shuffle();
    }
    
}