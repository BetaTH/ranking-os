import classNames from "classnames";
import { useState } from "react";
import { OStoEit, PropsTable } from "../../interfaces/os-interfaces";
import { ModalEditAddOS } from "../ModalEditAddOS";
import styles from "./styles.module.scss";

export function Table(props : PropsTable) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [OStoEdit, setOStoEdit] = useState<OStoEit>({
    idOS: 0,
    operador: "",
    zona: "",
    cliente: "",
    tipoOS: "",
    equipe: "",
    transporte: "",
    dataAbertura: "",
    dataFechamento: "",
    trs: "",
    taxa: "",
    correcao: "",
    pontos: 0,
  });

  function showModal(item: OStoEit) {
    setOStoEdit(item);
    setIsModalVisible(true);
  }

  const OSData = [
    {
      idOS: 0,
      operador: "thielson",
      zona: "Norte",
      cliente: "01154",
      tipoOS: "Nivel 1",
      equipe: "Aglailton",
      transporte: "Carro",
      dataAbertura: "21/07/2022 00:00",
      dataFechamento: "22/07/2022 12:00",
      trs: "12 horas",
      taxa: "",
      correcao: "",
      pontos: 2,
    },

    {
      idOS: 1,
      operador: "thiago",
      zona: "Norte",
      cliente: "01154",
      tipoOS: "Nivel 1",
      equipe: "Aglailton",
      transporte: "Carro",
      dataAbertura: "21/07/2022 12:00",
      dataFechamento: "22/07/2022 12:00",
      trs: "24 horas",
      taxa: "",
      correcao: "",
      pontos: 2,
    },

    {
      idOS: 2,
      operador: "jefferson",
      zona: "Norte",
      cliente: "01154",
      tipoOS: "Nivel 1",
      equipe: "Aglailton",
      transporte: "Carro",
      dataAbertura: "20/07/2022 12:00",
      dataFechamento: "22/07/2022 12:00",
      trs: "48 horas",
      taxa: "sim",
      correcao: "Não",
      pontos: 2,
    },
  ];

  return (
    <div id="table" className={styles.conteiner}>
      <header className={styles.headerTable}>
        <div className={classNames(styles.colHeader, styles.col1)}>
          Operador
        </div>
        <div className={classNames(styles.colHeader, styles.col2)}>Zona</div>
        <div className={classNames(styles.colHeader, styles.col0)}>ID OS</div>
        <div className={classNames(styles.colHeader, styles.col3)}>
          ID Cliente
        </div>
        <div className={classNames(styles.colHeader, styles.col4)}>Tipo OS</div>
        <div className={classNames(styles.colHeader, styles.col5)}>Equipe</div>
        <div className={classNames(styles.colHeader, styles.col6)}>
          Transporte
        </div>
        <div className={classNames(styles.colHeader, styles.col7)}>
          Data Abertura
        </div>
        <div className={classNames(styles.colHeader, styles.col8)}>
          Data Finalização
        </div>
        <div className={classNames(styles.colHeader, styles.col9)}>
          TRS (hrs)
        </div>
        <div className={classNames(styles.colHeader, styles.col10)}>Taxa</div>
        <div className={classNames(styles.colHeader, styles.col11)}>
          Satus Correção
        </div>
        <div className={classNames(styles.colHeader, styles.col12)}>Pontos</div>
      </header>
      <div className={styles.rowsConteiner}>
        {OSData?.map((item, id) => {
          return (
            <div
              className={styles.rowTable}
              key={item.idOS}
              onClick={() => showModal(item)}
            >
              <div className={classNames(styles.colRows, styles.col1)}>
                {item.operador}
              </div>
              <div className={classNames(styles.colRows, styles.col2)}>
                {item.zona}
              </div>
              <div className={classNames(styles.colRows, styles.col0)}>
                {item.idOS}
              </div>
              <div className={classNames(styles.colRows, styles.col3)}>
                {item.cliente}
              </div>
              <div className={classNames(styles.colRows, styles.col4)}>
                {item.tipoOS}
              </div>
              <div className={classNames(styles.colRows, styles.col5)}>
                {item.equipe}
              </div>
              <div className={classNames(styles.colRows, styles.col6)}>
                {item.transporte}
              </div>
              <div className={classNames(styles.colRows, styles.col7)}>
                {item.dataAbertura}
              </div>
              <div className={classNames(styles.colRows, styles.col8)}>
                {item.dataFechamento}
              </div>
              <div className={classNames(styles.colRows, styles.col9)}>
                {item.trs}
              </div>
              <div className={classNames(styles.colRows, styles.col10)}>
                {item.taxa}
              </div>
              <div className={classNames(styles.colRows, styles.col11)}>
                {item.correcao}
              </div>
              <div className={classNames(styles.colRows, styles.col12)}>
                {item.pontos}
              </div>
            </div>
          );
        })}
      </div>
      {isModalVisible ? (
        <ModalEditAddOS
          listOptions = {props.listOptions}
          OStoEdit={OStoEdit}
          setOStoEdit={setOStoEdit}
          typeModal="edit"
          setIsModalVisible={setIsModalVisible}
        />
      ) : null}
    </div>
  );
}
