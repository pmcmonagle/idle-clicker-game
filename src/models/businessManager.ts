import IPurchasable from './iPurchasable';
import Business from './business';

export interface IManagerData {
    cost: number;
    name: string;
}

/**
 * Data model for a manager. A manager runs a business automatically
 * so that you don't have to! This is a 1:1 relationship.
 * It's named BusinessManager because manager sounds like something that
 * manages code, or services or something.
 */
export default class BusinessManager implements IPurchasable {
    constructor(
        private data: IManagerData,
        public business: Business
    ) { }

    public get cost(): number { return this.data.cost; }
    public get name(): string { return this.data.name; }

    public purchase() {
        this.business.purchaseManager();
    }
}
