import UIBusinessManager, { UIBusinessManagerEvents } from './uiBusinessManager';
import BusinessManager from '../models/businessManager';
import UITabWindow from './uiTabWindow';
import Businesses from '../models/businesses';

export default class UIHiringTab extends UITabWindow {
    public events: UIBusinessManagerEvents;

    private background: Phaser.Image;
    private uiBusinessManagers: Array<UIBusinessManager> = [];

    constructor(game: Phaser.Game) {
        super(game);
        this.events = new UIBusinessManagerEvents(this);

        this.background = this.game.add.image(0, 0, 'hiringTabBackground');
        this.background.inputEnabled = true;
        this.background.input.useHandCursor = true;
        this.background.input.pixelPerfectClick = true;
        this.background.events.onInputUp.add(this.toggleOpen, this);
        this.addChild(this.background);

        Businesses.ALL.forEach((business, i) => {
            const yPosition: number = 500,
                uiBusinessManager = new UIBusinessManager(
                    this.game,
                    this.game.width / 2,
                    yPosition + UIBusinessManager.ELEMENT_HEIGHT * i,
                    business.manager
                );

            uiBusinessManager.events.onBuy.add(
                // Forward buy events from the individual managers
                (ui: UIBusinessManager, model: BusinessManager) => this.events.onBuy.dispatch(ui, model)
            );
            this.uiBusinessManagers.push(uiBusinessManager);
            this.addChild(uiBusinessManager);
        });
    }
}