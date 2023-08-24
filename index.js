import {
  createContainerTransaction,
  createTitleTransaction,
  createAmountTransaction,
  createButtonEdit,
  createButtonDelete,
  renderTransaction
} from "./modules/transactions";

// Array para armazenar transações.
let transactions = [];

// Função assíncrona para realizar a requisição GET.
async function fetchTransaction() {
  return await fetch("http://localhost:3000/transactions").then((res) => res.json());
}

// Função assíncrona para realizar a requisição PUT e POST.
async function createTransaction(ev) {
  ev.preventDefault();

  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const amount = parseFloat(document.querySelector("#amount").value);

  if (id) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    });
    const transaction = await response.json();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1, transaction);
    document.querySelector(`#transaction-${id}`).remove();
    renderTransaction(transaction);
    document.querySelector("#id").value = "";
    updateBalance();
  } else {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    });

    const newTransaction = await response.json();
    transactions.push(newTransaction);
    renderTransaction(newTransaction);
  }

  ev.target.reset();
  updateBalance();
}

document.querySelector("form").addEventListener("submit", createTransaction);

// Função para atualizar valor gradualmente.
function updateBalance() {
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

// Função assíncrona para "rodar" a aplicação.
async function setup() {
  const results = await fetchTransaction();
  transactions.push(...results);
  transactions.forEach(renderTransaction);
  updateBalance();
}

document.addEventListener("DOMContentLoaded", setup);

// Função para trocar a cor de fundo do site.
function switchBackground() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

document.querySelector(".slider").addEventListener("click", switchBackground);
