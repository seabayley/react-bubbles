import React, { useState } from "react";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { axiosWithAuth } from '../axiosWithAuth'

const Login = props => {
  const [credentials, setCredentials] = useState({})
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleLogin = () => {
    axiosWithAuth()
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        props.setToken(res.data.payload)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/BubblePage')
      })
      .catch(err => console.log(err))
  }

  const handleChangeUsername = e => {
    setCredentials({ ...credentials, username: e.target.value })
  }

  const handleChangePassword = e => {
    setCredentials({ ...credentials, password: e.target.value })
  }

  return (
    <div className='login_wrapper'>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <TextField
          id="outlined-email-input"
          label="Username"
          type="username"
          name="username"
          autoComplete="current-username"
          margin="normal"
          variant="outlined"
          onChange={handleChangeUsername}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={handleChangePassword}
        />
        <Button color='primary' variant='contained' onClick={handleLogin}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
