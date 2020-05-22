import UITabWindow from './uiTabWindow';

export default class UIResetTab extends UITabWindow {
    private background: Phaser.Image;

    constructor(game: Phaser.Game) {
        super(game);

        this.background = this.game.add.image(0, 0, 'resetTabBackground');
        this.background.inputEnabled = true;
        this.background.input.useHandCursor = true;
        this.background.input.pixelPerfectClick = true;
        this.background.events.onInputUp.add(this.toggleOpen, this);
        this.addChild(this.background);
    }
}
