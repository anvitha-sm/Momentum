import axios from "axios";
const url = "http://localhost:8080";

const endpoints = {
  login: "/api/user/login",
  join: "/api/user/join",
  getAllWorkouts: "/api/workouts",
  getAllMovements: "/api/movements",
  createWorkout: "/api/workouts/create",
  getAllUserWorkouts: "/api/workouts/saved",
  saveWorkout: "/api/workouts/:workoutId/save",
  deleteWorkout: "/api/workouts/:workoutId/delete",
  getAllUsers: "/api/users",
  addFriend: "/api/friends/:friendId/add",
  removeFriend: "/api/friends/:friendId/remove",
  getSchedule: "/api/schedule",
  addToSchedule: "/api/schedule/add",
  removeFromSchedule: "/api/schedule/remove",
  getAllLoggedWorkouts: "/api/workouts/logged",
  logWorkout: "/api/workouts/log"
};

export const deleteWorkoutAPI = async (data, token) => {
  try {
    const response = await axios.delete(url + endpoints.deleteWorkout, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveWorkoutAPI = async (data, token) => {
  try {
    const response = await axios.post(url + endpoints.saveWorkout, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserWorkoutsAPI = async (token) => {
  try {
    const response = await axios.get(url + endpoints.getAllUserWorkouts, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createWorkoutAPI = async (data, token) => {
  try {
    const response = await axios.post(url + endpoints.createWorkout, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllWorkoutsAPI = async () => {
  try {
    const response = await axios.get(url + endpoints.getAllWorkouts);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMovementsAPI = async () => {
  try {
    const response = await axios.get(url + endpoints.getAllMovements);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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

export const getAllUsersAPI = async () => {
  try {
    const response = await axios.get(url + endpoints.getAllUsers);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addFriendAPI = async (data, token) => {
  try {
    const response = await axios.post(url + endpoints.addFriend, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFriendAPI = async (data, token) => {
  try {
    const response = await axios.delete(url + endpoints.removeFriend, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getScheduleAPI = async (data, token) => {
  try {
    const response = await axios.get(url + endpoints.getSchedule, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToScheduleAPI = async (data, token) => {
  try {
    const response = await axios.post(url + endpoints.addToSchedule, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromScheduleAPI = async (data, token) => {
  try {
    const response = await axios.delete(url + endpoints.removeFromSchedule, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLoggedWorkoutsAPI = async (data, token) => {
  try {
    const response = await axios.get(url + endpoints.getAllLoggedWorkouts, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logWorkoutAPI = async (data, token) => {
  try {
    const response = await axios.post(url + endpoints.logWorkout, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
