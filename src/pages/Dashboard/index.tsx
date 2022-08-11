import styles from "./styles.module.scss";
import { Headers } from "../../components/Headers";
import { Podio } from "../../components/Podio";
import { RankingGeral } from "../../components/RankingGeral";
import { RankingMotos } from "../../components/RankingMotos";
import { SearchDataDashPage } from "../../components/SearchDataDashPage";
import { MobileCheck } from "../../components/MobileCheck";

export function Dashboard() {
  return (
    <div className={styles.container}>
      <Headers titlePage={"dash"} />
      <div className={styles.rankingsContainer}>
        <SearchDataDashPage />
        <div className={styles.mobileSeparator1}>
          <div className={styles.mobileSeparator2}>
            <RankingMotos />
            <Podio />
          </div>
          <RankingGeral />
        </div>
      </div>
      <MobileCheck />
    </div>
  );
}
