import type { Portfolio } from "../models";

export function createPortfolioSummaryElement(portfolio: Portfolio): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "portfolio-card";

  // Título del Portafolio
  const title = document.createElement("h2");
  title.textContent = portfolio.name;

  // Titular / Inversionista
  const owner = document.createElement("p");
  owner.innerHTML = `<strong>Titular:</strong> ${portfolio.ownerName}`;

  // Valor Total Calculado
  const total = document.createElement("p");
  total.className = "total-value";
  total.innerHTML = `Valor Total: <span>$${portfolio.totalValue.toLocaleString("es-CL")}</span>`;

  // Desglose de Activos Contenidos
  const holdingsInfo = document.createElement("div");
  holdingsInfo.className = "portfolio-holdings-summary";

  const holdingsLabel = document.createElement("span");
  holdingsLabel.textContent = "Activos en Cartera: ";
  holdingsInfo.appendChild(holdingsLabel);

  if (portfolio.positions.length === 0) {
    const emptySpan = document.createElement("span");
    emptySpan.textContent = "Sin activos";
    holdingsInfo.appendChild(emptySpan);
  } else {
    // Generamos un badge por cada ticker presente
    portfolio.positions.forEach(pos => {
      const tickerBadge = document.createElement("span");
      tickerBadge.className = "badge ticker-badge";
      tickerBadge.textContent = `${pos.ticker} (${pos.quantity})`;
      holdingsInfo.appendChild(tickerBadge);
    });
  }

  container.appendChild(title);
  container.appendChild(owner);
  container.appendChild(total);
  container.appendChild(holdingsInfo);

  return container;
}