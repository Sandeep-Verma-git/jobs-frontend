import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Alert from "../components/Alert";

import { useGlobalContext } from "../context/appContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, isLoading, setShowAlert, showAlert } =
    useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowAlert("please provide values", "alert-danger", true);
    } else {
      login({ email, password });
    }
  };

  return (
    <>
      {user && <Redirect to="/dashboard" />}
      <div className="center">
        <form className="card-center" onSubmit={handleSubmit}>
          {showAlert.show && <Alert />}
          <h1 className="card-title">Login</h1>
          <div className="card-inputs">
            <div className="card-input">
              <label htmlFor="email">email</label>
              <input
                type="text"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="card-input">
              <label htmlFor="password">password</label>
              <input
                type="password"
                value={password}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="card-btn">
            <button type="submit" className="btn">
              {isLoading ? "Fetching..." : "Login"}
            </button>
          </div>
          <div className="link">
            <p>Not a member yet?</p>
            <Link to="/register" className="link-target">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
