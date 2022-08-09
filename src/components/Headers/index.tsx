import styles from "./styles.module.scss";
import Logo from "../../img/logo.svg";
import { propsHeaders } from "../../interfaces/os-interfaces";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { NavigationArrow } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContex";

export function Headers(prop: propsHeaders) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const authService = new AuthService();

  const goToTablePage = () => {
    navigate("/tabela");
  };

  const goToDashPage = () => {
    navigate("/dashboard");
  };

  const singOut = () => {
    authService.signOut().then(() => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <header className={styles.divHeaders}>
      <div className={styles.divLogoTitle}>
        <img className={styles.logo} src={Logo} alt="Logo" />
        {prop.titlePage === "dash" ? (
          <h1 className={styles.titulo}>Ranking OS Externo</h1>
        ) : prop.titlePage === "admin" ? (
          <h1 className={styles.titulo}>Admin</h1>
        ) : (
          <h1 className={styles.titulo}>Tabela de OS Fechada</h1>
        )}
        {user.email == "tecnicosuporte.g3@gmail.com" ? null : prop.titlePage ===
          "dash" ? (
          <button
            className={styles.naviationButton}
            onClick={() => goToTablePage()}
          >
            Tabela
          </button>
        ) : (
          <button
            className={styles.naviationButton}
            onClick={() => goToDashPage()}
          >
            Dashboard
          </button>
        )}
      </div>
      <button className={styles.logoutButton} onClick={singOut}>
        Sair
      </button>
    </header>
  );
}
