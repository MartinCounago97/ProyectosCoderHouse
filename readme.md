# Ecommerce (Coderhouse) — Entrega 2: Handlebars + WebSockets

Proyecto backend con:

- Node.js + Express
- MongoDB (Mongoose)
- Handlebars (vistas)
- Socket.io (WebSockets)

## Objetivo de la entrega 2

- Configurar Handlebars como motor de plantillas.
- Crear vista `home.handlebars` con listado de productos.
- Crear vista `realTimeProducts.handlebars` en endpoint `/realtimeproducts`.
- En `/realtimeproducts` se deben **actualizar automáticamente** los productos cada vez que:
  - Se crea un producto
  - Se elimina un producto
  - (extra) Se edita un producto

La creación/eliminación/edición se realiza por WebSockets (Socket.io), sin usar HTTP para esos cambios.

---

## Levantar MongoDB con Docker (recomendado)

```bash
docker run -d --name mongo-local -p 27017:27017 -v mongo_data:/data/db mongo:7
```
