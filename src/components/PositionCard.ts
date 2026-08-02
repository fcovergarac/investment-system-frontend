import type { Position } from "../models";

export function createPositionCardElement(position: Position): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "card position-card";

  // Encabezado con el Ticker y Cantidad
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const ticker = document.createElement("h3");
  ticker.textContent = position.ticker;

  const qtyBadge = document.createElement("span");
  qtyBadge.className = "badge position-badge";
  qtyBadge.textContent = `${position.quantity} Unidades`;

  cardHeader.appendChild(ticker);
  cardHeader.appendChild(qtyBadge);

  // Detalle financiero de la posición
  cardBodyDisplay(position, card);

  return card;
}

function cardBodyDisplay(position: Position, card: HTMLDivElement): void {
  const body = document.createElement("div");
  body.className = "card-body";

  const buyPrice = document.createElement("p");
  buyPrice.innerHTML = `<strong>Precio Prom. Compra:</strong> $${position.averageBuyPrice.toLocaleString()}`;

  const currentValue = document.createElement("p");
  currentValue.innerHTML = `<strong>Valor Actual:</strong> $${position.currentValue.toLocaleString()}`;

  body.appendChild(buyPrice);
  body.appendChild(currentValue);
  card.appendChild(body);
}