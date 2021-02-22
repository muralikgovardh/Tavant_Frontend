import api from "./api";

const setAuthToken = (token) => {
  console.log("jwt Token" + token);
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);

    // localStorage is good for security purpose to store the data
    //Accessible to only its domain content
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
