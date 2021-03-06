import { propsRanking } from "../../interfaces/os-interfaces";
import { Loading } from "../Loading";
import { SemDados } from "../SemDados";
import styles from "./styles.module.scss";

export function RankingGeral(props: propsRanking) {
  const newProps = props.arr;
  const count = Array.from({ length: 31 }, (_, i) => i + 1);

  if (props.isLoadging) {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <span className={styles.title}>Ranking Geral</span>
        </div>
        <Loading />
      </div>
    );
  }

  if (newProps.length === 0) {
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
        {count?.map((item, id) => {
          return (
            <div key={item} className={styles.row}>
              <div className={styles.card}>
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
              <div className={styles.card}>
                <div className={styles.cardPos}>
                  <span className={styles.pos}>{item + 31}. </span>
                </div>
                <div className={styles.cardEquip}>
                  <span className={styles.equip}>
                    {newProps[id + 31] ? newProps[id + 31].equipe : ""}
                  </span>
                </div>
                <div className={styles.cardPoint}>
                  <span className={styles.point}>
                    {newProps[id + 31] ? newProps[id + 31].pontos : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//CODIGOS QUE ALTERADOS MAS QUE PODEM SER REUTILIZADOS

// let removeEquipes = ["Emprestado", "Corre????o"];
// const newProps = props.arr.filter(
//   (df) => df.classTransporte != "Moto" && !removeEquipes.includes(df.equipe)
// );

// newProps?.map((dataROW:propsElement,id) => {
//     if(id<=30){
//     return(
//     <tr key = {id}>
//     <td>{id + 1}</td>
//     <td>{dataROW.equipe}</td>
//     <td>{dataROW.pontos}</td>
//     </tr>
// )}})

// newProps?.map((dataROW:propsElement,id) => {
//     if(id>count.length){
//     return(
//     <tr key = {id}>
//     <td>{id + 1}</td>
//     <td>{dataROW.equipe}</td>
//     <td>{dataROW.pontos}</td>
//     </tr>
// )}})

// interface propsElement {
//     equipe: string,
//     pontos: number,
//     classTransporte:string
// }

//     <div className={styles.tela}>
//     <h2>Ranking Geral</h2>
//     <div className={styles.tela2}>
//     <table className={styles.tables}>
//         <thead>
//             <tr>
//                 <th>Pos.</th>
//                 <th>Nome</th>
//                 <th>Pontos</th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//             count.map((pos,id) => {
//                 if(pos<=31){
//                     return(
//                         <tr key = {id}>
//                         <td>{pos}</td>
//                         <td>{newProps[id]?newProps[id].equipe:""}</td>
//                         <td>{newProps[id]?newProps[id].pontos:""}</td>
//                         </tr>
//                     )
//                 }
//             })
//             }
//         </tbody>
//     </table>

//     <table className={styles.tables}>
//         <thead>
//             <tr>
//                 <th>Pos.</th>
//                 <th>Nome</th>
//                 <th>Pontos</th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//             count.map((pos,id) => {
//                 if(pos>31){
//                     return(
//                         <tr key = {id}>
//                         <td>{pos}</td>
//                         <td>{newProps[id]?newProps[id].equipe:""}</td>
//                         <td>{newProps[id]?newProps[id].pontos:""}</td>
//                         </tr>
//                     )
//                 }
//             })
//             }
//         </tbody>
//     </table>
//     </div>
// </div>
