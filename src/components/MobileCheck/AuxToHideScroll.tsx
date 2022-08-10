import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProtectedRouteProps {
  children?: ReactNode;
}

export function AuxToHideScroll({ children }: IProtectedRouteProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    pathname !== "/dashboard" &&
      document
        .querySelectorAll("body")
        .forEach((target) => target.classList.add("noScrollMobileCeck"));
    document
      .querySelectorAll("#root")
      .forEach((target) => target.classList.add("noScrollMobileCeck"));

    return () => {
      document
        .querySelectorAll("body")
        .forEach((target) => target.classList.remove("noScrollMobileCeck"));
      document
        .querySelectorAll("#root")
        .forEach((target) => target.classList.remove("noScrollMobileCeck"));
    };
  }, []);
  return <>{children}</>;
}
