import type { Asset } from "../models";

export function createAssetCardHtml(asset: Asset): string {
  return `
    <div class="card asset-card" data-id="${asset.id}">
      <div class="card-header">
        <span class="badge">${asset.type}</span>
        <h3>${asset.ticker}</h3>
      </div>
      <p class="asset-name">${asset.name}</p>
      <div class="card-body">
        <span class="price-label">Precio Actual:</span>
        <span class="price-value">${asset.currency} $${asset.currentPrice.toLocaleString()}</span>
      </div>
    </div>
  `;
}