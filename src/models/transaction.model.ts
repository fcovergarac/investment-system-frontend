export enum TransactionType {
    BUY = "BUY",
    SELL = "SELL"
}

export interface Transaction {
    id: string;
    portfolioId: string;
    assetId: string;
    type: TransactionType;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    timestamp: Date;
}
