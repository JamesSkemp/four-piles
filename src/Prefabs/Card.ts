module GameIdea45Project {
	export class Card {
		rank: Rank;
		suit: Suit;

		constructor(rank: Rank, suit: Suit) {
			this.rank = rank;
			this.suit = suit;
		}

		getCardKeyName(): string {
			return 'card' + Suit[this.suit] + this.rank;
		}

		toString() : string {
			return Rank[this.rank] + " of " + Suit[this.suit];
		}
	}
}