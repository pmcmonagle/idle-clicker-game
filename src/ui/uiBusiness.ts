import Cash from '../models/cash';
import Business from '../models/business';
import UIProgressBar from './uiProgressBar';
import UIBuyButton from './uiBuyButton';

export class UIBusinessEvents extends Phaser.Events {
    public onRun: Phaser.Signal = new Phaser.Signal();
    public onBuy: Phaser.Signal = new Phaser.Signal();

    public destroy() {
        super.destroy();

        this.onRun.dispose();
        this.onBuy.dispose();
    }
}

export default class UIBusiness extends Phaser.Sprite {
    public static readonly ELEMENT_HEIGHT: number = 400;

    private static readonly PADDING: { x: number, y: number } = { x: 30, y: 30 };
    private static readonly NAME_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 72,
        fill: '#AAA'
    };
    private static readonly CASH_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 118,
        align: 'right',
		fill: '#B3E2B0'
    };
    private static readonly OWNED_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 60,
        align: 'right',
		fill: '#AAA'
    };

    public model: Business;
    public events: UIBusinessEvents;

    private background: Phaser.Image;
    private numberOwned: Phaser.Text;
    private businessName: Phaser.Text;
    private cashPerClick: Phaser.Text;
    private progressBar: UIProgressBar;
    private buyButton: UIBuyButton;

    constructor(game: Phaser.Game, x: number, y: number, model: Business) {
        super(game, x, y);
        this.model = model;
        this.anchor.setTo(0.5, 0.5);
        this.events = new UIBusinessEvents(this);

        this.background = this.game.add.image(0, 0, 'businessBackground');
        this.background.anchor.setTo(0.5, 0.5);
        this.addChild(this.background);

        // Create and position UI Elements
        this.businessName = this.game.add.text(
            -this.background.width / 2 + UIBusiness.PADDING.x,
            -this.background.height / 2 + UIBusiness.PADDING.y,
            model.name,
            UIBusiness.NAME_FONT
        );
        this.addChild(this.businessName);

        this.cashPerClick = this.game.add.text(
            this.background.width / 2 - UIBusiness.PADDING.x,
            -this.background.height / 2 + UIBusiness.PADDING.y,
            `$${model.payout}`,
            UIBusiness.CASH_FONT
        );
        this.cashPerClick.anchor.setTo(1, 0);
        this.addChild(this.cashPerClick);

        this.progressBar = new UIProgressBar(
            this.game,
            this.businessName.x,
            this.businessName.y + this.businessName.height
        );
        this.addChild(this.progressBar);

        this.buyButton = new UIBuyButton(
            this.game,
            this.background.width / 2 - UIBusiness.PADDING.x,
            this.background.height / 2 - UIBusiness.PADDING.y,
            model.cost
        );
        this.addChild(this.buyButton);

        this.numberOwned = this.game.add.text(
            this.buyButton.x - this.buyButton.width - UIBusiness.PADDING.x,
            this.buyButton.y + 10,
            `owned\n${model.owned}`,
            UIBusiness.OWNED_FONT
        );
        this.numberOwned.anchor.setTo(1, 1);
        this.addChild(this.numberOwned);

        // Setup Events
        this.background.inputEnabled = true;
        this.background.input.useHandCursor = true;
        this.background.events.onInputUp.add(() => {
            this.events.onRun.dispatch(this.model);
        });
        this.buyButton.inputEnabled = true;
        this.buyButton.input.useHandCursor = true;
        this.buyButton.events.onInputUp.add(() => {
            // buyButton uses an isUsable flag instead of inputEnabled so that
            // it can continue to block input events even when disabled.
            if (this.buyButton.isUsable)
                this.events.onBuy.dispatch(this, this.model);
        });
        Cash.events.onCashAmountUpdated.add(() => {
            this.showAffordable(Cash.canAfford(this.model));
        });

        // Set current state
        this.updateNumberOwned();
        this.showAffordable(Cash.canAfford(this.model));
    }

    public showProgress(n: number) {
        this.progressBar.showPercentage(n);
    }

    public showAffordable(isAffordable: boolean) {
        if (isAffordable) {
            this.buyButton.isUsable = true;
            this.buyButton.input.useHandCursor = true;
            this.buyButton.tint = 0xFFFFFF;
        } else {
            this.buyButton.isUsable = false;
            this.buyButton.input.useHandCursor = false;
            this.buyButton.tint = 0xFF6666;
        }
    }

    public updateNumberOwned() {
        this.numberOwned.text = `owned\n${this.model.owned}`;
        this.cashPerClick.text = `$${this.model.payout}`;
        this.buyButton.showCost(this.model.cost);

        if (this.model.owned > 0) {
            this.background.inputEnabled = true;
            this.progressBar.showEnabled(true);
            this.cashPerClick.tint = 0xFFFFFF;
            this.numberOwned.tint = 0xFFFFFF;
        } else {
            this.background.inputEnabled = false;
            this.progressBar.showEnabled(false);
            this.cashPerClick.tint = 0x666666;
            this.numberOwned.tint = 0x666666;
        }
    }
}