import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.css';

import Footer from './components/footer';
import Routines from './components/routines';
import Activities from './components/activities';
import LogInForm from './components/login';
import NewUser from './components/newUser';
import MyRoutines from './components/myRoutines';
import Logo from './components/home'


const App = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(true);
  const [activities, setActivities] = useState([]);


  return (

    <div className='app'>


      <div className='header'>
        <div className='title'>
          <h1>Fitness Tracker</h1>
          <div>
            {token ?
              <h3>Welcome, {username}!</h3>
              : ''
            }
          </div>
        </div>
        <div className='links'>
          {
            token ?
              <>
                <div className='moreLinks'>
                  {
                    token ?
                      <>
                        <Link to="/routines">Routines</Link>
                        <Link to="/myRoutines">My Routines</Link>
                        <Link to="/activities">Activities</Link>
                      </>
                      : ''
                  }

                </div>
                <button
                  onClick={() => {
                    setToken('')
                    setUsername('')
                  }}>Sign Out</button>
              </>
              : <button className='swapButton' onClick={() => setLoggingIn(!loggingIn)}>
                {loggingIn ? 'New User? Create Account' : 'Already have an Account? Log In'}
              </button>

          }
          <div className='login' style={{ display: token ? "none" : "block" }}>
            {loggingIn ?
              <LogInForm token={token} setToken={setToken} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
              : <NewUser token={token} setToken={setToken} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
          </div>
        </div>
      </div>
      <Routes >

        <Route
          path="/"
          element={<Logo />}
        />


        <Route
          path="/routines"
          element={<Routines token={token} setToken={setToken} />}
        />

        <Route
          path="/activities"
          element={<Activities token={token} setToken={setToken} activities={activities} setActivities={setActivities} />}
        />

        <Route
          path="/myRoutines"
          element={<MyRoutines token={token} setToken={setToken} username={username} activities={activities} />}
        />


      </Routes>


      <Footer />


    </div>

  )
}

export default App;
