// Interfaces component Tabela=========
export interface OStoEit {
  idOS: number;
  operador: string;
  zona: string;
  cliente: string;
  tipoOS: string;
  equipe: string;
  transporte: string;
  dataAbertura: string;
  dataFechamento: string;
  trs: string;
  taxa: string;
  correcao: string;
  pontos: number;
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
  arr: {
    setDataOS: Function;
    setLoadingData: Function;
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
  ACid?: string;
}
