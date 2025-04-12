let list = [];

function addToList() {
	let sizeInput = document.getElementById("size-input").value;
	let size = parseInt(sizeInput);
	let element = document.getElementById("input").value;

	if (isNaN(size) || size <= 0) {
		alert("Informe um tamanho válido para a lista.");
		return;
	}

	if (list.length >= size) {
		alert("LISTA CHEIA");
		return;
	}

	if (element === "") {
		alert("Insira um valor para adicionar.");
		return;
	}

	list.push(element);
	updateList();
}

function addRandomToList() {
	let sizeInput = document.getElementById("size-input").value;
	let size = parseInt(sizeInput);

	if (isNaN(size) || size <= 0) {
		alert("Informe um tamanho válido para a lista.");
		return;
	}

	if (list.length >= size) {
		alert("LISTA CHEIA");
		return;
	}

	let random = Math.floor(Math.random() * 100) + 1;
	list.push(random);
	updateList();
}

function removeFromList() {
	if (list.length === 0) {
		alert("A lista já está vazia.");
		return;
	}

	list.pop();
	updateList();
}

function clearList() {
	list = [];
	updateList();
}

function updateList() {
	let listElements = document.getElementById("list-elements");
	listElements.innerHTML = "";

	list.forEach((element, index) => {
		let div = document.createElement("div");
		div.innerText = `${index}: ${element}`;
		listElements.appendChild(div);
	});
}
