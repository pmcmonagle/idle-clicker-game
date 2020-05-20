/**
 * A simple title screen.
 */
export default class Title extends Phaser.State {
	private static readonly TITLE_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
		fontSize: 80,
		fill: "#000000"
	};
	private static readonly SUBTITLE_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
		fontSize: 60,
		fill: "#333"
	};

    private title: Phaser.Text;
    private subTitle: Phaser.Text;
    private background: Phaser.Sprite;

	public create() {
        this.background = this.add.sprite(0, 0, 'background');
        this.title = this.game.add.text(
            this.game.width / 2,
            this.game.height / 2,
            "Adventure Capitalist", Title.TITLE_FONT
        );
        this.title.anchor.setTo(0.5, 0.5);
        this.subTitle = this.game.add.text(
            this.title.x,
            this.title.y + this.title.height + 20,
            "Tap to Play!", Title.SUBTITLE_FONT
        );
        this.subTitle.anchor.setTo(0.5, 0.5);

        this.background.inputEnabled = true;
        this.background.events.onInputUp.addOnce(this.beginGame, this);
	}

    private beginGame() {
        this.game.state.start('gameplay');
    }
}
