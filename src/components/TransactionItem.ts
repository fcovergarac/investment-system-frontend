import type { Transaction } from "../models";

export function createTransactionItemElement(transaction: Transaction): HTMLDivElement {
  const isBuy = transaction.type === "BUY";
  const typeClass = isBuy ? "tx-buy" : "tx-sell";
  const formattedDate = new Date(transaction.timestamp).toLocaleDateString();

  // Contenedor principal
  const item = document.createElement("div");
  item.className = `transaction-item ${typeClass}`;
  item.dataset.id = transaction.id;

  // Información básica (Tipo y Fecha)
  const txInfo = document.createElement("div");
  txInfo.className = "tx-info";

  const badge = document.createElement("span");
  badge.className = `tx-type-badge ${typeClass}`;
  badge.textContent = transaction.type;

  const dateSpan = document.createElement("span");
  dateSpan.className = "tx-date";
  dateSpan.textContent = formattedDate;

  txInfo.appendChild(badge);
  txInfo.appendChild(dateSpan);

  // Detalles de la transacción
  const txDetails = document.createElement("div");
  txDetails.className = "tx-details";

  const qtySpan = document.createElement("span");
  qtySpan.innerHTML = `<strong>Cant:</strong> ${transaction.quantity}`;

  const priceSpan = document.createElement("span");
  priceSpan.innerHTML = `<strong>Precio U.:</strong> $${transaction.unitPrice}`;

  const totalSpan = document.createElement("span");
  totalSpan.innerHTML = `<strong>Total:</strong> $${transaction.totalAmount}`;

  txDetails.appendChild(qtySpan);
  txDetails.appendChild(priceSpan);
  txDetails.appendChild(totalSpan);

  item.appendChild(txInfo);
  item.appendChild(txDetails);

  return item;
}