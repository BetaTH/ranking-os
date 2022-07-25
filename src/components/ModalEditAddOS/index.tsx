import styles from "./styles.module.scss";
import { propsModal } from "../../interfaces/os-interfaces";
import { AutocompleteModalInputs } from "../AutocompleteModalInputs";
import { useState } from "react";
import * as functions from "../ModalEditAddOS/functions";

export function ModalEditAddOS(props: propsModal) {
  const OStoEdit = props.OStoEdit;
  const [isACVisible, setIsACVisible] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [inputEl, setInputEl] = useState<HTMLInputElement>();
  const [search, setSearch] = useState("");

  function onClickInput(e: HTMLInputElement, InputId: string) {
    const newisACVisible: { [key: string]: boolean } = {
      operador: false,
      zona: false,
      tipoOS: false,
      equipe: false,
      transporte: false,
      taxa: false,
      correcao: false,
    };
    newisACVisible[InputId] = true;
    setIsACVisible(newisACVisible);
    setInputEl(e);
  }

  function onChanceInput(e: HTMLInputElement, InputId: string) {
    setSearch(e.value as string);
  }

  const teste = {
    operador: ["thielson", "thercio", "will", "aline", "laice", "Erica"],
    zona: ["Norte", "Sul"],
    equipe: ["thielson", "thiago"],
    transporte: ["Carro", "Moto"],
    tipoOS: ["Nivel 1", "Nivel 2", "Mudança de Local"],
  };

  return (
    <div
      id="Conteiner"
      onClick={(e) =>
        (e.target as HTMLDivElement).id == "Conteiner"
          ? props.setIsModalVisible(false)
          : null
      }
      className={styles.conteiner}
    >
      <div className={styles.modal}>
        <div className={styles.formModal}>
          <div className={styles.rowTitle}>
            <div
              style={{
                borderBottom: "0.1rem solid #2C3639",
                padding: "0rem 1.5rem",
              }}
            >
              {props.typeModal == "edit" ? (
                <h2 className={styles.title}>Edição de OS</h2>
              ) : (
                <h2 className={styles.title}>Adição de OS</h2>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Operador </label>
            </div>
            <div className={styles.rowInput}>
              <input
                className={styles.input}
                id="operador"
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.operador : ""
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "operador")
                }
                onChange={(e) =>
                  onChanceInput(e.target as HTMLInputElement, "operador")
                }
              />
              {isACVisible?.operador ? (
                <AutocompleteModalInputs
                  values={teste.operador}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                  validateAutocompleteInputs={
                    functions.validateAutocompleteInputs
                  }
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Zona: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="zona"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.zona : ""}
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "zona")
                }
                onChange={(e) => {
                  onChanceInput(e.target as HTMLInputElement, "zona");
                }}
              />
              {isACVisible?.zona ? (
                <AutocompleteModalInputs
                  values={teste.zona}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                  validateAutocompleteInputs={
                    functions.validateAutocompleteInputs
                  }
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>ID OS: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="idOS"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.idOS : ""}
                onBlur={() => functions.validadeClienteOS("idOS")}
                onChange={(e) =>
                  ((e.target as HTMLInputElement).style.border =
                    "0.1rem solid #ffffff")
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>ID Cliente: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="cliente"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.cliente : ""
                }
                onBlur={() => functions.validadeClienteOS("cliente")}
                onChange={(e) =>
                  ((e.target as HTMLInputElement).style.border =
                    "0.1rem solid #ffffff")
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Tipo da OS: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="tipoOS"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.tipoOS : ""}
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "tipoOS")
                }
                onChange={(e) =>
                  onChanceInput(e.target as HTMLInputElement, "tipoOS")
                }
              />
              {isACVisible?.tipoOS ? (
                <AutocompleteModalInputs
                  values={teste.tipoOS}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                  validateAutocompleteInputs={
                    functions.validateAutocompleteInputs
                  }
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Equipe: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="equipe"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.equipe : ""}
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "equipe")
                }
                onChange={(e) =>
                  onChanceInput(e.target as HTMLInputElement, "equipe")
                }
              />
              {isACVisible?.equipe ? (
                <AutocompleteModalInputs
                  values={teste.equipe}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                  validateAutocompleteInputs={
                    functions.validateAutocompleteInputs
                  }
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Transporte: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="transporte"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.transporte : ""
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "transporte")
                }
                onChange={(e) =>
                  onChanceInput(e.target as HTMLInputElement, "transporte")
                }
              />
              {isACVisible?.transporte ? (
                <AutocompleteModalInputs
                  values={teste.transporte}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                  validateAutocompleteInputs={
                    functions.validateAutocompleteInputs
                  }
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Data de Abertura: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="dataAbertura"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.dataAbertura : ""
                }
                onBlur={() => functions.validateDataAbertura()}
                onChange={(e) =>
                  ((e.target as HTMLInputElement).style.border =
                    "0.1rem solid #ffffff")
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Data de Fechamento: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                id="dataFechamento"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.dataFechamento : ""
                }
                onBlur={() => functions.validateDataFechamento()}
                onChange={(e) =>
                  ((e.target as HTMLInputElement).style.border =
                    "0.1rem solid #ffffff")
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Taxa: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.taxa : "Não"
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "taxa")
                }
                onChange={(e) =>
                  onChanceInput(e.target as HTMLInputElement, "taxa")
                }
              />
              {isACVisible?.taxa ? (
                <AutocompleteModalInputs
                  values={["Sim", "Não"]}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Status Correção: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.correcao : "Não"
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "correcao")
                }
                onChange={(e) =>
                  onChanceInput(e.target as HTMLInputElement, "correcao")
                }
              />
              {isACVisible?.correcao ? (
                <AutocompleteModalInputs
                  values={["Sim", "Não"]}
                  inputEl={inputEl as HTMLInputElement}
                  setIsACvisible={setIsACVisible}
                  search={search}
                  setSearch={setSearch}
                />
              ) : null}
            </div>
          </div>

          <div className={styles.rowButton}>
            <button
              className={styles.saveButton}
              onClick={() =>
                props.typeModal == "edit"
                  ? onClickEdit(props)
                  : onClickAdd(props)
              }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function onClickEdit(props: propsModal) {
  props.setIsModalVisible(false);
}

function onClickAdd(props: propsModal) {}
