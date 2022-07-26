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

export interface PropsTable{
  listOptions: {[key:string]:string[]}
}

// Interfaces component ModalEditAddOS=========
export interface propsModal {
  OStoEdit?: OStoEit;
  setOStoEdit?: Function;
  setIsModalVisible: Function;
  typeModal: "add" | "edit";
  listOptions: {[key:string]:string[]}
}

// Interfaces component Hearders=========
export interface propsHeaders {
  setPropsSearchDataDashPage?: {
    setDataOS: Function;
    setLoadingData: Function;
  };
  titlePage: "tabela" | "dash";
}
export interface arr {
  setDataOS: Function;
  setLoadingData: Function;
};

// Interfaces component SearchDataDashPage=========
export interface propsSearchDataDashPage{
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
  validateAutocompleteInputs?: Function;
}
