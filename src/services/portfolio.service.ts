import { AssetType, Currency, TransactionType } from "../models";
import type { Asset, Portfolio, Transaction } from "../models";

const MOCK_PORTFOLIO: Portfolio = {
  id: "p1",
  name: "Portafolio Principal Crecimiento",
  ownerName: "Inversionista",
  totalValue: 918550,
  positions: [
    {
      assetId: "a1",
      ticker: "AAPL",
      quantity: 10,
      averageBuyPrice: 170.00,
      currentValue: 1855.00
    },
    {
      assetId: "a2",
      ticker: "SQM-B",
      quantity: 20,
      averageBuyPrice: 42000.00,
      currentValue: 916695.00
    }
  ]
};

const MOCK_ASSETS: Asset[] = [
  {
    id: "a1",
    ticker: "AAPL",
    name: "Apple Inc.",
    type: AssetType.STOCK,
    currentPrice: 185.50,
    currency: Currency.USD
  },
  {
    id: "a2",
    ticker: "SQM-B",
    name: "Sociedad Química y Minera de Chile",
    type: AssetType.STOCK,
    currentPrice: 45000,
    currency: Currency.CLP
  }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    portfolioId: "p1",
    assetId: "a1",
    type: TransactionType.BUY,
    quantity: 10,
    unitPrice: 170.00,
    totalAmount: 1700.00,
    timestamp: new Date("2026-01-15")
  }
];

async function simulateApiCall<T>(data: T, delay = 400): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const response = new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error(`Error del Servidor: Código HTTP ${response.status}`);
  }

  const result = (await response.json()) as T;
  return result;
}

export async function fetchPortfolio(): Promise<Portfolio> {
  return await simulateApiCall<Portfolio>(MOCK_PORTFOLIO);
}

export async function fetchAssets(): Promise<Asset[]> {
  return await simulateApiCall<Asset[]>(MOCK_ASSETS);
}

export async function fetchTransactions(): Promise<Transaction[]> {
  return await simulateApiCall<Transaction[]>(MOCK_TRANSACTIONS);
}

export async function addTransaction(
  newTx: Omit<Transaction, "id" | "portfolioId" | "timestamp">
): Promise<Transaction> {
  const createdTransaction: Transaction = {
    ...newTx,
    id: `t${Date.now()}`,
    portfolioId: "p1",
    timestamp: new Date()
  };

  MOCK_TRANSACTIONS.unshift(createdTransaction);
  return await simulateApiCall<Transaction>(createdTransaction);
}