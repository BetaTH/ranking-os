import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Headers } from "../../components/Headers";
import { Podio } from "../../components/Podio";
import { RankingGeral } from "../../components/RankingGeral";
import { RankingMotos } from "../../components/RankingMotos";
import axios from "axios";
import { PropsDashPage } from "../../interfaces/os-interfaces";

export function Dashboard(props: PropsDashPage) {
  const [dataOS, setDataOS] = useState({ rankingMoto: [], rankingGeral: [] });
  const [loadingData, setLoadingData] = useState(true);
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  useEffect(() => {
    // if (sessionStorage.getItem(String(100 * todayYear + todayMonth))) {
    //   let datStoraged = String(
    //     sessionStorage.getItem(String(100 * todayYear + todayMonth))
    //   );
    //   setDataOS(JSON.parse(datStoraged));
    //   setLoadingData(false);
    // } else {
    //   let queryParams = {
    //     month: String(todayMonth),
    //     year: String(todayYear),
    //   };
    //   let url = new URL("http://localhost:5000/getRanking"); //ainda está no localhost;
    //   let k: keyof typeof queryParams;
    //   for (k in queryParams) {
    //     url.searchParams.append(k, queryParams[k]);
    //   }
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((res) => {
    //       setDataOS(res);
    //       setLoadingData(false);
    //       sessionStorage.setItem(
    //         String(100 * todayYear + todayMonth),
    //         JSON.stringify({
    //           rankingMoto: res.rankingMoto,
    //           rankingGeral: res.rankingGeral,
    //         })
    //       );
    //     });
    // }
    if (sessionStorage.getItem(String(100 * todayYear + todayMonth))) {
      let datStoraged = String(
        sessionStorage.getItem(String(100 * todayYear + todayMonth))
      );
      setDataOS(JSON.parse(datStoraged));
      setLoadingData(false);
    } else {
      let queryParams = {
        dateMin: new Date(todayYear, todayMonth, 1),
        dateMax: new Date(todayYear, todayMonth + 1, 0, 23, 59, 59),
      };
      axios
        .get("http://localhost:5000/getDashData", { params: queryParams })
        .then((res) => {
          setDataOS(res.data);
          setLoadingData(false);
          sessionStorage.setItem(
            String(100 * todayYear + todayMonth),
            JSON.stringify({
              rankingMoto: res.data.rankingMoto,
              rankingGeral: res.data.rankingGeral,
            })
          );
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Headers
        setPropsSearchDataDashPage={{
          setDataOS: setDataOS,
          setLoadingData: setLoadingData,
          socket: props.socket,
        }}
        titlePage={"dash"}
      />
      <div className={styles.rankingsContainer}>
        <RankingMotos arr={dataOS.rankingMoto} isLoadging={loadingData} />
        <Podio arr={dataOS.rankingGeral} isLoadging={loadingData} />
        <RankingGeral arr={dataOS.rankingGeral} isLoadging={loadingData} />
      </div>
    </div>
  );
}
