import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SET_USER,
  SET_SHOW_ALERT,
} from "./actions";
import axios from "axios";
import "../axios";

const inititalState = {
  user: null,
  isLoading: false,
  jobs: [],
  showAlert: { msg: "", type: "", show: false },
  editItem: null,
  singleJobError: false,
  editComplete: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const setShowAlert = (msg = "", type = "", show = false) => {
    dispatch({ type: SET_SHOW_ALERT, payload: { msg, type, show } });
  };

  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/register`, { ...userInput });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });

      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      console.log(error);
      const msg = error.response.data.msg;
      setShowAlert(msg, "alert-danger", true);
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  // login
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post("/auth/login", {
        ...userInput,
      });
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
      const msg = error.response.data.msg;
      setShowAlert(msg, "alert-danger", true);
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };

  // fetch jobs
  const fetchJobs = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/jobs`);
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_JOBS_ERROR });
      logout();
    }
  };

  // create job
  const createJob = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/jobs`, {
        ...userInput,
      });

      dispatch({ type: CREATE_JOB_SUCCESS, payload: data });
    } catch (error) {
      const msg = error.response.data.msg;
      setShowAlert(msg, "alert-danger", true);
      dispatch({ type: CREATE_JOB_ERROR });
    }
  };

  // delete job
  const deleteJob = async (jobId) => {
    setLoading();
    try {
      await axios.delete(`/jobs/${jobId}`);

      fetchJobs();
    } catch (error) {
      dispatch({ type: DELETE_JOB_ERROR });
    }
  };

  // fetch single job
  const fetchSingleJob = async (jobId) => {
    setLoading();
    try {
      const { data } = await axios.get(`/jobs/${jobId}`);
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR });
    }
  };

  // edit job
  const editJob = async (jobId, userInput) => {
    setLoading();
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      });
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job });
      setShowAlert("edit successful", "alert-success", true);
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR });
      const msg = error.response.data.msg;
      setShowAlert(msg, "alert-danger", true);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob,
        setShowAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
