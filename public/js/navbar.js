document.addEventListener("DOMContentLoaded", () => {
  fetch("../components/navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => console.error("Error cargando el navbar:", error));
});
