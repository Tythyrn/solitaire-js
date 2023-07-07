import Pile from "./Pile";
import Card from "./Card";

export default class TableauPile extends Pile {
    private flippedCards: Array<Card>

    constructor() {
        super();
        this.flippedCards = [];
    }

    public addCard(card: Card | undefined): void {
        super.addCard(card);
        
        if (card && card.flipped) {
            this.flippedCards.push(card);
        }
    }

    public getTopFaceUpCard(): Card | undefined {
        for (let i = 0; i < this.cards.length; i++) {

            if (this.cards[i].flipped) {
                return this.cards[i];
            }
        }

        return undefined;
    }

    public removeCard(): Card | undefined {
        const removedCard = super.removeCard();
        const nextCard = this.getTopCard();

        
        
        if(nextCard) {
            nextCard.flip();
            this.flippedCards.push(nextCard);
        }

        return removedCard;
    }

    public canMoveSequence(cards: Card[]): boolean {
        if (cards.length === 0) {
            return false
        }

        const leadingCard = cards[0];

        const topCard = this.getTopCard();
        if (topCard === undefined) {
            if(leadingCard.numericalValue === 13) return true;
            return false;
        }
        
        return leadingCard.color !== topCard.color && leadingCard.numericalValue === topCard.numericalValue - 1;
    }

    public moveSequence(cards: Card[]): boolean {
        if (!this.canMoveSequence(cards)) {
            return false;
        }

        for (const card of cards) {
            this.cards.push(card);
            this.flippedCards.push(card);
        }

        return true;
    }

    getCard(index: number): Card {
        return this.cards[index];
    }
}