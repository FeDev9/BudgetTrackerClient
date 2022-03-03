

import { useState } from 'react'
import axios from 'axios'
import classNames from 'classnames';
import Profile from './components/Profile/Profile';
import { Formik, Field, Form } from 'formik';
import './App.css'


function App() {

  const [msg, setMsg] = useState(undefined);
  const [authenticated, setAuthenticated] = useState(false);

  //USER Data

  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);


  //LOGIN Submit
  const submitLogin = async (values) => {

    const results = await axios.post('http://localhost:3005/login', {
      email: values.email,
      password: values.password
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

  const submitRegister = async (values) => {

    console.log(values);
    const fetchData = async () => {
      const results = await axios.post('http://localhost:3005/register', {
        email: values.regEmail,
        password: values.regPassword,
        name: values.regName,
        passwordConfirm: values.regPasswordConfirm
      });
      if (results.data.msg && results.data.error) {
        setMsg(results.data.msg);
      } else {
        setMsg('User Registered')
      }
    }
    fetchData();


  }


  if (authenticated) {
    return <Profile userId={userId} name={userName} />
  } else {

    return (


      <>

        <div className="auth">
          <h4 className={classNames({ 'msg': msg })}>
            {msg !== undefined ? msg : ''}
          </h4>
          <div className="login-register-cnt">

            {/*------LOGIN ForM--------- */}

            <div className="login-cnt">
              <h1 className="title">Login</h1>

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={values => submitLogin(values)}>
                <Form>
                  <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                  </div>
                  <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password" />
                  </div>

                  <button type="submit">Login</button>
                </Form>

              </Formik>



            </div>

            {/*------REGISTER FORM--------- */}
            <div className="register-cnt">
              <h1 className="title">Register</h1>

              <Formik
                initialValues={{
                  regEmail: '',
                  regPassword: '',
                  regName: '',
                  regPasswordConfirm: ''
                }}
                onSubmit={values => submitRegister(values)}>
                <Form>
                  <div className="input-box">
                    <label htmlFor="regName">Name</label>
                    <Field type="text" id="regName" name="regName" />
                  </div>
                  <div className="input-box">
                    <label htmlFor="regEmail">Email</label>
                    <Field type="email" id="regEmail" name="regEmail" />
                  </div>
                  <div className="input-box">
                    <label htmlFor="regPassword">Password</label>
                    <Field type="password" id="regPassword" name="regPassword" />
                  </div>
                  <div className="input-box">
                    <label htmlFor="regPasswordConfirm">Confirm Password</label>
                    <Field type="password" id="regPasswordConfirm" name="regPasswordConfirm" />
                  </div>

                  <button type="submit">Register</button>
                </Form>

              </Formik>
            </div>



          </div>



        </div>




      </>



    )
  }
}

export default App;
