import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import "./styles.scss";

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        token ? (
          <BubblePage {...props} token={token} />
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => <Login {...props} token={token} setToken={setToken} />} />
        <PrivateRoute />
        <Route exact path="/login" render={(props) => <Login {...props} token={token} setToken={setToken} />} />
      </div>
    </Router>
  );
}

export default App;
