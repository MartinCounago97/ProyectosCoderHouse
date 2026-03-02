const socket = io();

const list = document.getElementById("productosList");
const form = document.getElementById("createForm");
function render(productos) {
  list.innerHTML = productos
    .map(
      (p) => `
      <div class="row" data-id="${p._id}">
        <div style="flex:1; display:grid; gap:8px;">
          <div>
            <label class="muted">Título</label>
            <input class="input titulo" value="${p.titulo ?? ""}" />
          </div>

          <div>
            <label class="muted">Descripción</label>
            <input class="input descripcion" value="${p.descripcion ?? ""}" />
          </div>
        </div>

        <div style="width:200px; display:grid; gap:8px;">
          <div>
            <label class="muted">Precio</label>
            <input class="input precio" type="number" min="0" value="${
              p.precio ?? 0
            }" />
          </div>

          <div>
            <label class="muted">Stock</label>
            <input class="input stock" type="number" min="0" value="${
              p.stock ?? 0
            }" />
          </div>
        </div>

        <div class="right">
          <button class="btn btn--warn saveBtn" type="button">Guardar</button>
          <button class="btn btn--danger deleteBtn" type="button">Eliminar</button>
        </div>
      </div>
    `
    )
    .join("");
}

socket.on("productos:list", (productos) => {
  render(productos);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);

  socket.emit("productos:create", {
    titulo: fd.get("titulo"),
    descripcion: fd.get("descripcion") || "",
    precio: Number(fd.get("precio")),
    stock: Number(fd.get("stock") || 0),
  });

  form.reset();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains("deleteBtn")) {
    socket.emit("productos:delete", id);
    return;
  }

  if (e.target.classList.contains("saveBtn")) {
    const changes = {
      titulo: li.querySelector(".titulo").value,
      descripcion: li.querySelector(".descripcion").value,
      precio: Number(li.querySelector(".precio").value),
      stock: Number(li.querySelector(".stock").value),
    };

    socket.emit("productos:update", { id, changes });
  }
});
