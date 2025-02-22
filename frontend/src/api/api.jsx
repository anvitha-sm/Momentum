import axios from "axios";
const url = "http://localhost:8080";

const endpoints = {
  login: "/api/user/login",
  join: "/api/user/join",
};

export const signInApi = async (data) => {
  try {
    const response = await axios.post(url + endpoints.login, data);
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
};

export const joinApi = async (data) => {
  try {
    const response = await axios.post(url + endpoints.join, data);
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
};
