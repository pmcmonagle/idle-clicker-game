import Cash from '../models/cash';
import BusinessManager from '../models/businessManager';

export class UIBusinessManagerEvents extends Phaser.Events {
    public onBuy: Phaser.Signal = new Phaser.Signal();

    public destroy() {
        super.destroy();

        this.onBuy.dispose();
    }
}

/**
 * Named uiBusinessManager because uiManager sounds like a class that
 * manages ui elements...
 */
export default class UIBusinessManager extends Phaser.Sprite {
    public static readonly ELEMENT_HEIGHT: number = 250;

    private static readonly PADDING: { x: number, y: number } = { x: 30, y: 30 };
    private static readonly NAME_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 72,
        fill: '#AAA'
    };
    private static readonly BUSINESS_NAME_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 62,
        fill: '#AAA'
    };
    private static readonly COST_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 120,
        fill: '#AAA'
    };

    public model: BusinessManager;
    public events: UIBusinessManagerEvents;
    public isUsable: boolean;

    private cost: Phaser.Text;
    private managerName: Phaser.Text;
    private businessName: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number, model: BusinessManager) {
        super(game, x, y, 'managerBackground');
        this.events = new UIBusinessManagerEvents(this);
        this.anchor.setTo(0.5, 0.5);
        this.model = model;

        // Create and position UI Elements
        this.managerName = this.game.add.text(
            -this.width / 2 + UIBusinessManager.PADDING.x,
            -this.height / 2 + UIBusinessManager.PADDING.y,
            model.data.name,
            UIBusinessManager.NAME_FONT
        );
        this.addChild(this.managerName);

        this.businessName = this.game.add.text(
            -this.width / 2 + UIBusinessManager.PADDING.x,
            this.height / 2 - UIBusinessManager.PADDING.y,
            `Runs ${model.business.data.name}`,
            UIBusinessManager.BUSINESS_NAME_FONT
        );
        this.businessName.anchor.setTo(0, 1);
        this.addChild(this.businessName);

        this.cost = this.game.add.text(
            this.width / 2 - UIBusinessManager.PADDING.x,
            0,
            `$${model.data.cost}`,
            UIBusinessManager.COST_FONT
        );
        this.cost.anchor.setTo(1, 0.5);
        this.addChild(this.cost);

        // Setup events
        this.inputEnabled = true;
        this.events.onInputUp.add(() => {
            if (this.isUsable) {
                this.events.onBuy.dispatch(this, this.model);
            }
        });
        Cash.events.onCashAmountUpdated.add(() => {
            this.showAffordable(Cash.canAfford(this.model));
        });
        this.model.business.events.onPurchased.add(() => {
            this.showAffordable(Cash.canAfford(this.model));
        });

        // Setup current state
        this.showAffordable(Cash.canAfford(this.model));
    }

    // When the business is already managed
    public showPurchased() {
        this.isUsable = false;
        this.cost.tint = 0xFFFFFF;
        this.managerName.tint = 0xFFFFFF;
        this.businessName.tint = 0xFFFFFF;

        this.cost.text = 'HIRED!';
    }

    // When we own 0 of the business.
    public showUnavailable() {
        this.isUsable = false;
        this.cost.tint = 0x666666;
        this.managerName.tint = 0x666666;
        this.businessName.tint = 0x666666;
    }

    public showAffordable(isAffordable: boolean) {
        if (this.model.business.data.isManaged)
            return this.showPurchased();
        if (this.model.business.data.owned < 1)
            return this.showUnavailable();

        if (isAffordable) {
            this.isUsable = true;
            this.cost.tint = 0x99FF99;
            this.managerName.tint = 0xFFFFFF;
            this.businessName.tint = 0xFFFFFF;
        } else {
            this.isUsable = false;
            this.cost.tint = 0xFF9999;
            this.managerName.tint = 0xFFFFFF;
            this.businessName.tint = 0xFFFFFF;
        }
    }
}