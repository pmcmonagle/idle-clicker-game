import Cash from '../models/cash';
import Business from '../models/business';
import Businesses from '../models/businesses';

/**
 * This service allows us to save and load data from localstorage.
 */
export default class DataSaving {
    private static SAVE_ID: string = "adventureCapitaliseSaveData";

    /**
     * Save data to localStorage
     */
    public static save() {
        let saveData: { [k: string]: string } = {};

        saveData["Cash"] = Cash.serialize();
        Object.keys(Businesses).forEach(key => {
            // We have to type Businesses as <any> because TS doesn't yet
            // support index signatures on static classes
            if (typeof (<any>Businesses)[key].serialize !== 'function')
                return;
            const business: Business = (<any>Businesses)[key];
            saveData[key] = business.serialize();
        });

        window.localStorage.setItem(DataSaving.SAVE_ID, JSON.stringify(saveData));
    }

    /**
     * Load saved data. Will return true if there was saved data to load, false otherwise.
     */
    public static load(): boolean {
        let saveData = JSON.parse(window.localStorage.getItem(DataSaving.SAVE_ID));

        if (saveData === null)
            return false;

        Cash.deserialize(saveData["Cash"]);
        Object.keys(saveData).forEach(key => {
            if (key === "Cash")
                return;
            (<any>Businesses)[key].deserialize(saveData[key]);
        });

        return true;
    }

    /**
     * Clear out the saved data and reload the page.
     */
    public static reset() {
        window.localStorage.removeItem(DataSaving.SAVE_ID);
        window.location.reload();
    }
}
