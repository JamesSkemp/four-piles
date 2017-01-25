module GameIdea45Project {
	export class MainGame extends Phaser.State {
		firstCardPileX: number;
		secondCardPileX: number;
		thirdCardPileX: number;
		fourthCardPileX: number;
		/**
		 * Y position of the top card piles that will be used when playing cards.
		 */
		cardPileY: number;
		/**
		 * Y position of the card piles the players will use.
		 */
		playerCardPileY: number;

		/**
		 * Starting location of cards to be dealt.
		 */
		cardStartingLocation: Phaser.Point;

		deckCardPile: Phaser.Point;

		firstPile: CardPile;
		firstPileCards: Phaser.Group;
		secondPile: CardPile;
		secondPileCards: Phaser.Group;
		thirdPile: CardPile;
		thirdPileCards: Phaser.Group;
		fourthPile: CardPile;
		fourthPileCards: Phaser.Group;
		
		// TODO switch next two (or three?) to CardPile
		leftPlayerCardPile: Phaser.Sprite;
		rightPlayerCardPile: Phaser.Sprite;

		leftPlayerPile: CardPile;
		leftPlayerPileCards: Phaser.Group;
		rightPlayerPile: CardPile;
		rightPlayerPileCards: Phaser.Group;

		temporaryCard: Phaser.Sprite;
		/**
		 * Collection of sprites with deck back shown, for use when dealing cards to piles.
		 */
		temporaryDealingCards: Phaser.Group;
		/**
		 * Collection of PlayingCard, with one for each card in the Deck.
		 */
		availableCards: Phaser.Group;

		/**
		 * Deck with the cards that will be used during the game.
		 */
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

			// Setup the four main piles that cards will be played to.
			this.firstPile = new CardPile(this.game, this.firstCardPileX, this.cardPileY, Game.DECK_BACK_ID, true, true);
			this.firstPileCards = new Phaser.Group(this.game);
			//this.firstPile.setupTween = this.game.add.tween(this.firstPile);
			//this.firstPile.setupTween.to({ x: this.firstCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.secondPile = new CardPile(this.game, this.secondCardPileX, this.cardPileY, Game.DECK_BACK_ID, true, true);
			this.secondPileCards = new Phaser.Group(this.game);
			//this.secondPile.setupTween = this.game.add.tween(this.secondPile);
			//this.secondPile.setupTween.to({ x: this.secondCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.thirdPile = new CardPile(this.game, this.thirdCardPileX, this.cardPileY, Game.DECK_BACK_ID, true, true);
			this.thirdPileCards = new Phaser.Group(this.game);
			//this.thirdPile.setupTween = this.game.add.tween(this.thirdPile);
			//this.thirdPile.setupTween.to({ x: this.thirdCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			this.fourthPile = new CardPile(this.game, this.fourthCardPileX, this.cardPileY, Game.DECK_BACK_ID, true, true);
			this.fourthPileCards = new Phaser.Group(this.game);
			//this.fourthPile.setupTween = this.game.add.tween(this.fourthPile);
			//this.fourthPile.setupTween.to({ x: this.fourthCardPileX, y: this.cardPileY }, 1000, Phaser.Easing.Linear.None);

			// Setup the two piles that player's cards will start in.
			this.leftPlayerPileCards = new Phaser.Group(this.game);
			this.leftPlayerPile = new CardPile(this.game, this.secondCardPileX, this.playerCardPileY, Game.DECK_BACK_ID, true, true);

			this.leftPlayerCardPile = this.game.add.sprite(this.secondCardPileX, this.playerCardPileY, 'cardBacks', Game.DECK_BACK_ID);
			this.leftPlayerCardPile.visible = false;
			this.leftPlayerCardPile.anchor.set(0.5);
			
			this.rightPlayerPileCards = new Phaser.Group(this.game);
			this.rightPlayerPile = new CardPile(this.game, this.thirdCardPileX, this.playerCardPileY, Game.DECK_BACK_ID, true, true);

			this.rightPlayerCardPile = this.game.add.sprite(this.thirdCardPileX, this.playerCardPileY, 'cardBacks', Game.DECK_BACK_ID);
			this.rightPlayerCardPile.visible = false;
			this.rightPlayerCardPile.anchor.set(0.5);

			// Create a new deck of cards.
			this.deck = new Deck();
			this.deck.createStandardDeck();
			console.log(this.deck.toString());
			// Shuffle the cards.
			this.deck.shuffle();
			console.log(this.deck.toString());

			// Where cards will start. This is where the cards went when they were clicked on to start the game from the menu.
			this.cardStartingLocation = new Phaser.Point(this.game.world.centerX, this.game.world.height + this.firstPile.height);

			// Create playing cards for each card in the deck.
			this.availableCards = this.game.add.group();
			this.availableCards.classType = PlayingCard;
			for (var i = this.deck.cards.length - 1; i >= 0; i--) {
				//this.availableCards.add(new PlayingCard(this.game, this.deckCardPile.x, 0 + (i * 5), this.deck.cards[i], Game.DECK_BACK_ID));
				this.availableCards.add(new PlayingCard(this.game, this.cardStartingLocation.x, this.cardStartingLocation.y, this.deck.cards[i], Game.DECK_BACK_ID));
			}

			// Create a stack of back-only cards that will be dealt into the player piles.
			this.temporaryDealingCards = this.game.add.group();
			this.temporaryDealingCards.createMultiple(10, 'cardBacks', Game.DECK_BACK_ID);
			this.temporaryDealingCards.forEach(function(dealingCard: Phaser.Sprite) {
				dealingCard.position.set(this.cardStartingLocation.x, this.cardStartingLocation.y);
				dealingCard.anchor.set(0.5);
			}, this);

			if (this.availableCards.length > 4) {
				// Start setting up the piles of cards.
				this.setupPlayPiles();
			}
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

		/**
		 * Setup four play piles.
		 */
		setupPlayPiles() {
			//console.log(arguments);

			// Grab the first four cards off the top of the deck.
			var firstPileCard = this.availableCards.getAt(0) as PlayingCard;
			var secondPileCard = this.availableCards.getAt(1) as PlayingCard;
			var thirdPileCard = this.availableCards.getAt(2) as PlayingCard;
			var fourthPileCard = this.availableCards.getAt(3) as PlayingCard;

			// Setup tweens on each of the four cards to move them to the correct starting piles.
			var tweenToFirstPile = this.game.add.tween(firstPileCard);
			tweenToFirstPile.to({ x: this.firstPile.x, y: this.firstPile.y }, 1000, Phaser.Easing.Linear.None);
			tweenToFirstPile.onComplete.addOnce(() => {
				this.firstPile.addCard(firstPileCard.card);
				this.firstPileCards.add(firstPileCard);
			});

			var tweenToSecondPile = this.game.add.tween(secondPileCard);
			tweenToSecondPile.to({ x: this.secondPile.x, y: this.thirdPile.y }, 1000, Phaser.Easing.Linear.None);
			tweenToSecondPile.onComplete.addOnce(() => {
				this.secondPile.addCard(secondPileCard.card);
				this.secondPileCards.add(secondPileCard);
			});

			var tweenToThirdPile = this.game.add.tween(thirdPileCard);
			tweenToThirdPile.to({ x: this.thirdPile.x, y: this.thirdPile.y }, 1000, Phaser.Easing.Linear.None);
			tweenToThirdPile.onComplete.addOnce(() => {
				this.thirdPile.addCard(thirdPileCard.card);
				this.thirdPileCards.add(thirdPileCard);
			});

			var tweenToFourthPile = this.game.add.tween(fourthPileCard);
			tweenToFourthPile.to({ x: this.fourthPile.x, y: this.fourthPile.y }, 1000, Phaser.Easing.Linear.None);
			tweenToFourthPile.onComplete.addOnce(() => {
				this.fourthPile.addCard(fourthPileCard.card);
				this.fourthPileCards.add(fourthPileCard);

				// Setup the player piles.
				this.setupPlayerPiles();
			});

			tweenToFirstPile.chain(tweenToSecondPile.chain(tweenToThirdPile.chain(tweenToFourthPile)));

			tweenToFirstPile.start();

			// Create a new temporary card to move around the screen.
			//this.temporaryCard = new PlayingCard(this.game, this.cardStartingLocation.x, this.cardStartingLocation.y, null, Game.DECK_BACK_ID);

			//var topCard = this.deck.drawCard();


			//this.temporaryCard = new PlayingCard(this.game, this.mainDeckCardPile.x, this.mainDeckCardPile.y, null, Game.DECK_BACK_ID);
			//this.temporaryCard = new PlayingCard(this.game, this.mainDeckCardPile.x, this.mainDeckCardPile.y, newDeck.cards[0], Game.DECK_BACK_ID);
			//this.game.world.bringToTop(this.temporaryCard);


			//this.mainDeckCardPile.events.onInputDown.remove(this.setupPiles);
		}

		/**
		 * Setup the two player piles with the remaining cards.
		 */
		setupPlayerPiles() {
			var leftPlayerTemp1 = this.temporaryDealingCards.getAt(0) as Phaser.Sprite;
			var leftPlayerTemp2 = this.temporaryDealingCards.getAt(2) as Phaser.Sprite;
			var leftPlayerTemp3 = this.temporaryDealingCards.getAt(4) as Phaser.Sprite;
			var rightPlayerTemp1 = this.temporaryDealingCards.getAt(1) as Phaser.Sprite;
			var rightPlayerTemp2 = this.temporaryDealingCards.getAt(3) as Phaser.Sprite;
			var rightPlayerTemp3 = this.temporaryDealingCards.getAt(5) as Phaser.Sprite;
			//console.log(arguments);
			var tweenToLeftPlayerPile1 = this.game.add.tween(leftPlayerTemp1);
			tweenToLeftPlayerPile1.to({ x: this.leftPlayerPile.x, y: this.leftPlayerPile.y }, 1000, Phaser.Easing.Linear.None);
			tweenToLeftPlayerPile1.onComplete.addOnce(() => {
				this.leftPlayerCardPile.visible = true;
				console.log('left 1');
			});
			var tweenToLeftPlayerPile2 = this.game.add.tween(leftPlayerTemp2);
			tweenToLeftPlayerPile2.to({ x: this.leftPlayerPile.x, y: this.leftPlayerPile.y }, 1000, Phaser.Easing.Linear.None);
			var tweenToLeftPlayerPile3 = this.game.add.tween(leftPlayerTemp2);
			tweenToLeftPlayerPile3.to({ x: this.leftPlayerPile.x, y: this.leftPlayerPile.y }, 1000, Phaser.Easing.Linear.None);

			var tweenToRightPlayerPile1 = this.game.add.tween(rightPlayerTemp1);
			tweenToRightPlayerPile1.to({ x: this.rightPlayerPile.x, y: this.rightPlayerPile.y }, 1000, Phaser.Easing.Linear.None);
			tweenToRightPlayerPile1.onComplete.addOnce(() => {
				this.rightPlayerCardPile.visible = true;
				console.log('right 1');
			});
			var tweenToRightPlayerPile2 = this.game.add.tween(rightPlayerTemp2);
			tweenToRightPlayerPile2.to({ x: this.rightPlayerPile.x, y: this.rightPlayerPile.y }, 1000, Phaser.Easing.Linear.None);
			var tweenToRightPlayerPile3 = this.game.add.tween(rightPlayerTemp2);
			tweenToRightPlayerPile3.to({ x: this.rightPlayerPile.x, y: this.rightPlayerPile.y }, 1000, Phaser.Easing.Linear.None);


			tweenToLeftPlayerPile1.chain(tweenToRightPlayerPile1.chain(tweenToLeftPlayerPile2.chain(tweenToRightPlayerPile2.chain(tweenToLeftPlayerPile3.chain(tweenToRightPlayerPile3)))));

			tweenToLeftPlayerPile1.start();

			//tweenToFirstPile.chain(tweenToSecondPile.chain(tweenToThirdPile.chain(tweenToFourthPile)));

			//tweenToFirstPile.start();


		}
	}
}