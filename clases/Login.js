class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.cliente = null;
  }

  setCliente(cliente) {
    this.cliente = cliente;
  }

  getCliente() {
    return this.cliente;
  }
}
