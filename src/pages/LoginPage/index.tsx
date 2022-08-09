import styles from "./styles.module.scss";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../contexts/AuthContext/AuthContex";

export function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const authService = new AuthService();
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const login = () => {
    userRef.current && passRef.current
      ? authService
          .login(userRef.current.value, passRef.current.value)
          .then((user) => {
            setUser(user.user);
            if (user.user.email == "tecnicosuporte.g3@gmail.com") {
              navigate("/dashboard");
            } else if (user.user.email == "adminexterno.g3@gmail.com") {
              navigate("/admin");
            } else {
              navigate("/tabela");
            }
          })
      : null;
  };

  return (
    <div className={styles.conteiner}>
      <div className={styles.loginConteiner}>
        <div className={styles.row}>
          <label>Usuário:</label>
          <input ref={userRef} type="text" placeholder="Usuário" />
        </div>
        <div className={styles.row}>
          <label>Senha:</label>
          <input ref={passRef} type="password" placeholder="Senha" />
        </div>
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}