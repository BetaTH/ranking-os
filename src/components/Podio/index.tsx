import classNames from "classnames";
import { Trophy } from "phosphor-react";
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

export function Podio(props: props) {
  const newProps = props.arr;
  const count = [4, 2, 1, 3, 5];

  if (props.isLoadging) {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Pódio</span>
        </div>
        <Loading />
      </div>
    );
  }

  if (newProps.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Pódio</span>
        </div>
        <SemDados />
      </div>
    );
  }

  

  return (
    <div className={`${styles.container}`}>
      <div className={styles.textContainer}>
        <span className={styles.title}>Pódio</span>
      </div>
      <div className={styles.podioContainer}>
        {count.map((prop) => {
          if (prop == 1 && newProps[prop - 1]) {
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
          } else if (newProps[prop - 1]) {
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
    </div>
  );
}
