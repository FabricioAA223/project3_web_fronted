import axios from 'axios';

export const getDashboardView = async (userId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/dashboard/view?user_id=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
    throw error;
  }
};