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
  deleteWorkout: "/api/workouts/delete/",
  getAllUsers: "/api/users",
  addFriend: "/api/friends/add",
  removeFriend: "/api/friends/remove",
  getSchedule: "/api/schedule",
  addToSchedule: "/api/schedule/add",
  removeFromSchedule: "/api/schedule/remove",
  getAllLoggedWorkouts: "/api/workouts/logged",
  logWorkout: "/api/workouts/log",
  getMovement: "/api/movements/",
  getFriends: "/api/user/friends",
  getUserData: "/api/user/",
};

export const getUserDataAPI = async (id, token) => {
  try {
    const response = await axios.get(url + endpoints.getUserData + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFriendsAPI = async (token) => {
  try {
    const response = await axios.get(url + endpoints.getFriends, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovementAPI = async (id) => {
  try {
    const response = await axios.get(url + endpoints.getMovement + id);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkoutAPI = async (data, token) => {
  try {
    const response = await axios.delete(url + endpoints.deleteWorkout + data, {
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
  console.log(data);
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
    await axios.post(url + endpoints.addFriend, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFriendAPI = async (userId, token) => {
  try {
    await axios({
      method: "delete",
      url: url + endpoints.removeFriend,
      data: userId,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error removing friend:", error);
    throw error;
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
    const response = await axios.delete(
      url + endpoints.removeFromSchedule,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLoggedWorkoutsAPI = async (token) => {
  try {
    const response = await axios.get(url + endpoints.getAllLoggedWorkouts, {
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
