class Proyecto {
  constructor(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.casosDePrueba = [];
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

  getCasos() {
    return this.casosDePrueba;
  }

  descripcionCompleta() {
    return `${this.id} - ${this.nombre} - ${this.descripcion}`;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }
}
