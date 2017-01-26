module GameIdea45Project {
	export class CardPile extends Phaser.Sprite {
		cards: Card[];
		showTopCard: boolean;
		hideIfEmpty: boolean;
		setupTween: Phaser.Tween;

		constructor(game: Phaser.Game, x: number, y: number, deckBackId: number = 0, showTopCard: boolean = true, hideIfEmpty: boolean = true) {
			super(game, x, y, 'cardBacks', deckBackId);

			this.showTopCard = showTopCard;
			this.hideIfEmpty = hideIfEmpty;

			this.cards = [];
			if (this.hideIfEmpty) {
				this.visible = false;
			}

			this.anchor.set(0.5);
			this.inputEnabled = true;

			game.add.existing(this);
		}

		addCard(card: Card): void {
			this.cards.push(card);

			if (!this.visible) {
				this.visible = true;
			}

			if (this.showTopCard) {
				this.loadTexture(card.getCardKeyName());
			}
			//console.log('New cards: ' + this.cards);
			//console.log(this);
		}
	}
}