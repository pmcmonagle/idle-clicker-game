export interface IBusiness {
    name: string;
    owned: number;
    baseCost: number;
    costMultiplier: number;
    baseCashPerClick: number;
    cashPerClickMultiplier: number;
    timePerClickMS: number;
}

export class Businesses {
    public static get ALL(): Array<IBusiness> {
        return [
            this.LEMONADE
        ];
    }

    public static LEMONADE: IBusiness = {
        name: 'Lemonade Stand',
        owned: 1,
        baseCost: 10,
        costMultiplier: 1.5,
        baseCashPerClick: 1,
        cashPerClickMultiplier: 1.3,
        timePerClickMS: 1000
    }
}