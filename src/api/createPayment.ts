import axiosClient from "./axiosClient";

interface PaymentData {
  full_name: string;
  total_price: string;
  requisite: string;
  to_be_paid: string;
  user: number;
}

export const createPayment = async (paymentData: PaymentData): Promise<any> => {
  try {
    const response = await axiosClient.post<PaymentResponse>('/api/frontend/payment', paymentData)

    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};
