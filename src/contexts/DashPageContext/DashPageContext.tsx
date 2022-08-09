import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { api } from "../../api/api";

interface IDashPageContextProps {
  children: ReactNode;
}

interface IDashPageContext {
  dashData: {
    rankingMoto: {
      equipe: string;
      pontos: number;
      classTransporte: string;
      fotoLink: string;
    }[];
    rankingGeral: {
      equipe: string;
      pontos: number;
      classTransporte: string;
      fotoLink: string;
    }[];
  };
  setDashData: (newState: { rankingMoto: []; rankingGeral: [] }) => void;
  loadingDashData: boolean;
  setLoadingDashData: (newState: boolean) => void;
}
const initialValues = {
  dashData: { rankingMoto: [], rankingGeral: [] },
  setDashData: () => {},
  loadingDashData: true,
  setLoadingDashData: () => {},
};

export const DashPageContext = createContext<IDashPageContext>(initialValues);

export const DashPageContextProvider = ({
  children,
}: IDashPageContextProps) => {
  const effecOnlyRun = useRef(false);
  const [dashData, setDashData] = useState(initialValues.dashData);
  const [loadingDashData, setLoadingDashData] = useState(
    initialValues.loadingDashData
  );
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  useEffect(() => {
    if (effecOnlyRun.current === false) {
      let queryParams = {
        dateMin: new Date(todayYear, todayMonth, 1),
        dateMax: new Date(todayYear, todayMonth + 1, 0, 23, 59, 59),
      };
      api.get("/getDashData", { params: queryParams }).then((res) => {
        setDashData(res.data);
        setLoadingDashData(false);
        // sessionStorage.setItem(
        //   String(100 * todayYear + todayMonth),
        //   JSON.stringify({
        //     rankingMoto: res.data.rankingMoto,
        //     rankingGeral: res.data.rankingGeral,
        //   })
        // );
      });
      // if (sessionStorage.getItem(String(100 * todayYear + todayMonth))) {
      //   let datStoraged = String(
      //     sessionStorage.getItem(String(100 * todayYear + todayMonth))
      //   );
      //   setDashData(JSON.parse(datStoraged));
      //   setLoadingDashData(false);
      // } else {
      //   let queryParams = {
      //     dateMin: new Date(todayYear, todayMonth, 1),
      //     dateMax: new Date(todayYear, todayMonth + 1, 0, 23, 59, 59),
      //   };
      //   api.get("/getDashData", { params: queryParams }).then((res) => {
      //     setDashData(res.data);
      //     setLoadingDashData(false);
      //     sessionStorage.setItem(
      //       String(100 * todayYear + todayMonth),
      //       JSON.stringify({
      //         rankingMoto: res.data.rankingMoto,
      //         rankingGeral: res.data.rankingGeral,
      //       })
      //     );
      //   });
      // }
    }
    return () => {
      effecOnlyRun.current = true;
    };
  }, []);

  const value = {
    dashData,
    setDashData,
    loadingDashData,
    setLoadingDashData,
  };

  return (
    <DashPageContext.Provider value={value}>
      {children}
    </DashPageContext.Provider>
  );
};
