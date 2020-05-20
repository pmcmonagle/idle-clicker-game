import UICashFlow from '../ui/cashflow';

/**
 * A simple idle game. This game should:
 * - Have businesses that earn money
 * - Clicking the business will cause it to generate money after a period of time
 * - With enough money you should be able to purchase new businesses
 * - Have managers that click the businesses for you
 */
export default class Title extends Phaser.State {
	private static readonly TITLE_FONT: Object = {
		fontSize: 24,
		fill: "#FFFF00"
	};
    private background: Phaser.Sprite;
    private uiCashflow: UICashFlow;

	public create() {
        this.background = this.add.sprite(0, 0, 'background');
		this.game.add.text(10, 10, "Gameplay", Title.TITLE_FONT);

        this.uiCashflow = this.game.add.existing(new UICashFlow(this.game, 0, 0));
	}
}
