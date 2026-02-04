let usuarios = [];
let editId = null;

const form = document.getElementById("userForm");
const table = document.getElementById("usersTable");

form.addEventListener("submit", e => {
  e.preventDefault();

  const user = {
    id: editId ?? Date.now(),
    nombre: nombre.value,
    email: email.value,
    rol: rol.value,
    estado: estado.value
  };

  if (editId) {
    usuarios = usuarios.map(u => u.id === editId ? user : u);
    editId = null;
  } else {
    usuarios.push(user);
  }

  form.reset();
  render();
});

function render() {
  table.innerHTML = "";

  usuarios.forEach(u => {
    table.innerHTML += `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>${u.rol}</td>
        <td>${u.estado}</td>
        <td>
          <button class="btn-primary" onclick="editUser(${u.id})">Editar</button>
          <button class="btn-danger" onclick="deleteUser(${u.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editUser(id) {
  const u = usuarios.find(u => u.id === id);

  nombre.value = u.nombre;
  email.value = u.email;
  rol.value = u.rol;
  estado.value = u.estado;

  editId = id;
}

function deleteUser(id) {
  if (confirm("¿Eliminar este usuario?")) {
    usuarios = usuarios.filter(u => u.id !== id);
    render();
  }
}
