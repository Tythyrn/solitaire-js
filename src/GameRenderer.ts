import TableauPile from "./TableauPile";
import FoundationPile from "./FoundationPile";
import StockPile from "./StockPile";
import WastePile from "./WastePile";
import Card from "./Card";

export default class GameRenderer {
    public static renderGameState(tableauPiles: TableauPile[], foundationPiles: FoundationPile[], stockPile: StockPile, wastePile: WastePile): void {
        console.clear();
        
        // Display the foundation piles
        console.log("--- Foundation Piles ---");
        for (let i = 0; i < foundationPiles.length; i++) {
            const topCard = foundationPiles[i].getTopCard();
            console.log(`Foundation ${i + 1}: ${topCard ? topCard.displayCard() : ""}`);
        }
        
        // Display the tableau piles
        const longestTableau = this.getLongestTableau(tableauPiles);
        const tableauRowCount = longestTableau ? longestTableau.length : 0;

        for (let i = 0; i < tableauRowCount; i++) {
            let row = "";

            for (let j = 0; j < tableauPiles.length; j++) {
                const pile = tableauPiles[j];
                const cards = pile.cards;
                const card = cards[i];

                row += card ? `${card.displayCard()}  ` : "     "; // Adjust the spacing based on your card display format
            }
            console.log(row);
        }
        
        // Display the stock pile
        console.log("\n--- Stock Pile ---");
        const stockCard = stockPile.getTopCard();
        console.log(`Top Card: ${stockCard ? stockCard.displayCard() : ""}`);

        // Display the waste pile
        console.log("\n--- Waste Pile ---");
        const wasteCard = wastePile.getTopCard();
        console.log(`Top Card: ${wasteCard ? wasteCard.displayCard() : ""}`);
    }
    static getLongestTableau(tableauPiles: TableauPile[]) {
        let longestTableau: Card[] | undefined;

        for (let i = 0; i < tableauPiles.length; i++) {
            const pile = tableauPiles[i];
            const cards = pile.cards;

            if (!longestTableau || cards.length > longestTableau.length) {
                longestTableau = cards;
            }
        }

        return longestTableau;
    }
}
