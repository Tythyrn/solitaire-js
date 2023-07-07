"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./src/Card"));
const TableauPile_1 = __importDefault(require("./src/TableauPile"));
const tableau1 = new TableauPile_1.default();
tableau1.moveSequence([
    new Card_1.default('H', 'K', 13),
    new Card_1.default('S', 'Q', 12),
    new Card_1.default('H', 'J', 11),
    new Card_1.default('C', '10', 10)
]);
tableau1.cards[tableau1.cards.length - 1].flip();
for (const card of tableau1.cards) {
    console.log(card.displayCard());
}
// while(testRun <= 10) {
//     game.displayGameState();
//     //check if user can move the top card from tableau pile to foundation
//     for(const tableauPile of game.tableauPiles) {
//         const card = tableauPile.getTopCard();
//         if(card) {
//             for(const foundationPile of game.foundationPiles) {
//                 if(foundationPile.canAddCard(card)) {
//                     foundationPile.addCard(tableauPile.removeCard());
//                     break;
//                 }
//             }
//         }
//     }
//     for(const tableauPile of game.tableauPiles) {
//         for(const card of tableauPile.cards) {
//             if(card.flipped) console.log(card)
//         }
//     }
//     testRun++;
// }
// game.displayGameState();
