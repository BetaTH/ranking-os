import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useSocket } from "../../hooks/useSocket";

interface ISocketContextProps {
  children: ReactNode;
}

interface ISocketContext {
  socket: Socket | undefined;
  setSocket: (newState: Socket | undefined) => void;
}
const initialValues = {
  socket: undefined,
  setSocket: () => {},
};

export const SocketContext = createContext<ISocketContext>(initialValues);

export const SocketContextProvider = ({ children }: ISocketContextProps) => {
  const effecOnlyRun = useRef(false);
  const [socket, setSocket] = useState<Socket>();

  const socketCliente = useSocket(import.meta.env.VITE_REACT_APP_AUTH_API_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });
  useEffect(() => {
    if (effecOnlyRun.current === false) {
      socketCliente.connect();
      setSocket(socketCliente);
    }
    return () => {
      effecOnlyRun.current = true;
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
