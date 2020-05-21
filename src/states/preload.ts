/**
 * Handles the preloading of all assets.
 */
export default class Preload extends Phaser.State {
	private static readonly assetsUri: {IMAGES: string, SOUNDS: string} = {
		IMAGES: "assets/images/",
		SOUNDS: "assets/sounds/"
	};
    private background: Phaser.Sprite;
	private preloadSprite: Phaser.Sprite;

	/**
	 * Set up the preload graphics, and begin preloading.
	 */
	public preload() {
        this.background = this.add.sprite(0, 0, 'background');
		this.preloadSprite = this.add.sprite(
            this.game.width  / 2,
            this.game.height / 2,
            'preloadSprite'
        );
        this.preloadSprite.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.beginGame, this);
        this.load.setPreloadSprite(this.preloadSprite);

        this.preloadImages();
        this.preloadSounds();
	}

	private preloadImages() {
		this.load.image('progressBar', `${Preload.assetsUri.IMAGES}progressBar.png`);
		this.load.image('progressBarBackground', `${Preload.assetsUri.IMAGES}progressBarBackground.png`);
		this.load.image('buyButtonBackground', `${Preload.assetsUri.IMAGES}buyButtonBackground.png`);
		this.load.image('cashflowBackground', `${Preload.assetsUri.IMAGES}cashflowBackground.png`);
		this.load.image('businessBackground', `${Preload.assetsUri.IMAGES}businessBackground.png`);
	}

	private preloadSounds() {
		// this.load.audio('example', [`${Preload.assetsUri.SOUNDS}example.mp3`]);
	}

	/**
	 * We're done preloading - time to play the game!
	 */
	private beginGame() {
		this.game.state.start('title');
	}
}
