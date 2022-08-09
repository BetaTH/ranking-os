import styles from "./styles.module.scss";
import { useState, useEffect, useRef, useContext } from "react";
import { Headers } from "../../components/Headers";
import { Table } from "../../components/Tabela";
import { Plus } from "phosphor-react";
import { ModalEditAddOS } from "../../components/ModalEditAddOS";
import { api } from "../../api/api";
import { SocketContext } from "../../contexts/SocketContext/SocketContext";
import { TablePageContext } from "../../contexts/TablePageContext/TablePageContext";

export function TablePage() {
  const {
    tableData,
    numPage,

    setListOptions,
    setNumPage,
    setTableData,
    setIsLoadingMoreTableData,
  } = useContext(TablePageContext);
  const { socket } = useContext(SocketContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getNewData = () => {
      api.get("/getListOptions").then((res) => setListOptions(res.data));
      api
        .get("/getTableData", {
          params: { numPage: numPage, justAtt: "True" },
        })
        .then((res) => setTableData(res.data));
    };

    socket?.on("dbAttFront", getNewData);

    return function () {
      socket?.off("dbAttFront", getNewData);
    };
  }, [numPage, setTableData, socket]);

  function loadMoreData() {
    api.get("/getListOptions").then((res) => setListOptions(res.data));
    api
      .get("/getTableData", {
        params: { numPage: numPage },
      })
      .then((res) => {
        setTableData([...tableData, ...res.data]);
        setIsLoadingMoreTableData(false);
        setNumPage(numPage + 1);
      });
  }
  return (
    <div className={styles.container}>
      <Headers titlePage={"tabela"} />
      <div className={styles.rankingsContainer}>
        <div className={styles.addOSContainer}>
          <div className={styles.addOSSpanConteiner}>
            <span className={styles.addOSSpan}>Adicionar Nova OS</span>
          </div>
          <div className={styles.addOS} onClick={() => setIsModalVisible(true)}>
            <Plus height={"100%"} width={"6rem"} />
          </div>
        </div>
        <Table loadMoreData={loadMoreData} />
      </div>
      {isModalVisible ? (
        <ModalEditAddOS setIsModalVisible={setIsModalVisible} typeModal="add" />
      ) : null}
    </div>
  );
}
