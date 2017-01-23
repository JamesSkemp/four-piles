module GameIdea45Project {
	export class Preloader extends Phaser.State {
		preload() {
			console.log((new Date).toISOString() + ' : Entered Preloader preload()');

			// If your game uses a graphic while assets are loaded, you would create the sprite and then display it via the below.
			//this.load.setPreloadSprite(this.preloadSprite);

			// Load the actual assets. By default the path will be set to the assets directory.
			this.load.path = 'assets/';
			// Assets loaded here can include image and audio files, as well as sprite sheets and more.
			this.load.spritesheet('cardBacks', 'playingCardBacks.png', 140, 190, 15);
			this.load.image('cardJoker');
			var suits = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];
			var ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
			suits.forEach((suit) => 
				ranks.forEach((rank) => 
					this.load.image('card' + Suit[suit] + rank + '')
				)
			);
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Preloader create()');

			// Once the assets have been preloaded you can move to the next state.
			this.game.state.start('MainMenu', true, false);
		}
	}
}