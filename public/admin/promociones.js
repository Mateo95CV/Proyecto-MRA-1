let promociones = [];
let editId = null;

const form = document.getElementById("promoForm");
const table = document.getElementById("promoTable");

form.addEventListener("submit", e => {
  e.preventDefault();

  const promo = {
    id: editId ?? Date.now(),
    titulo: titulo.value,
    descripcion: descripcion.value,
    inicio: fechaInicio.value,
    fin: fechaFin.value,
    estado: estado.value
  };

  if (editId) {
    promociones = promociones.map(p => p.id === editId ? promo : p);
    editId = null;
  } else {
    promociones.push(promo);
  }

  form.reset();
  render();
});

function render() {
  table.innerHTML = "";

  promociones.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.titulo}</td>
        <td>${p.inicio} → ${p.fin}</td>
        <td>${p.estado}</td>
        <td>
          <button class="btn-primary" onclick="editPromo(${p.id})">Editar</button>
          <button class="btn-danger" onclick="deletePromo(${p.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editPromo(id) {
  const p = promociones.find(p => p.id === id);

  titulo.value = p.titulo;
  descripcion.value = p.descripcion;
  fechaInicio.value = p.inicio;
  fechaFin.value = p.fin;
  estado.value = p.estado;

  editId = id;
}

function deletePromo(id) {
  if (confirm("¿Eliminar esta promoción?")) {
    promociones = promociones.filter(p => p.id !== id);
    render();
  }
}
