import Pile from "./Pile";
import Card from "./Card";

export default class FoundationPile extends Pile {
    readonly suit: string;

    constructor(suit: string) {
        super();
        this.suit = suit;
    }

    public canAddCard(card: Card): boolean {
        if(this.isEmpty()) {
            return card.numericalValue === 1 && card.suit === this.suit;
        }

        const topCard = this.getTopCard();
        return topCard !== undefined && 
            card.suit === this.suit && 
            card.numericalValue === topCard.numericalValue + 1;
    }
}