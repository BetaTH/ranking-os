import { useState, useEffect } from "react";
import { TablePage } from "./pages/TablePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import "./styles/index.scss";
import io, { Socket } from "socket.io-client";
import StateContextComponent from "./Teste/Context/StateContextComponent";
import { AdminPage } from "./pages/AdminPage";

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(
      io("https://ranking-os-backend-production.up.railway.app") //, {
      // withCredentials: true,
      //})
    );
  }, []);

  return (
    <StateContextComponent>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard socket={socket} />} />
          <Route path="/" element={<TablePage socket={socket} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </StateContextComponent>
  );
}

export default App;
