import styles from "./styles.module.scss";
import { useState, useEffect, memo, useCallback } from "react";
import { Headers } from "../../components/Headers";
import { Table } from "../../components/Tabela";
import { CaretDown, CodesandboxLogo, Plus } from "phosphor-react";
import { ModalEditAddOS } from "../../components/ModalEditAddOS";
import axios from "axios";
import { PropsTablePage } from "../../interfaces/os-interfaces";

export function TablePage(props: PropsTablePage) {
  const [listOptions, setListOptions] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [loadingData, setLoadingData] = useState(true);
  const [dataTable, setDataTable] = useState<{ [key: string]: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numPage, setNumPage] = useState(0);
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://ranking-os-backend-production.up.railway.app/getDashData/getListOptions"
      )
      .then((res) => setListOptions(res.data));
    axios
      .get(
        "https://ranking-os-backend-production.up.railway.app/getDashData/getTableData"
      )
      .then((res) => {
        setDataTable(res.data);
      }); //ainda está no localhost
  }, []);

  useEffect(() => {
    const getNewData = () => {
      axios
        .get(
          "http://ranking-os-backend-production.up.railway.app/getListOptions"
        )
        .then((res) => setListOptions(res.data));
      axios
        .get(
          "https://ranking-os-backend-production.up.railway.app/getTableData",
          {
            params: { numPage: numPage, justAtt: "True" },
          }
        )
        .then((res) => setDataTable(res.data));
      console.log("teste");
    };

    props.socket?.on("dbAttFront", getNewData);

    return function () {
      props.socket?.off("dbAttFront", getNewData);
    };
  }, [numPage, setDataTable, props.socket]);

  function loadMoreData() {
    axios
      .get("http://ranking-os-backend-production.up.railway.app/getListOptions")
      .then((res) => setListOptions(res.data));
    axios
      .get(
        "https://ranking-os-backend-production.up.railway.app/getTableData",
        {
          params: { numPage: numPage },
        }
      )
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
