import Business from './business';
import IPurchasable from './iPurchasable';

class CashEvents {
    public onCashAmountUpdated: Phaser.Signal = new Phaser.Signal();
}

/**
 * This is a simple model that tracks how much cash the user has.
 * We should also use it to compare against purchasable items to see
 * if we can afford them or not.
 */
export default class Cash {
    public static amount: number = 0;
    public static events: CashEvents = new CashEvents();

    public static add(n: number) {
        Cash.amount += Math.max(0, n);
        this.events.onCashAmountUpdated.dispatch(Cash.amount);
    }

    public static subtract(n: number) {
        Cash.amount += Math.min(0, -n);
        this.events.onCashAmountUpdated.dispatch(Cash.amount);
    }

    public static canAfford(item: IPurchasable): boolean {
        return this.amount >= item.cost;
    }
}