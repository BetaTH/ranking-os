import { useContext } from "react";
import { DashPageContext } from "../../contexts/DashPageContext/DashPageContext";
import { Loading } from "../Loading";
import { SemDados } from "../SemDados";
import styles from "./styles.module.scss";

export function RankingMotos() {
  const { dashData, loadingDashData } = useContext(DashPageContext);
  const dashMotoData = dashData.rankingMoto;
  const count = Array.from({ length: 7 }, (_, i) => i + 1);

  if (loadingDashData) {
    return (
      <div className={styles.rankingMotoContainer}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <span className={styles.title}>Ranking Motos</span>
          </div>
          <Loading />
        </div>
      </div>
    );
  }

  if (dashMotoData.length === 0) {
    return (
      <div className={styles.rankingMotoContainer}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <span className={styles.title}>Ranking Motos</span>
          </div>
          <SemDados />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rankingMotoContainer}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Ranking Motos</span>
        </div>
        <div className={styles.table}>
          {count.map((item, id) => {
            return (
              <div key={item} className={styles.card}>
                <div className={styles.cardPos}>
                  <span className={styles.pos}>{item}.</span>
                </div>
                <div className={styles.cardEquip}>
                  <span className={styles.equip}>
                    {dashMotoData[id] ? dashMotoData[id].equipe : ""}
                  </span>
                </div>
                <div className={styles.cardPoint}>
                  <span className={styles.point}>
                    {dashMotoData[id] ? dashMotoData[id].pontos : ""}
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
