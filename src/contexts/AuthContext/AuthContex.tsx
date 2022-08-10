import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import AuthService from "../../services/AuthService";

export interface IStateContextComponentProps extends PropsWithChildren {}

interface AuthContextProps {
  children: ReactNode;
}

interface IAuthContext {
  user: any;
  isLoadingUser: boolean;
  setUser: (newState: any) => void;
  setIsLoadingUser: (newState: boolean) => void;
}
const initialValues = {
  user: null as any,
  setUser: () => {},
  isLoadingUser: true,
  setIsLoadingUser: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialValues);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const authService = new AuthService();
  const [user, setUser] = useState(initialValues.user);
  const [isLoadingUser, setIsLoadingUser] = useState(
    initialValues.isLoadingUser
  );
  useEffect(() => {
    // setSocket(
    //   io("https://ranking-os-backend-production.up.railway.app") //, {
    //   // withCredentials: true,
    //   //})
    // );
    authService
      .getLoggedUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, []);

  const value = {
    user,
    isLoadingUser,
    setUser,
    setIsLoadingUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
