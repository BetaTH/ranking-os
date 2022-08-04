import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface IStateContextState {
    socket: Socket | undefined;
    numPage1: number,
    listOptions : { [key: string]: string[] },
    dataTable: { [key: string]: string }[]
}

export const defaultStateContextState: IStateContextState = {
    socket: undefined,
    numPage1: 0,
    listOptions : {},
    dataTable:[],
};

export type TStateContextActions = 'setSocket'  | 'setListOptions' | 'setDataTable' | 'incrementNumPage';
export type TStateContextPayload = string | string[] | Socket | { [key: string]: string[] } | { [key: string]: string }[];

export interface IStateContextActions {
    type: TStateContextActions;
    payload?: TStateContextPayload;
}

export const StateReducer = (state: IStateContextState, action: IStateContextActions) => {

    switch (action.type) {
        case 'setSocket':
            return { ...state, socket: action.payload as Socket };
        case 'setListOptions':
            return { ...state, listOptions: <{ [key: string]: string[] }>action.payload };
        case 'setDataTable':
            return {...state, dataTable: <{ [key: string]: string }[]>action.payload }
        case 'incrementNumPage':
            return {...state, numPage1: state.numPage1 + 1 }
        default:
            return state;
    }
};

export interface IStateContextProps {
    state: IStateContextState;
    dispatch: React.Dispatch<IStateContextActions>;
}

const StateContext = createContext<IStateContextProps>({
    state: defaultStateContextState,
    dispatch: () => {}
});

export const StateContextConsumer = StateContext.Consumer;
export const StateContextProvider = StateContext.Provider;

export default StateContext;