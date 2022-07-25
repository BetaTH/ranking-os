import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Headers } from "../../components/Headers";
import { Table } from "../../components/Tabela";
import { CaretDown, Plus } from "phosphor-react";
import { ModalEditAddOS } from "../../components/ModalEditAddOS";

export function TablePage() {
  const [dataOS, setDataOS] = useState({ rankingMoto: [], rankingGeral: [] });
  const [loadingData, setLoadingData] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Headers titlePage={"tabela"}/>
      <div className={styles.rankingsContainer}>
        <div className={styles.addOSContainer}>
          <div className={styles.addOSSpanConteiner}>
            <span className={styles.addOSSpan}>Adicionar Nova OS</span>
          </div>
          <div className={styles.addOS} onClick={() => setIsModalVisible(true)}>
            <Plus height={"100%"} width={"6rem"} />
          </div>
        </div>
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
      {isModalVisible ? (
        <ModalEditAddOS typeModal="add" setIsModalVisible={setIsModalVisible} />
      ) : null}
    </div>
  );
}
