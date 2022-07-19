
import loading from "../../img/loading.svg"
import styles from "./styles.module.scss";

export function Loading (){
return (
    <div className={styles.loadingConteiner}>
        <img  className={styles.loading} src={loading} alt="Loading" />
    </div>
)
}