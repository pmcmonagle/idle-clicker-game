import DataSaving from '../services/dataSaving';
import IPurchasable from './iPurchasable';
import ISerializable from './iSerializable';
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
export default class Business implements IPurchasable, ISerializable {
    public events: BusinessEvents = new BusinessEvents();
    public manager: BusinessManager;

    constructor(private data: IBusinessData) {
        this.manager = new BusinessManager(data.managerData, this);
    }

    // Some getters for readonly properties
    public get name(): string { return this.data.name; }
    public get owned(): number { return this.data.owned; }
    public get isRunning(): boolean { return this.data.isRunning; }
    public get isManaged(): boolean { return this.data.isManaged; }

    // Return the calculated cost based on the number already owned.
    // Calculated as b * m^n
    public get cost(): number {
        return Math.floor(this.data.baseCost * Math.pow(this.data.costMultiplier, this.data.owned));
    }

    // Return the calculated payout based on the number already owned.
    // Calculated as b * m^n
    public get payout(): number {
        return Math.floor(this.data.baseCashPerClick * Math.pow(this.data.cashPerClickMultiplier, Math.max(1, this.data.owned)));
    }

    // Return cash earned for a specific degree of progress.
    public get cumulativeCashEarned(): number {
        return this.payout * Math.floor(this.progress);
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

        // Save after starting a run (so that we get paid out if we leave)
        DataSaving.save();
    }
    public checkProgress() {
        if (this.progress >= 1) {
            this.events.onPayoutReceived.dispatch(this.cumulativeCashEarned);

            if (!this.data.isManaged)
                this.data.isRunning = false;
            this.data.startTime = Date.now();

            // TODO
            // If our progress is not an integer, we should convert the remainder to
            // time in MS and set the startTime back by that amount. This way, if we
            // complete 2.5 payouts while away, we will resume that .5 of a payout!

            // Save after receiving a payout.
            DataSaving.save();
        }
    }

    /**
     * Purchase a new business, or manager!
     */
    public purchase() {
        this.data.owned++;
        this.events.onPurchased.dispatch();

        // Save our newly purchased business
        DataSaving.save();
    }
    public purchaseManager() {
        this.data.isManaged = true;

        // Save our newly purchased manager
        DataSaving.save();
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
