import {
  createContainerTransaction,
  createTitleTransaction,
  createAmountTransaction,
  createButtonEdit,
} from "./createContainer.js";

import { createButtonDelete } from "./api.js";

// Função para renderizar os elementos na tela.
export function renderTransaction(transaction) {
  const container = createContainerTransaction(transaction.id);
  const title = createTitleTransaction(transaction.name);
  const amount = createAmountTransaction(transaction.amount);
  const buttonEdit = createButtonEdit(transaction);
  const buttonDelete = createButtonDelete(transaction.id);

  container.append(title, amount, buttonEdit, buttonDelete);
  document.querySelector("#transactions").appendChild(container);
}
