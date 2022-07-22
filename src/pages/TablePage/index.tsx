import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Headers } from "../../components/Headers";
import { Table } from "../../components/Tabela";
import { CaretDown } from "phosphor-react";

export function TablePage() {
  const [dataOS, setDataOS] = useState({ rankingMoto: [], rankingGeral: [] });
  const [loadingData, setLoadingData] = useState(true);
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Headers arr={{ setDataOS: setDataOS, setLoadingData: setLoadingData }} />
      <div className={styles.rankingsContainer}>
        {/* <div className={styles.titleSearchConteiner}>
          <h2 className={styles.tableTitle}>Tabela de OS Fechada</h2>
          <div className={styles.searchConteiner}>
            <label className={styles.searchLabel}>Pesquisar por: </label>
            <select
              className={styles.typeSearch}
              name="typeSearch"
              id="typeSearch"
            >
              <option value="DataInserção">Data de Inserção</option>
              <option value="DataAbertura">Data de Abertura</option>
              <option value="DataFechamento">Data de Fechamento</option>
            </select>
            <CaretDown height={"100%"} width={"2rem"} />
          </div>
        </div> */}
        <Table />
      </div>
    </div>
  );
}
