export interface Position {
    assetId: string;
    ticker: string;
    quantity: number;
    averageBuyPrice: number;
    currentValue: number;
}

export interface Portfolio {
    id: string;
    name: string;
    ownerName: string;
    totalValue: number;
    positions: Position[];
}

