module GameIdea45Project {
	export class Deck {
		suits: Suit[] = [];
		ranks: Rank[] = [];

		cards: Card[] = [];

		constructor() {
		}

		addStandardCards() {
			this.suits = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];
			this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];

			this.cards = [];

			this.suits.forEach((suit) => 
				this.ranks.forEach((rank) => 
					this.cards.push(new Card(rank, suit))
				)
			);
		}

		toString(): string {
			return this.cards.join('\n');
		}
	}
}