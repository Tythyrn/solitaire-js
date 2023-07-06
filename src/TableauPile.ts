import Pile from "./Pile";
import Card from "./Card";

export default class TableauPile extends Pile {
    public getTopFaceUpCard(): Card | undefined {
        const topCard = this.getTopCard();

        if (topCard && topCard.flipped) {
            return topCard;
        }

        return undefined;
    }

    public flipTopCard(): void {
        const topCard = this.getTopCard();

        if (topCard && !topCard.flipped) {
            topCard.flip();
        }
    }

    public canAddCard(card: Card): boolean {
    if (this.isEmpty()) {
            return card.numericalValue === 13; // Only accept King when the pile is empty
        }

        const topCard = this.getTopFaceUpCard();
        return topCard !== undefined && card.color !== topCard.color && card.numericalValue === topCard.numericalValue - 1;
    }

    public canMoveSequence(cards: Card[]): boolean {
        if (cards.length === 0) {
            return false;
        }

        const topCard = this.getTopFaceUpCard();
        if (topCard === undefined) {
            return true;
        }

        const lastCard = cards[cards.length - 1];
        return lastCard.color !== topCard.color && lastCard.numericalValue === topCard.numericalValue - 1;
    }

    getCard(index: number): Card {
        return this.cards[index];
    }
}