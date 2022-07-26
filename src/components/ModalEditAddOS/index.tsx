import styles from "./styles.module.scss";
import { propsModal } from "../../interfaces/os-interfaces";
import { AutocompleteModalInputs } from "../AutocompleteModalInputs";
import { useEffect, useState } from "react";
import * as functions from "../ModalEditAddOS/functions";
import { CaretDown, Target, X } from "phosphor-react";

export function ModalEditAddOS(props: propsModal) {
  const OStoEdit = props.OStoEdit;
  const [isACVisible, setIsACVisible] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [inputEl, setInputEl] = useState<HTMLInputElement>();
  const [search, setSearch] = useState("");

  
  useEffect(()=>{
    document.querySelectorAll('body').forEach((target) => target.classList.add("noScroll"))
    return ()=>{
      document.querySelectorAll('body').forEach((target) => target.classList.remove("noScroll"))
    };
  })
  
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

  function onChangeInput(e: HTMLInputElement, InputId: string) {
    setSearch(e.value as string);
    e.style.border = "0.1rem solid #ffffff"
    if (!isACVisible[InputId]) {
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
  }

  return (
    <div
      id="Conteiner"
      onClick={(e) =>
        (e.target as HTMLDivElement).id == "Conteiner"
          ? (props.typeModal=="edit") ?
          props.setIsModalVisible(false)
          : null : null
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
                placeholder="Selecionar uma opção"
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
                  onChangeInput(e.target as HTMLInputElement, "operador")
                }
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
              {isACVisible?.operador ? (
                <AutocompleteModalInputs
                  values={props.listOptions.operador}
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
                placeholder="Selecionar uma opção"
                id="zona"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.zona : ""}
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "zona")
                }
                onChange={(e) => {
                  onChangeInput(e.target as HTMLInputElement, "zona");
                }}
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
              {isACVisible?.zona ? (
                <AutocompleteModalInputs
                  values={props.listOptions.zona}
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
                placeholder="Digitar ID da OS"
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
                placeholder="Digitar ID do cliente"
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
                placeholder="Selecionar uma opção"
                id="tipoOS"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.tipoOS : ""}
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "tipoOS")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "tipoOS")
                }
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
              {isACVisible?.tipoOS ? (
                <AutocompleteModalInputs
                  values={props.listOptions.tipoOS}
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
                placeholder="Selecionar uma opção"
                id="equipe"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.equipe : ""}
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "equipe")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "equipe")
                }
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
              {isACVisible?.equipe ? (
                <AutocompleteModalInputs
                  values={props.listOptions.equipe}
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
                placeholder="Selecionar uma opção"
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
                  onChangeInput(e.target as HTMLInputElement, "transporte")
                }
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
              {isACVisible?.transporte ? (
                <AutocompleteModalInputs
                  values={props.listOptions.transporte}
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
                placeholder="dd/mm/aaaa hh:mm"
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
                placeholder="dd/mm/aaaa hh:mm"
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
                placeholder="Selecionar uma opção"
                id="taxa"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.taxa : "Não"
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "taxa")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "taxa")
                }
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
              {isACVisible?.taxa ? (
                <AutocompleteModalInputs
                  values={props.listOptions.taxa}
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
                placeholder="Selecionar uma opção"
                id="correcao"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.correcao : "Não"
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "correcao")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "correcao")
                }
              />
              <CaretDown className={styles.arrowDown} height={"100%"} width={"2rem"}/>
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
        <X className={styles.close} size={32} onClick={()=>props.setIsModalVisible(false)}/>
      </div>
    </div>
  );
}

function onClickEdit(props: propsModal) {
  functions.getDataToAddOrEdit(props.listOptions,"edit",props.setIsModalVisible)
}

function onClickAdd(props: propsModal) {
  functions.getDataToAddOrEdit(props.listOptions,"add")
}
  


