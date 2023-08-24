import { transactions } from "../index.js";

// Função para atualizar valor gradualmente.
export function updateBalance() {
  const balanceSpan = document.querySelector("#balance");
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });

  if (balance >= 0) {
    balanceSpan.classList.add("spanCredit");
  } else {
    balanceSpan.classList.add("spanDebit");
  }

  balanceSpan.textContent = formater.format(balance);
}

// Função para trocar a cor de fundo do site.
export function switchBackground() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}
