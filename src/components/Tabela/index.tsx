import classNames from "classnames";
import styles from "./styles.module.scss";

export function Table() {
  return (
    <div className={styles.conteiner}>
      <header className={styles.headerConteiner}>
        <div className={classNames(styles.col, styles.col0)}>ID OS</div>
        <div className={classNames(styles.col, styles.col1)}>Operador</div>
        <div className={classNames(styles.col, styles.col2)}>Zona</div>
        <div className={classNames(styles.col, styles.col3)}>ID Cliente</div>
        <div className={classNames(styles.col, styles.col4)}>Tipo OS</div>
        <div className={classNames(styles.col, styles.col5)}>Equipe</div>
        <div className={classNames(styles.col, styles.col6)}>Transporte</div>
        <div className={classNames(styles.col, styles.col7)}>Data Abertura</div>
        <div className={classNames(styles.col, styles.col8)}>
          Data Finalização
        </div>
        <div className={classNames(styles.col, styles.col9)}>TRS (hrs)</div>
        <div className={classNames(styles.col, styles.col10)}>Taxa</div>
        <div className={classNames(styles.col, styles.col11)}>
          Satus Correção
        </div>
        <div className={classNames(styles.col, styles.col12)}>Pontos</div>
      </header>
    </div>
  );
}
