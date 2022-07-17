import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Headers } from "../../components/Headers";
import { Podio } from "../../components/Podio";
import { RankingGeral } from "../../components/RankingGeral";
import { RankingMotos } from "../../components/RankingMotos";
import classNames from "classnames";

export function Dashboard() {
  const [dataOS, setDataOS] = useState([]);
  const [rankOS, setRankOS] = useState([]);

  interface dataROW {
    id: string;
    operador: string;
    zona: string;
    cliente: string;
    tipoOS: string;
    equipe: string;
    transporte: string;
    dataAbertura: string | Date;
    dataFechamento: string | Date;
    taxa: string;
    correcao: string;
    pontos: string | number;
    classTransporte: string;
    fotoLink: string;
  }

  interface dataRowTable {
    equipe: string;
    pontos: number;
    classTransporte: string;
    fotoLink: string;
  }

  interface transform2Rank {
    [key: string]: {
      equipe: string;
      pontos: number;
      classTransporte: string;
      fotoLink: string;
    };
  }

  useEffect(() => {
    let queryParams = {
      dateMin: "07/01/2022 00:00",
      dateMax: "07/13/2022 23:59",
    };
    let url = new URL("http://localhost:5000/teste");
    let k: keyof typeof queryParams;
    for (k in queryParams) {
      url.searchParams.append(k, queryParams[k]);
    }
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setDataOS(res);
      });
  }, []);

  useEffect(() => {
    let t1 = dataOS?.map((dataROW: dataROW) => {
      return {
        equipe: dataROW.equipe,
        pontos: Number(dataROW.pontos),
        classTransporte: dataROW.classTransporte,
        fotoLink: dataROW.fotoLink,
      };
    });

    let t2 = t1?.reduce<transform2Rank>((acc, t1elem: dataRowTable) => {
      acc[t1elem.equipe]
        ? (acc[t1elem.equipe] = {
            equipe: t1elem.equipe,
            pontos: t1elem.pontos + acc[t1elem.equipe].pontos,
            classTransporte: t1elem.classTransporte,
            fotoLink: t1elem.fotoLink,
          })
        : (acc[t1elem.equipe] = {
            equipe: t1elem.equipe,
            pontos: t1elem.pontos,
            classTransporte: t1elem.classTransporte,
            fotoLink: t1elem.fotoLink,
          });

      return acc;
    }, {});
    let t3 = Object.values(t2);
    t3.sort((a, b) => b.pontos - a.pontos);
    setRankOS(t3 as any);
  }, [dataOS]);

  if (rankOS.length === 0) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Headers />
      <div className={styles.rankingsContainer}>
        <div className={styles.rankingMotoContainer}>
          <RankingMotos arr={rankOS} />
        </div>
        <Podio arr={rankOS} />
        <RankingGeral arr={rankOS} />
      </div>
    </div>
  );
}
