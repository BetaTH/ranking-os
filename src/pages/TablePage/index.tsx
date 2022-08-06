import styles from "./styles.module.scss";
import { useState, useEffect, useRef, useContext } from "react";
import { Headers } from "../../components/Headers";
import { Table } from "../../components/Tabela";
import { Plus } from "phosphor-react";
import { ModalEditAddOS } from "../../components/ModalEditAddOS";
import { PropsTablePage } from "../../interfaces/os-interfaces";
import StateContext from "../../Teste/Context/StateContext";
import { api } from "../../api";

export function TablePage(props: PropsTablePage) {
  const effecOnlyRun = useRef(false);
  const { dispatch } = useContext(StateContext);

  const [listOptions, setListOptions] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [dataTable, setDataTable] = useState<{ [key: string]: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numPage, setNumPage] = useState(0);
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

  useEffect(() => {
    if (effecOnlyRun.current === false) {
      dispatch({ type: "incrementNumPage" });
      api.get("/getListOptions").then((res) => setListOptions(res.data));
      api.get("/getTableData").then((res) => {
        setDataTable(res.data);
      }); //ainda está no localhost
    }

    return () => {
      effecOnlyRun.current = true;
    };
  }, []);

  useEffect(() => {
    const getNewData = () => {
      api.get("/getListOptions").then((res) => setListOptions(res.data));
      api
        .get("/getTableData", {
          params: { numPage: numPage, justAtt: "True" },
        })
        .then((res) => setDataTable(res.data));
    };

    props.socket?.on("dbAttFront", getNewData);

    return function () {
      props.socket?.off("dbAttFront", getNewData);
    };
  }, [numPage, setDataTable, props.socket]);

  function loadMoreData() {
    api.get("/getListOptions").then((res) => setListOptions(res.data));
    api
      .get("/getTableData", {
        params: { numPage: numPage },
      })
      .then((res) => {
        setDataTable([...dataTable, ...res.data]);
        setIsLoadingMoreData(false);
        setNumPage(numPage + 1);
      }); //ainda está no localhost
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
        <Table
          socket={props.socket}
          listOptions={listOptions}
          dataTable={dataTable}
          numPage={numPage}
          setIsLoadingMoreData={setIsLoadingMoreData}
          isLoadingMoreData={isLoadingMoreData}
          setNumPage={setNumPage}
          loadMoreData={loadMoreData}
        />
      </div>
      {isModalVisible ? (
        <ModalEditAddOS
          socket={props.socket}
          listOptions={listOptions}
          typeModal="add"
          setIsModalVisible={setIsModalVisible}
        />
      ) : null}
    </div>
  );
}
