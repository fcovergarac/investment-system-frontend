import type { Transaction } from "../models";

export function createTransactionItemHtml(transaction: Transaction): string {
  const isBuy = transaction.type === "BUY";
  const typeClass = isBuy ? "tx-buy" : "tx-sell";
  const formattedDate = new Date(transaction.timestamp).toLocaleDateString();

  return `
    <div class="transaction-item ${typeClass}" data-id="${transaction.id}">
      <div class="tx-info">
        <span class="tx-type-badge ${typeClass}">${transaction.type}</span>
        <span class="tx-date">${formattedDate}</span>
      </div>
      <div class="tx-details">
        <span><strong>Cant:</strong> ${transaction.quantity}</span>
        <span><strong>Precio U.:</strong> $${transaction.unitPrice}</span>
        <span><strong>Total:</strong> $${transaction.totalAmount}</span>
      </div>
    </div>
  `;
}