const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token || rol !== "Admin") {
  window.location.href = "../pages/usuarios/login.html";
}

const API = "http://localhost:3000/api/usuarios";

document.addEventListener("DOMContentLoaded", loadUsers);

async function loadUsers() {
  const res = await fetch(API);
  const users = await res.json();

  usersTable.innerHTML = "";
  users.forEach(renderRow);
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const user = {
    nombre: nombre.value,
    email: email.value,
    rol: rol.value,
    estado: estado.value
  };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    editId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  }

  form.reset();
  loadUsers();
});

async function deleteUser(id) {
  if (confirm("¿Eliminar usuario?")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadUsers();
  }
}
