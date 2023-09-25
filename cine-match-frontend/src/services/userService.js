import api from "./api";

const userService = {
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`/api/users/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Add other user-related functions as needed
};

export default userService;
