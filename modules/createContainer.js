// Função para criar/renderizar Div, para englobar transações feitas.
export function createContainerTransaction(id) {
  const container = document.createElement("div");
  container.classList.add("transaction");
  container.id = `transaction-${id}`;
  return container;
}

// Função para criar/renderizar Título de transações.
export function createTitleTransaction(name) {
  const title = document.createElement("span");
  title.classList.add("transaction-title");
  title.textContent = name;
  return title;
}

// Função para criar/renderizar Valores de transações.
export function createAmountTransaction(amount) {
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
export function createButtonEdit(transaction) {
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
