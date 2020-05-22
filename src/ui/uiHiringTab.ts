import UIBusinessManager from './uiBusinessManager';
import UITabWindow from './uiTabWindow';
import Businesses from '../models/businesses';

export default class UIHiringTab extends UITabWindow {
    private background: Phaser.Image;
    private uiBusinessManagers: Array<UIBusinessManager> = [];

    constructor(game: Phaser.Game) {
        super(game);

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

            this.uiBusinessManagers.push(uiBusinessManager);
            this.addChild(uiBusinessManager);
        });
    }
}