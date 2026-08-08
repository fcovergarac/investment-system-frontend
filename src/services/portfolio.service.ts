import type { Asset, Portfolio, Transaction } from "../models";

let localTransactions: Transaction[] = [];

async function fetchEndpoint<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error Status: ${response.status}`);
  }

  const data = (await response.json()) as T;
  return data;
}

export async function fetchPortfolio(): Promise<Portfolio> {
  try {
    return await fetchEndpoint<Portfolio>("/api/portfolio.json");
  } catch (error) {
    console.error("Error al obtener el portafolio:", error);
    throw error;
  }
}

export async function fetchAssets(): Promise<Asset[]> {
  try {
    return await fetchEndpoint<Asset[]>("/api/assets.json");
  } catch (error) {
    console.error("Error al obtener activos:", error);
    return []; // Fallback seguro
  }
}

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const remoteTransactions = await fetchEndpoint<Transaction[]>("/api/transactions.json");
    return [...localTransactions, ...remoteTransactions];
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    return localTransactions; // Fallback seguro
  }
}

export async function addTransaction(
  newTx: Omit<Transaction, "id" | "portfolioId" | "timestamp">
): Promise<Transaction> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const createdTransaction: Transaction = {
    ...newTx,
    id: `t${Date.now()}`,
    portfolioId: "p1",
    timestamp: new Date()
  };

  localTransactions.unshift(createdTransaction);
  return createdTransaction;
}