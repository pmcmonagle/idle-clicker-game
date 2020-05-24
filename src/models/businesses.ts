import Business, { IBusinessData } from './business';

/**
 * A static registry of all businesses in the game.
 */
export default class Businesses {
    public static get ALL(): Array<Business> {
        return [
            this.COFFEE_SHOP,
            this.GAMEDEV,
            this.COMPUTER
        ];
    }

    public static COFFEE_SHOP: Business = new Business({
        name: 'Coffee Shop',
        owned: 1,
        isRunning: false,
        isManaged: false,
        managerData: { cost: 50, name: "Gordon Baldwin" },
        startTime: 0,
        baseCost: 10,
        costMultiplier: 1.5,
        baseCashPerClick: 4,
        cashPerClickMultiplier: 1.3,
        timePerClickMS: 1000
    });

    public static GAMEDEV: Business = new Business({
        name: 'Game Dev Studio',
        owned: 0,
        isRunning: false,
        isManaged: false,
        managerData: { cost: 100, name: "Taro Iwata" },
        startTime: 0,
        baseCost: 20,
        costMultiplier: 1.5,
        baseCashPerClick: 10,
        cashPerClickMultiplier: 1.3,
        timePerClickMS: 2000
    });

    public static COMPUTER: Business = new Business({
        name: 'Technology Firm',
        owned: 0,
        isRunning: false,
        isManaged: false,
        managerData: { cost: 200, name: "Gill Bates" },
        startTime: 0,
        baseCost: 40,
        costMultiplier: 1.5,
        baseCashPerClick: 20,
        cashPerClickMultiplier: 1.3,
        timePerClickMS: 4000
    });
}