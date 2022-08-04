import axios from "axios";
import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSocket } from "../hooks/useSocket";
import {
  defaultStateContextState,
  StateContextProvider,
  StateReducer,
} from "./StateContext";

export interface IStateContextComponentProps extends PropsWithChildren {}

const StateContextComponent: React.FunctionComponent<
  IStateContextComponentProps
> = (props) => {
  const { children } = props;

  const socket = useSocket(
    "https://ranking-os-backend-production.up.railway.app",
    {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: false,
    }
  );

  const [state, dispatch] = useReducer(StateReducer, defaultStateContextState);

  useEffect(() => {
    socket.connect();
    dispatch({ type: "setSocket", payload: socket });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getNewData = () => {
      axios
        .get(
          "https://ranking-os-backend-production.up.railway.app/getListOptions"
        )
        .then((res) => dispatch({ type: "setListOptions", payload: res.data }));
      axios
        .get(
          "https://ranking-os-backend-production.up.railway.app/getTableData",
          {
            params: { numPage: state.numPage1, justAtt: "True" },
          }
        )
        .then((res) => dispatch({ type: "setDataTable", payload: res.data }));
    };

    state.socket?.on("dbAttFront", getNewData);

    return function () {
      state.socket?.off("dbAttFront", getNewData);
    };
  }, [state.numPage1, state.socket]);

  return (
    <StateContextProvider value={{ state, dispatch }}>
      {children}
    </StateContextProvider>
  );
};

export default StateContextComponent;
