import { TablePage } from "./pages/TablePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import "./styles/index.scss";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { SocketContextProvider } from "./contexts/SocketContext/SocketContext";
import { DashPageContextProvider } from "./contexts/DashPageContext/DashPageContext";
import { TablePageContextProvider } from "./contexts/TablePageContext/TablePageContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <SocketContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashPageContextProvider>
                  <Dashboard />
                </DashPageContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tabela"
            element={
              <ProtectedRoute>
                <TablePageContextProvider>
                  <TablePage />
                </TablePageContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SocketContextProvider>
  );
}

export default App;
