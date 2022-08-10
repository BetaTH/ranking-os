import { ReactNode, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContex";
import { LoadingModal } from "../LoadingModal";

enum Rules {
  admin = "adminexterno.g3@gmail.com",
  tecnico = "tecnicosuporte.g3@gmail.com",
  operador = "operadorexterno.g3@gmail.com",
}

interface IProtectedRouteProps {
  children?: ReactNode;
}

export function ProtectedRoute({ children }: IProtectedRouteProps) {
  const navigate = useNavigate();
  const { user, isLoadingUser, setUser } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (isLoadingUser) return <LoadingModal />;
  if (!user && pathname !== "/") {
    navigate("/");
    return null;
  } else if (!user && pathname == "/") {
    return <>{children}</>;
  }

  switch (user.email) {
    case Rules.admin: {
      return <>{children}</>;
    }
    case Rules.tecnico: {
      if (pathname === "/dashboard") return <>{children}</>;
      navigate("/dashboard");
      return null;
    }
    case Rules.operador: {
      if (pathname !== "/admin") return <>{children}</>;
      navigate("/tabela");
      return null;
    }
    default:
      setUser(null);
      navigate("/");
      return null;
  }
}
