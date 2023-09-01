import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import img from "../assets/welcome.gif";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-section">
      <div className="home-container">
        <div className="home-section-left">
          <div>
            <h1>Job tracking app</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio fuga
              neque debitis maxime, hic ex quidem esse ab eaque nihil!
            </p>
            <button
              className="btn btn-home"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login/Register
            </button>
          </div>
        </div>
        <div className="home-section-right">
          <img src={img} alt="welcome"></img>;
        </div>
      </div>
    </div>
  );
};

export default Home;
