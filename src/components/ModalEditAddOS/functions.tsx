import axios from "axios";


export const formInputs: { [key: string]: Function } = {
  operador: () => document.getElementById("operador") as HTMLInputElement,
  zona: () => document.getElementById("zona") as HTMLInputElement,
  idOS: () => document.getElementById("idOS") as HTMLInputElement,
  cliente: () => document.getElementById("cliente") as HTMLInputElement,
  tipoOS: () => document.getElementById("tipoOS") as HTMLInputElement,
  equipe: () => document.getElementById("equipe") as HTMLInputElement,
  transporte: () => document.getElementById("transporte") as HTMLInputElement,
  dataAbertura: () =>
    document.getElementById("dataAbertura") as HTMLInputElement,
  dataFechamento: () =>
    document.getElementById("dataFechamento") as HTMLInputElement,
  taxa: () => document.getElementById("taxa") as HTMLInputElement,
  correcao: () => document.getElementById("correcao") as HTMLInputElement,
};

export const formValues: { [key: string]: Function } = {
  operador: () => formInputs.operador().value as string,
  zona: () => formInputs.zona().value as string,
  idOS: () => formInputs.idOS().value as string,
  cliente: () => formInputs.cliente().value as string,
  tipoOS: () => formInputs.tipoOS().value as string,
  equipe: () => formInputs.equipe().value as string,
  transporte: () => formInputs.transporte().value as string,
  dataAbertura: () => formInputs.dataAbertura().value as string,
  dataFechamento: () => formInputs.dataFechamento().value as string,
  taxa: () => formInputs.taxa().value as string,
  correcao: () => formInputs.correcao().value as string,
};

export function validadeClienteOS(id: "cliente" | "idOS") {
  if (formValues[id]()) {
    formInputs[id]().style.border = "0.1rem solid #ffffff";
    return true;
  } else {
    formInputs[id]().style.border = "0.1rem solid #ff0000";
    return false;
  }
}

export function validateAutocompleteInputs(
  campo: string,
  listOptions: string[]
) {
  if (formValues[campo]()) {
    if (listOptions.includes(formValues[campo]())) {
      formInputs[campo]().style.border = "0.1rem solid #ffffff";
      return true;
    } else {
      formInputs[campo]().style.border = "0.1rem solid #ff0000";
      return false;
    }
  } else {
    formInputs[campo]().style.border = "0.1rem solid #ff0000";
    return false;
  }
}

export function validateDataAbertura() {
  const dataAbertura = formValues.dataAbertura();
  const dataFechamento = formValues.dataFechamento();
  const dataAberturaFinal = new Date(convertData(dataAbertura));
  const dataFechamentoFinal = new Date(convertData(dataFechamento));

  if (dataAbertura.length == 16 && dataAberturaFinal) {
    if (dataFechamento) {
      if (dataFechamento.length == 16 && dataFechamentoFinal) {
        if (dataAberturaFinal < dataFechamentoFinal) {
          formInputs.dataAbertura().style.border = "0.1rem solid #ffffff";
          return true;
        } else {
          formInputs.dataAbertura().style.border = "0.1rem solid #ff0000";
          return false;
        }
      } else {
        formInputs.dataAbertura().style.border = "0.1rem solid #ff0000";
        return false;
      }
    } else {
      formInputs.dataAbertura().style.border = "0.1rem solid #ffffff";
      return true;
    }
  } else {
    formInputs.dataAbertura().style.border = "0.1rem solid #ff0000";
    return false;
  }
}

export function validateDataFechamento() {
  const dataAbertura = formValues.dataAbertura();
  const dataFechamento = formValues.dataFechamento();
  const dataAberturaFinal = new Date(convertData(dataAbertura));
  const dataFechamentoFinal = new Date(convertData(dataFechamento));

  if (dataFechamento.length == 16 && dataFechamentoFinal) {
    if (dataAbertura) {
      if (dataAbertura.length == 16 && dataAberturaFinal) {
        if (dataAberturaFinal < dataFechamentoFinal) {
          formInputs.dataFechamento().style.border = "0.1rem solid #ffffff";
          return true;
        } else {
          formInputs.dataFechamento().style.border = "0.1rem solid #ff0000";
          return false;
        }
      } else {
        formInputs.dataFechamento().style.border = "0.1rem solid #ff0000";
        return false;
      }
    } else {
      formInputs.dataFechamento().style.border = "0.1rem solid #ffffff";
      return true;
    }
  } else {
    formInputs.dataFechamento().style.border = "0.1rem solid #ff0000";
    return false;
  }
}

export function convertData(date: string) {
  const dataSplit = date.split("/");
  const dataCorrect = dataSplit[1] + "/" + dataSplit[0] + "/" + dataSplit[2];
  return dataCorrect;
}

function validateFilds(listOptions: { [key: string]: string[] }) {
  console.log();

  let ruturnValidates = [
    validateAutocompleteInputs("operador", listOptions["operador"]),
    validateAutocompleteInputs("zona", listOptions["zona"]),
    validadeClienteOS("idOS"),
    validadeClienteOS("cliente"),
    validateAutocompleteInputs("tipoOS", listOptions["tipoOS"]),
    validateAutocompleteInputs("equipe", listOptions["equipe"]),
    validateAutocompleteInputs("transporte", listOptions["transporte"]),
    validateDataAbertura(),
    validateDataFechamento(),
  ];

  if (
    !ruturnValidates[0] ||
    !ruturnValidates[1] ||
    !ruturnValidates[2] ||
    !ruturnValidates[3] ||
    !ruturnValidates[4] ||
    !ruturnValidates[5] ||
    !ruturnValidates[6] ||
    !ruturnValidates[7]
  ) {
    return false;
  } else {
    return true;
  }
}

export function getDataToAddOrEdit(
  listOptions: { [key: string]: string[] },
  typeModal: "add" | "edit",
  hideModal?: Function
) {
  
  if (validateFilds(listOptions)) {
    let formDataValues = {} as {
      [key: string]: string | number | Date;
      tipoOS: string;
      trs: string;
    };

    Object.entries(formValues).forEach((entry) => {
      const [key, value] = entry;
      if(key =="dataAbertura"|| key == "dataFechamento" ){
        formDataValues[key] = new Date(convertData(value()))
      }else{
        formDataValues[key] = value();
      }
      
    });

    if (typeModal == "add") {
      axios.post("https://ranking-os-backend-production.up.railway.app/postNewOS",formDataValues).then((res)=>console.log(res.data))
      formInputs.idOS().value = "";
      formInputs.cliente().value = "";
      formInputs.tipoOS().value = "";
      formInputs.equipe().value = "";
      formInputs.transporte().value = "";
      formInputs.dataAbertura().value = "";
      formInputs.dataFechamento().value = "";
      formInputs.taxa().value = "Não";
      formInputs.correcao().value = "Não";
    } else {
      hideModal ? hideModal(false) : null;
    }
  } else {
    alert("Preencha os campos obrigatórios (*) corretamente");
  }
}