const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/pages/usuarios/login.html";
}

const form = document.getElementById("formAjustes");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/usuarios/actualizar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ nombre, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Perfil actualizado correctamente");
    window.location.href = "/";
  } else {
    alert(data.message);
  }
});

router.put("/actualizar", verificarToken, async (req, res) => {
  const { nombre, email, password } = req.body;
  const userId = req.usuario.id;

  let query = `
    UPDATE usuarios
    SET nombre = @nombre, email = @email
  `;

  if (password) {
    const hash = await bcrypt.hash(password, 10);
    query += `, password = @password`;
  }

  query += ` WHERE id = @id`;

  // Ejecutar query con parámetros
});