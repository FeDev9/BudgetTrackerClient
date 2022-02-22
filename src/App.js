
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'

import Profile from './components/Profile'


function App() {

  const [msg, setMsg] = useState(undefined);
  const [authenticated, setAuthenticated] = useState(false);

  //USER Data

  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);



  // LOGIN Data

  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');


  // REGISTRATION Data

  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');




  //LOGIN Submit
  const submitLogin = async (e) => {

    e.preventDefault();

    const results = await axios.post('https://fedev9-budget-tracker-server.herokuapp.com/login', {
      email: logEmail,
      password: logPassword
    });

    if (results.data.msg && results.data.error) {
      setMsg(results.data.msg);
    } else {
      setUserId(results.data.id);
      setUserName(results.data.name);
      setAuthenticated(true);
    }
  }


  //REGISTRATION SUBMIT

  const submitRegister = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const results = await axios.post('https://fedev9-budget-tracker-server.herokuapp.com/register', {
        email: regEmail,
        password: regPassword,
        name: regName,
        passwordConfirm: regPasswordConfirm
      });
      if (results.data.msg && results.data.error) {
        setMsg(results.data.msg);
      } else {
        setMsg('User Registered')
      }
    }
    fetchData();


  }

  const logout = async () => {

    setAuthenticated(false);
    setUserId(undefined);

  }

  if (authenticated) {
    return <Profile userId={userId} name={userName} />
  } else {

    return (


      <>

        <div className={"auth"}>
          <h4 className={msg !== undefined ? 'msg' : ''}>
            {msg !== undefined ? msg : ''}
          </h4>
          <div className="login-register-cnt">

            {/*------LOGIN ForM--------- */}

            <div className="login-cnt">
              <h1 className="title">Login</h1>

              <form onSubmit={submitLogin}>
                <div className="input-box">
                  <label htmlFor="logEmail">Email</label>
                  <input type="email" id="logEmail" name="logEmail" onChange={(e) => setLogEmail(e.target.value)} />
                </div>
                <div className="input-box">
                  <label htmlFor="logPassword">Password</label>
                  <input type="password" id="logPassword" name="logPassword" onChange={(e) => setLogPassword(e.target.value)} />
                </div>

                <button type="submit" onClick={submitLogin}>Login</button>
              </form>



            </div>

            {/*------REGISTER FORM--------- */}
            <div className="register-cnt">
              <h1 className="title">Register</h1>

              <form onSubmit={submitRegister}>
                <div className="input-box">
                  <label htmlFor="regName">Name</label>
                  <input type="text" id="regName" name="regName" onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div className="input-box">
                  <label htmlFor="regEmail">Email</label>
                  <input type="email" id="regEmail" name="regEmail" onChange={(e) => setRegEmail(e.target.value)} />
                </div>
                <div className="input-box">
                  <label htmlFor="regPassword">Password</label>
                  <input type="password" id="regPassword" name="regPassword" onChange={(e) => setRegPassword(e.target.value)} />
                </div>
                <div className="input-box">
                  <label htmlFor="regPasswordConfirm">Confirm Password</label>
                  <input type="password" id="regPasswordConfirm" name="regPasswordConfirm" onChange={(e) => setRegPasswordConfirm(e.target.value)} />
                </div>

                <button type="submit" onClick={submitRegister}>Register</button>
              </form>
            </div>



          </div>



        </div>




      </>



    )
  }
}

export default App;
