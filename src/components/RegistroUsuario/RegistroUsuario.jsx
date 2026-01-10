import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import "./RegistroUsuario.css";
import { useNavigate } from "react-router-dom";

const RegistroUsuario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Usuario registrado con éxito");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setError(null);
    } catch (err) {
      setError(`Error al registrar el usuario: ${err.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="registroContainer">
      <h2>Registro de Usuario</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default RegistroUsuario;
