function formatearPrecio(n) {
  return Number(n || 0).toLocaleString("es-UY");
}

function formatearFecha(fecha) {
  const d = new Date(fecha);
  return d.toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function cargarVentas() {
  const loading = document.getElementById("ventasLoading");
  const lista = document.getElementById("ventasList");

  try {
    const res = await fetch("/api/ventas");
    if (!res.ok) throw new Error("Error al obtener ventas");

    const ventas = await res.json();

    if (!ventas.length) {
      loading.textContent = "No hay ventas registradas.";
      return;
    }

    loading.style.display = "none";

    lista.innerHTML = ventas
      .map((v) => {
        const usuario = v.usuario?.username || "Usuario desconocido";
        const fecha = formatearFecha(v.fecha);
        const productos = v.productos
          .map(
            (p) =>
              `<span style="color:var(--text-2);font-size:13px;">${p.producto?.titulo || "Producto"} x${p.cantidad} — $${formatearPrecio(p.precioUnitario)}</span>`
          )
          .join("<br>");

        return `
        <div class="card" style="margin-bottom:0;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
            <div>
              <h3 style="margin:0 0 4px;font-family:'Outfit',sans-serif;font-size:15px;">
                ${usuario}
              </h3>
              <div class="muted" style="font-size:12px;">${fecha}</div>
            </div>
            <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:18px;color:var(--accent);">
              $${formatearPrecio(v.total)}
            </div>
          </div>
          <hr class="hr" style="margin:12px 0;" />
          <div>${productos}</div>
        </div>
        `;
      })
      .join("");
  } catch (e) {
    loading.textContent = "Error al cargar ventas.";
  }
}

cargarVentas();
