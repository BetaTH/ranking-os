import classNames from "classnames";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PlusCircle } from "phosphor-react";
import { useContext, useState } from "react";
import { TablePageContext } from "../../contexts/TablePageContext/TablePageContext";
import { OStoEit, PropsTable } from "../../interfaces/os-interfaces";
import { Loading } from "../Loading";
import { ModalEditAddOS } from "../ModalEditAddOS";
import styles from "./styles.module.scss";

export function Table(props: PropsTable) {
  const {
    tableData,
    numPage,
    isLoadingMoreTableData,
    isLoadingData,
    setIsLoadingMoreTableData,
  } = useContext(TablePageContext);

  const [OStoEdit, setOStoEdit] = useState<OStoEit>({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal(item: OStoEit) {
    setOStoEdit(item);
    setIsModalVisible(true);
  }

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
        {isLoadingData ? (
          <Loading />
        ) : (
          tableData?.map((item, id) => {
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
                  {format(new Date(item.dataAbertura), "dd/MM/yyyy HH:mm", {
                    locale: ptBR,
                  })}
                </div>
                <div className={classNames(styles.colRows, styles.col8)}>
                  {format(new Date(item.dataFechamento), "dd/MM/yyyy HH:mm", {
                    locale: ptBR,
                  })}
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
          })
        )}

        {tableData.length < 20 + numPage * 10 ? null : (
          <div className={styles.rowLoadMoreData}>
            {!isLoadingMoreTableData ? (
              <PlusCircle
                onClick={() => {
                  setIsLoadingMoreTableData(true);
                  props.loadMoreData();
                }}
                className={styles.loadMoreData}
                width={"5rem"}
                height={"5rem"}
              />
            ) : (
              <Loading />
            )}
          </div>
        )}
      </div>
      {isModalVisible ? (
        <ModalEditAddOS
          OStoEdit={OStoEdit}
          setOStoEdit={setOStoEdit}
          setIsModalVisible={setIsModalVisible}
          typeModal="edit"
        />
      ) : null}
    </div>
  );
}
