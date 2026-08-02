import type { Asset } from "../models";

export function createAssetCardElement(asset: Asset): HTMLDivElement {
  // 1. Contenedor principal de la tarjeta
  const card = document.createElement("div");
  card.className = "card asset-card";
  card.dataset.id = asset.id;

  // 2. Encabezado de la tarjeta (Badge + Ticker)
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = asset.type; // Seguro contra scripts/XSS

  const ticker = document.createElement("h3");
  ticker.textContent = asset.ticker;

  cardHeader.appendChild(badge);
  cardHeader.appendChild(ticker);

  // 3. Nombre del activo
  const name = document.createElement("p");
  name.className = "asset-name";
  name.textContent = asset.name;

  // 4. Cuerpo con el precio
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const priceLabel = document.createElement("span");
  priceLabel.className = "price-label";
  priceLabel.textContent = "Precio Actual: ";

  const priceValue = document.createElement("span");
  priceValue.className = "price-value";
  priceValue.textContent = `${asset.currency} $${asset.currentPrice.toLocaleString()}`;

  cardBody.appendChild(priceLabel);
  cardBody.appendChild(priceValue);

  // 5. Ensamblado final
  card.appendChild(cardHeader);
  card.appendChild(name);
  card.appendChild(cardBody);

  return card;
}