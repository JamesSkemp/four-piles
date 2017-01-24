module GameIdea45Project {
	export class MainMenu extends Phaser.State {
		mainDeck: Phaser.Sprite;
		mainDeckTween: Phaser.Tween;

		deckBackId: number = 10;

		create() {
			console.log((new Date).toISOString() + ' : Entered MainMenu create()');

			// Handle user input as needed.
			this.mainDeck = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cardBacks', this.deckBackId);
			this.mainDeck.anchor.set(0.5);
			this.mainDeck.inputEnabled = true;

			this.mainDeckTween = this.game.add.tween(this.mainDeck);
			this.mainDeckTween.to({
				y: this.game.world.height + this.mainDeck.height
			}, 1500, Phaser.Easing.Linear.None);
			this.mainDeckTween.onComplete.add(() => {
				this.game.state.start('MainGame');
			});
			
			this.mainDeck.events.onInputDown.add(this.startGame, this);
		}

		startGame() {
			this.mainDeckTween.start();
		}
	}
}