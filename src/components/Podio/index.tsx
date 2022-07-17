import classNames from "classnames";
import { Trophy } from "phosphor-react";
import styles from "./styles.module.scss";

interface props {
  arr: {
    equipe: string;
    pontos: number;
    classTransporte: string;
    fotoLink: string;
  }[];
}

export function Podio(props: props) {
  let removeEquipes = ["Emprestado", "Correção"];
  const newProps = props.arr.filter(
    (df) => df.classTransporte != "Moto" && !removeEquipes.includes(df.equipe)
  );
  const count = [4, 2, 1, 3, 5];

  return (
    <div className={`${styles.container}`}>
      {count.map((prop) => {
        if (prop == 1) {
          return (
            <div
              key={prop}
              className={classNames(styles.columnContainer, {
                [styles.rankOne]: prop === 1,
              })}
            >
              <div className={styles.photo}>
                <img src={newProps[prop - 1].fotoLink} alt="" />
              </div>
              <div className={styles.column}>
                <Trophy weight="fill" />
                <span className={styles.equip}>
                  {newProps[prop - 1].equipe}
                </span>
                <span className={styles.points}>
                  {newProps[prop - 1].pontos}
                </span>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={prop}
              className={classNames(styles.columnContainer, {
                [styles.rankOne]: prop === 1,
                [styles.rankTwo]: prop === 2,
                [styles.rankThree]: prop === 3,
                [styles.rankFour]: prop === 4,
                [styles.rankFive]: prop === 5,
              })}
            >
              <div className={styles.photo}>
                <img src={newProps[prop - 1].fotoLink} alt="" />
              </div>
              <div className={styles.column}>
                <span className={styles.equip}>
                  {newProps[prop - 1].equipe}
                </span>
                <span className={styles.points}>
                  {newProps[prop - 1].pontos}
                </span>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
