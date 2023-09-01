import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import Alert from "../components/Alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, register, isLoading, showAlert, setShowAlert } =
    useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setShowAlert("please provide values", "alert-danger", true);
    } else {
      register({ name, email, password });
    }
  };

  return (
    <>
      {user && <Redirect to="/dashboard" />}
      <div className="center">
        <form className="card-center" onSubmit={handleSubmit}>
          {showAlert.show && <Alert />}
          <h1 className="card-title">Register</h1>

          <div className="card-inputs">
            <div className="card-input">
              <label htmlFor="name">name</label>
              <input
                type="text"
                value={name}
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              {isLoading ? "registering..." : "register"}
            </button>
          </div>
          <div className="link">
            <p>Already a member?</p>
            <Link to="/login" link-target className="link-target ">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
