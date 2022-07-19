import { Loading } from "../Loading";
import { SemDados } from "../SemDados";
import styles from "./styles.module.scss";

interface props {
  arr: {
    equipe: string;
    pontos: number;
    classTransporte: string;
    fotoLink: string;
  }[];

  isLoadging: boolean;
}

export function RankingMotos(props: props) {
  const newProps = props.arr
  const count = Array.from({ length: 7 }, (_, i) => i + 1);

  if (props.isLoadging) {
    return (
      <div className={styles.rankingMotoContainer}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <span className={styles.title}>Ranking Motos</span>
          </div>
            <Loading/>
        </div>
      </div>

    );
  }

  if (newProps.length === 0) {
    return (
      <div className={styles.rankingMotoContainer}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <span className={styles.title}>Ranking Motos</span>
          </div>
            <SemDados/>
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
                  {newProps[id] ? newProps[id].equipe : ""}
                </span>
              </div>
              <div className={styles.cardPoint}>
                <span className={styles.point}>
                  {newProps[id] ? newProps[id].pontos : ""}
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
