import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Dashboard } from "./pages/Dashboard";
import { TablePage } from "./pages/TablePage";

function App() {
  // const [dataOS, setDataOS] = useState([])

  // interface dataROW {
  //   "id": string,
  //   "operador": string,
  //   "zona": string,
  //   "cliente" : string,
  //   "tipoOS": string,
  //   "equipe": string,
  //   "transporte": string,
  //   "dataAbertura": string,
  //   "dataFechamento": string,
  //   "taxa": string,
  //   "correcao": string,
  //   "pontos": string,
  // }

  // useEffect(() => {
  //   fetch('http://localhost:5000/teste?dateMin=07%2F08%2F2022%2000%3A00&dateMax=07%2F08%2F2022%2023%3A59')
  //   .then((response) => response.json())
  //   .then(res => {setDataOS(res)})
  // },[])

  return (
    <div>
      <Dashboard />
     {/* <TablePage/> */}
    </div>
  );
}

export default App;

// return (
//   <div className='list'>
//   {dataOS?.map((dataRow : dataROW) => { return (
//     <li key={dataRow.id}>{dataRow.operador}</li>)}
//     )}
//   </div>

// )
