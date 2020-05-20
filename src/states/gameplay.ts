import UICashFlow from '../ui/cashflow';
import UIBusiness from '../ui/business';
import { IBusiness, Businesses } from '../models/businesses';

/**
 * A simple idle game. This game should:
 * - Have businesses that earn money
 * - Clicking the business will cause it to generate money after a period of time
 * - With enough money you should be able to purchase new businesses
 * - Have managers that click the businesses for you
 */
export default class Gameplay extends Phaser.State {
    private background: Phaser.Sprite;
    private uiCashflow: UICashFlow;
    private uiBusinesses: Array<UIBusiness> = [];

	public create() {
        this.background = this.add.sprite(0, 0, 'background');

        this.uiCashflow = this.game.add.existing(new UICashFlow(this.game, 0, 0));
        Businesses.ALL.forEach((business, i) => {
            const yPosition: number = 500;
            this.uiBusinesses.push(new UIBusiness(
                this.game,
                this.game.width / 2,
                yPosition + UIBusiness.ELEMENT_HEIGHT * i,
                business
            ));
            this.game.add.existing(this.uiBusinesses[this.uiBusinesses.length - 1]);
        });
	}
}
