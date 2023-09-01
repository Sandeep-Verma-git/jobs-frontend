import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FETCH_JOBS_ERROR,
  FETCH_JOBS_SUCCESS,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  DELETE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SET_USER,
  SET_SHOW_ALERT,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
    };
  }

  if (action.type === SET_SHOW_ALERT) {
    return {
      ...state,
      showAlert: action.payload,
    };
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      jobs: [],
      isEditing: false,
      editItem: null,
    };
  }

  if (action.type === FETCH_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      jobs: action.payload,
    };
  }

  if (action.type === FETCH_JOBS_ERROR) {
    return { ...state, isLoading: false };
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: [...state.jobs, action.payload],
    };
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    return { ...state, isLoading: false, editItem: action.payload };
  }

  if (action.type === FETCH_SINGLE_JOB_ERROR) {
    return { ...state, isLoading: false, editItem: "", singleJobError: true };
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      editItem: action.payload,
    };
  }

  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
    };
  }
  throw new Error(`no such action : ${action}`);
};

export default reducer;
