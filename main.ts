import Card from "./src/Card";
import Game from "./src/Game";
import TableauPile from "./src/TableauPile";

const game = new Game();
let testRun = 0;

while(testRun <= 10) {
    game.displayGameState();

    //check if user can move the top card from tableau pile to foundation
    for(const tableauPile of game.tableauPiles) {
        const card = tableauPile.getTopCard();

        if(card) {
            for(const foundationPile of game.foundationPiles) {
                if(foundationPile.canAddCard(card)) {
                    foundationPile.addCard(tableauPile.removeCard());
                    break;
                }
            }
        }
    }

    // for(const tableauPile of game.tableauPiles) {
    //     for(const card of tableauPile.cards) {
    //         if(card.flipped) console.log(card)
    //     }
    // }

    testRun++;
}

game.displayGameState();