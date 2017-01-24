module GameIdea45Project {
	export class MainGame extends Phaser.State {
		firstCardPileX: number;
		secondCardPileX: number;
		thirdCardPileX: number;
		fourthCardPileX: number;
		cardPileY: number;
		playerCardPileY: number;

		deckCardPile: Phaser.Point;

		deckBackId: number = 10;

		firstPile: CardPile;
		secondPile: CardPile;
		thirdPile: CardPile;
		fourthPile: CardPile;
		// TODO switch next two (or three?) to CardPile
		leftPlayerCardPile: Phaser.Sprite;
		rightPlayerCardPile: Phaser.Sprite;
		mainDeckCardPile: Phaser.Sprite;
		temporaryCard: Phaser.Sprite;

		availableCards: Phaser.Group;

		pileSetupStarted: boolean = false;

		deck: Deck;

		init() {
			console.log((new Date).toISOString() + ' : Entered MainGame init()');
			// init can receive parameters.

			this.firstCardPileX = this.game.world.width / 8;
			this.secondCardPileX = this.firstCardPileX * 3;
			this.thirdCardPileX = this.firstCardPileX * 5;
			this.fourthCardPileX = this.firstCardPileX * 7;
			this.cardPileY = this.game.world.centerY / 2;
			this.playerCardPileY = this.game.world.centerY * 1.5;

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

			this.firstPile = new CardPile(this.game, this.deckCardPile.x, -this.cardPileY, this.deckBackId, true, true);
			this.firstPile.setupTween = this.game.add.tween(this.firstPile);
			this.firstPile.setupTween.to({ x: this.firstCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.secondPile = new CardPile(this.game, this.deckCardPile.x, -this.cardPileY, this.deckBackId, true, true);
			this.secondPile.setupTween = this.game.add.tween(this.secondPile);
			this.secondPile.setupTween.to({ x: this.secondCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.thirdPile = new CardPile(this.game, this.deckCardPile.x, -this.cardPileY, this.deckBackId, true, true);
			this.thirdPile.setupTween = this.game.add.tween(this.thirdPile);
			this.thirdPile.setupTween.to({ x: this.thirdCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.fourthPile = new CardPile(this.game, this.deckCardPile.x, -this.cardPileY, this.deckBackId, true, true);
			this.fourthPile.setupTween = this.game.add.tween(this.fourthPile);
			this.fourthPile.setupTween.to({ x: this.fourthCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.leftPlayerCardPile = this.game.add.sprite(this.firstCardPileX, this.playerCardPileY, 'cardBacks', this.deckBackId);
			this.leftPlayerCardPile.visible = false;
			this.leftPlayerCardPile.anchor.set(0.5);
			
			this.rightPlayerCardPile = this.game.add.sprite(this.fourthCardPileX, this.playerCardPileY, 'cardBacks', this.deckBackId);
			this.rightPlayerCardPile.visible = false;
			this.rightPlayerCardPile.anchor.set(0.5);

			this.mainDeckCardPile = new CardPile(this.game, this.deckCardPile.x, this.deckCardPile.y, this.deckBackId, false, false);
			this.mainDeckCardPile.events.onInputDown.add(this.setupPiles, this);

			this.deck = new Deck();
			this.deck.createStandardDeck();
			console.log(this.deck.toString());

			this.deck.shuffle();
			console.log(this.deck.toString());

			this.availableCards = this.game.add.group();
			this.availableCards.classType = PlayingCard;
			//for (var i = 0; i < this.deck.cards.length; i++) {
			for (var i = this.deck.cards.length - 1; i >= 0; i--) {
				console.log(i);
				this.availableCards.add(new PlayingCard(this.game, this.deckCardPile.x, 0 + (i * 5), this.deck.cards[i], this.deckBackId));
			}

			//this.availableCards.createMultiple(this.deck.cards.length, 'cardBacks' + this.deckBackId);


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

		setupPiles() {
			//console.log(arguments);
			if (!this.pileSetupStarted) {
				this.pileSetupStarted = true;

				console.log("Setting up piles.");
				this.mainDeckCardPile.inputEnabled = false;

				// Create a new temporary card to move around the screen.
				this.temporaryCard = new PlayingCard(this.game, this.mainDeckCardPile.x, this.mainDeckCardPile.y, null, this.deckBackId);

				var topCard = this.deck.drawCard();

				var tweenToFirstPile = this.game.add.tween(this.temporaryCard);
				tweenToFirstPile.to({ y: -this.temporaryCard.height }, 1000, Phaser.Easing.Linear.None);
				tweenToFirstPile.onComplete.addOnce(() => {
					this.firstPile.addCard(topCard);
					this.firstPile.setupTween.start();
					this.temporaryCard.visible = false;
					this.temporaryCard.position = this.mainDeckCardPile.position;
					this.temporaryCard.loadTexture('cardBacks', this.deckBackId);
					this.temporaryCard.visible = true;
				});

				var tweenToSecondPile = this.game.add.tween(this.temporaryCard);
				tweenToSecondPile.to({ y: -this.temporaryCard.height }, 1000, Phaser.Easing.Linear.None);
				tweenToSecondPile.onComplete.addOnce(() => {
					topCard = this.deck.drawCard();
					this.secondPile.addCard(topCard);
					this.secondPile.setupTween.start();

					this.temporaryCard.visible = false;
					this.temporaryCard.position = this.mainDeckCardPile.position;
					this.temporaryCard.loadTexture('cardBacks', this.deckBackId);
					this.temporaryCard.visible = true;
					console.log(this.temporaryCard);
				});

				var tweenToThirdPile = this.game.add.tween(this.temporaryCard);
				tweenToThirdPile.to({ y: -this.temporaryCard.height }, 1000, Phaser.Easing.Linear.None);
				tweenToThirdPile.onComplete.addOnce(() => {
					topCard = this.deck.drawCard();
					this.thirdPile.addCard(topCard);
					this.thirdPile.setupTween.start();

					this.temporaryCard.visible = false;
					this.temporaryCard.position = this.mainDeckCardPile.position;
					this.temporaryCard.loadTexture('cardBacks', this.deckBackId);
					this.temporaryCard.visible = true;
					console.log(this.temporaryCard);
				});

				var tweenToFourthPile = this.game.add.tween(this.temporaryCard);
				tweenToFourthPile.to({ y: -this.temporaryCard.height }, 1000, Phaser.Easing.Linear.None);
				tweenToFourthPile.onComplete.addOnce(() => {
					topCard = this.deck.drawCard();
					this.fourthPile.addCard(topCard);
					this.fourthPile.setupTween.start();

					this.temporaryCard.visible = false;
					this.temporaryCard.position = this.mainDeckCardPile.position;
					this.temporaryCard.loadTexture('cardBacks', this.deckBackId);
					this.temporaryCard.visible = true;
					console.log(this.temporaryCard);
				});

				//tweenToFirstPile.chain(tweenToSecondPile.chain(tweenToThirdPile.chain(tweenToFourthPile)));

				tweenToFirstPile.start();

			//this.temporaryCard = new PlayingCard(this.game, this.mainDeckCardPile.x, this.mainDeckCardPile.y, null, this.deckBackId);
			//this.temporaryCard = new PlayingCard(this.game, this.mainDeckCardPile.x, this.mainDeckCardPile.y, newDeck.cards[0], this.deckBackId);
			//this.game.world.bringToTop(this.temporaryCard);
			//console.log(this.temporaryCard.key);


				this.mainDeckCardPile.events.onInputDown.remove(this.setupPiles);

				//this.mainDeckCardPile.visible = false;
			}

		}
	}
}