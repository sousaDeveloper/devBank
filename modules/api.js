import { transactions } from "../index.js";
import { renderTransaction } from "./renderTransactions.js";
import { updateBalance } from "./ui.js";

// Função assíncrona para realizar a requisição GET.
export async function fetchTransaction() {
  return await fetch("http://localhost:3000/transactions").then((res) => res.json());
}

// Função assíncrona para realizar a requisição PUT e POST.
export async function createTransaction(ev) {
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

// Função para criar botão de deletar transações com a requisição DELETE.
export function createButtonDelete(id) {
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("delete-btn");
  buttonDelete.textContent = "Excluir";
  // Evento assícrono para realizar a Requisição DELETE.
  buttonDelete.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/transactions/${id}`, { method: "DELETE" });
    buttonDelete.parentElement.remove();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1);
    updateBalance();
  });
  // SVG de ícone Deletar
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.classList.add("svg");
  svgElement.setAttribute("viewBox", "0 0 14 15");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute(
    "d",
    "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
  );
  pathElement.setAttribute(
    "d",
    "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
  );
  svgElement.appendChild(pathElement);
  buttonDelete.appendChild(svgElement);
  return buttonDelete;
}
