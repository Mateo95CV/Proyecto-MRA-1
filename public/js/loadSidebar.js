document.addEventListener("DOMContentLoaded", () => {
  fetch("/public/components/sidebar.html")
    .then(res => res.text())
    .then(html => {
      const sidebarContainer = document.getElementById("admin-sidebar");
      sidebarContainer.innerHTML = html;

      setActiveSidebarLink();
    })
    .catch(err => console.error("Error cargando sidebar:", err));
});

function setActiveSidebarLink() {
  const links = document.querySelectorAll(".admin-sidebar a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}
