import { useState, useEffect } from "react";
import axios from "axios";

import { TablePage } from "./pages/TablePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import "./styles/index.scss";

function App() {
  // return(<Dashboard />);
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<TablePage />} />
      </Routes>
    </Router>
  );
}

export default App;
