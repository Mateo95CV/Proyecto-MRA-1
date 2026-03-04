document.getElementById("logout").addEventListener("click", () => {
localStorage.clear();
window.location.href = "../pages/usuarios/login.html";
});