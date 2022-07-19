import { useState } from "react";
import styles from "./styles.module.scss";
import Logo from "../../img/logo.svg"



interface props {
  arr:{
    setDataOS: Function;
    setLoadingData: Function;
  };
}
export function Headers (prop : props) {
  const newProps = prop.arr
  const [monthValue, setMonthValue] = useState(new Date().getMonth());
  const [yearValue, setYearValue] = useState(new Date().getFullYear());

  const todayMonth = new Date().getMonth();
  const initYear = 2022;
  const todayYear = new Date().getFullYear();

  const monthList = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  let yearList = Array.from(
    {length:(todayYear - initYear)},
    (_, i) => i + initYear
  );
  yearList.push(todayYear);
  yearList.reverse();
  
  function setNewDataOS(){
    newProps.setLoadingData(true)
    let queryParams = {
      month: String(monthValue),
      year: String(yearValue),
    };
    let url = new URL("http://localhost:5000/getRanking");
    let k: keyof typeof queryParams;
    for (k in queryParams) {
      url.searchParams.append(k, queryParams[k]);
    }
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        newProps.setDataOS(res);
        newProps.setLoadingData(false)
      });
  }

  return (
    <header className={styles.divHeaders}>
      <div className={styles.divLogo}>
        <img className={styles.logo} src={Logo} alt="Logo" />
      </div>
      <div className={styles.divTitle}>
        <h1 className={styles.titulo}>RANKING OS EXTERNO</h1>
      </div>
      <div className={styles.divDateFilter}>
        <select className={styles.selectMonth} name="Mês" id="month" defaultValue={todayMonth} onChange={(e) => setMonthValue(Number(e.target.value))}>
          {monthList.map((item, id) => {
            return (
              <option key={item} value={id}>
                {item}
              </option>
            );
          })}
        </select>
        <select className={styles.selectYear} name="Ano" id="year" defaultValue={todayYear} onChange={(e) => setYearValue(Number(e.target.value))}>
          {yearList.map((item) => {
              return(
                <option key={item} value={item}>
                  {item}
                </option>
              )
          })}
        </select>
        <button className={styles.searchButton} onClick={setNewDataOS}>BUSCAR</button>
      </div>
    </header>
  );
}
