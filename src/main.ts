import './style.css';

import { createAssetCardElement } from './components/AssetCard';
import { createTransactionItemElement } from './components/TransactionItem';
import { createPortfolioSummaryElement } from './components/PortfolioSummary';
import { createPositionCardElement } from './components/PositionCard';

import { fetchAssets, fetchPortfolio, fetchTransactions, addTransaction } from './services/portfolio.service';
import { TransactionType } from './models';
import type { Transaction } from './models';

function showLoadingState(): void {
  const portfolioContainer = document.getElementById("portfolio-summary");
  const positionsContainer = document.getElementById("positions-list");
  const assetsContainer = document.getElementById("assets-list");
  const transactionsContainer = document.getElementById("transactions-list");

  const createSkeleton = (text: string) => {
    const p = document.createElement("p");
    p.textContent = text;
    p.className = "loading-text";
    return p;
  };

  if (portfolioContainer !== null) portfolioContainer.replaceChildren(createSkeleton("Cargando resumen del portafolio..."));
  if (positionsContainer !== null) positionsContainer.replaceChildren(createSkeleton("Cargando posiciones en cartera..."));
  if (assetsContainer !== null) assetsContainer.replaceChildren(createSkeleton("Cargando activos financieros..."));
  if (transactionsContainer !== null) transactionsContainer.replaceChildren(createSkeleton("Cargando historial de transacciones..."));
}

async function loadAndRenderApp(): Promise<void> {
  showLoadingState();

  try {
    const [portfolio, assets, transactions] = await Promise.all([
      fetchPortfolio(),
      fetchAssets(),
      fetchTransactions()
    ]);

    const portfolioContainer = document.getElementById("portfolio-summary");
    if (portfolioContainer !== null) {
      portfolioContainer.replaceChildren(createPortfolioSummaryElement(portfolio));
    }

    const positionsContainer = document.getElementById("positions-list");
    if (positionsContainer !== null) {
      positionsContainer.replaceChildren();
      if (portfolio.positions.length === 0) {
        const emptyText = document.createElement("p");
        emptyText.textContent = "No posees activos en cartera actualmente.";
        positionsContainer.appendChild(emptyText);
      } else {
        portfolio.positions.forEach((position) => {
          positionsContainer.appendChild(createPositionCardElement(position));
        });
      }
    }

    const assetsContainer = document.getElementById("assets-list");
    if (assetsContainer !== null) {
      assetsContainer.replaceChildren();
      assets.forEach((asset) => {
        assetsContainer.appendChild(createAssetCardElement(asset));
      });
    }

    renderTransactions(transactions);

  } catch (error) {
    console.error("Error al obtener datos del servidor:", error);
    showErrorMessage("Ocurrió un error al cargar los datos del sistema de inversiones.");
  }
}

function renderTransactions(transactions: Transaction[]): void {
  const transactionsContainer = document.getElementById("transactions-list");
  if (transactionsContainer !== null) {
    transactionsContainer.replaceChildren();
    if (transactions.length === 0) {
      const emptyText = document.createElement("p");
      emptyText.textContent = "Sin transacciones registradas.";
      transactionsContainer.appendChild(emptyText);
    } else {
      transactions.forEach((tx) => {
        transactionsContainer.appendChild(createTransactionItemElement(tx));
      });
    }
  }
}

function showErrorMessage(message: string): void {
  const portfolioContainer = document.getElementById("portfolio-summary");
  if (portfolioContainer !== null) {
    const errorText = document.createElement("p");
    errorText.textContent = message;
    errorText.className = "error-message";
    portfolioContainer.replaceChildren(errorText);
  }
}

function setupTransactionForm(): void {
  const form = document.getElementById("transaction-form") as HTMLFormElement | null;
  const errorDiv = document.getElementById("form-error") as HTMLDivElement | null;

  if (form === null) return;

  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    if (errorDiv !== null) {
      errorDiv.style.display = "none";
      errorDiv.textContent = "";
    }

    const assetSelect = document.getElementById("asset-select") as HTMLSelectElement | null;
    const typeSelect = document.getElementById("type-select") as HTMLSelectElement | null;
    const quantityInput = document.getElementById("quantity-input") as HTMLInputElement | null;
    const priceInput = document.getElementById("price-input") as HTMLInputElement | null;

    if (assetSelect === null || typeSelect === null || quantityInput === null || priceInput === null) return;

    const assetId = assetSelect.value.trim();
    const type = typeSelect.value as TransactionType;
    const quantity = Number(quantityInput.value);
    const unitPrice = Number(priceInput.value);

    if (assetId.length === 0) {
      showFormError("Por favor seleccione un activo financiero válido.");
      return;
    }

    if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
      showFormError("La cantidad debe ser un número entero positivo mayor a cero.");
      return;
    }

    if (isNaN(unitPrice) || unitPrice <= 0) {
      showFormError("El precio unitario debe ser mayor a cero.");
      return;
    }

    try {
      await addTransaction({
        assetId,
        type,
        quantity,
        unitPrice,
        totalAmount: quantity * unitPrice
      });

      const updatedTransactions = await fetchTransactions();
      renderTransactions(updatedTransactions);
      form.reset();

    } catch (err) {
      showFormError("Ocurrió un error al registrar la transacción.");
    }
  });

  function showFormError(message: string): void {
    if (errorDiv !== null) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderApp();
  setupTransactionForm();
});