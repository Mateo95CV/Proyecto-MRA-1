const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token || rol !== "Admin") {
  window.location.href = "/public/usuarios/login.html";
}

let citas = [];
let editId = null;

const form = document.getElementById("citaForm");
const table = document.getElementById("citasTable");

form.addEventListener("submit", e => {
  e.preventDefault();

  const cita = {
    id: editId ?? Date.now(),
    cliente: cliente.value,
    fecha: fecha.value,
    hora: hora.value,
    estado: estado.value
  };

  if (editId) {
    citas = citas.map(c => c.id === editId ? cita : c);
    editId = null;
  } else {
    citas.push(cita);
  }

  form.reset();
  render();
});

function render() {
  table.innerHTML = "";

  citas.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.cliente}</td>
        <td>${c.fecha}</td>
        <td>${c.hora}</td>
        <td>${c.estado}</td>
        <td>
          <button class="btn-primary" onclick="editCita(${c.id})">Editar</button>
          <button class="btn-danger" onclick="deleteCita(${c.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editCita(id) {
  const c = citas.find(c => c.id === id);

  cliente.value = c.cliente;
  fecha.value = c.fecha;
  hora.value = c.hora;
  estado.value = c.estado;

  editId = id;
}

function deleteCita(id) {
  if (confirm("¿Eliminar esta cita?")) {
    citas = citas.filter(c => c.id !== id);
    render();
  }
}

document.getElementById("logout").addEventListener("click", () => {
localStorage.clear();
window.location.href = "/public/usuarios/login.html";
});