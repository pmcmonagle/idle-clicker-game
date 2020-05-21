export default class UIBuyButton extends Phaser.Sprite {
    private static readonly PADDING: { x: number, y: number } = { x: -10, y: 5 };
    private static readonly COST_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
        fontSize: 110,
        align: 'right',
        fill: '#000'
    };

    public cost: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number, cost: number) {
        super(game, x, y, 'buyButtonBackground');
        this.anchor.setTo(1, 1);

        this.cost = this.game.add.text(UIBuyButton.PADDING.x, UIBuyButton.PADDING.y, `$${cost}`, UIBuyButton.COST_FONT);
        this.cost.anchor.setTo(1, 1);
        this.addChild(this.cost);
    }
}