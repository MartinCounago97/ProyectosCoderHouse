function obtenerCid() {
  return localStorage.getItem("cid");
}

function formatearPrecio(n) {
  const num = Number(n || 0);
  return num.toLocaleString("es-UY");
}

function calcularTotal(carrito) {
  if (!carrito?.productos?.length) return 0;

  return carrito.productos.reduce((acc, item) => {
    const precio = item?.producto?.precio ?? 0;
    const cantidad = item?.cantidad ?? 0;
    return acc + precio * cantidad;
  }, 0);
}

function renderizar(carrito) {
  const estado = document.getElementById("estadoCarrito");
  const lista = document.getElementById("listaCarrito");
  const totalEl = document.getElementById("totalCarrito");

  if (!carrito || !carrito.productos || carrito.productos.length === 0) {
    estado.textContent = "Tu carrito está vacío.";
    lista.innerHTML = "";
    totalEl.textContent = "";
    return;
  }

  lista.innerHTML = carrito.productos
    .map((item) => {
      const p = item.producto;
      const pid = p?._id;
      const titulo = p?.titulo ?? "Producto";
      const precio = p?.precio ?? 0;
      const cantidad = item?.cantidad ?? 0;

      return `
      <div class="row" data-pid="${pid}">
        <div>
          <b>${titulo}</b>
          <div class="muted">$${formatearPrecio(precio)} x ${cantidad}</div>
        </div>
        <div class="right">
          <button class="btn btn--warn btnQuitar" type="button">Quitar</button>
        </div>
      </div>
    `;
    })
    .join("");

  const total = calcularTotal(carrito);
  totalEl.textContent = `Total: $${formatearPrecio(total)}`;
}

async function obtenerCarrito() {
  const cid = obtenerCid();
  if (!cid) return null;

  const res = await fetch(`/api/carritos/${cid}`);
  if (!res.ok) return null;

  return res.json();
}

async function quitarProducto(pid) {
  const cid = obtenerCid();
  if (!cid) return;

  await fetch(`/api/carritos/${cid}/productos/${pid}`, { method: "DELETE" });
  const carrito = await obtenerCarrito();
  renderizar(carrito);
}

async function vaciarCarrito() {
  const cid = obtenerCid();
  if (!cid) return;

  await fetch(`/api/carritos/${cid}`, { method: "DELETE" });
  const carrito = await obtenerCarrito();
  renderizar(carrito);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnQuitar")) {
    const fila = e.target.closest(".row"); // ✅ antes era "li"
    const pid = fila?.dataset?.pid; // ✅ lee data-pid

    if (!pid) return;

    quitarProducto(pid);
  }
});
document.getElementById("btnVaciar").addEventListener("click", () => {
  vaciarCarrito();
});
document.getElementById("btnConfirmar").addEventListener("click", async () => {
  const cid = obtenerCid();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    Swal.fire({ icon: "warning", title: "Sesion requerida", text: "Debes iniciar sesion para confirmar la compra.", background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838" });
    window.location.href = "/login";
    return;
  }

  try {
    const res = await fetch("/api/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carritoId: cid, usuarioId: userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      Swal.fire({ icon: "error", title: "Error", text: data.error || "Error al confirmar la venta", background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838" });
      return;
    }

    Swal.fire({ icon: "success", title: "Compra confirmada!", text: `Total: $${data.total.toLocaleString("es-UY")}`, background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838" });
    const carrito = await obtenerCarrito();
    renderizar(carrito);
  } catch (e) {
    Swal.fire({ icon: "error", title: "Error", text: "Error de conexion al confirmar la venta", background: "#13151f", color: "#e8eaed", confirmButtonColor: "#e8a838" });
  }
});

(async () => {
  const carrito = await obtenerCarrito();
  renderizar(carrito);
})();
