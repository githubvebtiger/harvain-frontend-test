import axiosClient from "./axiosClient";

export const fetchPaymentPlan = async (name: string) => {
  try {
    const response = await axiosClient.get('/api/frontend/payment-plan/', {
      params: { name },
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching payment plan:', error);
    throw error;
  }
};
