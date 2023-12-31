import axios from "axios";

axios.defaults.baseURL = "https://lucky-garters-cod.cyclic.cloud/api/v1";

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem("user");

  if (user) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }

  return req;
});
