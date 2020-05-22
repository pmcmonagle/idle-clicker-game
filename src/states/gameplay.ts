import UICashFlow from '../ui/uiCashflow';
import UIBusiness from '../ui/uiBusiness';
import Businesses from '../models/businesses';
import Business from '../models/business';
import Cash from '../models/cash';

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
        Cash.events.onCashAmountUpdated.add(this.uiCashflow.showAmount, this.uiCashflow);

        Businesses.ALL.forEach((business, i) => {
            const yPosition: number = 500,
                uiBusiness = new UIBusiness(
                    this.game,
                    this.game.width / 2,
                    yPosition + UIBusiness.ELEMENT_HEIGHT * i,
                    business
                );
            this.uiBusinesses.push(uiBusiness);
            this.game.add.existing(uiBusiness);

            // Current state
            uiBusiness.updateNumberOwned();
            uiBusiness.showAffordable(Cash.canAfford(business));

            // Events
            uiBusiness.events.onRun.add(this.runBusiness, this);
            uiBusiness.events.onBuy.add(this.buyBusiness, this);
            business.events.onPayoutReceived.add(Cash.add, Cash);
            Cash.events.onCashAmountUpdated.add(() => {
                uiBusiness.showAffordable(Cash.canAfford(business));
            });
        });
	}

    public update() {
        // Update progress on each uiBusiness
        this.uiBusinesses.forEach(ui => {
            ui.showProgress(ui.model.progress);
            ui.model.checkProgress();
        });
    }

    public runBusiness(business: Business) {
        business.run();
    }
    public buyBusiness(ui: UIBusiness, business: Business) {
        if (!Cash.canAfford(business))
            return;
        Cash.subtract(business.cost);
        business.purchase();
        ui.updateNumberOwned();
    }
    public buyManager(business: Business) {
        // TODO
    }
}
