import axiosClient from "./axiosClient";

export const fetchTrades = async () => {
  try {
    const response = await axiosClient.get('/api/frontend/trades/', {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching trade history:', error);
    throw error;
  }
};