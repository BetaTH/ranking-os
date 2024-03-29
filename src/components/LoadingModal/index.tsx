import loading from "../../img/loading.svg";
import styles from "./styles.module.scss";

export function LoadingModal() {
  return (
    <div className={styles.modal}>
      <img className={styles.loading} src={loading} alt="Loading" />
    </div>
  );
}
