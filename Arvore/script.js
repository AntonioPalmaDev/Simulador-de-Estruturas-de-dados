class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (this.exists(value)) {
      alert(`O valor ${value} já existe na árvore.`);
      return;
    }

    if (this.root === null) {
      this.root = new Node(value);
    } else {
      this.insertNode(this.root, value);
    }
  }

  insertNode(node, value) {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
    // Valores iguais não são tratados pois são impedidos anteriormente
  }

  exists(value) {
    return this.existsNode(this.root, value);
  }

  existsNode(node, value) {
    if (node === null) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.existsNode(node.left, value);
    else return this.existsNode(node.right, value);
  }

  remove(value) {
    this.root = this.removeNode(this.root, value, null);
  }

  removeNode(node, value, parent) {
    if (node === null) {
      return null;
    } else if (value < node.value) {
      node.left = this.removeNode(node.left, value, node);
      return node;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value, node);
      return node;
    } else {
      let successor = null;

      if (node.left === null && node.right === null) {
        logRemoval({
          removed: node.value,
          parent: parent ? parent.value : "nenhum (raiz)",
          replacement: "nenhum (nó folha)"
        });
        return null;
      }

      if (node.left === null || node.right === null) {
        successor = node.left || node.right;
        logRemoval({
          removed: node.value,
          parent: parent ? parent.value : "nenhum (raiz)",
          replacement: successor.value
        });
        return successor;
      }

      const minNode = this.findMinNode(node.right);
      const oldValue = node.value;
      node.value = minNode.value;
      node.right = this.removeNode(node.right, minNode.value, node);
      logRemoval({
        removed: oldValue,
        parent: parent ? parent.value : "nenhum (raiz)",
        replacement: node.value
      });
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  clearTree() {
    this.root = null;
  }

  updateTree() {
    let treeElements = document.getElementById("tree-elements");
    treeElements.innerHTML = "";
    let treeDom = this.buildTreeDom(this.root);
    if (treeDom) {
      treeElements.appendChild(treeDom);
    }
  }

  buildTreeDom(node) {
    if (!node) return null;

    let li = document.createElement("li");
    li.innerText = node.value;

    li.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Deseja remover o nó ${node.value}?`)) {
        tree.remove(node.value);
        tree.updateTree();
      }
    };

    if (node.left !== null || node.right !== null) {
      let ul = document.createElement("ul");

      if (node.left !== null) {
        ul.appendChild(this.buildTreeDom(node.left));
      }
      if (node.right !== null) {
        ul.appendChild(this.buildTreeDom(node.right));
      }
      li.appendChild(ul);
    }

    let ulWrapper = document.createElement("ul");
    ulWrapper.appendChild(li);
    return ulWrapper;
  }

  insertRandom() {
    let attempts = 0;
    let value;
    do {
      value = Math.floor(Math.random() * 100) + 1;
      attempts++;
    } while (this.exists(value) && attempts < 100);
    this.insert(value);
    this.updateTree();
  }
}

// Instancia a árvore
let tree = new BinaryTree();

function insert() {
  let value = document.getElementById("input").value;
  if (isNaN(value) || value === "") {
    alert("Insira um valor numérico válido.");
    return;
  }
  tree.insert(Number(value));
  tree.updateTree();
  document.getElementById("input").value = "";
}

function remove() {
  let value = document.getElementById("input").value;
  if (isNaN(value) || value === "") {
    alert("Insira um valor numérico válido.");
    return;
  }
  tree.remove(Number(value));
  tree.updateTree();
  document.getElementById("input").value = "";
}

function clearTree() {
  tree.clearTree();
  tree.updateTree();
  document.getElementById("input").value = "";
}

function insertRandom() {
  tree.insertRandom();
}

// Log detalhado da remoção
function logRemoval({ removed, parent, replacement }) {
  let logContainer = document.getElementById("log");
  let entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerText = `🔄 Remoção: ${removed} | 👤 Pai: ${parent} | 🧩 Substituto: ${replacement} | 🕒 ${new Date().toLocaleTimeString()}`;
  logContainer.appendChild(entry);
}
