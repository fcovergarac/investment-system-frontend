import './style.css';
import { AssetType, Currency, TransactionType } from './models';
import type { Asset, Transaction, Portfolio } from './models';

// Importación de componentes funcionales visuales
import { createAssetCardHtml } from './components/AssetCard';
import { createTransactionItemHtml } from './components/TransactionItem';
import { createPortfolioSummaryHtml } from './components/PortfolioSummary';

const mockAssets: Asset[] = [
  {
    id: 'a1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    type: AssetType.STOCK,
    currentPrice: 185.50,
    currency: Currency.USD,
  },
  {
    id: 'a2',
    ticker: 'SQM-B',
    name: 'Sociedad Química y Minera de Chile S.A.',
    type: AssetType.STOCK,
    currentPrice: 45000,
    currency: Currency.CLP,
  }
];

const mockPortfolio: Portfolio = {
  id: 'p1',
  name: 'My Investment Portfolio',
  ownerName: 'John Doe',
  totalValue: 100000,
  positions: [
    {
      assetId: 'a1',
      ticker: 'AAPL',
      quantity: 10,
      averageBuyPrice: 170.00,
      currentValue: 1855.00,
    }
  ]
};

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    portfolioId: 'p1',
    assetId: 'a1',
    type: TransactionType.BUY,
    quantity: 10,
    unitPrice: 170.00,
    totalAmount: 1700.00,
    timestamp: new Date("2026-01-15")
  }
];


// --- RENDERIZADO SEGURO DEL DOM ---
function renderApp(): void {
  // 1. Captura y renderizado del resumen del portafolio
  const portfolioContainer = document.getElementById("portfolio-summary") as HTMLElement | null;
  if (portfolioContainer) {
    portfolioContainer.innerHTML = createPortfolioSummaryHtml(mockPortfolio);
  } else {
    console.warn("No se encontró el contenedor #portfolio-summary");
  }

  // 2. Captura y renderizado de la lista de activos
  const assetsContainer = document.getElementById("assets-list") as HTMLElement | null;
  if (assetsContainer) {
    assetsContainer.innerHTML = mockAssets
      .map(asset => createAssetCardHtml(asset))
      .join("");
  } else {
    console.warn("No se encontró el contenedor #assets-list");
  }

  // 3. Captura y renderizado de las transacciones
  const transactionsContainer = document.getElementById("transactions-list") as HTMLElement | null;
  if (transactionsContainer) {
    transactionsContainer.innerHTML = mockTransactions
      .map(tx => createTransactionItemHtml(tx))
      .join("");
  } else {
    console.warn("No se encontró el contenedor #transactions-list");
  }
}

// Inicializamos la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", renderApp);