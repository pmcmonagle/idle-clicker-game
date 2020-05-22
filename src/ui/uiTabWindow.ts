/**
 * Base class for the UI Tabs that sit at the bottom of the screen.
 */
export default class UITabWindow extends Phaser.Sprite {
    private static ANIMATION_TIME_MS: number = 300;
    private static ANIMATION_EASE: (k: number) => number = Phaser.Easing.Bounce.Out;
    private static POSITION_OPEN: { x?: number, y?: number } = { y: 300 };
    private static POSITION_CLOSED: { x?: number, y?: number } = { y: 2100 };

    protected tween: Phaser.Tween;
    protected isOpen: boolean;

    constructor(game: Phaser.Game) {
        super(game, UITabWindow.POSITION_CLOSED.x || 0, UITabWindow.POSITION_CLOSED.y || 0);
    }

    public toggleOpen() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    public open() {
        if (this.tween)
            this.tween.stop();
        this.tween = this.game.add.tween(this);
        this.tween.to(UITabWindow.POSITION_OPEN, UITabWindow.ANIMATION_TIME_MS, UITabWindow.ANIMATION_EASE, true);
        this.bringToTop();
        this.isOpen = true;
    }
    public close() {
        if (this.tween)
            this.tween.stop();
        this.tween = this.game.add.tween(this);
        this.tween.to(UITabWindow.POSITION_CLOSED, UITabWindow.ANIMATION_TIME_MS, UITabWindow.ANIMATION_EASE, true);
        this.isOpen = false;
    }
}