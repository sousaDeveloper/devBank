import { renderTransaction } from "./modules/renderTransactions.js";

import { updateBalance, switchBackground } from "./modules/ui.js";

import { fetchTransaction, createTransaction } from "./modules/api.js";

// Array para armazenar transações.
export let transactions = [];

document.querySelector("form").addEventListener("submit", createTransaction);

// Função assíncrona para "rodar" a aplicação.
async function setup() {
  const results = await fetchTransaction();
  transactions.push(...results);
  transactions.forEach(renderTransaction);
  updateBalance();
}

document.addEventListener("DOMContentLoaded", setup);

document.querySelector(".slider").addEventListener("click", switchBackground);
