//Enumeration for the investment status
export enum AssetType {
    STOCK = 'STOCK',
    CRYPTO = 'CRYPTO',
    BOND = 'BOND',
    ETF = 'ETF',
    CFD = 'CFD',
}

//Interface to represent an asset in the portfolio
export interface Asset {
    readonly id: string;
    symbol: string;
    name: string;
    type: AssetType;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
}

//Interface to the main entity in the portfolio
export interface Portfolio {
    readonly id: string;
    ownerName: string;
    assets: Asset[];
}