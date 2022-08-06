import { Socket } from "socket.io-client";

//Interface TablePage &&  DashPage =============
export interface PropsTablePage {
  socket?: Socket;
}
export interface PropsDashPage {
  socket?: Socket;
}

// Interfaces component Tabela=========
export interface OStoEit {
  [key: string]: string | number;
}

export interface PropsTable {
  listOptions: { [key: string]: string[] };
  dataTable: { [key: string]: string }[];
  socket?: Socket;
  numPage: number;
  isLoadingMoreData: boolean;
  setIsLoadingMoreData: Function;
  setNumPage: Function;
  loadMoreData: Function;
}

// Interfaces component ModalEditAddOS=========
export interface propsModal {
  socket?: Socket;
  OStoEdit?: OStoEit;
  setOStoEdit?: Function;
  setIsModalVisible: Function;
  typeModal: "add" | "edit";
  listOptions: { [key: string]: string[] };
}

// Interfaces component Hearders=========
export interface propsHeaders {
  setPropsSearchDataDashPage?: {
    setDataOS: Function;
    setLoadingData: Function;
    socket?: Socket;
  };
  titlePage: "tabela" | "dash" | "admin";
}
export interface arr {
  setDataOS: Function;
  setLoadingData: Function;
}

// Interfaces component SearchDataDashPage=========
export interface propsSearchDataDashPage {
  arr: {
    setDataOS: Function;
    setLoadingData: Function;
    socket?: Socket;
  };
}

// Interfaces component Podio & RankingGeral & RankinMotos=========
export interface propsRanking {
  arr: {
    equipe: string;
    pontos: number;
    classTransporte: string;
    fotoLink: string;
  }[];

  isLoadging: boolean;
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
