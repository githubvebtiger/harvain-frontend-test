import axiosClient from "./axiosClient";

export const createSupportTicket = async (data: SupportTicketRequest) => {
  try {
    const response = await axiosClient.post(
      "/api/frontend/support-ticket/",
      data,
    );
    return response
  } catch (error) {
    console.error("Error creating support ticket:", error);
  }
};

// Пример типа данных для запроса
interface SupportTicketRequest {
  full_name: string;
  email: string;
  account_number: string;
  subject: string;
  description: string;
}
