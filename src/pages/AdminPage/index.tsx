import classnames from "classnames";
import { X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import * as functions from "./functions";
import { api } from "../../api";
import { CrudLoadingModal } from "../../components/crudLoadingModal";
import { Headers } from "../../components/Headers";

export function AdminPage() {
  const [campo, setCampo] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowtoEdit, setRowToEdit] = useState<{
    [key: string]: string;
  }>({});
  const [typeModal, setTypeModal] = useState("");
  const [data, setData] = useState<{
    [key: string]: { [key: string]: string }[];
  }>({});
  const [isCrudLoading, setIsCrudLoading] = useState(false);

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const effecOnlyRun = useRef(false);

  useEffect(() => {
    if (effecOnlyRun.current === false) {
      api.get("/getTablesOptions").then((res) => {
        setData(res.data);
      });
    }

    return () => {
      effecOnlyRun.current = true;
    };
  }, []);

  function setNewCampo(newCampo: string) {
    setCampo(newCampo);
  }

  const listClumnsNames: { [key: string]: string } = {
    equipe: "Equipe",
    operador: "Operador",
    zona: "Zona",
    tipoOS: "Tipo de OS",
    transporte: "Transporte",
  };

  return (
    <div className={styles.pageConteiner}>
      <Headers titlePage="admin" />
      <div className={styles.adminConteiner}>
        <div className={styles.slectedOptionConteiner}>
          <div
            className={classnames(styles.divButtons)}
            onClick={() => setNewCampo("equipe")}
          >
            Equipes
          </div>
          <div
            className={classnames(styles.divButtons)}
            onClick={() => setNewCampo("operador")}
          >
            Operador
          </div>
          <div
            className={classnames(styles.divButtons)}
            onClick={() => setNewCampo("zona")}
          >
            Zona
          </div>
          <div
            className={classnames(styles.divButtons)}
            onClick={() => setNewCampo("tipoOS")}
          >
            Tipo OS
          </div>
          <div
            className={classnames(styles.divButtons)}
            onClick={() => setNewCampo("transporte")}
          >
            Transporte
          </div>
        </div>
        <div className={styles.tableConteirner}>
          {campo != "" ? (
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div
                  className={classnames(styles.colHeader, {
                    [styles.col1]: campo == "equipe" || campo == "tipoOS",
                    [styles.col0]: campo !== "equipe" && campo !== "tipoOS",
                  })}
                >
                  {listClumnsNames[campo]}
                </div>
                {campo == "equipe" || campo == "tipoOS" ? (
                  <div className={classnames(styles.colHeader, styles.col2)}>
                    {campo == "equipe" ? "Transporte Padrão" : "Pontos"}
                  </div>
                ) : null}
                {campo == "equipe" ? (
                  <div className={classnames(styles.colHeader, styles.col3)}>
                    Link da Foto
                  </div>
                ) : null}
              </div>
              <div className={styles.tableRows}>
                {data[campo]?.map((item, id) => {
                  return (
                    <div
                      key={item.id}
                      className={styles.tableRow}
                      onClick={() => {
                        setRowToEdit(item);
                        setTypeModal("edit");
                        setIsModalVisible(true);
                      }}
                    >
                      <div
                        className={classnames(styles.colRow, {
                          [styles.col1]: campo == "equipe" || campo == "tipoOS",
                          [styles.col0]:
                            campo !== "equipe" && campo !== "tipoOS",
                        })}
                      >
                        {item[campo]}
                      </div>
                      {campo == "equipe" || campo == "tipoOS" ? (
                        <div className={classnames(styles.colRow, styles.col2)}>
                          {campo == "equipe"
                            ? item.transportePadrao
                            : item.pontos}
                        </div>
                      ) : null}
                      {campo == "equipe" ? (
                        <div className={classnames(styles.colRow, styles.col3)}>
                          {item.linkFoto}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className={styles.buttonConteiner}>
                <div
                  className={styles.buttonAdd}
                  onClick={() => {
                    setTypeModal("add");
                    setIsModalVisible(true);
                  }}
                >
                  Adicionar
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {isModalVisible ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.formModal}>
              <div className={styles.rowTitle}>
                <div
                  style={{
                    borderBottom: "0.1rem solid #2C3639",
                    padding: "0rem 1.5rem",
                  }}
                >
                  {typeModal == "edit" ? (
                    <h2 className={styles.title}>Edição</h2>
                  ) : (
                    <h2 className={styles.title}>Adição</h2>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>
                  <label className={styles.label}>
                    {listClumnsNames[campo]}{" "}
                  </label>
                </div>
                <div className={styles.rowInput}>
                  <input
                    ref={input1Ref}
                    autoComplete="off"
                    placeholder="Selecionar uma opção"
                    className={styles.input}
                    type="text"
                    defaultValue={typeModal == "edit" ? rowtoEdit[campo] : ""}
                  />
                </div>
              </div>
              {campo == "equipe" || campo == "tipoOS" ? (
                <div className={styles.row}>
                  <div className={styles.rowLabel}>
                    <label className={styles.label}>
                      {campo == "equipe" ? "Transporte Padrão" : "Pontos"}{" "}
                    </label>
                  </div>
                  <div className={styles.rowInput}>
                    <input
                      ref={input2Ref}
                      autoComplete="off"
                      placeholder="Selecionar uma opção"
                      className={styles.input}
                      type="text"
                      defaultValue={
                        typeModal == "edit"
                          ? campo == "equipe"
                            ? rowtoEdit?.transportePadrao
                            : rowtoEdit?.pontos
                          : ""
                      }
                    />
                  </div>
                </div>
              ) : null}
              {campo == "equipe" ? (
                <div className={styles.row}>
                  <div className={styles.rowLabel}>
                    <label className={styles.label}>Link da Foto</label>
                  </div>
                  <div className={styles.rowInput}>
                    <input
                      ref={input3Ref}
                      autoComplete="off"
                      placeholder="Selecionar uma opção"
                      className={styles.input}
                      type="text"
                      defaultValue={
                        typeModal == "edit" ? rowtoEdit?.linkFoto : ""
                      }
                    />
                  </div>
                </div>
              ) : null}
              <div className={styles.rowButton}>
                {typeModal == "edit" ? (
                  <button
                    tabIndex={0}
                    className={styles.deleteButton}
                    onClick={() => {
                      setIsCrudLoading(true);
                      functions.deleteData({
                        setIsModalVisible: setIsModalVisible,
                        setData: setData,
                        id: rowtoEdit.id,
                        campo: campo,
                        equipeid: rowtoEdit.equipe ? rowtoEdit.equipe : null,
                        setIsCrudLoading: setIsCrudLoading,
                      });
                    }}
                  >
                    Deletar
                  </button>
                ) : null}

                <button
                  tabIndex={0}
                  className={styles.saveButton}
                  onClick={() => {
                    setIsCrudLoading(true);
                    typeModal == "edit"
                      ? functions.getDataToAddOrEdit({
                          typeModal: "edit",
                          setIsModalVisible: setIsModalVisible,
                          id: rowtoEdit.id,
                          input1Ref: input1Ref.current,
                          input2Ref: input2Ref.current,
                          input3Ref: input3Ref.current,
                          campo: campo,
                          setData: setData,
                          setIsCrudLoading: setIsCrudLoading,
                        })
                      : functions.getDataToAddOrEdit({
                          setIsModalVisible: setIsModalVisible,
                          typeModal: "add",
                          input1Ref: input1Ref.current,
                          input2Ref: input2Ref.current,
                          input3Ref: input3Ref.current,
                          campo: campo,
                          setData: setData,
                          setIsCrudLoading: setIsCrudLoading,
                        });
                  }}
                >
                  Salvar
                </button>
              </div>
            </div>
            <X
              className={styles.close}
              size={32}
              onClick={() => setIsModalVisible(false)}
            />
            {isCrudLoading ? <CrudLoadingModal /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
