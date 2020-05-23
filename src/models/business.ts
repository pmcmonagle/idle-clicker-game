import IPurchasable from './iPurchasable';
import BusinessManager, { IManagerData } from './businessManager';

export interface IBusinessData {
    name: string,                     // Readable name of the business.
    owned: number,                    // How many of this business the user has purchased.
    isRunning: boolean,               // Whether or not the business is currently making progress.
    isManaged: boolean,               // Whether or not the user has purchased a manager.
    managerData: IManagerData,        // An object representing the manager of this business.
    startTime: number,                // Timestamp of when the business was last run.
    baseCost: number,                 // How much the first business will cost.
    costMultiplier: number,           // How much more each subsequent business will cost.
    baseCashPerClick: number,         // How much a single business earns per click.
    cashPerClickMultiplier: number,   // How much each subsequent business will earn per click.
    timePerClickMS: number            // The amount of time in MS it takes for progress to go from 0 to 1.
}

class BusinessEvents {
    public onPayoutReceived: Phaser.Signal = new Phaser.Signal();
    public onPurchased: Phaser.Signal = new Phaser.Signal();
}

/**
 * Data model for a single business. It should:
 * - serialize / deserialize itself for saving
 * - calculate progress towards a goal given timestamps
 * - calculate money earned when progress reaches 1
 */
export default class Business implements IPurchasable {
    public events: BusinessEvents = new BusinessEvents();
    public manager: BusinessManager;

    constructor(public data: IBusinessData) {
        this.manager = new BusinessManager(data.managerData, this);
    }

    // Return the calculated cost based on the number already owned.
    // Calculated as b * m^n
    public get cost(): number {
        return Math.floor(this.data.baseCost * Math.pow(this.data.costMultiplier, this.data.owned));
    }

    // Return the calculated payout based on the number already owned.
    // Calculated as b * m^n
    public get payout(): number {
        return Math.floor(this.data.baseCashPerClick * Math.pow(this.data.cashPerClickMultiplier, this.data.owned));
    }

    // Value representing the progress towards the next payout.
    // A value of 1 is a complete payout, but managed business can go higher
    // since they can run while the user is away.
    public get progress(): number {
        if (!this.data.isRunning)
            return 0;
        return this.data.isManaged
            ? (Date.now() - this.data.startTime) / this.data.timePerClickMS
            : Phaser.Math.clamp((Date.now() - this.data.startTime) / this.data.timePerClickMS, 0, 1);
    }

    /**
     * Run your business!
     */
    public run() {
        if (this.data.isRunning || this.data.owned < 1)
            return;
        this.data.startTime = Date.now();
        this.data.isRunning = true;
    }
    public checkProgress() {
        if (this.progress >= 1) {
            this.data.startTime = Date.now();
            if (!this.data.isManaged)
                this.data.isRunning = false;
            this.events.onPayoutReceived.dispatch(this.payout);
        }
    }

    /**
     * Purchase a new business!
     */
    public purchase() {
        this.data.owned++;
        this.events.onPurchased.dispatch();
    }

    /**
     * Convert mutible data to and from JSON
     */
    public serialize(): string {
        return JSON.stringify({
            owned: this.data.owned,
            startTime: this.data.startTime,
            isRunning: this.data.isRunning,
            isManaged: this.data.isManaged
        });
    }
    public deserialize(json: string) {
        const data = JSON.parse(json);
        this.data.owned = data.owned;
        this.data.startTime = data.startTime;
        this.data.isRunning = data.isRunning;
        this.data.isManaged = data.isManaged;
    }
}
