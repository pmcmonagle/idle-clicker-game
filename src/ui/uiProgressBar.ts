export default class UIProgressBar extends Phaser.Sprite {
    private background: Phaser.Image;
    private bar: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y);

        this.background = this.game.add.image(0, 0, 'progressBarBackground');
        this.bar = this.game.add.sprite(0, 0, 'progressBar');
        this.bar.scale.x = 0;

        this.addChild(this.background);
        this.addChild(this.bar);
    }

    public showPercentage(p: number) {
        this.bar.scale.x = Phaser.Math.clamp(p, 0, 1);
    }

    public showEnabled(isEnabled: boolean) {
        this.background.tint = isEnabled
            ? 0xFFFFFF
            : 0x666666;
    }
}