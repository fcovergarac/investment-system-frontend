import { AssetType, Currency, TransactionType } from "../models";
import type { Asset, Portfolio, Transaction } from "../models";

// --- MOCK DATA SIMULADA PARA RED ---
const MOCK_PORTFOLIO: Portfolio = {
  id: "p1",
  name: "Portafolio Principal Crecimiento",
  ownerName: "Inversionista",
  totalValue: 918550, // Suma exacta de las posiciones activas
  positions: [
    {
      assetId: "a1",
      ticker: "AAPL",
      quantity: 10,
      averageBuyPrice: 170.00,
      currentValue: 1855.00 // 10 acciones x $185.50
    },
    {
      assetId: "a2",
      ticker: "SQM-B",
      quantity: 20,
      averageBuyPrice: 42000.00,
      currentValue: 916695.00 // 20 acciones x $45.834.75
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

// --- FUNCIONES ASÍNCRONAS CONCEPTUALES ---

/**
 * Simula la petición HTTP GET para obtener la información del portafolio.
 */
export async function fetchPortfolio(): Promise<Portfolio> {
  // Simula latencia de red de 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PORTFOLIO;
}

/**
 * Simula la petición HTTP GET para obtener el catálogo de activos financieros.
 */
export async function fetchAssets(): Promise<Asset[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_ASSETS;
}

/**
 * Simula la petición HTTP GET para obtener el historial de transacciones.
 */
export async function fetchTransactions(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_TRANSACTIONS;
}

/**
 * Simula la petición HTTP POST para registrar una nueva transacción.
 */
export async function addTransaction(newTx: Omit<Transaction, "id" | "portfolioId" | "timestamp">): Promise<Transaction> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const createdTransaction: Transaction = {
    ...newTx,
    id: `t${Date.now()}`,
    portfolioId: "p1",
    timestamp: new Date()
  };

  MOCK_TRANSACTIONS.unshift(createdTransaction); // Agrega al inicio de la lista
  return createdTransaction;
}