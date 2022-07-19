import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Headers } from "../../components/Headers";
import { Podio } from "../../components/Podio";
import { RankingGeral } from "../../components/RankingGeral";
import { RankingMotos } from "../../components/RankingMotos";
import classNames from "classnames";

export function Dashboard() {
  const [dataOS, setDataOS] = useState({rankingAllData:[], rankingMoto:[], rankingGeral:[]});
  const [loadingData, setLoadingData] = useState(true)


  useEffect(() => {
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    
    let queryParams = {
      month: String(todayMonth),//"06/01/2022 00:00",
      year: String(todayYear),//"06/30/2022 23:59",
    };

    let url = new URL("http://localhost:5000/getRanking");
    let k: keyof typeof queryParams;
    for (k in queryParams) {
      url.searchParams.append(k, queryParams[k]);
    }
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setDataOS(res);
        setLoadingData(false)
      });
  }, []);


  return (
    <div className={styles.container}>
      <Headers arr={{setDataOS : setDataOS, setLoadingData: setLoadingData}}/>
      <div className={styles.rankingsContainer}>
        <RankingMotos arr={dataOS.rankingMoto} isLoadging={loadingData}/>
        <Podio arr={dataOS.rankingGeral} isLoadging={loadingData}/>
        <RankingGeral arr={dataOS.rankingGeral} isLoadging={loadingData}/>
      </div>
    </div>
  );
}

//CODIGOS QUE ALTERADOS MAS QUE PODEM SER REUTILIZADOS

  //const [rankOS, setRankOS] = useState([]);

  // interface dataROW {
  //   id: string;
  //   operador: string;
  //   zona: string;
  //   cliente: string;
  //   tipoOS: string;
  //   equipe: string;
  //   transporte: string;
  //   dataAbertura: string | Date;
  //   dataFechamento: string | Date;
  //   taxa: string;
  //   correcao: string;
  //   pontos: string | number;
  //   classTransporte: string;
  //   fotoLink: string;
  // }

  // interface dataRowTable {
  //   equipe: string;
  //   pontos: number;
  //   classTransporte: string;
  //   fotoLink: string;
  // }

  // interface transform2Rank {
  //   [key: string]: {
  //     equipe: string;
  //     pontos: number;
  //     classTransporte: string;
  //     fotoLink: string;
  //   };
  // }



  // useEffect(() => {
  //   let t1 = dataOS.rankingAllData?.map((dataROW: dataROW) => {
  //     return {
  //       equipe: dataROW.equipe,
  //       pontos: Number(dataROW.pontos),
  //       classTransporte: dataROW.classTransporte,
  //       fotoLink: dataROW.fotoLink,
  //     };
  //   });

  //   let t2 = t1?.reduce<transform2Rank>((acc, t1elem: dataRowTable) => {
  //     acc[t1elem.equipe]
  //       ? (acc[t1elem.equipe] = {
  //           equipe: t1elem.equipe,
  //           pontos: t1elem.pontos + acc[t1elem.equipe].pontos,
  //           classTransporte: t1elem.classTransporte,
  //           fotoLink: t1elem.fotoLink,
  //         })
  //       : (acc[t1elem.equipe] = {
  //           equipe: t1elem.equipe,
  //           pontos: t1elem.pontos,
  //           classTransporte: t1elem.classTransporte,
  //           fotoLink: t1elem.fotoLink,
  //         });

  //     return acc;
  //   }, {});
  //   let t3 = Object.values(t2);
  //   t3.sort((a, b) => b.pontos - a.pontos);
  //   setRankOS(t3 as any);
  // }, [dataOS]);

  // if (dataOS.rankingAllData.length===0) {
  //   return (
  //     <div>
  //       <h1>...Loading</h1>
  //     </div>
  //   );
  // }
