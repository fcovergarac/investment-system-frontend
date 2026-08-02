//Enumeration for the investment status
export enum AssetType {
    STOCK = "STOCK",
    CRYPTO = "CRYPTO",
    BOND = "BOND",
    ETF = "ETF",
    CFD = "CFD"
}

export enum Currency {
    USD = "USD",
    EUR = "EUR",
    CLP = "CLP",
}

export interface Asset {
  id: string;
  ticker: string;        // Ej: "AAPL", "SQM-B"
  name: string;          // Ej: "Apple Inc.", "Sociedad Química y Minera"
  type: AssetType;
  currentPrice: number;
  currency: Currency;
}
