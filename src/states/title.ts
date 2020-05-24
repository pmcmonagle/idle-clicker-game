import DataSaving from '../services/dataSaving';
import Businesses from '../models/businesses';
import Business from '../models/business';

/**
 * A simple title screen. It also loads the save data, and will
 * tell us what was earned while we were gone.
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
	private static readonly CASH_EARNED_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
		fontSize: 60,
        align: 'center',
		fill: "#000"
	};

    private static readonly TITLE_TEXT: string = "Idle Clicker Game";
    private static readonly SUBTITLE_TEXT: string = "Tap to Play!";
    private static readonly CASH_EARNED_TEXT: string = "Cash earned while you were gone:\n";

    private title: Phaser.Text;
    private subTitle: Phaser.Text;
    private cashEarned: Phaser.Text;
    private background: Phaser.Sprite;

	public create() {
        this.background = this.add.sprite(0, 0, 'background');
        this.title = this.game.add.text(
            this.game.width / 2,
            this.game.height / 2 - 100,
            Title.TITLE_TEXT, Title.TITLE_FONT
        );
        this.title.anchor.setTo(0.5, 0.5);
        this.subTitle = this.game.add.text(
            this.title.x,
            this.title.y + this.title.height + 20,
            Title.SUBTITLE_TEXT, Title.SUBTITLE_FONT
        );
        this.subTitle.anchor.setTo(0.5, 0.5);

        this.background.inputEnabled = true;
        this.background.events.onInputUp.addOnce(this.beginGame, this);

        if (DataSaving.load()) {
            const earned: number = Businesses.ALL
                .map((business: Business) => business.cumulativeCashEarned)
                .reduce((acc: number, cur: number) => acc + cur, 0);
            this.cashEarned = this.game.add.text(
                this.subTitle.x,
                this.subTitle.y + this.subTitle.height + 100,
                `${Title.CASH_EARNED_TEXT}$${earned}`,
                Title.CASH_EARNED_FONT
            );
            this.cashEarned.anchor.setTo(0.5, 0.5);
        }
	}

    private beginGame() {
        this.game.state.start('gameplay');
    }
}
