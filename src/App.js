import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReportsPage from "./pages/ReportsPage";
import ReportFormPage from "./pages/ReportFormPage";
import { useAuth0 } from "@auth0/auth0-react";
import ReportCard from "./pages/ReportCard";

function App() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <main>
      <div className="nav-bar">
        <h1> Healthy Report</h1>

        <LoginButton />
        <LogoutButton />
      </div>
      {!isAuthenticated && (
        <div className="first-screen">
          <h1>
            Welcome to <span>Healthy Report</span>
          </h1>
          <h2>
            Effortlessly streamline injury reporting and management for
            organizations. Prioritize the well-being of your team.
          </h2>
          <h2>Sign in or register to begin.</h2>
        </div>
      )}

      {isAuthenticated && (
        <Router>
          <Routes>
            <Route key="home" path="/" exact element={<ReportsPage />} />

            <Route
              key="submit-report"
              path="/submit-report"
              exact
              element={<ReportFormPage />}
            />
            <Route
              key="report-card"
              path="/report-card"
              exact
              element={<ReportCard />}
            />
          </Routes>
        </Router>
      )}
      
    </main>
  );
}

export default App;
