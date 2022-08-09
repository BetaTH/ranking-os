import styles from "./styles.module.scss";
import { Headers } from "../../components/Headers";
import { Podio } from "../../components/Podio";
import { RankingGeral } from "../../components/RankingGeral";
import { RankingMotos } from "../../components/RankingMotos";
import { SearchDataDashPage } from "../../components/SearchDataDashPage";

export function Dashboard() {
  return (
    <div className={styles.container}>
      <Headers titlePage={"dash"} />
      <div className={styles.rankingsContainer}>
        <div className={styles.mobileSeparator1}>
          <div className={styles.mobileSeparator2}>
            <RankingMotos />
            <Podio />
          </div>
          <RankingGeral />
        </div>
        <SearchDataDashPage />
      </div>
    </div>
  );
}
