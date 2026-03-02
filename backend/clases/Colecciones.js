let logines = [];
let usuarios = [];

let usuario1 = new Usuario(
  "mcounago",
  "Martin Counago",
  "martincounago@gmail.com"
);
usuarios.push(usuario1);

let login1 = new Login("mcounago", "mc1234");
logines.push(login1);
login1.setCliente(usuario1);
