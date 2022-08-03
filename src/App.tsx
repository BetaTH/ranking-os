import { useState, useEffect } from "react";
import { TablePage } from "./pages/TablePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import "./styles/index.scss";
import io, { Socket } from "socket.io-client";

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
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard socket={socket} />} />
        <Route path="/" element={<TablePage socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
