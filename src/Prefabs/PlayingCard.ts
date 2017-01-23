module GameIdea45Project {
	export class PlayingCard extends Phaser.Sprite {
		card: Card;

		constructor(game: Phaser.Game, x: number, y: number, card: Card, deckBackId: number = 0) {
			super(game, x, y, 'cardBacks', deckBackId);

			this.card = card;
			this.anchor.set(0.5);
			this.inputEnabled = true;

			console.log(this.card);

			if (this.card) {
				this.loadTexture('card' + Suit[this.card.suit] + this.card.rank);
			}

			game.add.existing(this);

			/*if (
				card.rank >= Rank.Ace && card.rank <= Rank.King
				&& card.suit >= Suit.Spades && card.suit <= Suit.Diamonds
			) {
				
			}*/
		}


	}
}