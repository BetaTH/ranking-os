import styles from "./styles.module.scss";
import Logo from "../../img/logo.svg";
import { arr, propsHeaders } from "../../interfaces/os-interfaces";
import { SearchDataDashPage } from "../SearchDataDashPage";
import { useNavigate } from "react-router-dom";

export function Headers(prop: propsHeaders) {
  const navigate = useNavigate();

  const goToTablePage = () => {
    navigate("/");
  };

  const goToDashPage = () => {
    navigate("/dashboard");
  };
  return (
    <header className={styles.divHeaders}>
      <div className={styles.divLogoTitle}>
        <img className={styles.logo} src={Logo} alt="Logo" />
        {prop.titlePage === "dash" ? (
          <h1 className={styles.titulo}>Ranking OS Externo</h1>
        ) : (
          <h1 className={styles.titulo}>Tabela de OS Fechada</h1>
        )}
        {prop.titlePage === "dash" ? (
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
      {prop.titlePage === "dash" ? (
        <SearchDataDashPage arr={prop.setPropsSearchDataDashPage as arr} />
      ) : null}
    </header>
  );
}
