import { Socket } from "socket.io-client";

//Interface TablePage &&  DashPage =============

// Interfaces component Tabela=========
export interface OStoEit {
  [key: string]: string | number;
}

export interface PropsTable {
  loadMoreData: Function;
}

// Interfaces component ModalEditAddOS=========
export interface propsModal {
  OStoEdit?: OStoEit;
  setOStoEdit?: Function;
  setIsModalVisible: Function;
  typeModal: "add" | "edit";
}

// Interfaces component Hearders=========
export interface propsHeaders {
  titlePage: "tabela" | "dash" | "admin";
}
export interface arr {
  setDataOS: Function;
  setLoadingData: Function;
}

// Interfaces component Autocomplete
export interface propsAC {
  values: string[];
  inputEl: HTMLInputElement;
  setIsACvisible: Function;
  search: string;
  setSearch: Function;
  validateAutocompleteInputs?: Function;
}
