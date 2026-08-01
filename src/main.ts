import { Asset, AssetType, Portfolio } from './models/investment.model';

// Instance dataset simulated (Mock data)
const mockAssets: Asset[] = [
  {
    id: 'asset-001',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: AssetType.STOCK,
    quantity: 10,
    purchasePrice: 150.00,
    currentPrice: 175.50
  },
  {
    id: 'asset-002',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: AssetType.CRYPTO,
    quantity: 0.5,
    purchasePrice: 60000.00,
    currentPrice: 65000.00    
  }
];

const mockPortfolio: Portfolio = {
  id: 'port-101',
  ownerName: 'Francisco Javier',
  assets: mockAssets
};


// 2. Selección segura del contenedor principal del DOM (#app)
const appContainer = document.getElementById('app');

// 3. Renderizado directo en pantalla
if (appContainer !== null) {
  appContainer.innerHTML = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 40px auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); background-color: #ffffff; color: #1e293b;">
      <h1 style="color: #0f172a; margin-top: 0; font-size: 1.75rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">
        💼 Investment Portfolio
      </h1>
      
      <p style="font-size: 1.1rem; color: #475569;">
        <strong>Owner:</strong> ${mockPortfolio.ownerName}
      </p>
      
      <p style="font-size: 0.95rem; color: #64748b;">
        <strong>Total Registered Assets:</strong> ${mockPortfolio.assets.length}
      </p>

      <h2 style="font-size: 1.25rem; color: #334155; margin-top: 24px;">Asset List</h2>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${mockPortfolio.assets.map(asset => `
          <div style="padding: 12px 16px; border-left: 4px solid ${
            asset.type === AssetType.STOCK ? '#3b82f6' : 
            asset.type === AssetType.CRYPTO ? '#f59e0b' : '#10b981'
          }; background-color: #f8fafc; border-radius: 0 8px 8px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${asset.symbol} - ${asset.name}</strong>
              <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; background-color: #e2e8f0; font-weight: bold;">
                ${asset.type}
              </span>
            </div>
            <div style="margin-top: 6px; font-size: 0.9rem; color: #475569;">
              Quantity: <strong>${asset.quantity}</strong> | 
              Current Price: <strong>$${asset.currentPrice.toLocaleString('en-US')}</strong>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
} else {
  console.error("Error Crítico: No se encontró el contenedor con ID 'app' en el index.html.");
}