import { useState, useEffect, useContext } from "react";
import { TablePage } from "./pages/TablePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import "./styles/index.scss";
import StateContextComponent from "./Teste/Context/StateContextComponent";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { CrudLoadingModal } from "./components/crudLoadingModal";
import { SocketContextProvider } from "./contexts/SocketContext/SocketContext";
import { DashPageContextProvider } from "./contexts/DashPageContext/DashPageContext";
import { TablePageContextProvider } from "./contexts/TablePageContext/TablePageContext";
import { AuthContext } from "./contexts/AuthContext/AuthContex";

function App() {
  const { user, isLoadingUser } = useContext(AuthContext);

  return (
    <StateContextComponent>
      <SocketContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <LoginPage />
                ) : (
                  <Navigate
                    to={
                      user.email == "tecnicosuporte.g3@gmail.com"
                        ? "/dashboard"
                        : user.email == "operadorexterno.g3@gmail.com"
                        ? "tabela"
                        : "/"
                    }
                  />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoadingUser ? (
                  <CrudLoadingModal />
                ) : !user ? (
                  <Navigate to={"/"} />
                ) : (
                  <DashPageContextProvider>
                    <Dashboard />
                  </DashPageContextProvider>
                )
              }
            />
            <Route
              path="/tabela"
              element={
                isLoadingUser ? (
                  <CrudLoadingModal />
                ) : !user ? (
                  <Navigate to={"/"} />
                ) : user.email == "tecnicosuporte.g3@gmail.com" ? (
                  <Navigate to={"/dashboard"} />
                ) : (
                  <TablePageContextProvider>
                    <TablePage />
                  </TablePageContextProvider>
                )
              }
            />
            <Route
              path="/admin"
              element={
                isLoadingUser ? (
                  <CrudLoadingModal />
                ) : !user ? (
                  <Navigate to={"/"} />
                ) : user.email !== "adminexterno.g3@gmail.com" ? (
                  <Navigate to={"/dashboard"} />
                ) : (
                  <AdminPage />
                )
              }
            />
          </Routes>
        </Router>
      </SocketContextProvider>
    </StateContextComponent>
  );
}

export default App;
