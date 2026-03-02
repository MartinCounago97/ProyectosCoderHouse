class Usuario {
  constructor(username, nombre, email) {
    this.username = username;
    this.nombre = nombre;
    this.email = email;
  }

  getUsername() {
    return this.username;
  }

  getNombre() {
    return this.nombre;
  }

  getEmail() {
    return this.email;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setEmail(email) {
    this.email = email;
  }

  descripcionCompleta() {
    return `${this.username} - ${this.nombre} - ${this.email}`;
  }
}
