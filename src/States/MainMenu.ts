﻿module GameIdea45Project {
	export class MainMenu extends Phaser.State {
		mainDeck: Phaser.Sprite;
		mainDeckTween: Phaser.Tween;
		mainTitle: Phaser.Text;
		helpText: Phaser.Text;
		subText: Phaser.Text;

		create() {
			console.log((new Date).toISOString() + ' : Entered MainMenu create()');

			// Handle user input as needed.
			this.mainDeck = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cardBacks', Game.DECK_BACK_ID);
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

			var baseTextStyle = { font: 'Arial', fontSize: '80px', fill: '#fff' };
			// Add main title.
			this.mainTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY / 3, "Four Piles", baseTextStyle);
			this.mainTitle.x -= this.mainTitle.width / 2;
			this.mainTitle.y -= this.mainTitle.height / 2;
			// Add help text.
			this.helpText = this.game.add.text(this.game.world.centerX, this.game.world.centerY * 1.5, "Click the Deck to Begin", baseTextStyle);
			this.helpText.fontSize = '30px';
			this.helpText.x -= this.helpText.width / 2;
			this.helpText.y -= this.helpText.height / 2;
			// Add developer name information.
			this.subText = this.game.add.text(this.game.world.width / 10, this.game.world.centerY * 1.75, 'Developed by James Skemp, jamesrskemp.com', baseTextStyle);
			this.subText.fontSize = '20px';
		}

		startGame() {
			this.mainDeckTween.start();
		}
	}
}