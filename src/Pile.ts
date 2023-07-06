import Card from "./Card";

export default class Pile {
    protected _cards: Array<Card>

    constructor() {
        this._cards = [];
    }

    get cards() {
        return this._cards;
    }

    public addCard(card: Card | undefined): void {
        if(card !== undefined) {
            this._cards.push(card);
        }
    }

    public removeCard(): Card | undefined {
        return this._cards.length > 0 ? this._cards.pop() : undefined;
    }

    public getTopCard(): Card | undefined {
        return this._cards.length > 0 ? this._cards[this._cards.length - 1] : undefined;
    }

    public isEmpty(): boolean {
        return this._cards.length === 0;
    }
}