import UIBusinessManager from '../ui/uiBusinessManager';
import UIHiringTab from '../ui/uiHiringTab';
import UIResetTab from '../ui/uiResetTab';
import UICashFlow from '../ui/uiCashflow';
import UIBusiness from '../ui/uiBusiness';
import BusinessManager from '../models/businessManager';
import Businesses from '../models/businesses';
import Business from '../models/business';
import Cash from '../models/cash';

/**
 * A simple idle game. This game should:
 * - Have businesses that earn money
 * - Clicking the business will cause it to generate money after a period of time
 * - With enough money you should be able to purchase new businesses
 * - You can also hire managers that click the businesses for you
 */
export default class Gameplay extends Phaser.State {
    private background: Phaser.Sprite;
    private uiCashflow: UICashFlow;
    private uiResetTab: UIResetTab;
    private uiHiringTab: UIHiringTab;
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

            // Events
            uiBusiness.events.onRun.add(this.runBusiness, this);
            uiBusiness.events.onBuy.add(this.buyBusiness, this);
            business.events.onPayoutReceived.add(Cash.add, Cash);
        });

        this.uiResetTab = this.game.add.existing(new UIResetTab(this.game));
        this.uiHiringTab = this.game.add.existing(new UIHiringTab(this.game));
        this.uiHiringTab.events.onBuy.add(this.buyManager, this);
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
    public buyManager(ui: UIBusinessManager, manager: BusinessManager) {
        if (!Cash.canAfford(manager))
            return;
        Cash.subtract(manager.cost);
        manager.purchase();
        ui.showPurchased();

        manager.business.run();
    }
}
