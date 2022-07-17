import styles from "./styles.module.scss";

interface props {
  arr: {
    equipe: string;
    pontos: number;
    classTransporte: string;
    fotoLink: string;
  }[];
}

export function RankingMotos(props: props) {
  let removeEquipes = ["Emprestado", "Correção"];
  const newProps = props.arr.filter(
    (df) => df.classTransporte != "Carro" && !removeEquipes.includes(df.equipe)
  );
  const count = Array.from({ length: 7 }, (_, i) => i + 1);
  return (
    <div className={styles.conteiner}>
      <div className={styles.textConteiner}>
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
  );
}
