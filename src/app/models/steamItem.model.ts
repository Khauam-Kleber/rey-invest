export class SteamItem {
    id: string;
    name: string;
    quantityPurchased: number;
    pricePurchased: number;

    constructor(item){
        this.id =  item.id;
        this.name = item.name;
        this.quantityPurchased = null;
        this.pricePurchased = null;
    }
}