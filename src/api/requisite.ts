import axiosClient from "./axiosClient";
import { toast } from '../components/Toast';

export interface Requisite {
  id?: number;
  title: string;
  icon: string;
  show?: boolean;
  client?: number;
}

// Получение списка requisites
export const fetchRequisites = async () => {
  try {
    const response = await axiosClient.get('/api/frontend/requisites/', {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching requisites:', error);
    throw error;
  }
};

// Создание или обновление requisite в зависимости от наличия id
export const saveRequisite = async (data: Requisite) => {
  try {
    const url = data?.id
      ? `/api/frontend/requisites/${data?.id}/`
      : '/api/frontend/requisites/';
    const method = data?.id ? 'put' : 'post';

    const response = await axiosClient({
      method,
      url,
      headers: {
        Accept: 'application/json',
      },
      data,
    });

    toast.success('Data has been successfully updated!');
    return response.data;
  } catch (error) {
    console.error(
      `Error ${data?.id ? 'updating' : 'creating'} requisite:`,
      error
    );
    throw error;
  }
};