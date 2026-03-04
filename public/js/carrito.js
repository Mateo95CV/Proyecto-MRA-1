const token = localStorage.getItem("token");

async function agregarCarrito(productoId) {
  const res = await fetch("http://localhost:3000/api/carrito/agregar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      productoId,
      cantidad: 1
    })
  });

  const data = await res.json();
  alert(data.mensaje);
}

if (!token) {
  window.location.href = "/pages/usuarios/login.html";
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const tbody = document.getElementById("carritoBody");
const totalGeneral = document.getElementById("totalGeneral");

function renderCarrito() {
  tbody.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    tbody.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${subtotal}</td>
        <td>
          <button onclick="eliminarProducto(${index})">X</button>
        </td>
      </tr>
    `;
  });

  totalGeneral.textContent = total;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

function finalizarCompra() {
  alert("Compra realizada correctamente");
  localStorage.removeItem("carrito");
  renderCarrito();
}

renderCarrito();