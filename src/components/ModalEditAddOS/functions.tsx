import { Socket } from "socket.io-client";
import { api } from "../../api/api";

const formInputs: { [key: string]: Function } = {
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

const formValues: { [key: string]: Function } = {
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
          formInputs.dataFechamento().style.border = "0.1rem solid #ffffff";
          return true;
        } else {
          formInputs.dataAbertura().style.border = "0.1rem solid #ff0000";
          formInputs.dataFechamento().style.border = "0.1rem solid #ff0000";
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
          formInputs.dataAbertura().style.border = "0.1rem solid #ffffff";
          formInputs.dataFechamento().style.border = "0.1rem solid #ffffff";
          return true;
        } else {
          formInputs.dataAbertura().style.border = "0.1rem solid #ff0000";
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

function convertData(date: string) {
  const dataSplit = date.split("/");
  const dataCorrect = dataSplit[1] + "/" + dataSplit[0] + "/" + dataSplit[2];
  return dataCorrect;
}

function validateFilds(listOptions: { [key: string]: string[] }) {
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

export function getDataToAddOrEdit(props: {
  listOptions: { [key: string]: string[] };
  typeModal: "add" | "edit";
  hideModal?: Function;
  socket?: Socket;
  setIsCrudLoading: Function;
}) {
  if (validateFilds(props.listOptions)) {
    let formDataValues = {} as {
      [key: string]: string | number | Date;
      tipoOS: string;
      trs: string;
    };
    props.setIsCrudLoading(true);

    Object.entries(formValues).forEach((entry) => {
      const [key, value] = entry;
      if (key == "dataAbertura" || key == "dataFechamento") {
        formDataValues[key] = new Date(convertData(value()));
      } else {
        formDataValues[key] = value();
      }
    });

    if (props.typeModal == "add") {
      api
        .post(
          "/postNewOS", //https://ranking-os-backend-production.up.railway.app
          formDataValues
        )
        .then(() => {
          props.socket?.emit("dbAttServer");
          props.setIsCrudLoading(false);

          formInputs.idOS().value = "";
          formInputs.cliente().value = "";
          formInputs.dataAbertura().value = "";
          formInputs.dataFechamento().value = "";
          formInputs.taxa().value = "Não";
          formInputs.correcao().value = "Não";
        })
        .catch((err) => {
          props.setIsCrudLoading(false);
          alert("OS Já Cadastrada");
        });
    } else {
      api.put("/updateOS", formDataValues).then(() => {
        props.socket?.emit("dbAttServer");
        props.setIsCrudLoading(false);
        props.hideModal ? props.hideModal(false) : null;
      }); // com localhost
    }
  }
}

export function deleteData(props: {
  hideModal?: Function;
  socket?: Socket;
  setIsCrudLoading: Function;
}) {
  const idToDelete = formValues.idOS();
  api
    .delete("/deleteOS", {
      data: { idOS: idToDelete },
    })
    .then(() => {
      props.socket?.emit("dbAttServer");
      props.setIsCrudLoading(false);
      props.hideModal ? props.hideModal(false) : null;
    })
    .catch((err) => {
      props.setIsCrudLoading(false);
      props.hideModal ? props.hideModal(false) : null;
      alert("OS Já excluida");
    });
}

export function dateMask(
  mask: string,
  e: React.KeyboardEvent<HTMLInputElement>
) {
  if (!isNaN(Number(e.key))) {
    const i = e.target.value.length;
    const output = mask.substring(0, 1);
    const text = mask.substring(i);
    if (text.substring(0, 1) != output) {
      e.target.value = e.target.value + text.substring(0, 1);
    }
  }
}

export function verifyDateInputType(e: HTMLInputElement) {
  let text = e.value.charAt(e.value.length - 1);
  if (isNaN(Number(text))) {
    e.value = e.value.replace(/.$/, "");
  }
}
