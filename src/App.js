

//From react libraries
import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router, HashRouter } from 'react-router-dom'

import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/DashboardPage';

//Css
import './app.css';
import { AuthWrapper } from './auth/AuthWrapper';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  console.log(localStorage)

  return (
    <div className="container">
      <Router>
        <AuthWrapper />
      </Router>



      {/* <Routes> */}
      {/* <Route path='/' element={<Login setLoggedIn={setLoggedIn} />} /> */}


      {/* <Route path="/dashboard/*" element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} /> */}
      {/* <Route path="/*" element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} /> */}

      {/* </Routes> */}
    </div>
  );
}

export default App;
