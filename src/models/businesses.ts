import Business, { IBusinessData } from "./business";

/**
 * A static registry of all businesses in the game.
 */
export default class Businesses {
    /**
     * Save and load all businesses from localStorage
     */
    public static save() {
        // TODO localStorage
    }
    public static load() {
        // TODO localStorage
    }

    public static get ALL(): Array<Business> {
        return [
            this.LEMONADE,
            this.GAMEDEV
        ];
    }

    public static LEMONADE: Business = new Business({
        name: 'Lemonade Stand',
        owned: 1,
        isRunning: false,
        isManaged: false,
        startTime: 0,
        baseCost: 10,
        costMultiplier: 1.5,
        baseCashPerClick: 1,
        cashPerClickMultiplier: 1.3,
        timePerClickMS: 1000
    });

    public static GAMEDEV: Business = new Business({
        name: 'Game Dev Studio',
        owned: 0,
        isRunning: false,
        isManaged: false,
        startTime: 0,
        baseCost: 20,
        costMultiplier: 1.5,
        baseCashPerClick: 2,
        cashPerClickMultiplier: 1.3,
        timePerClickMS: 2000
    });
}