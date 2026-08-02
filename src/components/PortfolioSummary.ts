import type { Portfolio } from "../models";

export function createPortfolioSummaryElement(portfolio: Portfolio): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "portfolio-card";

  const title = document.createElement("h2");
  title.textContent = portfolio.name;

  const owner = document.createElement("p");
  owner.innerHTML = `<strong>Titular:</strong> ${portfolio.ownerName}`;

  const total = document.createElement("p");
  total.className = "total-value";
  total.innerHTML = `Valor Total: <span>$${portfolio.totalValue.toLocaleString()}</span>`;

  const positions = document.createElement("p");
  positions.textContent = `Posiciones activas: ${portfolio.positions.length}`;

  container.appendChild(title);
  container.appendChild(owner);
  container.appendChild(total);
  container.appendChild(positions);

  return container;
}