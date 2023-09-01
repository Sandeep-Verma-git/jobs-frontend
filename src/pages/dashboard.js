import { useState, useEffect } from "react";
import Job from "../components/Job";
import { useGlobalContext } from "../context/appContext";
import Alert from "../components/Alert";

const Dashboard = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const { createJob, fetchJobs, showAlert, setShowAlert } = useGlobalContext();

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !position) {
      setShowAlert("please provide values", "alert-danger", true);
    } else {
      createJob({ company, position });
      setCompany("");
      setPosition("");
    }
  };

  return (
    <div>
      <form className="card-center" onSubmit={handleSubmit}>
        {showAlert.show && <Alert />}
        <h1 className="card-title">new job</h1>
        <div className="card-inputs">
          <div className="card-input">
            <label htmlFor="company">company</label>
            <input
              type="text"
              value={company}
              id="company"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="card-input">
            <label htmlFor="company">position</label>
            <input
              type="text"
              value={position}
              id="company"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
        <div className="card-btn">
          <button type="submit" className="btn">
            add job
          </button>
        </div>
      </form>

      <Job />
    </div>
  );
};

export default Dashboard;
