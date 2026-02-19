const contenedor = document.getElementById("contenedorProductos");

async function cargarProductos() {
  try {
    const res = await fetch("http://localhost:3000/api/productos");
    const productos = await res.json();

    contenedor.innerHTML = "";

    productos.forEach(producto => {
      contenedor.innerHTML += `
        <div class="card-producto">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion || ""}</p>
          <strong>$${producto.precio}</strong>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

cargarProductos();
