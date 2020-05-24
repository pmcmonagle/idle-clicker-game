export default class UICashFlow extends Phaser.Sprite {
    private static readonly PADDING: { x: number, y: number } = { x:60, y: 120 };
	private static readonly DESCRIPTION_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
		fontSize: 80,
		fill: '#FFFF00'
	};
	private static readonly CASH_FONT: Object = {
        font: 'Impact, Charcoal, sans-serif',
		fontSize: 120,
        align: 'right',
		fill: '#B3E2B0'
	};

    private background: Phaser.Image;
    private description: Phaser.Text;
    private cash: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y);

        this.background = this.game.add.image(0, 0, 'cashflowBackground');
        this.addChild(this.background);

        this.description = this.game.add.text(UICashFlow.PADDING.x, UICashFlow.PADDING.y, 'YOUR CASH:', UICashFlow.DESCRIPTION_FONT);
        this.description.anchor.setTo(0, 0.5);
        this.addChild(this.description);

        this.cash = this.game.add.text(this.game.width - UICashFlow.PADDING.x, UICashFlow.PADDING.y, '$0', UICashFlow.CASH_FONT);
        this.cash.anchor.setTo(1, 0.5);
        this.addChild(this.cash);
    }

    public showAmount(n: number) {
        this.game.sound.play('cash');
        this.cash.text = `$${n}`;
    }
}