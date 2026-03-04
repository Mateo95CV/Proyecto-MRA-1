const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.mensaje || "Error al iniciar sesión";
      return;
    }

    // Guardar token y rol
    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.rol);
    localStorage.setItem("nombre", data.nombre);

    // Redirección según rol
    if (data.rol === "Admin") {
      window.location.href = "/admin/admin.html";
    } else {
      window.location.href = "/";
    }

  } catch (error) {
    errorMsg.textContent = "No se pudo conectar con el servidor";
  }
});
