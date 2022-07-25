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
  listOptions: { [key: string]: string[] }
) {
  if (formValues[campo]()) {
    if (listOptions[campo].includes(formValues[campo]())) {
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
  const dataAberturaFinal = convertDataAbertura(dataAbertura);
  const dataFechamentoFinal = convertDataFechamento(dataFechamento);

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
  const dataAberturaFinal = convertDataAbertura(dataAbertura);
  const dataFechamentoFinal = convertDataFechamento(dataFechamento);

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

export function convertDataAbertura(dataAbertura: string) {
  let dataAberturaSplit = dataAbertura.split("/");
  let dataAberturaCorrect =
    dataAberturaSplit[1] +
    "/" +
    dataAberturaSplit[0] +
    "/" +
    dataAberturaSplit[2];
  return new Date(dataAberturaCorrect);
}
export function convertDataFechamento(dataFechamento: string) {
  let dataFechamentoSplit = dataFechamento.split("/");
  let dataFechamentoCorrect =
    dataFechamentoSplit[1] +
    "/" +
    dataFechamentoSplit[0] +
    "/" +
    dataFechamentoSplit[2];

  return new Date(dataFechamentoCorrect);
}
