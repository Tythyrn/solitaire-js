export default class Card {
    readonly suit: string;
    private value: string;
    private _color: string;
    private _numericalValue: number;
    private _flipped: boolean;

    constructor(suit: string, value: string, numericalValue: number) {
        this.suit = suit;
        this.value = value;
        this._color = suit === 'H' || suit === 'D' ? 'red' : 'black';
        this._numericalValue = numericalValue;
        this._flipped = false;
    }

    get flipped(): boolean {
        return this._flipped
    }

    get color(): string {
        return this._color
    }

    get numericalValue(): number {
        return this._numericalValue
    }

    flip() {
        this._flipped = !this._flipped
    }

    //adds the ANSI color to the card. The last value is the reset color value
    displayCard(){
        if(this.flipped){
            return `${this._color === 'red' ? '\x1b[38;5;196m' : '\x1b[38;5;7m'}${this.value.length !== 2 ? this.value + ' ' : this.value}${this.suit}\x1b[0m`
        }
        
        return `\x1b[38;5;25m* *\x1b[0m`
    }
}