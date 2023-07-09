import Card from "./Card";
import Pile from "./Pile";
import WastePile from "./WastePile";

export default class StockPile extends Pile {
    private wastePile: WastePile;

    constructor(wastePile: WastePile) {
        super();
        this.wastePile = wastePile;
    }

    public drawCard(): Card | undefined {
        if(this.cards.length <= 0) this.refillFromWaste();

        const card = this.removeCard();
        
        if (card) {
            card.flip();
            this.wastePile.addCard(card);
        }

        return card;
    }

    public refillFromWaste(): void {
        while (!this.wastePile.isEmpty()) {
            const card = this.wastePile.removeCard();

            if (card) {
                card.flip();
                this.addCard(card);
            }
        }
    }
}