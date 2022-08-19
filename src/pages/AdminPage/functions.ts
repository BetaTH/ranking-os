import { api } from "../../api/api";

export function teste() { }

export function deleteData(props: {
  setData: Function;
  id?: string;
  equipeid?: string | null;
  campo: string;
  setIsModalVisible: Function;
  setIsCrudLoading: Function;
}) {

  if (props.equipeid != null) {
    api
      .delete(`/list-options/admin/${props.campo}/${props.equipeid}`)
      .then(() => {
        api
          .get("/list-options/admin")
          .then((res) => {
            props.setData(res.data);
          })
          .then(() => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
          })
          .catch((err) => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
            alert("OS Já excluida");
          });
      });
  } else {
    api
      .delete(`/list-options/admin/${props.campo}/${props.id}`)
      .then(() => {
        api
          .get("/list-options/admin")
          .then((res) => {
            props.setData(res.data);
          })
          .then(() => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
          })
          .catch((err) => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
            alert("OS Já excluida");
          });
      });
  }
}

export function getDataToAddOrEdit(props: {
  setIsModalVisible: Function;
  typeModal: string;
  id?: string;
  input1Ref: HTMLInputElement | null;
  input2Ref: HTMLInputElement | null;
  input3Ref: HTMLInputElement | null;
  campo: string;
  setData: Function;
  setIsCrudLoading: Function;
}) {
  let data: { [key: string]: string } = {};

  if (props.typeModal == "edit") {
    data.id = String(props.id as string);
    data[props.campo] = props.input1Ref?.value as string;
    props.campo == "equipe"
      ? ((data.transportePadrao = props.input2Ref?.value as string),
        (data.linkFoto = props.input3Ref?.value as string))
      : props.campo == "tipoOS"
        ? (data.pontos = props.input2Ref?.value as string)
        : null;
    api
      .put(`/list-options/admin/${props.campo}`, data)
      .then(() => {
        api
          .get("/list-options/admin")
          .then((res) => {
            props.setData(res.data);
          })
          .then(() => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
          })
          .catch((err) => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
            alert("OS Já excluida");
          });
      });
  } else if (props.typeModal == "add") {
    data[props.campo] = props.input1Ref?.value as string;
    props.campo == "equipe"
      ? ((data.transportePadrao = props.input2Ref?.value as string),
        (data.linkFoto = props.input3Ref?.value as string))
      : props.campo == "tipoOS"
        ? (data.pontos = props.input2Ref?.value as string)
        : null;
    api
      .post(`/list-options/admin/${props.campo}`, data)
      .then(() => {
        api
          .get("/list-options/admin")
          .then((res) => {
            props.setData(res.data);
          })
          .then(() => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
          })
          .catch((err) => {
            props.setIsCrudLoading(false);
            props.setIsModalVisible(false);
            alert("OS Já excluida");
          });
      });
  }
}
