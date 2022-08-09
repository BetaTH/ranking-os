import styles from "./styles.module.scss";
import { propsModal } from "../../interfaces/os-interfaces";
import { AutocompleteModalInputs } from "../AutocompleteModalInputs";
import { useContext, useEffect, useState } from "react";
import * as functions from "./functions";
import { CaretDown, X } from "phosphor-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CrudLoadingModal } from "../crudLoadingModal";
import { SocketContext } from "../../contexts/SocketContext/SocketContext";
import { TablePageContext } from "../../contexts/TablePageContext/TablePageContext";

export function ModalEditAddOS(props: propsModal) {
  const OStoEdit = props.OStoEdit;
  const { socket } = useContext(SocketContext);
  const { listOptions } = useContext(TablePageContext);
  const [isACVisible, setIsACVisible] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [inputEl, setInputEl] = useState<HTMLInputElement>();
  const [search, setSearch] = useState("");
  const [isCrudLoading, setIsCrudLoading] = useState(false);

  useEffect(() => {
    document
      .querySelectorAll("body")
      .forEach((target) => target.classList.add("noScroll"));
    return () => {
      document
        .querySelectorAll("body")
        .forEach((target) => target.classList.remove("noScroll"));
    };
  });

  function hideACInput() {
    const newisACVisible: { [key: string]: boolean } = {
      operador: false,
      zona: false,
      tipoOS: false,
      equipe: false,
      transporte: false,
      taxa: false,
      correcao: false,
    };
    setIsACVisible(newisACVisible);
  }

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
    e.style.border = "0.1rem solid #ffffff";
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
        (e.target as HTMLDivElement).id == "Conteiner" && !isCrudLoading
          ? props.typeModal == "edit"
            ? props.setIsModalVisible(false)
            : null
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
                autoComplete="off"
                placeholder="Selecionar uma opção"
                className={styles.input}
                id="operador"
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.operador : ""
                }
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "operador")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "operador")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "operador")
                }
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
              />
              {isACVisible?.operador ? (
                <AutocompleteModalInputs
                  values={listOptions.operador}
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
                autoComplete="off"
                placeholder="Selecionar uma opção"
                id="zona"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.zona : ""}
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "zona")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "zona")
                }
                onChange={(e) => {
                  onChangeInput(e.target as HTMLInputElement, "zona");
                }}
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
              />
              {isACVisible?.zona ? (
                <AutocompleteModalInputs
                  values={listOptions.zona}
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
              {props.typeModal == "edit" ? (
                <input
                  id="idOS"
                  type="text"
                  className={styles.input}
                  defaultValue={OStoEdit?.idOS}
                  disabled
                />
              ) : (
                <input
                  autoComplete="off"
                  placeholder="Digitar ID da OS"
                  id="idOS"
                  className={styles.input}
                  type="text"
                  onFocus={() => hideACInput()}
                  onBlur={() => functions.validadeClienteOS("idOS")}
                  onChange={(e) =>
                    ((e.target as HTMLInputElement).style.border =
                      "0.1rem solid #ffffff")
                  }
                />
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>ID Cliente: </label>
            </div>
            <div className={styles.rowInput}>
              {props.typeModal == "edit" ? (
                <input
                  id="cliente"
                  type="text"
                  className={styles.input}
                  defaultValue={OStoEdit?.cliente}
                  disabled
                />
              ) : (
                <input
                  id="cliente"
                  autoComplete="off"
                  placeholder="Digitar ID do cliente"
                  className={styles.input}
                  type="text"
                  onFocus={() => hideACInput()}
                  onBlur={() => functions.validadeClienteOS("cliente")}
                  onChange={(e) =>
                    ((e.target as HTMLInputElement).style.border =
                      "0.1rem solid #ffffff")
                  }
                />
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Tipo da OS: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                autoComplete="off"
                placeholder="Selecionar uma opção"
                id="tipoOS"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.tipoOS : ""}
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "tipoOS")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "tipoOS")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "tipoOS")
                }
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
              />
              {isACVisible?.tipoOS ? (
                <AutocompleteModalInputs
                  values={listOptions.tipoOS}
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
                autoComplete="off"
                placeholder="Selecionar uma opção"
                id="equipe"
                className={styles.input}
                type="text"
                defaultValue={props.typeModal == "edit" ? OStoEdit?.equipe : ""}
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "equipe")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "equipe")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "equipe")
                }
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
              />
              {isACVisible?.equipe ? (
                <AutocompleteModalInputs
                  values={listOptions.equipe}
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
                autoComplete="off"
                placeholder="Selecionar uma opção"
                id="transporte"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.transporte : ""
                }
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "transporte")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "transporte")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "transporte")
                }
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
              />
              {isACVisible?.transporte ? (
                <AutocompleteModalInputs
                  values={listOptions.transporte}
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
                maxLength={16}
                autoComplete="off"
                placeholder="dd/mm/aaaa hh:mm"
                id="dataAbertura"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit"
                    ? format(
                        new Date(OStoEdit?.dataAbertura as string),
                        "dd/MM/yyyy HH:mm",
                        { locale: ptBR }
                      )
                    : ""
                }
                onFocus={() => hideACInput()}
                onBlur={() => functions.validateDataAbertura()}
                onChange={(e) => {
                  (e.target as HTMLInputElement).style.border =
                    "0.1rem solid #ffffff";
                  functions.verifyDateInputType(e.target as HTMLInputElement);
                }}
                onKeyDown={(e) => {
                  functions.dateMask("##/##/#### ##:##", e);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Data de Fechamento: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                maxLength={16}
                autoComplete="off"
                placeholder="dd/mm/aaaa hh:mm"
                id="dataFechamento"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit"
                    ? format(
                        new Date(OStoEdit?.dataFechamento as string),
                        "dd/MM/yyyy HH:mm",
                        { locale: ptBR }
                      )
                    : ""
                }
                onFocus={() => hideACInput()}
                onBlur={() => functions.validateDataFechamento()}
                onChange={(e) => {
                  (e.target as HTMLInputElement).style.border =
                    "0.1rem solid #ffffff";
                  functions.verifyDateInputType(e.target as HTMLInputElement);
                }}
                onKeyDown={(e) => {
                  functions.dateMask("##/##/#### ##:##", e);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              <label className={styles.label}>Taxa: </label>
            </div>
            <div className={styles.rowInput}>
              <input
                autoComplete="off"
                placeholder="Selecionar uma opção"
                id="taxa"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.taxa : "Não"
                }
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "taxa")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "taxa")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "taxa")
                }
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
              />
              {isACVisible?.taxa ? (
                <AutocompleteModalInputs
                  values={listOptions.taxa}
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
                autoComplete="off"
                placeholder="Selecionar uma opção"
                id="correcao"
                className={styles.input}
                type="text"
                defaultValue={
                  props.typeModal == "edit" ? OStoEdit?.correcao : "Não"
                }
                onFocus={(e) =>
                  onClickInput(e.target as HTMLInputElement, "correcao")
                }
                onClick={(e) =>
                  onClickInput(e.target as HTMLInputElement, "correcao")
                }
                onChange={(e) =>
                  onChangeInput(e.target as HTMLInputElement, "correcao")
                }
              />
              <CaretDown
                className={styles.arrowDown}
                height={"100%"}
                width={"2rem"}
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
            {props.typeModal == "edit" ? (
              <button
                tabIndex={0}
                className={styles.deleteButton}
                onFocus={() => hideACInput()}
                onClick={() => {
                  setIsCrudLoading(true);
                  functions.deleteData({
                    hideModal: props.setIsModalVisible,
                    socket: socket,
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
              onFocus={() => hideACInput()}
              onClick={() => {
                props.typeModal == "edit"
                  ? functions.getDataToAddOrEdit({
                      listOptions: listOptions,
                      typeModal: "edit",
                      hideModal: props.setIsModalVisible,
                      socket: socket,
                      setIsCrudLoading: setIsCrudLoading,
                    })
                  : functions.getDataToAddOrEdit({
                      listOptions: listOptions,
                      typeModal: "add",
                      socket: socket,
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
          onClick={() => props.setIsModalVisible(false)}
        />

        {isCrudLoading ? <CrudLoadingModal /> : null}
      </div>
    </div>
  );
}
