import classNames from "classnames";
import equipeSemFoto from "../../img/equipeSemFoto.svg";
import { Trophy } from "phosphor-react";
import { Loading } from "../Loading";
import { SemDados } from "../SemDados";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { DashPageContext } from "../../contexts/DashPageContext/DashPageContext";

export function Podio() {
  const { dashData, loadingDashData } = useContext(DashPageContext);
  const dashGeralData = dashData.rankingGeral;
  const count = [4, 2, 1, 3, 5];

  if (loadingDashData) {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Pódio</span>
        </div>
        <Loading />
      </div>
    );
  }

  if (dashGeralData.length === 0) {
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
          if (prop == 1 && dashGeralData[prop - 1]) {
            return (
              <div
                key={prop}
                className={classNames(styles.columnContainer, {
                  [styles.rankOne]: prop === 1,
                })}
              >
                <div className={styles.photo}>
                  <img
                    src={
                      dashGeralData[prop - 1].linkFoto
                        ? dashGeralData[prop - 1].linkFoto
                        : equipeSemFoto
                    }
                    alt=""
                  />
                </div>
                <div className={styles.column}>
                  <Trophy weight="fill" />
                  <span className={styles.equip}>
                    {dashGeralData[prop - 1].equipe}
                  </span>
                  <span className={styles.points}>
                    {dashGeralData[prop - 1].pontos}
                  </span>
                </div>
              </div>
            );
          } else if (dashGeralData[prop - 1]) {
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
                  <img
                    src={
                      dashGeralData[prop - 1].linkFoto
                        ? dashGeralData[prop - 1].linkFoto
                        : equipeSemFoto
                    }
                    alt=""
                  />
                </div>
                <div className={styles.column}>
                  <span className={styles.equip}>
                    {dashGeralData[prop - 1].equipe}
                  </span>
                  <span className={styles.points}>
                    {dashGeralData[prop - 1].pontos}
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
