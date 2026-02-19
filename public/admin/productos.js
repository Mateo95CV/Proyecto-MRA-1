const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token || rol !== "Admin") {
  window.location.href = "/public/usuarios/login.html";
}

const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

// CREAR PRODUCTO
form.addEventListener("submit", async e => {
  e.preventDefault();

  const product = {
    nombre: document.getElementById("name").value,
    categoria: document.getElementById("category").value,
    precio: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    estado: document.getElementById("status").value
  };

  await fetch("http://localhost:3000/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  form.reset();
  cargarProductos();
});

// LISTAR PRODUCTOS
async function cargarProductos() {
  const res = await fetch("http://localhost:3000/api/productos", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const productos = await res.json();

  table.innerHTML = "";

  productos.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td>${p.estado}</td>
        <td>
          <button onclick="eliminar(${p.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// ELIMINAR PRODUCTO
async function eliminar(id) {
  await fetch(`http://localhost:3000/api/productos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  cargarProductos();
}

// CARGAR AL INICIAR
cargarProductos();

// LOGOUT
document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/public/usuarios/login.html";
});
