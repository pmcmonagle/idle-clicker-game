import { IBusiness } from '../models/businesses';
import UIProgressBar from './progressBar';

export default class UIBusiness extends Phaser.Sprite {
    public static readonly ELEMENT_HEIGHT: number = 200;

    private static readonly PADDING: { x: number, y: number } = { x: 20, y: 20 };
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

    public model: IBusiness;

    private background: Phaser.Image;
    private businessName: Phaser.Text;
    private cashPerClick: Phaser.Text;
    private progressBar: UIProgressBar;

    constructor(game: Phaser.Game, x: number, y: number, model: IBusiness) {
        super(game, x, y);
        this.model = model;
        this.anchor.setTo(0.5, 0.5);

        this.background = this.game.add.image(0, 0, 'businessBackground');
        this.background.anchor.setTo(0.5, 0.5);
        this.addChild(this.background);

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
            `$${model.baseCashPerClick}`,
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
    }
}