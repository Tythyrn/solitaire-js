import Pile from "./Pile";
import Card from "./Card";

export default class TableauPile extends Pile {
    readonly flippedCardsIndices: Number[]

    constructor() {
        super();
        this.flippedCardsIndices = [];
    }

    public addCard(card: Card | undefined): void {
        super.addCard(card);
        
        if (card && card.flipped) {
            this.flippedCardsIndices.push(this.cards.length - 1);
        }
    }

    public addCards(cards: Card[]):void {
        if(cards !== undefined) {
            for(const card of cards) {
                this.addCard(card);
            }
        }
    }

    public removeCard(): Card | undefined {
        const removedCard = super.removeCard();
        this.flippedCardsIndices.pop();

         //if the top card is not flipped, flip it
         const nextCard = this.getTopCard();

         if(nextCard && !nextCard.flipped){
             nextCard.flip();
             this.flippedCardsIndices.push(this.cards.length - 1);
         }

        return removedCard;
    }

    //remove cards from the tableau to be added to another tableau
    public removeCards(startingIndex: number): Card[] {
        //remove the cards
        const removedCards = this.cards.splice(startingIndex);
        this.flippedCardsIndices.splice(this.flippedCardsIndices.indexOf(startingIndex));

        //if the top card is not flipped, flip it
        const nextCard = this.getTopCard();

        if(nextCard && !nextCard.flipped){
            nextCard.flip();
            this.flippedCardsIndices.push(this.cards.length - 1);
        }

        return removedCards;
    }

    public canAddCards(card: Card): boolean {
        if(this.isEmpty()) {
            return card.numericalValue === 13; //Check if it is a King
        }

        const topCard = this.getTopCard();
        return topCard !== undefined && 
            card.color !== topCard.color && 
            card.numericalValue === topCard.numericalValue - 1;
    }

    public canRemoveCards(startingIndex: Number): boolean {
        //if index is not there it will return -1 which means you can't remove it
        return this.flippedCardsIndices.indexOf(startingIndex) !== -1;
    }

}