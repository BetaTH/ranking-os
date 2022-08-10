import styles from "./styles.module.scss";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../contexts/AuthContext/AuthContex";
import { AuxToHideScroll } from "./AuxToHideScroll";
import { useViewport } from "../../hooks/useViewPort";

export function MobileCheck() {
  const navigate = useNavigate();
  const authService = new AuthService();
  const { setUser } = useContext(AuthContext);
  const { pathname } = useLocation();
  const { isMobileBreakPoint } = useViewport();

  const singOut = () => {
    authService.signOut().then(() => {
      setUser(null);
      navigate("/");
    });
  };
  return pathname !== "/dashboard" && isMobileBreakPoint ? (
    <AuxToHideScroll>
      <div className={styles.desktopCheck}>
        <button className={styles.logoutButton} onClick={singOut}>
          Sair
        </button>
        <span className={styles.spanWarning}>Acessar no Desktop!!</span>
        <span className={styles.spanWarning}>Ou</span>
        <button className={styles.dash} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>
    </AuxToHideScroll>
  ) : null;
}
