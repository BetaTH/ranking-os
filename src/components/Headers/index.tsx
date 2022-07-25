import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Logo from "../../img/logo.svg";
import { propsHeaders } from "../../interfaces/os-interfaces";

export function Headers(prop: propsHeaders) {
  const newProps = prop.arr;
  const [monthValue, setMonthValue] = useState(new Date().getMonth());
  const [yearValue, setYearValue] = useState(new Date().getFullYear());

  const todayMonth = new Date().getMonth();
  const initYear = 2022;
  const todayYear = new Date().getFullYear();

  const [listSaveStorage, setlistSaveStorage] = useState([
    100 * todayYear + todayMonth,
  ]);

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
    { length: todayYear - initYear },
    (_, i) => i + initYear
  );
  yearList.push(todayYear);
  yearList.reverse();

  function setNewDataOS() {
    if (sessionStorage.getItem(String(100 * yearValue + monthValue))) {
      const dataStoraged = String(
        sessionStorage.getItem(String(100 * yearValue + monthValue))
      );
      newProps.setDataOS(JSON.parse(dataStoraged));
      newProps.setLoadingData(false);
    } else if (sessionStorage.length >= 3) {
      sessionStorage.removeItem(String(listSaveStorage[0]));
      setlistSaveStorage(
        new Array<number>()
          .concat([listSaveStorage[1], listSaveStorage[2]])
          .concat([100 * yearValue + monthValue])
      );
      loadNewData();
    } else {
      setlistSaveStorage(
        new Array<number>()
          .concat(listSaveStorage)
          .concat([100 * yearValue + monthValue])
      );
      loadNewData();
    }
    console.log(listSaveStorage);
    console.log(sessionStorage.length);
  }

  function loadNewData() {
    newProps.setLoadingData(true);
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
        newProps.setLoadingData(false);
        sessionStorage.setItem(
          String(100 * yearValue + monthValue),
          JSON.stringify({
            rankingMoto: res.rankingMoto,
            rankingGeral: res.rankingGeral,
          })
        );
      });
  }

  return (
    <header className={styles.divHeaders}>
      <div className={styles.divLogoTitle}>
        <img className={styles.logo} src={Logo} alt="Logo" />
        <h1 className={styles.titulo}>Ranking OS Externo</h1>
      </div>
      <div className={styles.divDateFilter}>
        <select
          className={styles.selectMonth}
          name="Mês"
          id="month"
          defaultValue={todayMonth}
          onChange={(e) => setMonthValue(Number(e.target.value))}
        >
          {monthList.map((item, id) => {
            return (
              <option key={item} value={id}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className={styles.selectYear}
          name="Ano"
          id="year"
          defaultValue={todayYear}
          onChange={(e) => setYearValue(Number(e.target.value))}
        >
          {yearList.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <button className={styles.searchButton} onClick={setNewDataOS}>
          BUSCAR
        </button>
      </div>
    </header>
  );
}
