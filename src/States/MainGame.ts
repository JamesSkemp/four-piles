module GameIdea45Project {
	export class MainGame extends Phaser.State {
		firstCardPileX: number;
		secondCardPileX: number;
		thirdCardPileX: number;
		fourthCardPileX: number;
		cardPileY: number;
		playerCardPileY: number;

		firstCardPile: Phaser.Point;
		secondCardPile: Phaser.Point;
		thirdCardPile: Phaser.Point;
		fourthCardPile: Phaser.Point;
		deckCardPile: Phaser.Point;

		deckBackId: number = 10;

		firstPile: Phaser.Sprite;
		secondPile: Phaser.Sprite;
		thirdPile: Phaser.Sprite;
		fourthPile: Phaser.Sprite;
		leftPlayerCardPile: Phaser.Sprite;
		rightPlayerCardPile: Phaser.Sprite;
		mainDeckCardPile: Phaser.Sprite;
		temporaryCard: Phaser.Sprite;

		init() {
			console.log((new Date).toISOString() + ' : Entered MainGame init()');
			// init can receive parameters.

			this.firstCardPileX = this.game.world.width / 8;
			this.secondCardPileX = this.firstCardPileX * 3;
			this.thirdCardPileX = this.firstCardPileX * 5;
			this.fourthCardPileX = this.firstCardPileX * 7;
			this.cardPileY = this.game.world.centerY / 2;
			this.playerCardPileY = this.game.world.centerY * 1.5;

			this.firstCardPile = new Phaser.Point(this.firstCardPileX, this.cardPileY);
			this.secondCardPile = new Phaser.Point(this.secondCardPileX, this.cardPileY);
			this.thirdCardPile = new Phaser.Point(this.thirdCardPileX, this.cardPileY);
			this.fourthCardPile = new Phaser.Point(this.fourthCardPileX, this.cardPileY);

			this.deckCardPile = new Phaser.Point(this.game.world.centerX, this.playerCardPileY);
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered MainGame preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered MainGame create()');

			this.firstPile = this.game.add.sprite(this.firstCardPile.x, this.firstCardPile.y, 'cardJoker');
			this.firstPile.anchor.set(0.5);

			this.secondPile = this.game.add.sprite(this.secondCardPile.x, this.secondCardPile.y, 'cardJoker');
			this.secondPile.anchor.set(0.5);

			this.thirdPile = this.game.add.sprite(this.thirdCardPile.x, this.thirdCardPile.y, 'cardJoker');
			this.thirdPile.anchor.set(0.5);

			this.fourthPile = this.game.add.sprite(this.fourthCardPile.x, this.fourthCardPile.y, 'cardJoker');
			this.fourthPile.anchor.set(0.5);

			this.leftPlayerCardPile = this.game.add.sprite(this.firstCardPileX, this.playerCardPileY, 'cardBacks', this.deckBackId);
			this.leftPlayerCardPile.visible = false;
			this.leftPlayerCardPile.anchor.set(0.5);
			
			this.rightPlayerCardPile = this.game.add.sprite(this.fourthCardPileX, this.playerCardPileY, 'cardBacks', this.deckBackId);
			this.rightPlayerCardPile.visible = false;
			this.rightPlayerCardPile.anchor.set(0.5);

			this.mainDeckCardPile = this.game.add.sprite(this.deckCardPile.x, this.deckCardPile.y, 'cardBacks', this.deckBackId);
			this.mainDeckCardPile.anchor.set(0.5);

			var exampleCard = new Card(Rank.Ace, Suit.Spades);
			console.log(exampleCard.toString());

			var newDeck = new Deck();
			newDeck.createStandardDeck();
			console.log(newDeck.toString());

			newDeck.shuffle();
			console.log(newDeck.toString());
		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered MainGame paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered MainGame resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered MainGame shutdown()');

		}
	}
}