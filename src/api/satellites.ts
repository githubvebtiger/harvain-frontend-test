import axiosClient, { IResponse } from './axiosClient';
import { toast } from '../components/Toast';

export const fetchSatellites = async (): Promise<IResponse> => {
  try {
    const userId = localStorage.getItem('userId')
    if (!userId) throw new Error('User ID not found in localStorage');

    const response = await axiosClient.get(`/api/frontend/client/${userId}/`);
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error('Error fetching satellites:', error);
    // If 404 — user ID is stale after DB restore, clear and redirect to login
    if (error?.response?.status === 404) {
      console.warn('User not found (404), clearing stale session data');
      localStorage.removeItem('userId');
      localStorage.removeItem('loginId');
      localStorage.removeItem('satellite');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('clientAccessToken');
      localStorage.removeItem('clientRefreshToken');
      window.location.href = '/';
    }
    return { data: null, error };
  }
};


interface Tokens {
  refresh: string;
  access: string;
}


export interface Satellite {
  id: number;
  uuid: string;
  username: string;
  name: string | null;
  city: string | null;
  country: string | null;
  address: string | null;
  last_name: string | null;
  born: string | null;
  phone: string | null;
  email: string | null;
  invitation_code: string;
  allow_password_update: boolean;
  block_balance: number;
  active_balance: number;
  withdrawal: number;
  tokens: Tokens;
  verify_status: string;
  email_verified: boolean;
  document_verified: boolean;
  created_at?: string;
  deposit?: number;
  deposit_time?: string;
  migration_time?: string;
  second_migration_time?: string;
}


export const fetchSatelliteById = async (id: number): Promise<Satellite> => {
  localStorage.setItem('loginId', String(id));

  try {
    const response = await axiosClient.get<Satellite>(`/api/frontend/satellite/${id}/`);
    localStorage.setItem('satellite', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    console.error('Error fetching satellite data:', error);
    // If 404 — satellite ID is stale, clear and redirect to satellites
    if (error?.response?.status === 404) {
      console.warn('Satellite not found (404), clearing stale data');
      localStorage.removeItem('loginId');
      localStorage.removeItem('satellite');
      window.location.href = '/satellites';
    }
    throw error;
  }
};


interface ProfileData {
  uuid?: string;
  username?: string;
  last_name?: string;
  name?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  born?: string;
  email?: string;
}

export const updateSatelliteById = async (id: number, data: Partial<ProfileData>) => {
  try {
    const response = await axiosClient.patch(`/api/frontend/satellite/${id}/`, data);
    toast.success('Data has been successfully updated!');
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


export const updateSatellitePasswordById = async (
  id: number,
  data: {
    old_password: string;
    new_password: string;
    new_password2: string;
  }
) => {
  try {
    const response = await axiosClient.patch(`/api/frontend/satellite/password/${id}/`, data);
    toast.success('Password has been successfully updated!');
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};



export const getSatelliteToken = async (data: {
  uuid: string;
  username: string;
  password: string;
}): Promise<IResponse> => {
  try {
    const response = await axiosClient.post('/api/frontend/token/satellite/', data,{
      headers:{
        'Accept':'application/json'
      }
    });
    return { data: response, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
