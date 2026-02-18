const form = document.getElementById("visagismoForm");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const rostro = document.getElementById("rostro").value;
  const piel = document.getElementById("piel").value;
  const estilo = document.getElementById("estilo").value;

  let recomendacion = "";

  // 🔹 Reglas por forma de rostro
  if (rostro === "redondo") {
    recomendacion = "Monturas rectangulares o cuadradas para estilizar el rostro.";
  } 
  else if (rostro === "cuadrado") {
    recomendacion = "Monturas redondas u ovaladas para suavizar los ángulos.";
  } 
  else if (rostro === "alargado") {
    recomendacion = "Monturas grandes o con puente bajo para equilibrar proporciones.";
  } 
  else if (rostro === "ovalado") {
    recomendacion = "Casi cualquier montura armoniza bien con tu rostro.";
  }

  // 🔹 Ajuste por tono de piel
  if (piel === "clara") {
    recomendacion += " Se recomiendan colores cálidos o metálicos suaves.";
  }
  if (piel === "media") {
    recomendacion += " Tonos tierra y dorados resaltan muy bien.";
  }
  if (piel === "oscura") {
    recomendacion += " Colores vibrantes o contrastantes generan gran impacto.";
  }

  // 🔹 Ajuste por estilo
  if (estilo === "clasico") {
    recomendacion += " Opta por diseños elegantes y discretos.";
  }
  if (estilo === "moderno") {
    recomendacion += " Busca monturas geométricas y minimalistas.";
  }
  if (estilo === "casual") {
    recomendacion += " Modelos ligeros y cómodos serán ideales.";
  }

  resultado.style.display = "block";
  resultado.innerHTML = `
    <h3 style="color:var(--purple)">Recomendación personalizada</h3>
    <p>${recomendacion}</p>
    <a href="citas.html" class="cta-cita">Agendar cita con asesor MRA</a>
  `;
});
