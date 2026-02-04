let products = [];
let editingId = null;

const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    id: editingId ?? Date.now(),
    name: name.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
    status: status.value
  };

  if (editingId) {
    products = products.map(p => p.id === editingId ? product : p);
    editingId = null;
  } else {
    products.push(product);
  }

  form.reset();
  render();
});

function render() {
  table.innerHTML = "";

  products.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>$${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.status}</td>
        <td class="actions">
          <button class="edit" onclick="editProduct(${p.id})">Editar</button>
          <button class="delete" onclick="deleteProduct(${p.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editProduct(id) {
  const p = products.find(p => p.id === id);

  name.value = p.name;
  category.value = p.category;
  price.value = p.price;
  stock.value = p.stock;
  status.value = p.status;

  editingId = id;
}

function deleteProduct(id) {
  if (confirm("¿Eliminar producto?")) {
    products = products.filter(p => p.id !== id);
    render();
  }
}
