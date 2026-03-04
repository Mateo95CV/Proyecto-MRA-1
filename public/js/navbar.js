document.addEventListener("DOMContentLoaded", () => {
  fetch("../components/navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
      // After injecting navbar, update auth-related buttons
      try { updateAuthArea(); } catch (e) { console.error('Auth init error', e); }
    })
    .catch(error => console.error("Error cargando el navbar:", error));
});

function updateAuthArea() {
  const token = localStorage.getItem('token');
  const nombre = localStorage.getItem('nombre');
  const loginLink = document.getElementById('login-link');
  const userArea = document.getElementById('user-area');
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logoutBtn');

  if (token) {
    if (loginLink) loginLink.style.display = 'none';
    if (userArea) {
      userArea.style.display = 'inline-flex';
      if (userName) {
        const btn = userName.querySelector('.icon-btn');
        if (btn) btn.textContent = nombre || 'Usuario';
      }
    }
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/pages/usuarios/login.html';
      });
    }
  } else {
    if (loginLink) loginLink.style.display = 'inline-block';
    if (userArea) userArea.style.display = 'none';
  }
}
