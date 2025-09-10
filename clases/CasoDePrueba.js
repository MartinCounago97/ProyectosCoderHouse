class CasoDePrueba {
  constructor(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = "Pendiente";
    this.proyectoId = null;
  }

  getId() {
    return this.id;
  }

  getNombre() {
    return this.nombre;
  }

  getDescripcion() {
    return this.descripcion;
  }

  getEstado() {
    return this.estado;
  }

  getProyectoId() {
    return this.proyectoId;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }

  setProyectoId(proyectoId) {
    this.proyectoId = proyectoId;
  }

  setEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  descripcionCompleta() {
    return `${this.id} - ${this.nombre} - ${this.descripcion} - Estado: ${this.estado}`;
  }
}
