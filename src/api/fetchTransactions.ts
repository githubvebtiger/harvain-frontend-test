import axiosClient from "./axiosClient";
export const fetchTransactions = async (type: string) => {
  try {
    const response = await axiosClient.get('/api/frontend/transaction/', {
      params: { type },
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
