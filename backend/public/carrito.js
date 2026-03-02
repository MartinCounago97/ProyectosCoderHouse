async function obtenerOCrearCarrito() {
  let cid = localStorage.getItem("cid");

  if (!cid) {
    const respuesta = await fetch("/api/carritos", {
      method: "POST",
    });

    const datos = await respuesta.json();
    cid = datos.id;

    localStorage.setItem("cid", cid);
  }

  return cid;
}

async function agregarAlCarrito(pid, cantidad) {
  const cid = await obtenerOCrearCarrito();

  const respuesta = await fetch(`/api/carritos/${cid}/productos/${pid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });

  const data = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    alert(data?.error || "Error al agregar producto al carrito");
    return;
  }

  alert(`Se agregaron ${cantidad} unidades al carrito`);
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btnAgregarCarrito")) return;

  const card = e.target.closest("[data-id]");
  const pid = card.dataset.id;

  const inputCantidad = card.querySelector(".inputCantidad");
  let cantidad = parseInt(inputCantidad.value);

  if (isNaN(cantidad) || cantidad < 1) {
    alert("Cantidad inválida");
    return;
  }

  agregarAlCarrito(pid, cantidad);
});
