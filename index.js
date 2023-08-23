// Array para armazenar transações.
let transactions = [];

// Função para criar/renderizar Div, para englobar transações feitas.
function createContainerTransaction(id) {
  const container = document.createElement("div");
  container.classList.add("transaction");
  container.id = `transaction-${id}`;
  return container;
}

// Função para criar/renderizar Título de transações.
function createTitleTransaction(name) {
  const title = document.createElement("span");
  title.classList.add("transaction-title");
  title.textContent = name;
  return title;
}

// Função para criar/renderizar Valores de transações.
function createAmountTransaction(amount) {
  const span = document.createElement("span");
  span.classList.add("transaction-amount");

  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });

  const formatedNumber = formater.format(amount);

  if (amount > 0) {
    span.classList.add("credit");
    span.textContent = `${formatedNumber} C`;
  } else {
    span.classList.add("debit");
    span.textContent = `${formatedNumber} D`;
  }
  return span;
}

// Função para criar botão de editar transações já existentes/criadas.
function createButtonEdit(transaction) {
  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("edit-btn");
  buttonEdit.textContent = "Editar";
  buttonEdit.addEventListener("click", () => {
    document.querySelector("#newFinance").innerHTML = "Editar Finança";
    document.querySelector("#id").value = transaction.id;
    document.querySelector("#name").value = transaction.name;
    document.querySelector("#amount").value = transaction.amount;
  });
  document.querySelector("#newFinance").innerHTML = "Nova Finança";
  // SVG de ícone Editar
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.classList.add("svg");
  svgElement.setAttribute("viewBox", "0 0 512 512");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute(
    "d",
    "M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
  );

  svgElement.appendChild(pathElement);
  buttonEdit.appendChild(svgElement);
  return buttonEdit;
}

// Função para criar botão de deletar transações já existentes/criadas.
function createButtonDelete(id) {
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

// Função para renderizar os elementos na tela.
function renderTransaction(transaction) {
  const container = createContainerTransaction(transaction.id);
  const title = createTitleTransaction(transaction.name);
  const amount = createAmountTransaction(transaction.amount);
  const buttonEdit = createButtonEdit(transaction);
  const buttonDelete = createButtonDelete(transaction.id);

  container.append(title, amount, buttonEdit, buttonDelete);
  document.querySelector("#transactions").appendChild(container);
}

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
