module GameIdea45Project {
	export class Deck {
		suits: Suit[] = [];
		ranks: Rank[] = [];

		cards: Card[] = [];

		constructor() {
		}

		/**
		 * Create standard deck of 52 cards.
		 */
		createStandardDeck(): void {
			this.suits = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];
			this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];

			this.cards = [];

			this.suits.forEach((suit) => 
				this.ranks.forEach((rank) => 
					this.cards.push(new Card(rank, suit))
				)
			);
		}

		shuffle(): void {
			// http://stackoverflow.com/a/12646864/11912
			for (let i = this.cards.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				let swap = this.cards[i];
				this.cards[i] = this.cards[j];
				this.cards[j] = swap;
			}
		}

		drawCard(): Card {
			if (this.cards.length <= 0) {
				return null;
			}

			return this.cards.shift();
		}

		toString(): string {
			return this.cards.join('\n');
		}
	}
}