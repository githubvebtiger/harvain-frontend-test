import axiosClient from "./axiosClient";

export const fetchNews = async () => {
  try {
    const response = await axiosClient.get('/api/frontend/news/', {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};