import './style.css';
import { AssetType, Currency, TransactionType } from './models';
import type { Asset, Transaction, Portfolio } from './models';

// Importamos las nuevas funciones generadoras de elementos DOM
import { createAssetCardElement } from './components/AssetCard';
import { createTransactionItemElement } from './components/TransactionItem';
import { createPortfolioSummaryElement } from './components/PortfolioSummary';

// --- MOCK DATA ---
const mockAssets: Asset[] = [
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

const mockPortfolio: Portfolio = {
  id: "p1",
  name: "Portafolio Principal Crecimiento",
  ownerName: "Inversionista",
  totalValue: 1250000,
  positions: [
    {
      assetId: "a1",
      ticker: "AAPL",
      quantity: 10,
      averageBuyPrice: 170.00,
      currentValue: 1855.00
    }
  ]
};

const mockTransactions: Transaction[] = [
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

// --- RENDERIZADO SEGURO DEL DOM MEDIANTE NODOS ---
function renderApp(): void {
  // 1. Resumen del portafolio
  const portfolioContainer = document.getElementById("portfolio-summary");
  if (portfolioContainer) {
    const summaryNode = createPortfolioSummaryElement(mockPortfolio);
    portfolioContainer.replaceChildren(summaryNode); // Reemplaza nodos hijos de forma eficiente y segura
  }

  // 2. Lista de activos
  const assetsContainer = document.getElementById("assets-list");
  if (assetsContainer) {
    assetsContainer.replaceChildren(); // Limpia el contenedor
    mockAssets.forEach(asset => {
      const cardNode = createAssetCardElement(asset);
      assetsContainer.appendChild(cardNode); // Inyecta el nodo DOM directo
    });
  }

  // 3. Lista de transacciones
  const transactionsContainer = document.getElementById("transactions-list");
  if (transactionsContainer) {
    transactionsContainer.replaceChildren(); // Limpia el contenedor
    mockTransactions.forEach(tx => {
      const txNode = createTransactionItemElement(tx);
      transactionsContainer.appendChild(txNode);
    });
  }
}

document.addEventListener("DOMContentLoaded", renderApp);