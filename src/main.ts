import './style.css';

// Importación de componentes funcionales
import { createAssetCardElement } from './components/AssetCard';
import { createTransactionItemElement } from './components/TransactionItem';
import { createPortfolioSummaryElement } from './components/PortfolioSummary';
import { createPositionCardElement } from './components/PositionCard';

// Importación de servicios y tipos
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

  if (portfolioContainer) portfolioContainer.replaceChildren(createSkeleton("Cargando resumen del portafolio..."));
  if (positionsContainer) positionsContainer.replaceChildren(createSkeleton("Cargando posiciones en cartera..."));
  if (assetsContainer) assetsContainer.replaceChildren(createSkeleton("Cargando activos financieros..."));
  if (transactionsContainer) transactionsContainer.replaceChildren(createSkeleton("Cargando historial de transacciones..."));
}

async function loadAndRenderApp(): Promise<void> {
  showLoadingState();

  try {
    const [portfolio, assets, transactions] = await Promise.all([
      fetchPortfolio(),
      fetchAssets(),
      fetchTransactions()
    ]);

    // 1. Resumen del Portafolio
    const portfolioContainer = document.getElementById("portfolio-summary");
    if (portfolioContainer) {
      portfolioContainer.replaceChildren(createPortfolioSummaryElement(portfolio));
    }

    // 2. Posiciones Activas
    const positionsContainer = document.getElementById("positions-list");
    if (positionsContainer) {
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

    // 3. Activos del Mercado
    const assetsContainer = document.getElementById("assets-list");
    if (assetsContainer) {
      assetsContainer.replaceChildren();
      assets.forEach((asset) => {
        assetsContainer.appendChild(createAssetCardElement(asset));
      });
    }

    // 4. Historial de Transacciones
    renderTransactions(transactions);

  } catch (error) {
    console.error("Error al obtener datos del servidor:", error);
    showErrorMessage("Ocurrió un error al cargar los datos del sistema de inversiones.");
  }
}

// Tipado estricto con Transaction[] (eliminado el uso de any)
function renderTransactions(transactions: Transaction[]): void {
  const transactionsContainer = document.getElementById("transactions-list");
  if (transactionsContainer) {
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
  if (portfolioContainer) {
    const errorText = document.createElement("p");
    errorText.textContent = message;
    errorText.className = "error-message";
    portfolioContainer.replaceChildren(errorText);
  }
}

// --- SETUP Y VALIDACIÓN DEL FORMULARIO DE TRANSACCIONES ---
function setupTransactionForm(): void {
  const form = document.getElementById("transaction-form") as HTMLFormElement | null;
  const errorDiv = document.getElementById("form-error") as HTMLDivElement | null;

  if (!form) return;

  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault(); // Detiene la recarga nativa de la página

    if (errorDiv) {
      errorDiv.style.display = "none";
      errorDiv.textContent = "";
    }

    // Aserciones de tipo especializadas
    const assetSelect = document.getElementById("asset-select") as HTMLSelectElement;
    const typeSelect = document.getElementById("type-select") as HTMLSelectElement;
    const quantityInput = document.getElementById("quantity-input") as HTMLInputElement;
    const priceInput = document.getElementById("price-input") as HTMLInputElement;

    const assetId = assetSelect.value.trim();
    const type = typeSelect.value as TransactionType;
    const quantity = Number(quantityInput.value);
    const unitPrice = Number(priceInput.value);

    // Validaciones estrictas de presencia y rango
    if (!assetId) {
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
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderApp();
  setupTransactionForm();
});