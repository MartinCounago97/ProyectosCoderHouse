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
    Swal.fire({ icon: "error", title: "Error", text: data?.error || "Error al agregar producto al carrito", background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838" });
    return;
  }

  Swal.fire({ icon: "success", title: "Agregado", text: `Se agregaron ${cantidad} unidades al carrito`, background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838", timer: 1800, showConfirmButton: false });
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btnAgregarCarrito")) return;

  const card = e.target.closest("[data-id]");
  const pid = card.dataset.id;

  const inputCantidad = card.querySelector(".inputCantidad");
  let cantidad = parseInt(inputCantidad.value);

  if (isNaN(cantidad) || cantidad < 1) {
    Swal.fire({ icon: "warning", title: "Cantidad invalida", text: "Ingresa una cantidad valida.", background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838" });
    return;
  }

  agregarAlCarrito(pid, cantidad);
});
