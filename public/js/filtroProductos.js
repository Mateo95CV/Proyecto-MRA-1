export const monturas = [
    { nombre:'RayBan Aviator', desc:'Lentes de sol clasicos', img:'/public/img/RaybanAviator.jpg', tipo:'Sol', marca:'Rayban' },
    { nombre:'Oakley Sports', desc:'Lentes deportivos resistentes', img:'/public/img/OakleySport.jpg', tipo:'Sol', marca:'Oakley' },
    { nombre:'Transitions', desc:'Se adaptan al sol automáticamente', img:'/public/img/Transitions.jpeg', tipo:'Sol', marca:'Transitions' },
    { nombre:'Prada Luxury', desc:'Montura de lujo italiana', img:'/public/img/Prada.jpg', tipo:'Sol', marca:'Prada' }
];

export const lentesContacto = [
    { nombre:'Anyday', desc:'Descripción del producto', img:'/public/img/anyday.jpg', tipo:'Mensuales', marca:'Anyday' },
    { nombre:'Fresh Look', desc:'Descripción del producto', img:'/public/img/freshlook.jpg', tipo:'Colores', marca:'FreshLook' },
    { nombre:'Anyday Diarios', desc:'Descripción del producto', img:'/public/img/anyday-diarios.jpg', tipo:'Diarios', marca:'Anyday' },
    { nombre:'Opharcil', desc:'Descripción del producto', img:'/public/img/opharcil.jpg', tipo:'Tóricos', marca:'Opharcil' }
];

export const productos = [
    { nombre:'Freegen PF', desc:'Descripción del producto', img:'/public/img/freegen-pf.jpg', tipo:'Gotas', marca:'Freegen' },
    { nombre:'Freegen Gel', desc:'Descripción del producto', img:'/public/img/freegen-gel.jpg', tipo:'Gotas', marca:'Freegen' },
    { nombre:'Freegen', desc:'Descripción del producto', img:'/public/img/freegen.jpg', tipo:'Gotas', marca:'Freegen' },
    { nombre:'Opharcil', desc:'Descripción del producto', img:'/public/img/opharcil.jpg', tipo:'Kit', marca:'Opharcil' },
    { nombre:'Air Optix', desc:'Descripción del producto', img:'/public/img/air-optix.jpg', tipo:'Lentes', marca:'Air' },
    { nombre:'Cooper Vision', desc:'Descripción del producto', img:'/public/img/CooperVision.jpg', tipo:'Lentes', marca:'Cooper' }
];

// Función genérica de renderizado
export function renderProducts(containerId, productosFiltrados) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (productosFiltrados.length === 0) {
    container.innerHTML = '<p class="text-center mt-5">No hay productos que coincidan</p>';
    return;
  }

  productosFiltrados.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';  // ajusta según tu grid
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}" class="img-fluid">
      <div class="name">${p.nombre}</div>
      <div class="desc">${p.desc}</div>
    `;
    container.appendChild(div);
  });
}

// Función para obtener productos por categoría (puedes mejorarla)
export function getProductosPorCategoria(categoria) {
  switch(categoria) {
    case 'monturas': return monturas;
    case 'lentesContacto': return lentesContacto;
    case 'productos': return productos;
    default: return [];
  }
}