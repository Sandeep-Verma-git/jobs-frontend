import { useGlobalContext } from "../context/appContext";
import { useHistory } from "react-router-dom";

const Job = () => {
  const { jobs, deleteJob, isLoading } = useGlobalContext();
  const history = useHistory();

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (jobs.length < 1) {
    return (
      <div className="no-jobs">
        <p>You have no jobs to display</p>
      </div>
    );
  }

  return (
    <section className="jobs">
      {jobs.map((job) => {
        const { company, status, position, _id } = job;
        return (
          <div key={_id} className="job-card">
            <h1 className="job-card-title">{position}</h1>
            <p className="job-card-company-name">{company}</p>
            <div className="job-card-bottom">
              <div>
                <button
                  className="job-card-btn job-card-btn-del"
                  onClick={() => {
                    history.push(`/edit/${_id}`);
                  }}
                >
                  edit
                </button>
                <button
                  className="job-card-btn job-card-btn-edit"
                  onClick={() => {
                    deleteJob(_id);
                  }}
                >
                  delete
                </button>
              </div>
              <p className="job-card-status">{status}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Job;
