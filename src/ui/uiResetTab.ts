import DataSaving from '../services/dataSaving';
import UITabWindow from './uiTabWindow';

export default class UIResetTab extends UITabWindow {
    private background: Phaser.Image;
    private resetButton: Phaser.Sprite;

    constructor(game: Phaser.Game) {
        super(game);

        this.background = this.game.add.image(0, 0, 'resetTabBackground');
        this.background.inputEnabled = true;
        this.background.input.useHandCursor = true;
        this.background.input.pixelPerfectClick = true;
        this.background.events.onInputUp.add(this.toggleOpen, this);
        this.addChild(this.background);

        this.resetButton = this.game.add.sprite(this.background.width / 2, this.background.height / 2, 'resetButton');
        this.resetButton.anchor.setTo(0.5, 0.5);
        this.resetButton.inputEnabled = true;
        this.resetButton.input.useHandCursor = true;
        this.resetButton.events.onInputUp.add(DataSaving.reset, DataSaving);
        this.addChild(this.resetButton);
    }
}
