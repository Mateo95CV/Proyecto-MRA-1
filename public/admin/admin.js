const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token || rol !== "Admin") {
  window.location.href = "/public/usuarios/login.html";
}
