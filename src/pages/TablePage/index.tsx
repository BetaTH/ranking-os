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

  useEffect(() => {
    if (sessionStorage.getItem(String(100 * todayYear + todayMonth))) {
      let datStoraged = String(
        sessionStorage.getItem(String(100 * todayYear + todayMonth))
      );
      setDataOS(JSON.parse(datStoraged));
      setLoadingData(false);
    } else {
      let queryParams = {
        month: String(todayMonth),
        year: String(todayYear),
      };
      let url = new URL("http://localhost:5000/getRanking");
      let k: keyof typeof queryParams;
      for (k in queryParams) {
        url.searchParams.append(k, queryParams[k]);
      }
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          setDataOS(res);
          setLoadingData(false);
          sessionStorage.setItem(
            String(100 * todayYear + todayMonth),
            JSON.stringify({
              rankingMoto: res.rankingMoto,
              rankingGeral: res.rankingGeral,
            })
          );
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Headers arr={{ setDataOS: setDataOS, setLoadingData: setLoadingData }} />
      <div className={styles.rankingsContainer}>
        <div className={styles.titleSearchConteiner}>
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
        </div>
        <Table />
      </div>
    </div>
  );
}
