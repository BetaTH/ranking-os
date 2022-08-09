import { useContext } from "react";
import { DashPageContext } from "../../contexts/DashPageContext/DashPageContext";
import { Loading } from "../Loading";
import { SemDados } from "../SemDados";
import styles from "./styles.module.scss";

export function RankingGeral() {
  const { dashData, loadingDashData } = useContext(DashPageContext);
  const dashGeralData = dashData.rankingGeral;
  const count = Array.from({ length: 31 }, (_, i) => i + 1);

  if (loadingDashData) {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Ranking Geral</span>
        </div>
        <Loading />
      </div>
    );
  }

  if (dashGeralData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Ranking Geral</span>
        </div>
        <SemDados />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span className={styles.title}>Ranking Geral</span>
      </div>
      <div className={styles.table}>
        <div className={styles.column}>
          {count?.map((item, id) => {
            return (
              <div key={item} className={styles.row}>
                <div className={styles.cardPos}>
                  <span className={styles.pos}>{item}</span>
                  <span className={styles.pos}>.</span>
                </div>
                <div className={styles.cardEquip}>
                  <span className={styles.equip}>
                    {dashGeralData[id] ? dashGeralData[id].equipe : ""}
                  </span>
                </div>
                <div className={styles.cardPoint}>
                  <span className={styles.point}>
                    {dashGeralData[id] ? dashGeralData[id].pontos : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.column}>
          {count?.map((item, id) => {
            return (
              <div key={item} className={styles.row}>
                <div className={styles.cardPos}>
                  <span className={styles.pos}>{item + 31}</span>
                  <span className={styles.pos}>.</span>
                </div>
                <div className={styles.cardEquip}>
                  <span className={styles.equip}>
                    {dashGeralData[id + 31]
                      ? dashGeralData[id + 31].equipe
                      : ""}
                  </span>
                </div>
                <div className={styles.cardPoint}>
                  <span className={styles.point}>
                    {dashGeralData[id + 31]
                      ? dashGeralData[id + 31].pontos
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
