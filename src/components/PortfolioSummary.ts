import type { Portfolio } from "../models";

export function createPortfolioSummaryHtml(portfolio: Portfolio): string {
  return `
    <div class="portfolio-card">
      <h2>${portfolio.name}</h2>
      <p><strong>Titular:</strong> ${portfolio.ownerName}</p>
      <p class="total-value">Valor Total: <span>$${portfolio.totalValue.toLocaleString()}</span></p>
      <p>Posiciones activas: ${portfolio.positions.length}</p>
    </div>
  `;
}