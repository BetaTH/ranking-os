import { useState, useEffect } from "react";
import axios from "axios";
import { Dashboard } from "./pages/Dashboard";
import { TablePage } from "./pages/TablePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tabela" element={<TablePage />} />
      </Routes>
    </Router>
  );
}

export default App;
