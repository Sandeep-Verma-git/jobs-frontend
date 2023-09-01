import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import Alert from "../components/Alert";

const Edit = () => {
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const {
    fetchSingleJob,
    editJob,
    editItem,
    isLoading,
    showAlert,
    setShowAlert,
  } = useGlobalContext();

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleJob(id);
  }, [id]);

  useEffect(() => {
    if (editItem) {
      setStatus(editItem.status);
      setCompany(editItem.company);
      setPosition(editItem.position);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company || !position) {
      setShowAlert("please provide values", "alert-danger", true);
    } else {
      editJob(id, { company, position, status });
    }
  };

  if (isLoading) {
    return <div className="loading edit-loading"></div>;
  }

  return (
    <div>
      <form className="card-center" onSubmit={handleSubmit}>
        {showAlert.show && <Alert />}
        <h1 className="card-title">update job</h1>
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
          <div className="card-input">
            <label htmlFor="status">status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="interview">interview</option>
              <option value="declined">declined</option>
            </select>
          </div>
        </div>
        <div className="card-btn">
          <button type="submit" className="btn">
            edit
          </button>
        </div>
      </form>

      <div className="to-dashboard">
        <button
          className="btn btn-dashboard"
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          dashboard
        </button>
      </div>
    </div>
  );
};

export default Edit;
