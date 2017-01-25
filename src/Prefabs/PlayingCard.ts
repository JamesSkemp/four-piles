module GameIdea45Project {
	export class PlayingCard extends Phaser.Sprite {
		card: Card;

		constructor(game: Phaser.Game, x: number, y: number, card: Card, deckBackId: number = 0) {
			super(game, x, y, 'cardBacks', deckBackId);

			this.card = card;
			this.anchor.set(0.5);
			this.inputEnabled = true;

			//console.log(this.card);

			if (this.card) {
				this.loadTexture(this.card.getCardKeyName());
			}

			game.add.existing(this);
		}
	}
}