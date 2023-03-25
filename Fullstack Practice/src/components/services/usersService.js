import axios from "axios";
import * as helper from "./serviceHelper"

let userLogin = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess);
};

let getCurrentUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess);
};

let userRegister = (payload) => {
  console.log("Register User is running", payload);
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getUserById = (id) => {
    console.log("getUserById is running", id);
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/users/${id}`,
        data: id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);

  };

let userLogout = () => {
    console.log("userlogout is running");
    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/users/logout`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)

  };


const usersService = { userLogin, getCurrentUser, userRegister, getUserById, userLogout} 

export default usersService;


 