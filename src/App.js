import './App.css'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';
import ReportFormPage from './pages/ReportFormPage';
import {useAuth0}from "@auth0/auth0-react";
import ReportCard from './pages/ReportCard';

function App() {
  const { isAuthenticated,user }= useAuth0();
  return (
    <main >
      <h1> Auth0 Login</h1>
      
      <LoginButton/>
      <LogoutButton />
      {isAuthenticated&& 
      (<Router>
        <Routes>
            <Route path= "/" exact element ={<ReportsPage/>}/>
            <Route path= "/reports" exact element ={<ReportsPage/>}/>
            <Route path='/submit-report' exact element ={<ReportFormPage/>}/>
            <Route path = '/report-card' exact element ={<ReportCard/>} />
        </Routes>
      </Router>
      )}
      {/* <pre style={{textAlign: 'start'}}>
        {JSON.stringify(user,null,2)};
      </pre> */}
    </main>
  )
}

export default App
